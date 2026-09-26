import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Elarossa account.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16 sm:px-8">
        <p className="text-center text-[10px] font-semibold tracking-[.28em]">ELAROSSA</p>
        <h1 className="serif mt-3 text-center text-4xl sm:text-5xl">Sign in</h1>
        <p className="mt-3 text-center text-sm opacity-60">
          Welcome back. New here?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Create an account
          </Link>
        </p>
        <div className="mt-10">
          <AuthForm mode="login" />
        </div>
      </section>
    </main>
  );
}
