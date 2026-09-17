import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Returns", description: "Elarossa's return and refund policy." };

export default function ReturnsPage() {
  return <main className="min-h-screen px-5 py-8 sm:px-6 sm:py-12">
    <div className="mx-auto max-w-4xl">
      <header className="flex items-center justify-between gap-4 border-b border-[#e8ded8] pb-6"><Link href="/" className="serif text-xl tracking-[.12em] transition-opacity hover:opacity-60 sm:text-2xl">ELAROSSA</Link><Link href="/products" className="inline-flex min-h-11 items-center text-[10px] font-semibold tracking-[.18em] underline sm:text-xs">SHOP</Link></header>
      <section className="py-12 sm:py-16"><p className="text-[10px] font-semibold tracking-[.3em] opacity-55">ORDER CARE</p><h1 className="serif mt-3 text-5xl sm:text-6xl">Returns</h1><p className="mt-6 max-w-2xl text-sm leading-7 opacity-70">Return eligibility depends on the product, destination and applicable consumer law. Items must be returned in the condition required by the applicable return policy, and hygiene-sensitive items may have additional restrictions where permitted by law.</p></section>
      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-3xl border border-[#e8ded8] bg-white/55 p-6 sm:p-8"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#201b1b] text-white">01</div><h2 className="mt-5 text-lg font-medium">Before ordering</h2><p className="mt-3 text-sm leading-7 opacity-65">Review the product description, size and colour selection before payment. The final return instructions supplied with your order take priority for that purchase.</p></article>
        <article className="rounded-3xl border border-[#e8ded8] bg-white/55 p-6 sm:p-8"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#201b1b] text-white">02</div><h2 className="mt-5 text-lg font-medium">Refunds</h2><p className="mt-3 text-sm leading-7 opacity-65">Approved refunds are returned through the original payment method. Processing time can vary between Elarossa, the payment provider and the customer's bank.</p></article>
      </div>
      <div className="mt-8 rounded-3xl bg-[#201b1b] p-6 text-white sm:p-8"><p className="text-[10px] font-semibold tracking-[.2em] opacity-50">IMPORTANT</p><p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">Keep your order confirmation and follow the return instructions provided for your purchase. Applicable consumer rights are not limited by this page.</p></div>
      <footer className="mt-12 border-t border-[#e8ded8] pt-6"><Link href="/" className="text-[10px] tracking-[.18em] underline">BACK TO ELAROSSA</Link></footer>
    </div>
  </main>;
}
