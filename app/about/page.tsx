import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Elarossa is a luxury-first women's brand focused on curated essentials for movement, confidence, travel and everyday life.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f4ef]">
      <Header />
      <section className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6 md:px-8">
        <p className="text-[10px] font-semibold tracking-[.28em]">ABOUT</p>
        <h1 className="serif mt-3 text-5xl leading-none sm:text-6xl">Fewer pieces. Better ones.</h1>
        <div className="mt-10 space-y-6 text-sm leading-7 opacity-80">
          <p>
            Elarossa exists for women who want less noise and more intention. We curate feminine essentials —
            activewear, swim, intimates and everyday pieces — that feel considered the moment you put them on.
          </p>
          <p>
            Every product goes through a quality gate: supplier cost discipline, sample review, and real fit feedback
            before it ever reaches the bag. We favour clean silhouettes, versatile colour stories and pieces that
            earn their place in a small wardrobe.
          </p>
          <p>
            We ship to the US and Europe. Complimentary shipping starts at $75. Returns are simple within 30 days.
          </p>
          <p>
            This is still the founding chapter. The collection will stay tight on purpose. If something is not good
            enough to keep, it will not stay.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/shop" className="inline-flex min-h-12 items-center bg-[#201b1b] px-6 text-[10px] font-semibold tracking-[.18em] text-white">
            SHOP THE EDIT →
          </Link>
          <Link href="/journal" className="inline-flex min-h-12 items-center border border-[#201b1b] px-6 text-[10px] font-semibold tracking-[.18em]">
            READ THE JOURNAL
          </Link>
        </div>
      </section>
    </main>
  );
}
