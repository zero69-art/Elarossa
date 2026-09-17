"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="flex min-h-screen items-center justify-center px-5 py-16"><div className="w-full max-w-xl border border-[#e8ded8] bg-white/55 p-8 text-center sm:p-12"><p className="text-[10px] font-semibold tracking-[.28em]">ELAROSSA</p><h1 className="serif mt-4 text-4xl sm:text-5xl">A momentary pause.</h1><p className="mx-auto mt-4 max-w-md text-sm leading-6 opacity-60">Something interrupted this page. Nothing has been lost from your bag.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><button type="button" onClick={() => reset()} className="min-h-12 bg-[#201b1b] px-7 text-[10px] font-semibold tracking-[.18em] text-white">TRY AGAIN</button><Link href="/shop" className="inline-flex min-h-12 items-center border border-[#201b1b] px-7 text-[10px] font-semibold tracking-[.18em]">SHOP THE EDIT</Link></div></div></main>;
}
