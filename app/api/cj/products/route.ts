import { NextResponse } from "next/server";
import { searchCJProducts } from "@/lib/cj";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const keyword = params.get("keyword")?.trim() ?? "";
  const page = Math.max(1, Number(params.get("page") || 1) || 1);
  const size = Math.min(100, Math.max(1, Number(params.get("size") || 24) || 24));

  try {
    const data = await searchCJProducts(keyword, page, size);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "private, max-age=30, stale-while-revalidate=120" },
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "CJ request failed" }, { status: 502 });
  }
}
