const CJ_API = "https://developers.cjdropshipping.com/api2.0/v1";

/** Default request timeout (ms). */
const REQUEST_TIMEOUT_MS = 20_000;
/** Max attempts for transient failures (429 / 5xx / network). */
const MAX_ATTEMPTS = 3;
/** Short GET cache for product/variant reads (ms). */
const GET_CACHE_TTL_MS = 60_000;

/** In-memory access token cache (per serverless instance). */
let cachedAccessToken: string | null = null;
let cachedExpiryMs = 0;
/** Coalesce concurrent token refreshes into one network call. */
let tokenInflight: Promise<string> | null = null;

/** Short-lived GET response cache (pid/list reads). */
const getCache = new Map<string, { expires: number; value: unknown }>();

export class CjApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string | number,
    public readonly retryable = false,
  ) {
    super(message);
    this.name = "CjApiError";
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function invalidateToken() {
  cachedAccessToken = null;
  cachedExpiryMs = 0;
  tokenInflight = null;
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs = REQUEST_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal, cache: "no-store" });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new CjApiError(`CJ request timed out after ${timeoutMs}ms`, undefined, "TIMEOUT", true);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

async function resolveAccessToken(): Promise<string> {
  const direct = process.env.CJ_ACCESS_TOKEN?.trim();
  if (direct) return direct;

  const apiKey = process.env.CJ_API_KEY?.trim();
  if (!apiKey) {
    throw new CjApiError(
      "CJ API credentials are not configured (set CJ_API_KEY or CJ_ACCESS_TOKEN)",
      undefined,
      "NO_CREDENTIALS",
    );
  }

  if (cachedAccessToken && Date.now() < cachedExpiryMs) return cachedAccessToken;

  if (tokenInflight) return tokenInflight;

  tokenInflight = (async () => {
    const res = await fetchWithTimeout(`${CJ_API}/authentication/getAccessToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
    });
    const json = (await res.json().catch(() => ({}))) as {
      result?: boolean;
      message?: string;
      data?: { accessToken?: string; accessTokenExpiryDate?: string };
    };
    if (!res.ok || json?.result === false || !json?.data?.accessToken) {
      invalidateToken();
      throw new CjApiError(
        json?.message || "Failed to obtain CJ access token",
        res.status,
        "AUTH_FAILED",
        res.status === 429 || res.status >= 500,
      );
    }
    cachedAccessToken = String(json.data.accessToken);
    // Refresh 24h before CJ expiry, or at least 1h from now
    const expiry = json.data.accessTokenExpiryDate
      ? new Date(json.data.accessTokenExpiryDate).getTime() - 24 * 60 * 60 * 1000
      : Date.now() + 12 * 60 * 60 * 1000;
    cachedExpiryMs = Math.max(Date.now() + 60 * 60 * 1000, expiry);
    return cachedAccessToken!;
  })();

  try {
    return await tokenInflight;
  } finally {
    tokenInflight = null;
  }
}

async function cjRequest(
  method: "GET" | "POST",
  path: string,
  options: {
    params?: Record<string, string | number | undefined>;
    body?: Record<string, unknown>;
    useCache?: boolean;
  } = {},
): Promise<any> {
  const { params = {}, body, useCache = method === "GET" } = options;

  let url: URL;
  if (method === "GET") {
    url = new URL(`${CJ_API}${path}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
    });
  } else {
    url = new URL(`${CJ_API}${path}`);
  }

  const cacheKey = method === "GET" ? url.toString() : "";
  if (useCache && cacheKey) {
    const hit = getCache.get(cacheKey);
    if (hit && hit.expires > Date.now()) return hit.value;
  }

  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const token = await resolveAccessToken();
      const init: RequestInit = {
        method,
        headers: {
          "CJ-Access-Token": token,
          ...(method === "POST" ? { "Content-Type": "application/json" } : {}),
        },
        ...(method === "POST" ? { body: JSON.stringify(body ?? {}) } : {}),
      };

      const response = await fetchWithTimeout(url.toString(), init);

      // Expired / invalid token → clear cache and retry once with fresh auth
      if (response.status === 401 || response.status === 403) {
        invalidateToken();
        if (attempt < MAX_ATTEMPTS) {
          await sleep(200 * attempt);
          continue;
        }
        throw new CjApiError("CJ authentication failed", response.status, "UNAUTHORIZED", false);
      }

      if (response.status === 429 || response.status >= 500) {
        const retryAfter = Number(response.headers.get("retry-after"));
        const backoff =
          Number.isFinite(retryAfter) && retryAfter > 0
            ? retryAfter * 1000
            : Math.min(4000, 300 * 2 ** (attempt - 1));
        lastError = new CjApiError(
          `CJ API ${response.status}`,
          response.status,
          "TRANSIENT",
          true,
        );
        if (attempt < MAX_ATTEMPTS) {
          await sleep(backoff);
          continue;
        }
        throw lastError;
      }

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new CjApiError(
          `CJ API request failed: ${response.status}${text ? ` — ${text.slice(0, 180)}` : ""}`,
          response.status,
          "HTTP_ERROR",
          false,
        );
      }

      const json = await response.json();
      if (json?.result === false) {
        const msg = String(json?.message || "CJ API request failed");
        // Treat some auth messages as retryable after token invalidation
        if (/token|auth|login/i.test(msg)) {
          invalidateToken();
          if (attempt < MAX_ATTEMPTS) {
            await sleep(200 * attempt);
            continue;
          }
        }
        throw new CjApiError(msg, response.status, json?.code, false);
      }

      if (useCache && cacheKey) {
        getCache.set(cacheKey, { expires: Date.now() + GET_CACHE_TTL_MS, value: json });
        // Bound memory on long-lived instances
        if (getCache.size > 200) {
          const first = getCache.keys().next().value;
          if (first) getCache.delete(first);
        }
      }

      return json;
    } catch (err) {
      lastError = err;
      const retryable =
        err instanceof CjApiError
          ? err.retryable
          : err instanceof TypeError; // network failure
      if (retryable && attempt < MAX_ATTEMPTS) {
        await sleep(Math.min(4000, 300 * 2 ** (attempt - 1)));
        continue;
      }
      throw err;
    }
  }

  throw lastError instanceof Error ? lastError : new CjApiError("CJ request failed");
}

export async function cjGet(
  path: string,
  params: Record<string, string | number | undefined> = {},
  opts?: { useCache?: boolean },
) {
  return cjRequest("GET", path, { params, useCache: opts?.useCache });
}

export async function cjPost(path: string, body: Record<string, unknown> = {}) {
  // Never cache mutations
  return cjRequest("POST", path, { body, useCache: false });
}

/** Drop short GET cache (e.g. after admin catalog sync). */
export function clearCjGetCache() {
  getCache.clear();
}

export function searchCJProducts(keyword = "", page = 1, size = 24) {
  return cjGet(
    "/product/listV2",
    {
      keyWord: keyword || undefined,
      page,
      size: Math.min(Math.max(size, 1), 100),
    },
    { useCache: true },
  );
}

export function getCJProduct(pid: string) {
  return cjGet("/product/query", { pid, features: "enable_combine" }, { useCache: true });
}

export function getCJVariants(pid: string, countryCode?: string) {
  return cjGet("/product/variant/query", { pid, countryCode }, { useCache: true });
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
  listedNum?: number;
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
      listedNum:
        typeof item.listedNum === "number"
          ? item.listedNum
          : typeof item.sales === "number"
            ? item.sales
            : undefined,
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
