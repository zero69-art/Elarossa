import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping",
  description: "Shipping rates, destinations and delivery timing for Elarossa orders.",
};

const destinations = ["United States", "Canada", "United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands", "Belgium", "Austria", "Ireland", "Sweden", "Denmark", "Finland", "Portugal", "Poland"];

export default function ShippingPage() {
  return <main className="min-h-screen px-5 py-8 sm:px-6 sm:py-12">
    <div className="mx-auto max-w-4xl">
      <header className="flex items-center justify-between gap-4 border-b border-[#e8ded8] pb-6"><Link href="/" className="serif text-xl tracking-[.12em] transition-opacity hover:opacity-60 sm:text-2xl">ELAROSSA</Link><Link href="/products" className="inline-flex min-h-11 items-center text-[10px] font-semibold tracking-[.18em] underline sm:text-xs">SHOP</Link></header>
      <section className="py-12 sm:py-16"><p className="text-[10px] font-semibold tracking-[.3em] opacity-55">DELIVERY INFORMATION</p><h1 className="serif mt-3 text-5xl sm:text-6xl">Shipping</h1><p className="mt-6 max-w-2xl text-sm leading-7 opacity-70">Standard shipping is $7.95 on orders below $75 and free on orders of $75 or more. Current checkout delivery estimates are 5–12 business days.</p></section>
      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-3xl border border-[#e8ded8] bg-white/55 p-6 sm:p-8"><p className="text-[10px] font-semibold tracking-[.2em] opacity-50">SHIPPING RATE</p><p className="serif mt-3 text-3xl">Free over $75</p><p className="mt-3 text-sm leading-6 opacity-65">Orders below the free-shipping threshold have a $7.95 standard shipping charge.</p></article>
        <article className="rounded-3xl border border-[#e8ded8] bg-white/55 p-6 sm:p-8"><p className="text-[10px] font-semibold tracking-[.2em] opacity-50">ESTIMATED DELIVERY</p><p className="serif mt-3 text-3xl">5–12 business days</p><p className="mt-3 text-sm leading-6 opacity-65">Timing varies with destination, carrier, customs processing and product availability.</p></article>
      </div>
      <section className="mt-10 rounded-3xl bg-[#201b1b] p-6 text-white sm:p-8"><h2 className="serif text-3xl">Destinations</h2><p className="mt-3 text-sm leading-6 opacity-70">Checkout currently accepts shipping addresses in:</p><div className="mt-6 flex flex-wrap gap-2">{destinations.map((country) => <span key={country} className="rounded-full border border-white/15 px-3 py-2 text-[10px] tracking-wide text-white/80">{country}</span>)}</div></section>
      <section className="mt-10 grid gap-4 sm:grid-cols-2"><article className="rounded-3xl border border-[#e8ded8] p-6"><h2 className="text-lg font-medium">Delivery</h2><p className="mt-3 text-sm leading-7 opacity-65">Any estimate shown at checkout is an estimate rather than a guaranteed delivery date. Customs and carrier handling can affect timing.</p></article><article className="rounded-3xl border border-[#e8ded8] p-6"><h2 className="text-lg font-medium">Tracking</h2><p className="mt-3 text-sm leading-7 opacity-65">Tracking information will be provided when a shipment has been dispatched and tracking is available.</p></article></section>
      <footer className="mt-12 border-t border-[#e8ded8] pt-6"><Link href="/" className="text-[10px] tracking-[.18em] underline">BACK TO ELAROSSA</Link></footer>
    </div>
  </main>;
}
