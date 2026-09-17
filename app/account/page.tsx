import Link from "next/link";
import Header from "@/components/Header";

export const metadata = {
  title: "Account | Elarossa",
  description: "Elarossa customer account access will be introduced when persistent account features are ready.",
  alternates: { canonical: "/account" },
  robots: { index: false, follow: true },
};

export default function AccountPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-5 py-20 text-center sm:px-8">
        <div className="mx-auto max-w-xl">
          <p className="text-[10px] font-semibold tracking-[.28em]">ELAROSSA ACCOUNT</p>
          <h1 className="serif mt-4 text-5xl leading-none sm:text-7xl">Your account, when it&apos;s ready.</h1>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 opacity-65">
            We&apos;re keeping account access off until saved details, order history and customer data can be handled properly. You can shop without an account in the meantime.
          </p>
          <Link href="/shop" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#201b1b] px-7 py-4 text-[10px] font-semibold tracking-[.2em] text-white transition hover:-translate-y-0.5 hover:shadow-lg">
            SHOP THE EDIT →
          </Link>
        </div>
      </section>
    </main>
  );
}
