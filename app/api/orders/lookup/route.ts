import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import {
  getOrderByStripeSession,
  getOrderByCjId,
  listRecentOrders,
  orderBridgeStats,
} from "@/lib/order-bridge";
import { getLogisticsByOrderId } from "@/lib/cj-logistics-cache";

export const dynamic = "force-dynamic";

/**
 * Lookup Stripe↔CJ bridge.
 * - ?session= / ?cjOrderId= : limited public fields (no email dump in list mode)
 * - bare GET (recent list): admin only
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const session = searchParams.get("session")?.trim();
  const cjOrderId = searchParams.get("cjOrderId")?.trim();
  const admin = isAdminRequest(request);

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
            lastStatus: bridge.lastStatus,
            createdAt: bridge.createdAt,
            ...(admin ? { email: bridge.email, paymentStatus: bridge.paymentStatus } : {}),
          }
        : null,
      shipment: logistics
        ? {
            trackingStatus: logistics.trackingStatus,
            trackingStatusLabel: logistics.trackingStatusLabel,
            trackingNumber: logistics.trackingNumber,
            logisticName: logistics.logisticName,
          }
        : null,
    });
  }

  if (cjOrderId) {
    const bridge = getOrderByCjId(cjOrderId);
    const logistics = getLogisticsByOrderId(cjOrderId);
    return NextResponse.json({
      ok: true,
      found: Boolean(bridge || logistics),
      order: bridge
        ? {
            stripeSessionId: bridge.stripeSessionId,
            cjOrderId: bridge.cjOrderId,
            lastStatus: bridge.lastStatus,
            createdAt: bridge.createdAt,
            ...(admin ? { email: bridge.email } : {}),
          }
        : null,
      shipment: logistics
        ? {
            trackingStatus: logistics.trackingStatus,
            trackingStatusLabel: logistics.trackingStatusLabel,
            trackingNumber: logistics.trackingNumber,
          }
        : null,
    });
  }

  if (!admin) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    stats: orderBridgeStats(),
    recent: listRecentOrders(20),
  });
}
