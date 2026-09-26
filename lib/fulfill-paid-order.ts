import type Stripe from "stripe";
import { decodeCartMetadata, type CartLineMeta, getStripe } from "@/lib/stripe-server";
import { resolveLineItems, toCjOrderProducts, isStoreLive } from "@/lib/fulfillment";
import { createCjOrder } from "@/lib/cj-orders";
import {
  extractCjOrderId,
  rememberOrderBridge,
  getOrderByStripeSession,
} from "@/lib/order-bridge";

export type FulfillResult =
  | { status: "skipped"; reason: string }
  | { status: "ok"; cj: unknown; orderNumber: string; cjOrderId?: string }
  | { status: "error"; reason: string; detail?: string };

type SessionWithShipping = Stripe.Checkout.Session & {
  shipping_details?: {
    name?: string | null;
    phone?: string | null;
    address?: Stripe.Address | null;
  } | null;
  collected_information?: {
    shipping_details?: {
      name?: string | null;
      address?: Stripe.Address | null;
    } | null;
  } | null;
};

function shippingFromSession(session: Stripe.Checkout.Session) {
  const s = session as SessionWithShipping;
  const ship =
    s.shipping_details ||
    s.collected_information?.shipping_details ||
    null;
  const addr = ship?.address || s.customer_details?.address;
  const name =
    ship?.name ||
    s.shipping_details?.name ||
    s.customer_details?.name ||
    "Customer";
  const phone =
    s.customer_details?.phone ||
    s.shipping_details?.phone ||
    "";
  const email = s.customer_details?.email || undefined;

  if (!addr?.country || !addr?.city || !addr?.line1 || !addr?.postal_code) {
    return null;
  }

  // CJ is picky about phone; keep digits, fallback placeholder only if empty
  const phoneDigits = String(phone).replace(/\D/g, "");

  return {
    fullName: String(name).slice(0, 100),
    countryCode: addr.country,
    state: addr.state || undefined,
    city: addr.city,
    address: addr.line1,
    address2: addr.line2 || undefined,
    zip: addr.postal_code,
    phone: phoneDigits || "0000000000",
    email,
  };
}

function linesFromSession(session: Stripe.Checkout.Session): CartLineMeta[] {
  const fromMeta = decodeCartMetadata(session.metadata?.cart);
  if (fromMeta.length) return fromMeta;

  const raw = session.metadata?.order_items || "";
  const parts = raw.split(" | ").map((p) => p.trim()).filter(Boolean);
  const lines: CartLineMeta[] = [];
  for (const part of parts) {
    const m = part.match(/^(\S+)\s+x(\d+)/i);
    if (!m) continue;
    const sizeM = part.match(/Size:\s*([^)·]+)/i);
    const colorM = part.match(/Colou?r:\s*([^)·]+)/i);
    lines.push({
      slug: m[1],
      quantity: Number(m[2]) || 1,
      size: sizeM?.[1]?.trim(),
      color: colorM?.[1]?.trim(),
    });
  }
  return lines;
}

async function tagStripeSession(
  sessionId: string,
  fields: Record<string, string>
) {
  try {
    const stripe = getStripe();
    await stripe.checkout.sessions.update(sessionId, {
      metadata: fields,
    });
  } catch (e) {
    console.warn("[fulfill] could not update Stripe session metadata", e);
  }
}

/**
 * After Stripe marks a Checkout Session paid, optionally create a CJ order.
 * Idempotent: orderNumber = session.id; bridge skips duplicate create if already linked.
 */
export async function fulfillPaidCheckoutSession(
  session: Stripe.Checkout.Session
): Promise<FulfillResult> {
  if (session.payment_status !== "paid" && session.status !== "complete") {
    return { status: "skipped", reason: "not_paid" };
  }

  // Already fulfilled on this instance
  const existing = getOrderByStripeSession(session.id);
  if (existing?.cjOrderId || existing?.lastStatus === "ok") {
    return {
      status: "ok",
      cj: existing.rawCj,
      orderNumber: existing.cjOrderNumber,
      cjOrderId: existing.cjOrderId,
    };
  }

  if (!isStoreLive()) {
    return { status: "skipped", reason: "store_not_live" };
  }

  if (process.env.CJ_FULFILL_ON_PAYMENT !== "true") {
    return {
      status: "skipped",
      reason: "CJ_FULFILL_ON_PAYMENT is not true (payment recorded; CJ not auto-called)",
    };
  }

  const items = linesFromSession(session);
  if (!items.length) {
    return { status: "error", reason: "no_line_items", detail: "metadata.cart empty" };
  }

  const shipping = shippingFromSession(session);
  if (!shipping) {
    return { status: "error", reason: "missing_shipping" };
  }

  const resolved = resolveLineItems(
    items.map((i) => ({
      slug: i.slug,
      size: i.size || "One Size",
      color: i.color || "Default",
      quantity: i.quantity,
    }))
  );

  if (!resolved.ok) {
    return { status: "error", reason: resolved.reason, detail: resolved.detail };
  }

  const orderNumber = session.id;

  try {
    const cj = await createCjOrder({
      orderNumber,
      products: toCjOrderProducts(resolved.lines),
      shipping,
      remark: `Elarossa Stripe ${session.id}`,
    });

    const cjOrderId = extractCjOrderId(cj);

    rememberOrderBridge({
      stripeSessionId: session.id,
      cjOrderId,
      cjOrderNumber: orderNumber,
      paymentStatus: session.payment_status || "paid",
      email: session.customer_details?.email || undefined,
      createdAt: new Date().toISOString(),
      lastStatus: "ok",
      rawCj: cj,
    });

    await tagStripeSession(session.id, {
      cj_fulfill: "ok",
      cj_order_number: orderNumber,
      ...(cjOrderId ? { cj_order_id: cjOrderId } : {}),
    });

    return { status: "ok", cj, orderNumber, cjOrderId };
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    rememberOrderBridge({
      stripeSessionId: session.id,
      cjOrderNumber: orderNumber,
      paymentStatus: session.payment_status || "paid",
      email: session.customer_details?.email || undefined,
      createdAt: new Date().toISOString(),
      lastStatus: "cj_create_failed",
    });
    await tagStripeSession(session.id, {
      cj_fulfill: "error",
      cj_error: detail.slice(0, 400),
    });
    return {
      status: "error",
      reason: "cj_create_failed",
      detail,
    };
  }
}
