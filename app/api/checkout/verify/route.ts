import { NextResponse } from "next/server";
import Stripe from "stripe";

// Confirms a Stripe Checkout session actually completed before the
// success page claims payment succeeded. Without this check,
// /checkout/success would show "Thank you, your payment has been
// submitted successfully" to anyone who simply visited the URL,
// paid or not.
export async function GET(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return NextResponse.json({ verified: false, error: "Checkout is not configured yet." }, { status: 503 });

  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");
  if (!sessionId || !sessionId.startsWith("cs_")) {
    return NextResponse.json({ verified: false, error: "Missing or invalid session id." }, { status: 400 });
  }

  try {
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const verified = session.payment_status === "paid";
    return NextResponse.json({
      verified,
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  } catch {
    return NextResponse.json({ verified: false, error: "Could not verify this order." }, { status: 404 });
  }
}
