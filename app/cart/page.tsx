"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "elarossa-cart";
type CartItem = { slug: string; name: string; price: number; quantity: number; image: string; size?: string; color?: string };

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setItems(JSON.parse(raw)); } catch { localStorage.removeItem(STORAGE_KEY); }
    }
  }, []);

  const update = (next: CartItem[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("elarossa-cart-updated"));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 7.95;

  async function checkout() {
    if (!items.length) return;
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: items.map(({ slug, quantity, size, color }) => ({ slug, quantity, size, color })) }) });
      const data = await response.json();
      if (!response.ok || !data.url) throw new Error(data.error || "Checkout could not be started.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout could not be started.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-7 md:px-8">
        <Link href="/" className="serif text-xl tracking-[.12em] sm:text-3xl">ELAROSSA</Link>
        <Link href="/products" className="text-[10px] tracking-[.18em] underline transition-opacity hover:opacity-55 sm:text-xs">CONTINUE SHOPPING</Link>
      </nav>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:px-8">
        <p className="text-[10px] tracking-[.28em] sm:text-xs">YOUR BAG</p>
        <div className="mt-2 flex items-end justify-between gap-4 sm:mt-3"><h1 className="serif text-4xl sm:text-5xl">Cart</h1>{items.length > 0 && <button type="button" onClick={() => update([])} className="text-[10px] tracking-[.16em] underline opacity-60 transition-opacity hover:opacity-100 sm:text-xs">CLEAR BAG</button>}</div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[#e8ded8] p-8 text-center sm:mt-12 sm:p-14"><p className="text-sm opacity-70">Your bag is currently empty.</p><Link href="/products" className="mt-6 inline-block rounded-full bg-[#201b1b] px-8 py-4 text-[10px] tracking-[.2em] text-white transition-opacity hover:opacity-80 sm:text-xs">SHOP THE EDIT</Link></div>
        ) : (
          <div className="mt-8 grid gap-8 sm:mt-10 md:grid-cols-[1fr_320px] md:gap-10">
            <div className="space-y-5">
              {items.map((item, index) => <article key={`${item.slug}-${index}`} className="flex gap-3 border-b border-[#e8ded8] pb-5 sm:gap-5">
                <img src={item.image} alt={item.name} className="h-32 w-24 shrink-0 rounded-xl object-cover sm:h-36 sm:w-28" />
                <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><h2 className="min-w-0 text-xs leading-5 sm:text-sm">{item.name}</h2><span className="shrink-0 text-xs sm:text-sm">${(item.price * item.quantity).toFixed(2)}</span></div><p className="mt-1 text-[10px] opacity-50 sm:mt-2 sm:text-xs">{item.size ? `Size ${item.size}` : "Size selected at product page"}{item.color ? ` · ${item.color}` : ""}</p><div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-5 sm:gap-4"><div className="flex items-center rounded-full border border-[#d9cbc4]"><button type="button" aria-label="Decrease quantity" className="min-h-10 min-w-10 text-sm" onClick={() => update(items.map((x, i) => i === index ? { ...x, quantity: Math.max(1, x.quantity - 1) } : x))}>−</button><span className="min-w-6 text-center text-xs">{item.quantity}</span><button type="button" aria-label="Increase quantity" className="min-h-10 min-w-10 text-sm" onClick={() => update(items.map((x, i) => i === index ? { ...x, quantity: Math.min(10, x.quantity + 1) } : x))}>+</button></div><button type="button" className="text-[10px] underline opacity-60 transition-opacity hover:opacity-100 sm:text-xs" onClick={() => update(items.filter((_, i) => i !== index))}>Remove</button></div></div>
              </article>)}
            </div>
            <aside className="h-fit rounded-2xl bg-white/55 p-5 sm:p-7 md:sticky md:top-6"><h2 className="serif text-2xl">Summary</h2><div className="mt-6 flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div><div className="mt-3 flex justify-between text-sm"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div><p className="mt-3 text-[10px] leading-5 opacity-50">{shipping === 0 ? "You qualify for free shipping." : `Add $${Math.max(0, 75 - subtotal).toFixed(2)} for free shipping.`}</p><div className="mt-5 flex justify-between border-t border-[#ded3cc] pt-5 text-base"><span>Total</span><span>${(subtotal + shipping).toFixed(2)}</span></div><button type="button" onClick={checkout} disabled={loading} className="mt-7 min-h-14 w-full rounded-full bg-[#201b1b] px-5 py-4 text-[10px] tracking-[.2em] text-white transition-opacity hover:opacity-80 disabled:opacity-40 sm:text-xs">{loading ? "OPENING CHECKOUT…" : "CHECKOUT"}</button>{error && <p role="alert" className="mt-4 text-xs leading-5 text-red-700">{error}</p>}<p className="mt-4 text-[10px] leading-5 opacity-50">Secure payment is handled by the configured payment provider. Elarossa does not store card details.</p></aside>
          </div>
        )}
      </section>
    </main>
  );
}
