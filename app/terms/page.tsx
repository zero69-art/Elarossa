import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that apply to purchases made through Elarossa.",
};

export default function TermsPage() {
  return <main className="mx-auto max-w-3xl px-6 py-16">
    <a href="/" className="text-xs tracking-[.3em]">ELAROSSA</a>
    <h1 className="serif mt-10 text-5xl">Terms & Conditions</h1>
    <p className="mt-6 text-sm leading-7 opacity-70">These terms apply to purchases made through Elarossa. Product availability, pricing, promotions and delivery estimates may change before an order is accepted and paid.</p>
    <h2 className="mt-10 text-lg">Products and pricing</h2>
    <p className="mt-3 text-sm leading-7 opacity-70">Product descriptions, images, sizes and colours are provided for customer selection. Prices are displayed in US dollars at checkout. Elarossa may correct obvious pricing or catalogue errors before accepting an order.</p>
    <h2 className="mt-10 text-lg">Orders and payment</h2>
    <p className="mt-3 text-sm leading-7 opacity-70">Payment is processed through the configured payment provider. An order is subject to successful payment and any applicable availability checks.</p>
    <h2 className="mt-10 text-lg">Quality and supplier products</h2>
    <p className="mt-3 text-sm leading-7 opacity-70">Supplier catalogue information is not, by itself, a quality certification. Elarossa's product catalogue is being developed with a sample-review process covering fit, materials, finish, packaging and delivery performance.</p>
    <h2 className="mt-10 text-lg">Consumer rights</h2>
    <p className="mt-3 text-sm leading-7 opacity-70">Nothing in these terms is intended to remove or limit mandatory consumer rights that apply in the customer's country.</p>
  </main>;
}
