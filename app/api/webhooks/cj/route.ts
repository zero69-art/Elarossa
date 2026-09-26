import { NextResponse } from "next/server";
import { verifyCjWebhookSignature } from "@/lib/cj-webhook-verify";
import {
  parseStockParams,
  rememberMessageId,
  upsertStockRows,
  stockCacheStats,
} from "@/lib/cj-stock-cache";
import {
  parseLogisticsParams,
  upsertLogistics,
  logisticsCacheStats,
} from "@/lib/cj-logistics-cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * CJ Dropshipping webhook callback.
 * Register via POST /api/admin/cj-webhooks/register
 *
 * Topics: STOCK, PRODUCT, VARIANT, ORDER, LOGISTIC / LOGISTICS
 * Sign: Base64(HmacSHA256(openId, rawBody))
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const openId = process.env.CJ_OPEN_ID?.trim() || "";
  const skip = process.env.CJ_WEBHOOK_SKIP_VERIFY === "true";
  const sign = request.headers.get("sign") || request.headers.get("Sign");

  if (!skip) {
    if (!openId) {
      console.error("[cj-webhook] CJ_OPEN_ID missing — cannot verify sign");
      return NextResponse.json({ error: "CJ_OPEN_ID not configured" }, { status: 503 });
    }
    if (!verifyCjWebhookSignature(rawBody, sign, openId)) {
      console.warn("[cj-webhook] invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let payload: {
    messageId?: string;
    type?: string;
    messageType?: string;
    openId?: number | string;
    params?: unknown;
  };

  try {
    payload = JSON.parse(rawBody || "{}");
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messageId = String(payload.messageId || "");
  const type = String(payload.type || "").toUpperCase();
  const messageType = String(payload.messageType || "");

  if (messageId && rememberMessageId(messageId)) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  try {
    if (type === "STOCK") {
      const rows = parseStockParams(payload.params);
      upsertStockRows(rows, messageId);
      console.info("[cj-webhook] STOCK", {
        messageId,
        messageType,
        rows: rows.length,
        stats: stockCacheStats(),
      });
    } else if (type === "LOGISTIC" || type === "LOGISTICS") {
      const row = parseLogisticsParams(payload.params, messageId, messageType);
      if (row) {
        upsertLogistics(row);
        console.info("[cj-webhook] LOGISTIC", {
          messageId,
          messageType,
          orderId: row.orderId,
          trackingNumber: row.trackingNumber,
          trackingStatus: row.trackingStatus,
          label: row.trackingStatusLabel,
          stats: logisticsCacheStats(),
        });
      } else {
        console.warn("[cj-webhook] LOGISTIC missing orderId", { messageId, params: payload.params });
      }
    } else if (type === "ORDER") {
      console.info("[cj-webhook] ORDER", {
        messageId,
        messageType,
        params: payload.params,
      });
      // Order status changes — log until we persist order map (Stripe session ↔ CJ orderId)
    } else if (type === "PRODUCT" || type === "VARIANT") {
      console.info("[cj-webhook] PRODUCT/VARIANT", {
        messageId,
        messageType,
        params: payload.params,
      });
    } else {
      console.info("[cj-webhook] other", { type, messageType, messageId });
    }
  } catch (e) {
    console.error("[cj-webhook] handler error", e);
    // 200 after verify so CJ does not auto-disable the topic
  }

  return NextResponse.json({ ok: true, type, messageType });
}

/** Health / probe for CJ URL validation */
export async function GET() {
  return NextResponse.json({
    service: "elarossa-cj-webhook",
    ok: true,
    stock: stockCacheStats(),
    logistics: logisticsCacheStats(),
  });
}
