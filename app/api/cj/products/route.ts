import { NextResponse } from "next/server";

// CJ catalogue data contains supplier information and must not be exposed as a public storefront API.
// Product discovery should be moved behind an authenticated admin/command-centre route before re-enabling it.
export async function GET() {
  return NextResponse.json({ error: "CJ catalogue access is restricted." }, { status: 404 });
}
