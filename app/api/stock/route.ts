import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import {
  getStockByPid,
  isLikelyInStock,
  stockCacheStats,
  totalStockForPid,
} from "@/lib/cj-stock-cache";

/**
 * Read stock snapshots received via CJ webhooks (in-process cache).
 * Query: ?pid=… or list all catalog pids we know about.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pid = searchParams.get("pid");

  if (pid) {
    const rows = getStockByPid(pid);
    return NextResponse.json({
      pid,
      total: totalStockForPid(pid),
      inStock: isLikelyInStock(pid),
      rows,
      stats: stockCacheStats(),
    });
  }

  const catalog = products
    .filter((p) => p.cjPid)
    .map((p) => ({
      slug: p.slug,
      pid: p.cjPid!,
      total: totalStockForPid(p.cjPid!),
      inStock: isLikelyInStock(p.cjPid!),
      rows: getStockByPid(p.cjPid!),
    }));

  return NextResponse.json({
    stats: stockCacheStats(),
    note: "null inStock means no webhook data yet for that pid on this instance",
    catalog,
  });
}
