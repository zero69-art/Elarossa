import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import AccountClient from "@/components/AccountClient";
import { getSessionUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Account",
  description: "Your Elarossa account.",
  alternates: { canonical: "/account" },
  robots: { index: false, follow: true },
};

export default async function AccountPage() {
  const user = await getSessionUser();

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        {user ? (
          <AccountClient user={user} />
        ) : (
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[10px] font-semibold tracking-[.28em]">ELAROSSA ACCOUNT</p>
            <h1 className="serif mt-4 text-5xl leading-none sm:text-6xl">Sign in to continue</h1>
            <p className="mx-auto mt-6 max-w-lg text-sm leading-7 opacity-65">
              Create an account to save your details for when ordering opens. You can still browse and join the founding list without signing in.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/login"
                className="inline-flex min-h-12 items-center rounded-full bg-[#201b1b] px-7 text-[10px] font-semibold tracking-[.2em] text-white"
              >
                SIGN IN →
              </Link>
              <Link
                href="/register"
                className="inline-flex min-h-12 items-center rounded-full border border-[#201b1b] px-7 text-[10px] font-semibold tracking-[.2em]"
              >
                CREATE ACCOUNT
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
