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
    return <p className="text-sm opacity-60">Confirming your order…</p>;
  }

  if (status === "unverified") {
    return <>
      <h1 className="serif mt-5 text-4xl">We couldn&apos;t confirm that order.</h1>
      <p className="mx-auto mt-5 max-w-md text-sm leading-7 opacity-70">This link isn&apos;t showing a completed payment. If you were charged, keep your bank or Stripe confirmation and contact customer support. Otherwise your bag is still saved.</p>
      <Link href="/cart" className="mt-8 inline-block bg-[#201b1b] px-8 py-4 text-xs tracking-[.2em] text-white">RETURN TO BAG</Link>
    </>;
  }

  return <>
    <h1 className="serif mt-5 text-5xl">Thank you.</h1>
    <p className="mx-auto mt-5 max-w-md text-sm leading-7 opacity-70">Your payment has been submitted successfully. Keep your Stripe confirmation for your records. Order fulfilment and shipping updates will follow once the fulfilment workflow is connected.</p>
    <Link href="/products" className="mt-8 inline-block bg-[#201b1b] px-8 py-4 text-xs tracking-[.2em] text-white">CONTINUE SHOPPING</Link>
  </>;
}

export default function CheckoutSuccess() {
  return <main className="min-h-screen px-6 py-20">
    <div className="mx-auto max-w-xl rounded-3xl border border-[#e8ded8] bg-white/70 p-10 text-center">
      <p className="text-xs tracking-[.3em] opacity-60">ELAROSSA</p>
      <Suspense fallback={<p className="mt-5 text-sm opacity-60">Confirming your order…</p>}>
        <CheckoutSuccessContent />
      </Suspense>
    </div>
  </main>;
}
