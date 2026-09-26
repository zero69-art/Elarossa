import { NextResponse } from "next/server";
import { isValidEmail, normalizeEmail } from "@/lib/auth/password";
import { setSessionCookie } from "@/lib/auth/session";
import { authenticate, publicUser } from "@/lib/auth/users";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(typeof body.email === "string" ? body.email : "");
    const password = typeof body.password === "string" ? body.password : "";

    if (!isValidEmail(email) || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await authenticate(email, password);
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    await setSessionCookie(publicUser(user));
    return NextResponse.json({ user: publicUser(user) });
  } catch {
    return NextResponse.json({ error: "Could not sign in." }, { status: 500 });
  }
}
