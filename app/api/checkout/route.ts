import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getProduct } from "@/lib/products";
import { encodeCartMetadata, getStripe, type CartLineMeta } from "@/lib/stripe-server";

type CartItem = { slug: string; quantity: number; size?: string; color?: string };

function cleanText(value: unknown, max = 120) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  if (process.env.ELAROSSA_STORE_LIVE !== "true") {
    return NextResponse.json(
      {
        error:
          "Checkout is temporarily closed while product and fulfilment checks are being completed.",
      },
      { status: 503 }
    );
  }

  try {
    getStripe();
  } catch {
    return NextResponse.json({ error: "Checkout is not configured yet." }, { status: 503 });
  }

  let body: { items?: CartItem[] };
  try {
    body = (await request.json()) as { items?: CartItem[] };
  } catch {
    return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
  }

  const items = Array.isArray(body.items) ? body.items.slice(0, 50) : [];
  if (!items.length) return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });

  const stripe = getStripe();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  const cartMeta: CartLineMeta[] = [];
  let subtotal = 0;
  const orderItems: string[] = [];

  for (const item of items) {
    const slug = cleanText(item.slug, 160);
    const product = getProduct(slug);
    if (!product) {
      return NextResponse.json(
        { error: "One or more products in your bag are no longer available." },
        { status: 400 }
      );
    }
    if (product.qualityStatus !== "approved") {
      return NextResponse.json(
        { error: `${product.name} is not currently available for purchase.` },
        { status: 400 }
      );
    }

    const requestedQuantity = Number(item.quantity);
    if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1 || requestedQuantity > 10) {
      return NextResponse.json({ error: `Invalid quantity for ${product.name}.` }, { status: 400 });
    }
    const quantity = requestedQuantity;
    const size = cleanText(item.size);
    const color = cleanText(item.color);

    if (product.sizes.length > 1 && !size) {
      return NextResponse.json({ error: `Please select a size for ${product.name}.` }, { status: 400 });
    }
    if (product.colors.length > 1 && !color) {
      return NextResponse.json(
        { error: `Please select a colour for ${product.name}.` },
        { status: 400 }
      );
    }
    if (size && !product.sizes.includes(size)) {
      return NextResponse.json({ error: `Invalid size for ${product.name}.` }, { status: 400 });
    }
    if (color && !product.colors.includes(color)) {
      return NextResponse.json({ error: `Invalid colour for ${product.name}.` }, { status: 400 });
    }

    subtotal += product.price * quantity;
    const variantDescription = [size && `Size: ${size}`, color && `Colour: ${color}`]
      .filter(Boolean)
      .join(" · ");
    orderItems.push(
      `${product.slug} x${quantity}${variantDescription ? ` (${variantDescription})` : ""}`
    );
    cartMeta.push({ slug: product.slug, quantity, size: size || undefined, color: color || undefined });
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

  if (!lineItems.length) {
    return NextResponse.json(
      { error: "No approved products are currently available for purchase." },
      { status: 400 }
    );
  }

  const shippingAmount = subtotal >= 75 ? 0 : 795;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: shippingAmount, currency: "usd" },
            display_name: shippingAmount === 0 ? "Free shipping" : "Standard shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 12 },
            },
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: [
          "US",
          "CA",
          "GB",
          "DE",
          "FR",
          "IT",
          "ES",
          "NL",
          "BE",
          "AT",
          "IE",
          "SE",
          "DK",
          "FI",
          "PT",
          "PL",
        ],
      },
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
        cart: encodeCartMetadata(cartMeta),
      },
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[checkout]", e);
    return NextResponse.json(
      { error: "Checkout could not be started. Please try again." },
      { status: 502 }
    );
  }
}
