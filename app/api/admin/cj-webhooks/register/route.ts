import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { setCjWebhookEndpoints, subscribeCjProducts } from "@/lib/cj-webhooks-api";

/**
 * Admin: point CJ stock + product + logistics webhooks at this deployment.
 *
 * POST Authorization: Bearer $ADMIN_ACCESS_TOKEN
 * Body optional: {
 *   "callbackUrl": "https://…/api/webhooks/cj",
 *   "subscribe": true,
 *   "logistics": true,
 *   "order": false
 * }
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

  let body: {
    callbackUrl?: string;
    subscribe?: boolean;
    logistics?: boolean;
    order?: boolean;
    stock?: boolean;
    product?: boolean;
  } = {};
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
      stock: body.stock !== false,
      product: body.product !== false,
      order: body.order === true,
      logistics: body.logistics !== false,
    });

    let subscribeResult = null;
    if (body.subscribe !== false) {
      const pids = products.map((p) => p.cjPid).filter((id): id is string => Boolean(id));
      subscribeResult = await subscribeCjProducts(pids);
    }

    return NextResponse.json({
      ok: true,
      callbackUrl,
      topics: {
        stock: body.stock !== false,
        product: body.product !== false,
        logistics: body.logistics !== false,
        order: body.order === true,
      },
      setResult,
      subscribeResult,
      hint: "Set CJ_OPEN_ID on Vercel (openId from getAccessToken). Logistics updates: GET /api/tracking?orderId=",
    });
  } catch (e) {
    console.error("[cj-webhooks/register]", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Register failed" },
      { status: 502 }
    );
  }
}
