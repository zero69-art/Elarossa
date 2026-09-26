import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { isAdminRequest } from "@/lib/admin";
import {
  getStockByPid,
  isLikelyInStock,
  stockCacheStats,
  totalStockForPid,
} from "@/lib/cj-stock-cache";

/**
 * Public: coarse in-stock for a known catalog pid only.
 * Admin (x-admin-token): warehouse rows + full catalog dump.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pid = searchParams.get("pid")?.trim();
  const admin = isAdminRequest(request);

  if (pid) {
    const known = products.some((p) => p.cjPid === pid);
    if (!known && !admin) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const total = totalStockForPid(pid);
    const inStock = isLikelyInStock(pid);
    if (!admin) {
      return NextResponse.json({
        pid,
        inStock,
        // Do not expose warehouse-level rows publicly
        available: inStock === true,
      });
    }
    return NextResponse.json({
      pid,
      total,
      inStock,
      rows: getStockByPid(pid),
      stats: stockCacheStats(),
    });
  }

  if (!admin) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const catalog = products
    .filter((p) => p.cjPid)
    .map((p) => ({
      slug: p.slug,
      pid: p.cjPid,
      total: totalStockForPid(p.cjPid!),
      inStock: isLikelyInStock(p.cjPid!),
    }));

  return NextResponse.json({ catalog, stats: stockCacheStats() });
}
