import { getProduct, type Product } from "@/lib/products";
import { resolveCjVariant, type CjVariantRef } from "@/lib/variant-map";

export type LineItemInput = {
  slug: string;
  size: string;
  color: string;
  quantity: number;
};

export type ResolvedLine = {
  product: Product;
  size: string;
  color: string;
  quantity: number;
  cj: CjVariantRef;
};

export type FulfillmentBlockReason =
  | "store_not_live"
  | "product_not_found"
  | "not_approved"
  | "variant_unmapped"
  | "invalid_quantity";

export function isStoreLive(): boolean {
  return process.env.ELAROSSA_STORE_LIVE === "true";
}

export function resolveLineItems(items: LineItemInput[]): {
  ok: true;
  lines: ResolvedLine[];
} | {
  ok: false;
  reason: FulfillmentBlockReason;
  detail: string;
} {
  if (!isStoreLive()) {
    return { ok: false, reason: "store_not_live", detail: "ELAROSSA_STORE_LIVE is not true." };
  }

  const lines: ResolvedLine[] = [];

  for (const item of items) {
    const qty = Math.floor(Number(item.quantity));
    if (!Number.isFinite(qty) || qty < 1 || qty > 10) {
      return { ok: false, reason: "invalid_quantity", detail: `Bad quantity for ${item.slug}` };
    }

    const product = getProduct(item.slug);
    if (!product) {
      return { ok: false, reason: "product_not_found", detail: item.slug };
    }
    if (product.qualityStatus !== "approved") {
      return {
        ok: false,
        reason: "not_approved",
        detail: `${item.slug} is ${product.qualityStatus}`,
      };
    }
    if (!product.cjPid) {
      return { ok: false, reason: "variant_unmapped", detail: `${item.slug} has no cjPid` };
    }

    const cj = resolveCjVariant(item.slug, item.size, item.color);
    if (!cj?.vid) {
      return {
        ok: false,
        reason: "variant_unmapped",
        detail: `${item.slug} / ${item.size} / ${item.color}`,
      };
    }

    lines.push({
      product,
      size: item.size,
      color: item.color,
      quantity: qty,
      cj,
    });
  }

  return { ok: true, lines };
}

/** Payload shape aligned with CJ Create Order V2 product list */
export function toCjOrderProducts(lines: ResolvedLine[]) {
  return lines.map((line) => ({
    vid: line.cj.vid,
    quantity: line.quantity,
    storeProductId: line.product.slug,
    storeVariantId: `${line.product.slug}:${line.size}:${line.color}`,
  }));
}
