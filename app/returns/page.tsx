import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns",
  description: "Elarossa's return and refund policy.",
};

export default function ReturnsPage() {
  return <main className="mx-auto max-w-3xl px-6 py-16">
    <a href="/" className="text-xs tracking-[.3em]">ELAROSSA</a>
    <h1 className="serif mt-10 text-5xl">Returns</h1>
    <p className="mt-6 text-sm leading-7 opacity-70">Return eligibility depends on the product, destination and applicable consumer law. Items must be returned in the condition required by the applicable return policy, and hygiene-sensitive items may have additional restrictions where permitted by law.</p>
    <h2 className="mt-10 text-lg">Before ordering</h2>
    <p className="mt-3 text-sm leading-7 opacity-70">Please review the product description, size and colour selection before payment. The final return instructions supplied with your order take priority for that purchase.</p>
    <h2 className="mt-10 text-lg">Refunds</h2>
    <p className="mt-3 text-sm leading-7 opacity-70">Approved refunds are returned through the original payment method. Processing time can vary between Elarossa, the payment provider and the customer's bank.</p>
  </main>;
}
