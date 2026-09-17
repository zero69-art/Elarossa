import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Terms & Conditions", description: "The terms that apply to purchases made through Elarossa." };

const sections = [
  ["Products and pricing", "Product descriptions, images, sizes and colours are provided for customer selection. Prices are displayed in US dollars at checkout. Elarossa may correct obvious pricing or catalogue errors before accepting an order."],
  ["Orders and payment", "Payment is processed through the configured payment provider. An order is subject to successful payment and any applicable availability checks."],
  ["Quality and supplier products", "Supplier catalogue information is not, by itself, a quality certification. Elarossa's product catalogue is being developed with a sample-review process covering fit, materials, finish, packaging and delivery performance."],
  ["Consumer rights", "Nothing in these terms is intended to remove or limit mandatory consumer rights that apply in the customer's country."],
];

export default function TermsPage() {
  return <main className="min-h-screen px-5 py-8 sm:px-6 sm:py-12">
    <div className="mx-auto max-w-4xl">
      <header className="flex items-center justify-between gap-4 border-b border-[#e8ded8] pb-6"><Link href="/" className="serif text-xl tracking-[.12em] transition-opacity hover:opacity-60 sm:text-2xl">ELAROSSA</Link><Link href="/products" className="inline-flex min-h-11 items-center text-[10px] font-semibold tracking-[.18em] underline sm:text-xs">SHOP</Link></header>
      <section className="py-12 sm:py-16"><p className="text-[10px] font-semibold tracking-[.3em] opacity-55">STORE TERMS</p><h1 className="serif mt-3 text-5xl sm:text-6xl">Terms & Conditions</h1><p className="mt-6 max-w-2xl text-sm leading-7 opacity-70">These terms apply to purchases made through Elarossa. Product availability, pricing, promotions and delivery estimates may change before an order is accepted and paid.</p></section>
      <div className="space-y-4">{sections.map(([title, text], index) => <article key={title} className="rounded-3xl border border-[#e8ded8] bg-white/55 p-6 sm:p-8"><div className="flex gap-5"><span className="text-[10px] font-semibold tracking-[.15em] opacity-40">0{index + 1}</span><div><h2 className="text-lg font-medium">{title}</h2><p className="mt-3 text-sm leading-7 opacity-65">{text}</p></div></div></article>)}</div>
      <div className="mt-8 rounded-3xl bg-[#201b1b] p-6 text-sm leading-7 text-white/70 sm:p-8">Nothing in these terms is intended to remove or limit mandatory consumer rights that apply in the customer's country.</div>
      <footer className="mt-8 border-t border-[#e8ded8] pt-6"><Link href="/" className="text-[10px] tracking-[.18em] underline">BACK TO ELAROSSA</Link></footer>
    </div>
  </main>;
}
