import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your Elarossa account.",
  alternates: { canonical: "/register" },
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16 sm:px-8">
        <p className="text-center text-[10px] font-semibold tracking-[.28em]">ELAROSSA</p>
        <h1 className="serif mt-3 text-center text-4xl sm:text-5xl">Create account</h1>
        <p className="mt-3 text-center text-sm opacity-60">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Sign in
          </Link>
        </p>
        <div className="mt-10">
          <AuthForm mode="register" />
        </div>
      </section>
    </main>
  );
}
