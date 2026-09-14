"use client";
import Link from "next/link";
import { useEffect } from "react";
export default function CheckoutSuccess() {
  useEffect(() => { localStorage.removeItem("elarossa-cart"); }, []);
  return <main className="min-h-screen px-6 py-20"><div className="mx-auto max-w-xl rounded-3xl border border-[#e8ded8] bg-white/70 p-10 text-center"><p className="text-xs tracking-[.3em] opacity-60">ELAROSSA</p><h1 className="serif mt-5 text-5xl">Thank you.</h1><p className="mx-auto mt-5 max-w-md text-sm leading-7 opacity-70">Your checkout was completed. Your order details are being prepared for fulfillment.</p><Link href="/products" className="mt-8 inline-block bg-[#201b1b] px-8 py-4 text-xs tracking-[.2em] text-white">CONTINUE SHOPPING</Link></div></main>;
}
