import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe-server";

export async function GET(request: Request) {
  try {
    getStripe();
  } catch {
    return NextResponse.json(
      { verified: false, error: "Checkout is not configured yet." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");
  if (!sessionId || !sessionId.startsWith("cs_")) {
    return NextResponse.json(
      { verified: false, error: "Missing or invalid session id." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const verified = session.status === "complete" && session.payment_status === "paid";
    return NextResponse.json(
      {
        verified,
        amountTotal: session.amount_total,
        currency: session.currency,
        email: session.customer_details?.email ?? null,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { verified: false, error: "Could not verify this order." },
      { status: 404, headers: { "Cache-Control": "no-store" } }
    );
  }
}
