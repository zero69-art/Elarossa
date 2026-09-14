import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduct } from "@/lib/products";

type CartItem = { slug: string; quantity: number; size?: string; color?: string };

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return NextResponse.json({ error: "Checkout is not configured yet." }, { status: 503 });
  const body = (await request.json()) as { items?: CartItem[] };
  const items = Array.isArray(body.items) ? body.items : [];
  if (!items.length) return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });

  const stripe = new Stripe(secret);
  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let subtotal = 0;

  for (const item of items) {
    const product = getProduct(item.slug);
    const quantity = Math.min(Math.max(Number(item.quantity) || 0, 1), 10);
    if (!product) continue;
    subtotal += product.price * quantity;
    lineItems.push({ quantity, price_data: { currency: "usd", unit_amount: Math.round(product.price * 100), product_data: { name: product.name, description: [item.size && `Size: ${item.size}`, item.color && `Color: ${item.color}`].filter(Boolean).join(" · ") || undefined, images: product.image.startsWith("http") ? [product.image] : undefined } } });
  }

  if (!lineItems.length) return NextResponse.json({ error: "No valid products in your bag." }, { status: 400 });
  const shippingAmount = subtotal >= 75 ? 0 : 795;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    shipping_options: [{ shipping_rate_data: { type: "fixed_amount", fixed_amount: { amount: shippingAmount, currency: "usd" }, display_name: shippingAmount === 0 ? "Free shipping" : "Standard shipping", delivery_estimate: { minimum: { unit: "business_day", value: 5 }, maximum: { unit: "business_day", value: 12 } } } }],
    shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "DE", "FR", "IT", "ES", "NL", "BE", "AT", "IE", "SE", "DK", "FI", "PT", "PL"] },
    phone_number_collection: { enabled: true },
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
    metadata: { source: "elarossa-web" },
  });

  return NextResponse.json({ url: session.url });
}
