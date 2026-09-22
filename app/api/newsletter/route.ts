import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const source = typeof body?.source === "string" ? body.source : "elarossa-newsletter";
    const product = typeof body?.product === "string" ? body.product : undefined;
    const size = typeof body?.size === "string" ? body.size : undefined;
    const color = typeof body?.color === "string" ? body.color : undefined;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const payload = {
      email,
      source,
      product,
      size,
      color,
      at: new Date().toISOString(),
      brand: "Elarossa",
    };

    const webhook = process.env.NEWSLETTER_WEBHOOK_URL;

    // Zero-capital pre-launch: accept signups even without a webhook so the funnel is never dead.
    // Owner should set NEWSLETTER_WEBHOOK_URL (Formspree / Make / Zapier) to persist emails off-device.
    if (webhook) {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      if (!response.ok) {
        return NextResponse.json(
          { error: "We couldn't complete the signup. Please try again." },
          { status: 502 }
        );
      }
      return NextResponse.json({ ok: true, persisted: true });
    }

    console.info("[elarossa-capture]", JSON.stringify(payload));
    return NextResponse.json({
      ok: true,
      persisted: false,
      message: "Listed. Connect NEWSLETTER_WEBHOOK_URL on Vercel to store emails permanently.",
    });
  } catch {
    return NextResponse.json(
      { error: "We couldn't complete the signup. Please try again." },
      { status: 500 }
    );
  }
}
