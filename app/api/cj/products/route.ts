import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { searchCJProducts, getCJProductRows } from "@/lib/cj";

// CJ catalogue data contains supplier information and must not be exposed
// as a public storefront API. This route only serves requests carrying a
// valid x-admin-token header (see lib/admin.ts) so it can back an internal
// product-import tool at /admin/products without exposing supplier data
// to storefront visitors.
export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const size = Number(searchParams.get("size") ?? "24") || 24;

  try {
    const data = await searchCJProducts(keyword, page, size);
    const rows = getCJProductRows(data);
    return NextResponse.json({ products: rows });
  } catch (error) {
    const message = error instanceof Error ? error.message : "CJ catalogue request failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
