import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Elarossa collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  return <main className="mx-auto max-w-3xl px-6 py-16">
    <a href="/" className="text-xs tracking-[.3em]">ELAROSSA</a>
    <h1 className="serif mt-10 text-5xl">Privacy Policy</h1>
    <p className="mt-6 text-sm leading-7 opacity-70">Elarossa uses customer information only as needed to operate the store, process payments, fulfil orders, provide support, prevent fraud, maintain records and meet legal obligations.</p>
    <h2 className="mt-10 text-lg">Information collected</h2>
    <p className="mt-3 text-sm leading-7 opacity-70">Depending on the transaction, this may include name, email address, phone number, billing and shipping address, order details and communications with customer support.</p>
    <h2 className="mt-10 text-lg">Payment processing</h2>
    <p className="mt-3 text-sm leading-7 opacity-70">Card payment details are entered into the payment provider's checkout and are not stored directly by Elarossa. The payment provider may process payment, billing and fraud-prevention information under its own privacy terms.</p>
    <h2 className="mt-10 text-lg">Service providers</h2>
    <p className="mt-3 text-sm leading-7 opacity-70">Information may be shared with service providers where necessary to provide hosting, payment, fulfilment, shipping, fraud prevention, customer support or other store services. Elarossa does not sell customer personal information.</p>
    <h2 className="mt-10 text-lg">Your choices</h2>
    <p className="mt-3 text-sm leading-7 opacity-70">You may request access to or correction of personal information where applicable law provides that right. Requests should be directed to the customer-service contact supplied with your order.</p>
  </main>;
}
