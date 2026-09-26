/**
 * In-process logistics / tracking snapshot from CJ LOGISTIC webhooks.
 * Per serverless instance (warm starts keep data briefly).
 * Optional Upstash/Redis can mirror the same shape later.
 */

export type LogisticsTrackEvent = {
  status?: number;
  statusDesc?: string;
  activity?: string;
  location?: string;
  eventTime?: string;
  thirdActivity?: string;
  thirdLocation?: string;
  thirdEventTime?: string;
};

export type LogisticsRow = {
  orderId: string;
  logisticName?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  trackingStatus: number;
  trackingStatusLabel: string;
  events: LogisticsTrackEvent[];
  updatedAt: string;
  messageId?: string;
  messageType?: string;
};

/** CJ trackingStatus codes (docs). */
export const CJ_TRACKING_STATUS: Record<number, string> = {
  0: "No tracking info",
  1: "Warehouse outbound",
  2: "Carrier inbound",
  3: "Carrier returned",
  4: "Carrier outbound",
  5: "First-mile transit",
  6: "Arrived destination country",
  7: "Customs started",
  8: "Customs cleared",
  9: "Last-mile pickup",
  10: "Out for delivery",
  11: "Arrival for pickup",
  12: "Delivered",
  13: "Failed / exception",
  14: "Returned",
};

const byOrderId = new Map<string, LogisticsRow>();
const byTrackingNumber = new Map<string, string>(); // tracking → orderId

export function trackingStatusLabel(status: number): string {
  return CJ_TRACKING_STATUS[status] ?? `Status ${status}`;
}

function parseEvents(raw: unknown): LogisticsTrackEvent[] {
  if (!raw) return [];
  let list: unknown = raw;
  if (typeof raw === "string") {
    try {
      list = JSON.parse(raw);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(list)) return [];
  return list.map((item) => {
    const o = (item && typeof item === "object" ? item : {}) as Record<string, unknown>;
    return {
      status: typeof o.status === "number" ? o.status : Number(o.status) || undefined,
      statusDesc: o.statusDesc != null ? String(o.statusDesc) : undefined,
      activity: o.activity != null ? String(o.activity) : undefined,
      location: o.location != null ? String(o.location) : undefined,
      eventTime: o.eventTime != null ? String(o.eventTime) : undefined,
      thirdActivity: o.thirdActivity != null ? String(o.thirdActivity) : undefined,
      thirdLocation: o.thirdLocation != null ? String(o.thirdLocation) : undefined,
      thirdEventTime: o.thirdEventTime != null ? String(o.thirdEventTime) : undefined,
    };
  });
}

/** Parse CJ LOGISTIC webhook `params` into a row. */
export function parseLogisticsParams(
  params: unknown,
  messageId?: string,
  messageType?: string,
): LogisticsRow | null {
  if (!params || typeof params !== "object") return null;
  const o = params as Record<string, unknown>;
  const orderId = String(o.orderId || o.order_id || "").trim();
  if (!orderId) return null;

  const trackingStatus = Number(o.trackingStatus ?? o.status ?? 0) || 0;
  const trackingNumber =
    o.trackingNumber != null
      ? String(o.trackingNumber)
      : o.tracking_number != null
        ? String(o.tracking_number)
        : undefined;

  const row: LogisticsRow = {
    orderId,
    logisticName: o.logisticName != null ? String(o.logisticName) : undefined,
    trackingNumber,
    trackingUrl: o.trackingUrl != null ? String(o.trackingUrl) : undefined,
    trackingStatus,
    trackingStatusLabel: trackingStatusLabel(trackingStatus),
    events: parseEvents(o.logisticsTrackEvents ?? o.trackEvents),
    updatedAt: new Date().toISOString(),
    messageId,
    messageType,
  };
  return row;
}

export function upsertLogistics(row: LogisticsRow) {
  byOrderId.set(row.orderId, row);
  if (row.trackingNumber) {
    byTrackingNumber.set(row.trackingNumber, row.orderId);
  }
  // Bound memory
  if (byOrderId.size > 2000) {
    const first = byOrderId.keys().next().value;
    if (first) {
      const old = byOrderId.get(first);
      byOrderId.delete(first);
      if (old?.trackingNumber) byTrackingNumber.delete(old.trackingNumber);
    }
  }
}

export function getLogisticsByOrderId(orderId: string): LogisticsRow | undefined {
  return byOrderId.get(orderId);
}

export function getLogisticsByTracking(trackingNumber: string): LogisticsRow | undefined {
  const oid = byTrackingNumber.get(trackingNumber);
  return oid ? byOrderId.get(oid) : undefined;
}

export function listRecentLogistics(limit = 50): LogisticsRow[] {
  return [...byOrderId.values()]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit);
}

export function logisticsCacheStats() {
  return {
    orders: byOrderId.size,
    trackingNumbers: byTrackingNumber.size,
  };
}

export function isDelivered(orderId: string): boolean | null {
  const row = byOrderId.get(orderId);
  if (!row) return null;
  return row.trackingStatus === 12;
}
