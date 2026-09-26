import { NextResponse } from "next/server";
import { answerAssistant } from "@/lib/assistant";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body?.message === "string" ? body.message.slice(0, 500) : "";
    if (!message.trim()) {
      return NextResponse.json({ error: "Please enter a short message." }, { status: 400 });
    }
    const reply = answerAssistant(message);
    return NextResponse.json(reply);
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
