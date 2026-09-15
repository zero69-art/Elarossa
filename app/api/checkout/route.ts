import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduct } from "@/lib/products";

type CartItem = { slug: string; quantity: number; size?: string; color?: string };

function cleanText(value: unknown, max = 120) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return NextResponse.json({ error: "Checkout is not configured yet." }, { status: 503 });

  let body: { items?: CartItem[] };
  try {
    body = (await request.json()) as { items?: CartItem[] };
  } catch {
    return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
  }

  const items = Array.isArray(body.items) ? body.items.slice(0, 50) : [];
  if (!items.length) return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });

  const stripe = new Stripe(secret);
  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let subtotal = 0;
  const orderItems: string[] = [];

  for (const item of items) {
    const product = getProduct(cleanText(item.slug, 160));
    if (!product) continue;

    const requestedQuantity = Number(item.quantity);
    const quantity = Number.isInteger(requestedQuantity) ? Math.min(Math.max(requestedQuantity, 1), 10) : 1;
    const size = cleanText(item.size);
    const color = cleanText(item.color);

    if (size && !product.sizes.includes(size)) {
      return NextResponse.json({ error: `Invalid size selected for ${product.name}.` }, { status: 400 });
    }
    if (color && !product.colors.includes(color)) {
      return NextResponse.json({ error: `Invalid colour selected for ${product.name}.` }, { status: 400 });
    }

    subtotal += product.price * quantity;
    const variantDescription = [size && `Size: ${size}`, color && `Colour: ${color}`].filter(Boolean).join(" · ");
    orderItems.push(`${product.slug} x${quantity}${variantDescription ? ` (${variantDescription})` : ""}`);

    lineItems.push({
      quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: product.name,
          description: variantDescription || undefined,
          images: product.image.startsWith("http") ? [product.image] : undefined,
        },
      },
    });
  }

  if (!lineItems.length) return NextResponse.json({ error: "No valid products in your bag." }, { status: 400 });

  const shippingAmount = subtotal >= 75 ? 0 : 795;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_options: [{
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: shippingAmount, currency: "usd" },
          display_name: shippingAmount === 0 ? "Free shipping" : "Standard shipping",
          delivery_estimate: { minimum: { unit: "business_day", value: 5 }, maximum: { unit: "business_day", value: 12 } },
        },
      }],
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "DE", "FR", "IT", "ES", "NL", "BE", "AT", "IE", "SE", "DK", "FI", "PT", "PL"] },
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      customer_creation: "always",
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        source: "elarossa-web",
        item_count: String(lineItems.length),
        order_items: orderItems.join(" | ").slice(0, 490),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return NextResponse.json({ error: "Checkout could not be started. Please try again." }, { status: 502 });
  }
}
