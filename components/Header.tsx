"use client";

import Link from "next/link";
import { useState } from "react";
import CartBadge from "@/components/CartBadge";

const links = [
  ["ACTIVE", "/products?q=activewear"],
  ["SWIM", "/products?q=swimwear"],
  ["INTIMATES", "/products?q=intimates"],
  ["JOURNAL", "/journal"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <>
      <div className="bg-[#201b1b] px-4 py-2 text-center text-[9px] font-semibold tracking-[.18em] text-white sm:text-[10px] sm:tracking-[.24em]">
        COMPLIMENTARY SHIPPING ON ORDERS OVER $75 · US &amp; EUROPE
      </div>
      <header className="sticky top-0 z-40 border-b border-[#e8ded8]/80 bg-[#f7f2ee]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:px-8">
          <button type="button" onClick={() => setOpen(true)} className="inline-flex min-h-11 min-w-11 items-center justify-start md:hidden" aria-label="Open menu">
            <span className="space-y-1.5"><span className="block h-px w-5 bg-[#201b1b]" /><span className="block h-px w-3 bg-[#201b1b]" /></span>
          </button>
          <Link href="/" className="serif text-xl tracking-[.14em] sm:text-2xl" aria-label="Elarossa home">ELAROSSA</Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            <div className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
              <button type="button" onClick={() => setShopOpen(!shopOpen)} className="inline-flex min-h-11 items-center text-[10px] font-semibold tracking-[.2em]">SHOP</button>
              {shopOpen && <div className="absolute left-1/2 top-12 w-64 -translate-x-1/2 border border-[#e0d4ce] bg-[#fbf8f5] p-3 shadow-xl">
                {[['NEW ARRIVALS','/products'],['ACTIVE','/products?q=activewear'],['SWIM','/products?q=swimwear'],['INTIMATES','/products?q=intimates'],['ALL PRODUCTS','/products']].map(([label, href]) => <Link key={label} href={href} className="block px-4 py-3 text-[10px] tracking-[.18em] transition hover:bg-[#eee5df]">{label}</Link>)}
              </div>}
            </div>
            {links.map(([label, href]) => <Link key={label} href={href} className="inline-flex min-h-11 items-center text-[10px] font-semibold tracking-[.2em] transition-opacity hover:opacity-55">{label}</Link>)}
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/products" className="hidden min-h-11 items-center px-2 text-[10px] font-semibold tracking-[.16em] md:inline-flex">SEARCH</Link>
            <Link href="/cart" className="inline-flex min-h-11 items-center gap-1 px-2 text-[10px] font-semibold tracking-[.16em]" aria-label="Bag"><span className="hidden sm:inline">BAG</span><CartBadge /></Link>
          </div>
        </div>
      </header>
      {open && <div className="fixed inset-0 z-50 bg-[#201b1b]/35 md:hidden" onClick={() => setOpen(false)}>
        <aside className="h-full w-[min(88vw,380px)] bg-[#f7f2ee] p-6 shadow-2xl" onClick={(event) => event.stopPropagation()} aria-label="Mobile navigation">
          <div className="flex items-center justify-between border-b border-[#e2d7d1] pb-5"><span className="serif text-xl tracking-widest">ELAROSSA</span><button type="button" onClick={() => setOpen(false)} className="min-h-11 min-w-11 text-xl" aria-label="Close menu">×</button></div>
          <nav className="py-6" aria-label="Mobile navigation links">
            {[['SHOP','/products'], ...links].map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)} className="flex min-h-14 items-center border-b border-[#e8ded8] text-xs font-semibold tracking-[.2em]">{label}</Link>)}
            <Link href="/products" onClick={() => setOpen(false)} className="flex min-h-14 items-center border-b border-[#e8ded8] text-xs font-semibold tracking-[.2em]">SEARCH</Link>
            <Link href="/cart" onClick={() => setOpen(false)} className="flex min-h-14 items-center text-xs font-semibold tracking-[.2em]">BAG <CartBadge /></Link>
          </nav>
          <p className="max-w-xs text-xs leading-6 opacity-55">Curated feminine essentials for movement, confidence, travel and everyday life.</p>
        </aside>
      </div>}
    </>
  );
}
