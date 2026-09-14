const CJ_API = "https://developers.cjdropshipping.com/api2.0/v1";

export async function cjGet(path: string, params: Record<string, string | number | undefined> = {}) {
  const token = process.env.CJ_ACCESS_TOKEN;
  if (!token) throw new Error("CJ API credentials are not configured");
  const url = new URL(`${CJ_API}${path}`);
  Object.entries(params).forEach(([key, value]) => { if (value !== undefined) url.searchParams.set(key, String(value)); });
  const response = await fetch(url, { headers: { "CJ-Access-Token": token }, cache: "no-store" });
  if (!response.ok) throw new Error(`CJ API request failed: ${response.status}`);
  return response.json();
}

export function searchCJProducts(keyword: string, page = 1, size = 20) {
  return cjGet("/product/listV2", { keyWord: keyword, page, size });
}
