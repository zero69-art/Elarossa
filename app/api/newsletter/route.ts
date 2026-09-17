import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });

    const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
    if (!webhook) return NextResponse.json({ error: "Newsletter signup is being connected. Please check back soon." }, { status: 503 });

    const response = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, source: "elarossa-newsletter" }), cache: "no-store" });
    if (!response.ok) return NextResponse.json({ error: "We couldn't complete the signup. Please try again." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "We couldn't complete the signup. Please try again." }, { status: 500 });
  }
}
