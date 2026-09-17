import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return NextResponse.json({ verified: false, error: "Checkout is not configured yet." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");
  if (!sessionId || !sessionId.startsWith("cs_")) return NextResponse.json({ verified: false, error: "Missing or invalid session id." }, { status: 400, headers: { "Cache-Control": "no-store" } });
  try {
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const verified = session.status === "complete" && session.payment_status === "paid";
    return NextResponse.json({ verified, amountTotal: session.amount_total, currency: session.currency }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ verified: false, error: "Could not verify this order." }, { status: 404, headers: { "Cache-Control": "no-store" } });
  }
}
