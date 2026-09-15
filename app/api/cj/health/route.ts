import { NextResponse } from "next/server";

// Internal supplier health must not be exposed publicly.
export async function GET() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
