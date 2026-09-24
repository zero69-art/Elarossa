import { cjPost, cjGet } from "@/lib/cj";

/** Register callback URLs for CJ message topics (stock + product at minimum). */
export async function setCjWebhookEndpoints(callbackUrl: string, topics?: {
  stock?: boolean;
  product?: boolean;
  order?: boolean;
  logistics?: boolean;
}) {
  const enable = (on: boolean | undefined, defaultOn: boolean) =>
    on ?? defaultOn
      ? { type: "ENABLE" as const, callbackUrls: [callbackUrl] }
      : { type: "CANCEL" as const, callbackUrls: [callbackUrl] };

  const body = {
    product: enable(topics?.product, true),
    stock: enable(topics?.stock, true),
    order: enable(topics?.order, false),
    logistics: enable(topics?.logistics, false),
  };

  return cjPost("/webhook/set", body);
}

/** Subscribe specific CJ product IDs for product/variant/stock pushes (max 100 per call). */
export async function subscribeCjProducts(productIds: string[]) {
  const unique = [...new Set(productIds.filter(Boolean))];
  const chunks: string[][] = [];
  for (let i = 0; i < unique.length; i += 100) chunks.push(unique.slice(i, i + 100));

  const results = [];
  for (const productIds of chunks) {
    results.push(
      await cjPost("/webhook/product/subscribe", {
        productIds,
        subscribeAll: false,
      })
    );
  }
  return results;
}

export async function unsubscribeCjProducts(productIds: string[]) {
  return cjPost("/webhook/product/unsubscribe", { productIds });
}

export async function listCjSubscribedProducts(pageNum = 1, pageSize = 50) {
  return cjGet("/webhook/product/subscribe/list", { pageNum, pageSize });
}
