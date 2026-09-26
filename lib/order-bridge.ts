/**
 * Maps Stripe Checkout Session IDs ↔ CJ order IDs.
 * In-memory per instance; also written onto Stripe session metadata when possible.
 */

export type OrderBridgeRecord = {
  stripeSessionId: string;
  cjOrderId?: string;
  cjOrderNumber: string;
  paymentStatus: string;
  email?: string;
  createdAt: string;
  lastStatus?: string;
  rawCj?: unknown;
};

const byStripe = new Map<string, OrderBridgeRecord>();
const byCj = new Map<string, string>(); // cjOrderId → stripeSessionId

export function rememberOrderBridge(rec: OrderBridgeRecord) {
  byStripe.set(rec.stripeSessionId, rec);
  if (rec.cjOrderId) byCj.set(rec.cjOrderId, rec.stripeSessionId);
  if (byStripe.size > 3000) {
    const first = byStripe.keys().next().value;
    if (first) {
      const old = byStripe.get(first);
      byStripe.delete(first);
      if (old?.cjOrderId) byCj.delete(old.cjOrderId);
    }
  }
}

export function getOrderByStripeSession(sessionId: string): OrderBridgeRecord | undefined {
  return byStripe.get(sessionId);
}

export function getOrderByCjId(cjOrderId: string): OrderBridgeRecord | undefined {
  const sid = byCj.get(cjOrderId);
  return sid ? byStripe.get(sid) : undefined;
}

export function listRecentOrders(limit = 40): OrderBridgeRecord[] {
  return [...byStripe.values()]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export function orderBridgeStats() {
  return { sessions: byStripe.size, cjLinked: byCj.size };
}

/** Best-effort extract CJ order id from createOrderV2 response shapes. */
export function extractCjOrderId(cjResponse: unknown): string | undefined {
  if (!cjResponse || typeof cjResponse !== "object") return undefined;
  const root = cjResponse as Record<string, unknown>;
  const data = (root.data && typeof root.data === "object" ? root.data : root) as Record<
    string,
    unknown
  >;
  const candidates = [
    data.orderId,
    data.order_id,
    data.cjOrderId,
    data.orderNum,
    data.orderNumber,
    root.orderId,
  ];
  for (const c of candidates) {
    if (c != null && String(c).trim()) return String(c).trim();
  }
  // Nested list
  if (Array.isArray(data.orderList) && data.orderList[0]) {
    const first = data.orderList[0] as Record<string, unknown>;
    if (first.orderId) return String(first.orderId);
  }
  return undefined;
}
