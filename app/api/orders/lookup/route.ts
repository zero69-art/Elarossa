import { NextResponse } from "next/server";
import {
  getOrderByStripeSession,
  getOrderByCjId,
  listRecentOrders,
  orderBridgeStats,
} from "@/lib/order-bridge";
import { getLogisticsByOrderId } from "@/lib/cj-logistics-cache";

export const dynamic = "force-dynamic";

/**
 * Lookup Stripe↔CJ order bridge (+ logistics if known).
 *
 * GET /api/orders/lookup?session=cs_...
 * GET /api/orders/lookup?cjOrderId=
 * GET /api/orders/lookup  (stats + recent; admin-ish — no secrets returned)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const session = searchParams.get("session")?.trim();
  const cjOrderId = searchParams.get("cjOrderId")?.trim();

  if (session) {
    const bridge = getOrderByStripeSession(session);
    const logistics = bridge?.cjOrderId
      ? getLogisticsByOrderId(bridge.cjOrderId)
      : null;
    return NextResponse.json({
      ok: true,
      found: Boolean(bridge),
      order: bridge
        ? {
            stripeSessionId: bridge.stripeSessionId,
            cjOrderId: bridge.cjOrderId,
            cjOrderNumber: bridge.cjOrderNumber,
            paymentStatus: bridge.paymentStatus,
            email: bridge.email,
            createdAt: bridge.createdAt,
            lastStatus: bridge.lastStatus,
          }
        : null,
      shipment: logistics ?? null,
      note: bridge
        ? undefined
        : "No bridge record on this instance (cold start or not fulfilled here)",
    });
  }

  if (cjOrderId) {
    const bridge = getOrderByCjId(cjOrderId);
    const logistics = getLogisticsByOrderId(cjOrderId);
    return NextResponse.json({
      ok: true,
      found: Boolean(bridge || logistics),
      order: bridge ?? null,
      shipment: logistics ?? null,
    });
  }

  return NextResponse.json({
    ok: true,
    stats: orderBridgeStats(),
    recent: listRecentOrders(20).map((o) => ({
      stripeSessionId: o.stripeSessionId,
      cjOrderId: o.cjOrderId,
      lastStatus: o.lastStatus,
      createdAt: o.createdAt,
    })),
  });
}
