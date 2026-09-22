import { cjGet, cjPost } from "@/lib/cj";

/** Thin wrappers around CJ order / inventory endpoints. */

export async function queryInventoryByPid(pid: string) {
  return cjGet("/product/stock/queryByPid", { pid });
}

export async function queryVariants(pid: string, countryCode = "US") {
  return cjGet("/product/variant/query", { pid, countryCode });
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

  return cjPost("/shopping/order/createOrderV2", body);
}

export async function getCjOrder(orderId: string) {
  return cjGet("/shopping/order/getOrderDetail", { orderId });
}
