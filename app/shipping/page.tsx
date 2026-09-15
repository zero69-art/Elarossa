import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping",
  description: "Shipping rates, destinations and delivery timing for Elarossa orders.",
};

export default function ShippingPage() {
  return <main className="mx-auto max-w-3xl px-6 py-16">
    <a href="/" className="text-xs tracking-[.3em]">ELAROSSA</a>
    <h1 className="serif mt-10 text-5xl">Shipping</h1>
    <p className="mt-6 text-sm leading-7 opacity-70">Standard shipping is $7.95 on orders below $75 and free on orders of $75 or more. Current checkout delivery estimates are 5–12 business days.</p>
    <h2 className="mt-10 text-lg">Destinations</h2>
    <p className="mt-3 text-sm leading-7 opacity-70">Checkout currently accepts shipping addresses in the United States, Canada, United Kingdom, Germany, France, Italy, Spain, Netherlands, Belgium, Austria, Ireland, Sweden, Denmark, Finland, Portugal and Poland.</p>
    <h2 className="mt-10 text-lg">Delivery</h2>
    <p className="mt-3 text-sm leading-7 opacity-70">Delivery timing can vary by destination, carrier, customs processing and product availability. Any estimate shown at checkout is an estimate rather than a guaranteed delivery date.</p>
    <h2 className="mt-10 text-lg">Tracking</h2>
    <p className="mt-3 text-sm leading-7 opacity-70">Tracking information will be provided when a shipment has been dispatched and tracking is available.</p>
  </main>;
}
