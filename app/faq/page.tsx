import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about shipping, returns, sizing, payments and the Elarossa founding collection.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    q: "Where do you ship?",
    a: "United States, Canada, United Kingdom and the European Union. Complimentary shipping on orders over $75.",
  },
  {
    q: "How long does delivery take?",
    a: "Most orders arrive in 5–12 business days after fulfilment. You will receive tracking once the order ships.",
  },
  {
    q: "What is your return policy?",
    a: "Unworn items with tags can be returned within 30 days of delivery. See the Returns page for the full process.",
  },
  {
    q: "How do I choose the right size?",
    a: "Each product page lists available sizes. If you are between sizes we generally recommend the larger option for comfort pieces. Fit notes will expand as more customer feedback arrives.",
  },
  {
    q: "Are products ready to ship now?",
    a: "We are still completing final sample and fulfilment checks on the founding edit. Checkout opens once quality gates are passed. Join the list on the homepage for launch updates and 10% off your first order.",
  },
  {
    q: "How do payments work?",
    a: "Secure checkout is handled by Stripe. We never store your card details on our servers.",
  },
  {
    q: "Do you restock or expand the range?",
    a: "Yes. The collection stays intentional. New pieces are added only after they clear the same quality and margin standards.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ef]">
      <Header />
      <section className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6 md:px-8">
        <p className="text-[10px] font-semibold tracking-[.28em]">HELP</p>
        <h1 className="serif mt-3 text-5xl leading-none sm:text-6xl">Frequently asked</h1>
        <div className="mt-12 space-y-8">
          {faqs.map((item) => (
            <div key={item.q} className="border-b border-[#e8ded8] pb-8">
              <h2 className="text-sm font-semibold tracking-wide">{item.q}</h2>
              <p className="mt-3 text-sm leading-7 opacity-75">{item.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-sm opacity-70">
          Still need help?{" "}
          <Link href="/contact" className="underline underline-offset-4">
            Contact us
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
