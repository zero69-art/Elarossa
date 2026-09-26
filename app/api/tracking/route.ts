import { NextResponse } from "next/server";
import {
  getLogisticsByOrderId,
  getLogisticsByTracking,
  listRecentLogistics,
  logisticsCacheStats,
} from "@/lib/cj-logistics-cache";
import { getOrderByStripeSession } from "@/lib/order-bridge";

export const dynamic = "force-dynamic";

/**
 * Read logistics snapshots from CJ LOGISTIC webhooks.
 *
 * GET /api/tracking?orderId=          (CJ order id)
 * GET /api/tracking?tracking=
 * GET /api/tracking?session=cs_...    (Stripe session → CJ order → logistics)
 * GET /api/tracking
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId")?.trim();
  const tracking = searchParams.get("tracking")?.trim();
  const session = searchParams.get("session")?.trim();

  if (session) {
    const bridge = getOrderByStripeSession(session);
    if (!bridge?.cjOrderId) {
      return NextResponse.json({
        ok: true,
        found: false,
        bridge: bridge
          ? {
              stripeSessionId: bridge.stripeSessionId,
              lastStatus: bridge.lastStatus,
              cjOrderId: bridge.cjOrderId,
            }
          : null,
        note: "No CJ order id linked for this session on this instance",
      });
    }
    const row = getLogisticsByOrderId(bridge.cjOrderId);
    return NextResponse.json({
      ok: true,
      found: Boolean(row),
      bridge: {
        stripeSessionId: bridge.stripeSessionId,
        cjOrderId: bridge.cjOrderId,
        lastStatus: bridge.lastStatus,
      },
      shipment: row ?? null,
    });
  }

  if (orderId) {
    const row = getLogisticsByOrderId(orderId);
    return NextResponse.json({
      ok: true,
      source: "cj-logistic-webhook-cache",
      found: Boolean(row),
      shipment: row ?? null,
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
