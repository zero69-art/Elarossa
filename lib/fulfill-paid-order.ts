import type Stripe from "stripe";
import { decodeCartMetadata, type CartLineMeta } from "@/lib/stripe-server";
import { resolveLineItems, toCjOrderProducts, isStoreLive } from "@/lib/fulfillment";
import { createCjOrder } from "@/lib/cj-orders";

export type FulfillResult =
  | { status: "skipped"; reason: string }
  | { status: "ok"; cj: unknown; orderNumber: string }
  | { status: "error"; reason: string; detail?: string };

function shippingFromSession(session: Stripe.Checkout.Session) {
  const addr = session.shipping_details?.address || session.customer_details?.address;
  const name =
    session.shipping_details?.name ||
    session.customer_details?.name ||
    "Customer";
  const phone = session.customer_details?.phone || session.shipping_details?.phone || "";
  const email = session.customer_details?.email || undefined;

  if (!addr?.country || !addr?.city || !addr?.line1 || !addr?.postal_code) {
    return null;
  }

  return {
    fullName: name,
    countryCode: addr.country,
    state: addr.state || undefined,
    city: addr.city,
    address: addr.line1,
    address2: addr.line2 || undefined,
    zip: addr.postal_code,
    phone: phone || "0000000000",
    email,
  };
}

function linesFromSession(session: Stripe.Checkout.Session): CartLineMeta[] {
  const fromMeta = decodeCartMetadata(session.metadata?.cart);
  if (fromMeta.length) return fromMeta;

  // Fallback: parse human order_items metadata if cart JSON missing
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

/**
 * After Stripe marks a Checkout Session paid, optionally create a CJ order.
 * Safe to call multiple times (idempotent orderNumber = session.id).
 */
export async function fulfillPaidCheckoutSession(
  session: Stripe.Checkout.Session
): Promise<FulfillResult> {
  if (session.payment_status !== "paid" && session.status !== "complete") {
    return { status: "skipped", reason: "not_paid" };
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

  const orderNumber = session.id; // cs_… unique per Stripe session

  try {
    const cj = await createCjOrder({
      orderNumber,
      products: toCjOrderProducts(resolved.lines),
      shipping,
      remark: `Elarossa Stripe ${session.id}`,
    });
    return { status: "ok", cj, orderNumber };
  } catch (e) {
    return {
      status: "error",
      reason: "cj_create_failed",
      detail: e instanceof Error ? e.message : String(e),
    };
  }
}
