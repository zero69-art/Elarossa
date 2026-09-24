import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { setCjWebhookEndpoints, subscribeCjProducts } from "@/lib/cj-webhooks-api";

/**
 * Admin: point CJ stock+product webhooks at this deployment and subscribe catalog PIDs.
 *
 * POST Authorization: Bearer $ADMIN_ACCESS_TOKEN
 * Body optional: { "callbackUrl": "https://…/api/webhooks/cj", "subscribe": true }
 */
export async function POST(request: Request) {
  const admin = process.env.ADMIN_ACCESS_TOKEN?.trim();
  if (!admin) {
    return NextResponse.json({ error: "ADMIN_ACCESS_TOKEN not configured" }, { status: 503 });
  }
  const auth = request.headers.get("authorization") || "";
  if (auth !== `Bearer ${admin}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { callbackUrl?: string; subscribe?: boolean } = {};
  try {
    body = await request.json();
  } catch {
    /* defaults */
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://elarossa.vercel.app";
  const callbackUrl = (body.callbackUrl || `${origin}/api/webhooks/cj`).trim();

  if (!callbackUrl.startsWith("https://")) {
    return NextResponse.json(
      { error: "callbackUrl must be public HTTPS (CJ rejects localhost)" },
      { status: 400 }
    );
  }

  try {
    const setResult = await setCjWebhookEndpoints(callbackUrl, {
      stock: true,
      product: true,
      order: false,
      logistics: false,
    });

    let subscribeResult = null;
    if (body.subscribe !== false) {
      const pids = products.map((p) => p.cjPid).filter((id): id is string => Boolean(id));
      subscribeResult = await subscribeCjProducts(pids);
    }

    return NextResponse.json({
      ok: true,
      callbackUrl,
      setResult,
      subscribeResult,
      hint: "Set CJ_OPEN_ID on Vercel (openId from getAccessToken) so /api/webhooks/cj can verify the sign header.",
    });
  } catch (e) {
    console.error("[cj-webhooks/register]", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Register failed" },
      { status: 502 }
    );
  }
}
