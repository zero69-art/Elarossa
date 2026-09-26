import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import {
  getLogisticsByOrderId,
  getLogisticsByTracking,
  listRecentLogistics,
  logisticsCacheStats,
} from "@/lib/cj-logistics-cache";
import { getOrderByStripeSession } from "@/lib/order-bridge";

export const dynamic = "force-dynamic";

/**
 * Logistics cache reads.
 * List-all requires admin. Lookup by session / orderId / tracking stays available.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId")?.trim();
  const tracking = searchParams.get("tracking")?.trim();
  const session = searchParams.get("session")?.trim();
  const admin = isAdminRequest(request);

  if (session) {
    const bridge = getOrderByStripeSession(session);
    if (!bridge?.cjOrderId) {
      return NextResponse.json({
        ok: true,
        found: false,
        note: "No CJ order linked for this session on this instance",
      });
    }
    const row = getLogisticsByOrderId(bridge.cjOrderId);
    return NextResponse.json({
      ok: true,
      found: Boolean(row),
      shipment: row
        ? {
            trackingStatus: row.trackingStatus,
            trackingStatusLabel: row.trackingStatusLabel,
            trackingNumber: row.trackingNumber,
            logisticName: row.logisticName,
            events: admin ? row.events : row.events.slice(-3),
          }
        : null,
    });
  }

  if (orderId) {
    const row = getLogisticsByOrderId(orderId);
    return NextResponse.json({
      ok: true,
      found: Boolean(row),
      shipment: row
        ? {
            trackingStatus: row.trackingStatus,
            trackingStatusLabel: row.trackingStatusLabel,
            trackingNumber: row.trackingNumber,
            logisticName: row.logisticName,
            events: admin ? row.events : row.events.slice(-3),
          }
        : null,
    });
  }

  if (tracking) {
    const row = getLogisticsByTracking(tracking);
    return NextResponse.json({
      ok: true,
      found: Boolean(row),
      shipment: row
        ? {
            trackingStatus: row.trackingStatus,
            trackingStatusLabel: row.trackingStatusLabel,
            trackingNumber: row.trackingNumber,
            logisticName: row.logisticName,
          }
        : null,
    });
  }

  if (!admin) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    stats: logisticsCacheStats(),
    recent: listRecentLogistics(30),
  });
}
