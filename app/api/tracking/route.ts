import { NextResponse } from "next/server";
import {
  getLogisticsByOrderId,
  getLogisticsByTracking,
  listRecentLogistics,
  logisticsCacheStats,
} from "@/lib/cj-logistics-cache";

export const dynamic = "force-dynamic";

/**
 * Read logistics snapshots pushed by CJ LOGISTIC webhooks.
 *
 * GET /api/tracking?orderId=
 * GET /api/tracking?tracking=
 * GET /api/tracking          → recent list + stats
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId")?.trim();
  const tracking = searchParams.get("tracking")?.trim();

  if (orderId) {
    const row = getLogisticsByOrderId(orderId);
    return NextResponse.json({
      ok: true,
      source: "cj-logistic-webhook-cache",
      found: Boolean(row),
      shipment: row ?? null,
      note: row
        ? undefined
        : "No webhook data for this orderId on this instance yet",
    });
  }

  if (tracking) {
    const row = getLogisticsByTracking(tracking);
    return NextResponse.json({
      ok: true,
      source: "cj-logistic-webhook-cache",
      found: Boolean(row),
      shipment: row ?? null,
    });
  }

  return NextResponse.json({
    ok: true,
    source: "cj-logistic-webhook-cache",
    stats: logisticsCacheStats(),
    recent: listRecentLogistics(30),
    note: "Cache is per serverless instance until Redis is added",
  });
}
