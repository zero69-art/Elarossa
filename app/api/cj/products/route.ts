import { NextResponse } from "next/server";
import { searchCJProducts } from "@/lib/cj";

export async function GET(request: Request) {
  const keyword = new URL(request.url).searchParams.get("keyword")?.trim();
  if (!keyword) return NextResponse.json({ error: "keyword is required" }, { status: 400 });
  try {
    const data = await searchCJProducts(keyword, 1, 20);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "CJ request failed" }, { status: 502 });
  }
}
