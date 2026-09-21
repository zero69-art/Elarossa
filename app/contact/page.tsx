import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Elarossa team for order support, product questions or press.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ef]">
      <Header />
      <section className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6 md:px-8">
        <p className="text-[10px] font-semibold tracking-[.28em]">CONTACT</p>
        <h1 className="serif mt-3 text-5xl leading-none sm:text-6xl">We are here.</h1>
        <p className="mt-6 max-w-xl text-sm leading-7 opacity-75">
          For order questions, sizing help or anything else, email us. We aim to reply within one business day.
        </p>
        <div className="mt-10 space-y-6 text-sm">
          <div>
            <p className="text-[10px] font-semibold tracking-[.18em] opacity-50">EMAIL</p>
            <a href="mailto:hello@elarossa.com" className="mt-2 inline-block text-base underline underline-offset-4">
              hello@elarossa.com
            </a>
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-[.18em] opacity-50">ORDERS & RETURNS</p>
            <p className="mt-2 opacity-80">Include your order number if you already have one. We will guide you through next steps.</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-[.18em] opacity-50">PRESS & PARTNERSHIPS</p>
            <p className="mt-2 opacity-80">Reach out at the same address with a short note about the opportunity.</p>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap gap-4">
          <Link href="/shipping" className="text-[10px] font-semibold tracking-[.16em] underline underline-offset-4">
            SHIPPING
          </Link>
          <Link href="/returns" className="text-[10px] font-semibold tracking-[.16em] underline underline-offset-4">
            RETURNS
          </Link>
          <Link href="/faq" className="text-[10px] font-semibold tracking-[.16em] underline underline-offset-4">
            FAQ
          </Link>
        </div>
      </section>
    </main>
  );
}
