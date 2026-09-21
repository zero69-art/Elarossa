const CJ_API = "https://developers.cjdropshipping.com/api2.0/v1";

/** In-memory access token cache (per serverless instance / process). */
let cachedAccessToken: string | null = null;
let cachedExpiryMs = 0;

async function resolveAccessToken(): Promise<string> {
  const direct = process.env.CJ_ACCESS_TOKEN?.trim();
  if (direct) return direct;

  const apiKey = process.env.CJ_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("CJ API credentials are not configured (set CJ_API_KEY or CJ_ACCESS_TOKEN)");
  }

  // Re-use token for ~1 day inside this process to stay under rate limits
  if (cachedAccessToken && Date.now() < cachedExpiryMs) return cachedAccessToken;

  const res = await fetch(`${CJ_API}/authentication/getAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey }),
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok || json?.result === false || !json?.data?.accessToken) {
    throw new Error(json?.message || "Failed to obtain CJ access token");
  }
  cachedAccessToken = String(json.data.accessToken);
  // Refresh a day early if expiry is far away; otherwise 12h safety
  const expiry = json.data.accessTokenExpiryDate
    ? new Date(json.data.accessTokenExpiryDate).getTime() - 24 * 60 * 60 * 1000
    : Date.now() + 12 * 60 * 60 * 1000;
  cachedExpiryMs = Math.max(Date.now() + 60 * 60 * 1000, expiry);
  return cachedAccessToken!;
}

export async function cjGet(
  path: string,
  params: Record<string, string | number | undefined> = {},
) {
  const token = await resolveAccessToken();
  const url = new URL(`${CJ_API}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  });

  const response = await fetch(url, {
    headers: { "CJ-Access-Token": token },
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`CJ API request failed: ${response.status}`);
  const json = await response.json();
  if (json?.result === false) throw new Error(json?.message || "CJ API request failed");
  return json;
}

export function searchCJProducts(keyword = "", page = 1, size = 24) {
  return cjGet("/product/listV2", {
    keyWord: keyword || undefined,
    page,
    size: Math.min(Math.max(size, 1), 100),
  });
}

export function getCJProduct(pid: string) {
  return cjGet("/product/query", { pid, features: "enable_combine" });
}

export function getCJVariants(pid: string, countryCode?: string) {
  return cjGet("/product/variant/query", { pid, countryCode });
}

export type CJProductSummary = {
  pid: string;
  productNameEn: string;
  productName?: string;
  bigImage?: string;
  productImageSet?: string[];
  sellPrice?: string | number;
  suggestSellPrice?: string | number;
  categoryName?: string;
  categoryNameEn?: string;
  variants?: Array<Record<string, unknown>>;
  [key: string]: unknown;
};

/** Flatten nested listV2 responses (content[].productList[]) and older shapes. */
export function getCJProductRows(data: any): CJProductSummary[] {
  const rows: any[] = [];
  const content = data?.data?.content ?? data?.data?.list ?? data?.data?.records;

  if (Array.isArray(content)) {
    for (const block of content) {
      if (Array.isArray(block?.productList)) rows.push(...block.productList);
      else if (block && (block.pid || block.id)) rows.push(block);
    }
  } else if (Array.isArray(data?.data)) {
    rows.push(...data.data);
  } else if (data?.data && (data.data.pid || data.data.id)) {
    rows.push(data.data);
  }

  return rows
    .map((item: any) => ({
      ...item,
      pid: String(item.pid ?? item.id ?? ""),
      productNameEn: String(
        item.productNameEn ?? item.nameEn ?? item.productName ?? item.name ?? "CJ Product",
      ),
      bigImage: item.bigImage ?? item.image ?? item.productImage,
      productImageSet: Array.isArray(item.productImageSet)
        ? item.productImageSet
        : Array.isArray(item.productImage)
          ? item.productImage
          : [],
      sellPrice: item.sellPrice ?? item.nowPrice ?? item.price,
    }))
    .filter((item: CJProductSummary) => item.pid);
}

function parseNumber(value: unknown, fallback = 0) {
  const match = String(value ?? "").match(/[0-9]+(?:\.[0-9]+)?/);
  return match ? Number(match[0]) : fallback;
}

function splitVariantOptions(variants: any[]) {
  const sizes = new Set<string>();
  const colors = new Set<string>();
  for (const variant of variants) {
    const key = String(
      variant.variantKeyEn ?? variant.variantKey ?? variant.variantNameEn ?? "",
    );
    const parts = key
      .split(/\s*-\s*/)
      .map((part) => part.trim())
      .filter(Boolean);
    for (const part of parts) {
      if (/^(xxs|xs|s|m|l|xl|xxl|xxxl|2xl|3xl|4xl|5xl|one size)$/i.test(part)) sizes.add(part);
      else if (parts.length > 1) colors.add(part);
    }
  }
  return {
    sizes: Array.from(sizes),
    colors: Array.from(colors),
  };
}

export function toCJStoreProduct(item: CJProductSummary) {
  const variants = Array.isArray(item.variants) ? item.variants : [];
  const options = splitVariantOptions(variants);
  const image = item.bigImage || item.productImageSet?.[0] || "/image-fallback.svg";
  const gallery = Array.from(new Set([image, ...(item.productImageSet ?? [])])).slice(0, 8);
  const supplierCost = parseNumber(item.sellPrice, 0);
  // Target ~3x cost + shipping reserve → retail that clears 55%+ margin after $8 ship reserve
  const retail = Math.max(24.99, Math.ceil((supplierCost * 3.4 + 9) * 100) / 100);

  return {
    slug: `cj-${item.pid}`,
    name: item.productNameEn,
    category: "Women's Fashion" as const,
    price: retail,
    compareAtPrice: Math.ceil(retail * 1.25 * 100) / 100,
    tag: "CJ COLLECTION",
    description:
      "Selected from the live CJdropshipping catalogue for Elarossa. Product availability, variants and supplier pricing are checked from CJ at request time.",
    details: [
      "Live CJdropshipping catalogue product",
      "Variant availability supplied by CJ",
      "Supplier cost is not exposed to customers",
      "Elarossa retail pricing includes an operating and fulfilment reserve",
    ],
    sizes: options.sizes.length ? options.sizes : ["One Size"],
    colors: options.colors.length ? options.colors : ["Default"],
    image,
    gallery,
    supplier: "CJdropshipping" as const,
    supplierCostMax: supplierCost,
    shippingReserve: 7.95,
    qualityStatus: "sample-required" as const,
    cjPid: item.pid,
    cjVariants: variants,
  };
}
