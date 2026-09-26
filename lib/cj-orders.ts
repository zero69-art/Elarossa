import { cjGet, cjPost, clearCjGetCache } from "@/lib/cj";

/** Thin wrappers around CJ order / inventory endpoints. */

export async function queryInventoryByPid(pid: string) {
  return cjGet("/product/stock/queryByPid", { pid }, { useCache: true });
}

export async function queryVariants(pid: string, countryCode = "US") {
  return cjGet("/product/variant/query", { pid, countryCode }, { useCache: true });
}

/**
 * Batch-friendly variant fetch with limited concurrency (avoids CJ rate limits).
 */
export async function queryVariantsBatch(
  pids: string[],
  countryCode = "US",
  concurrency = 3,
) {
  const unique = [...new Set(pids.filter(Boolean))];
  const results: Array<{ pid: string; data?: unknown; error?: string }> = [];
  let i = 0;

  async function worker() {
    while (i < unique.length) {
      const idx = i++;
      const pid = unique[idx];
      try {
        const data = await queryVariants(pid, countryCode);
        results[idx] = { pid, data };
      } catch (err) {
        results[idx] = {
          pid,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, unique.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

/**
 * Create a CJ dropship order.
 * Requires paid balance / subsequent pay step in CJ — this only creates the order record.
 * Gated at the route layer: never call unless store live + approved + mapped.
 */
export async function createCjOrder(input: {
  orderNumber: string;
  products: Array<{ vid: string; quantity: number; storeProductId?: string; storeVariantId?: string }>;
  shipping: {
    fullName: string;
    countryCode: string;
    state?: string;
    city: string;
    address: string;
    address2?: string;
    zip: string;
    phone: string;
    email?: string;
  };
  logisticName?: string;
  remark?: string;
}) {
  const body = {
    orderNumber: input.orderNumber,
    shippingCountry: input.shipping.countryCode,
    consignee: input.shipping.fullName,
    phone: input.shipping.phone,
    email: input.shipping.email,
    city: input.shipping.city,
    province: input.shipping.state,
    address: input.shipping.address,
    address2: input.shipping.address2,
    zip: input.shipping.zip,
    shopLogisticsType: 2,
    logisticName: input.logisticName || "CJPacket Ordinary",
    remark: input.remark || "Elarossa order",
    products: input.products.map((p) => ({
      vid: p.vid,
      quantity: p.quantity,
    })),
  };

  const result = await cjPost("/shopping/order/createOrderV2", body);
  // Order side-effects: drop any stale inventory cache for ordered vids' pids
  clearCjGetCache();
  return result;
}

export async function getCjOrder(orderId: string) {
  return cjGet("/shopping/order/getOrderDetail", { orderId }, { useCache: false });
}
