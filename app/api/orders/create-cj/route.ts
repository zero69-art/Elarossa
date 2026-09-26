import { NextResponse } from "next/server";
import { resolveLineItems, toCjOrderProducts, isStoreLive } from "@/lib/fulfillment";
import { createCjOrder } from "@/lib/cj-orders";

/**
 * Manual CJ order create (ops only).
 * Preferred path is Stripe webhook → fulfillPaidCheckoutSession.
 * ALWAYS requires FULFILLMENT_SECRET or ADMIN_ACCESS_TOKEN.
 */
export async function POST(request: Request) {
  if (!isStoreLive()) {
    return NextResponse.json(
      { error: "Store is not live. Fulfillment API is locked." },
      { status: 403 }
    );
  }

  const fulfillment = process.env.FULFILLMENT_SECRET?.trim();
  const admin = process.env.ADMIN_ACCESS_TOKEN?.trim();
  if (!fulfillment && !admin) {
    return NextResponse.json(
      { error: "Fulfillment endpoint locked (set FULFILLMENT_SECRET or ADMIN_ACCESS_TOKEN)" },
      { status: 503 }
    );
  }

  const auth = request.headers.get("authorization") || "";
  const xAdmin = request.headers.get("x-admin-token") || "";
  const okBearer =
    (fulfillment && auth === `Bearer ${fulfillment}`) ||
    (admin && auth === `Bearer ${admin}`);
  const okHeader = admin && xAdmin === admin;
  if (!okBearer && !okHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const orderNumber = String(body.orderNumber || "").trim();
    const items = Array.isArray(body.items) ? body.items : [];
    const shipping = body.shipping || {};

    if (!orderNumber) {
      return NextResponse.json({ error: "orderNumber required" }, { status: 400 });
    }
    if (
      !shipping.fullName ||
      !shipping.countryCode ||
      !shipping.city ||
      !shipping.address ||
      !shipping.zip ||
      !shipping.phone
    ) {
      return NextResponse.json({ error: "Incomplete shipping address" }, { status: 400 });
    }

    const resolved = resolveLineItems(
      items.map((it: Record<string, unknown>) => ({
        slug: String(it.slug || ""),
        size: String(it.size || ""),
        color: String(it.color || ""),
        quantity: Number(it.quantity || 1),
      }))
    );

    if (!resolved.ok) {
      return NextResponse.json(
        { error: resolved.reason, detail: resolved.detail },
        { status: 422 }
      );
    }

    const cjResult = await createCjOrder({
      orderNumber,
      products: toCjOrderProducts(resolved.lines),
      shipping: {
        fullName: String(shipping.fullName),
        countryCode: String(shipping.countryCode),
        state: shipping.state ? String(shipping.state) : undefined,
        city: String(shipping.city),
        address: String(shipping.address),
        address2: shipping.address2 ? String(shipping.address2) : undefined,
        zip: String(shipping.zip),
        phone: String(shipping.phone),
        email: shipping.email ? String(shipping.email) : undefined,
      },
      remark: `Elarossa ${orderNumber}`,
    });

    return NextResponse.json({ ok: true, cj: cjResult });
  } catch (e) {
    console.error("[create-cj]", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Fulfillment failed" },
      { status: 500 }
    );
  }
}
