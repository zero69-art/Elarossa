import { NextResponse } from "next/server";
import { isValidEmail, normalizeEmail, validatePasswordStrength } from "@/lib/auth/password";
import { setSessionCookie } from "@/lib/auth/session";
import { createUser, publicUser } from "@/lib/auth/users";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(typeof body.email === "string" ? body.email : "");
    const password = typeof body.password === "string" ? body.password : "";
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    const strength = validatePasswordStrength(password);
    if (strength) return NextResponse.json({ error: strength }, { status: 400 });

    const user = await createUser({ email, password, name });
    await setSessionCookie(publicUser(user));
    return NextResponse.json({ user: publicUser(user) });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Could not create account.";
    const status = msg.includes("already exists") ? 409 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
