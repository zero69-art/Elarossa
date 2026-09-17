import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Elarossa collects, uses and protects your personal information." };

const sections = [
  ["Information collected", "Depending on the transaction, this may include name, email address, phone number, billing and shipping address, order details and communications with customer support."],
  ["Payment processing", "Card payment details are entered into the payment provider's checkout and are not stored directly by Elarossa. The payment provider may process payment, billing and fraud-prevention information under its own privacy terms."],
  ["Service providers", "Information may be shared with service providers where necessary to provide hosting, payment, fulfilment, shipping, fraud prevention, customer support or other store services. Elarossa does not sell customer personal information."],
  ["Your choices", "You may request access to or correction of personal information where applicable law provides that right. Requests should be directed to the customer-service contact supplied with your order."],
];

export default function PrivacyPage() {
  return <main className="min-h-screen px-5 py-8 sm:px-6 sm:py-12">
    <div className="mx-auto max-w-4xl">
      <header className="flex items-center justify-between gap-4 border-b border-[#e8ded8] pb-6"><Link href="/" className="serif text-xl tracking-[.12em] transition-opacity hover:opacity-60 sm:text-2xl">ELAROSSA</Link><Link href="/products" className="inline-flex min-h-11 items-center text-[10px] font-semibold tracking-[.18em] underline sm:text-xs">SHOP</Link></header>
      <section className="py-12 sm:py-16"><p className="text-[10px] font-semibold tracking-[.3em] opacity-55">YOUR INFORMATION</p><h1 className="serif mt-3 text-5xl sm:text-6xl">Privacy Policy</h1><p className="mt-6 max-w-2xl text-sm leading-7 opacity-70">Elarossa uses customer information only as needed to operate the store, process payments, fulfil orders, provide support, prevent fraud, maintain records and meet legal obligations.</p></section>
      <div className="space-y-4">{sections.map(([title, text], index) => <article key={title} className="rounded-3xl border border-[#e8ded8] bg-white/55 p-6 sm:p-8"><div className="flex gap-5"><span className="text-[10px] font-semibold tracking-[.15em] opacity-40">0{index + 1}</span><div><h2 className="text-lg font-medium">{title}</h2><p className="mt-3 text-sm leading-7 opacity-65">{text}</p></div></div></article>)}</div>
      <footer className="mt-10 rounded-3xl bg-[#201b1b] p-6 text-sm leading-7 text-white/70 sm:p-8">Payment, hosting, fulfilment and other service providers may have their own terms and privacy policies. Applicable privacy rights remain subject to the law governing your transaction.</footer>
      <footer className="mt-8 border-t border-[#e8ded8] pt-6"><Link href="/" className="text-[10px] tracking-[.18em] underline">BACK TO ELAROSSA</Link></footer>
    </div>
  </main>;
}
