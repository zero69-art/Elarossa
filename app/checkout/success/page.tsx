"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Status = "checking" | "verified" | "unverified";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) { setStatus("unverified"); return; }

    let cancelled = false;
    fetch(`/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.verified) {
          localStorage.removeItem("elarossa-cart");
          window.dispatchEvent(new Event("elarossa-cart-updated"));
          setStatus("verified");
        } else {
          setStatus("unverified");
        }
      })
      .catch(() => { if (!cancelled) setStatus("unverified"); });

    return () => { cancelled = true; };
  }, [searchParams]);

  if (status === "checking") {
    return (
      <div className="mt-8" role="status" aria-live="polite">
        <div className="mx-auto h-10 w-10 animate-pulse rounded-full border border-[#e8ded8] bg-white" />
        <p className="mt-5 text-sm opacity-60">Confirming your order…</p>
      </div>
    );
  }

  if (status === "unverified") {
    return <>
      <div className="mx-auto mt-7 flex h-14 w-14 items-center justify-center rounded-full border border-[#e8ded8] bg-white text-xl">!</div>
      <h1 className="serif mt-6 text-4xl sm:text-5xl">We couldn&apos;t confirm that order.</h1>
      <p className="mx-auto mt-5 max-w-md text-sm leading-7 opacity-70">This link isn&apos;t showing a completed payment. If you were charged, keep your bank or Stripe confirmation and contact customer support. Otherwise your bag is still saved.</p>
      <Link href="/cart" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#201b1b] px-8 text-xs font-semibold tracking-[.2em] text-white transition hover:-translate-y-0.5 hover:shadow-lg">RETURN TO BAG</Link>
    </>;
  }

  return <>
    <div className="mx-auto mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-[#201b1b] text-lg text-white" aria-hidden="true">✓</div>
    <p className="mt-6 text-xs font-semibold tracking-[.25em] opacity-50">ORDER CONFIRMED</p>
    <h1 className="serif mt-3 text-5xl sm:text-6xl">Thank you.</h1>
    <p className="mx-auto mt-5 max-w-md text-sm leading-7 opacity-70">Your payment has been submitted successfully. Keep your Stripe confirmation for your records. Order fulfilment and shipping updates will follow once the fulfilment workflow is connected.</p>
    <div className="mx-auto mt-8 grid max-w-md gap-3 text-left sm:grid-cols-2">
      <div className="rounded-2xl border border-[#e8ded8] bg-white/80 p-4">
        <p className="text-[10px] font-semibold tracking-[.18em] opacity-50">PAYMENT</p>
        <p className="mt-1 text-sm">Confirmed via Stripe</p>
      </div>
      <div className="rounded-2xl border border-[#e8ded8] bg-white/80 p-4">
        <p className="text-[10px] font-semibold tracking-[.18em] opacity-50">DELIVERY</p>
        <p className="mt-1 text-sm">5–12 business days</p>
      </div>
    </div>
    <Link href="/products" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#201b1b] px-8 text-xs font-semibold tracking-[.2em] text-white transition hover:-translate-y-0.5 hover:shadow-lg">CONTINUE SHOPPING</Link>
  </>;
}

export default function CheckoutSuccess() {
  return <main className="min-h-screen px-5 py-10 sm:px-6 sm:py-20">
    <div className="mx-auto max-w-xl rounded-[2rem] border border-[#e8ded8] bg-white/75 p-7 text-center shadow-[0_24px_80px_rgba(32,27,27,.07)] backdrop-blur sm:p-10">
      <Link href="/" className="inline-flex min-h-11 items-center text-xs font-semibold tracking-[.3em] opacity-60 transition hover:opacity-100" aria-label="Return to Elarossa home">ELAROSSA</Link>
      <Suspense fallback={<div className="mt-8" role="status" aria-live="polite"><p className="text-sm opacity-60">Confirming your order…</p></div>}>
        <CheckoutSuccessContent />
      </Suspense>
    </div>
  </main>;
}
