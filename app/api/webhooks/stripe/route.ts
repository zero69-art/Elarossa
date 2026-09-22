import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe-server";
import { fulfillPaidCheckoutSession } from "@/lib/fulfill-paid-order";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe webhook endpoint.
 * Dashboard → Developers → Webhooks → endpoint:
 *   https://<host>/api/webhooks/stripe
 * Events: checkout.session.completed, checkout.session.async_payment_succeeded
 * Env: STRIPE_WEBHOOK_SECRET=whsec_...
 */
export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!webhookSecret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET missing");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  let stripe: Stripe;
  try {
    stripe = getStripe();
  } catch {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("[stripe-webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Ensure we have shipping + payment details
        const full = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ["line_items"],
        });

        console.info("[stripe-webhook] paid session", {
          id: full.id,
          payment_status: full.payment_status,
          amount_total: full.amount_total,
          email: full.customer_details?.email,
        });

        const fulfill = await fulfillPaidCheckoutSession(full);
        console.info("[stripe-webhook] fulfill result", fulfill);

        // Always 200 after verified event so Stripe does not retry forever on business skips.
        // Real CJ failures still return 200 but are logged for ops; retry only signature/config issues.
        if (fulfill.status === "error" && fulfill.reason === "cj_create_failed") {
          // Return 500 so Stripe retries CJ transient failures
          return NextResponse.json({ received: true, fulfill }, { status: 500 });
        }

        return NextResponse.json({ received: true, fulfill });
      }
      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.warn("[stripe-webhook] async payment failed", session.id);
        return NextResponse.json({ received: true });
      }
      default:
        return NextResponse.json({ received: true, ignored: event.type });
    }
  } catch (e) {
    console.error("[stripe-webhook] handler error", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "handler error" },
      { status: 500 }
    );
  }
}
