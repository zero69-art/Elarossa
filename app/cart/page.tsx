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
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 7.95;

  async function checkout() {
    if (!items.length) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map(({ slug, quantity, size, color }) => ({ slug, quantity, size, color })) }),
      });
      const data = await response.json();
      if (!response.ok || !data.url) throw new Error(data.error || "Checkout could not be started.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout could not be started.");
      setLoading(false);
    }
  }

  return <main className="min-h-screen">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7"><Link href="/" className="serif text-3xl tracking-[.12em]">ELAROSSA</Link><Link href="/products" className="text-xs tracking-[.2em] underline">CONTINUE SHOPPING</Link></nav>
    <section className="mx-auto max-w-5xl px-6 pb-20">
      <p className="text-xs tracking-[.3em]">YOUR BAG</p><h1 className="serif mt-3 text-5xl">Cart</h1>
      {items.length === 0 ? <div className="mt-12 border border-[#e8ded8] p-10 text-center"><p className="text-sm opacity-70">Your bag is currently empty.</p><Link href="/products" className="mt-6 inline-block bg-[#201b1b] px-7 py-4 text-xs tracking-[.2em] text-white">SHOP THE EDIT</Link></div> :
      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_320px]">
        <div className="space-y-5">{items.map((item, index) => <article key={`${item.slug}-${index}`} className="flex gap-5 border-b border-[#e8ded8] pb-5"><img src={item.image} alt={item.name} className="h-32 w-24 rounded-xl object-cover"/><div className="flex-1"><div className="flex justify-between gap-4"><h2 className="text-sm">{item.name}</h2><span className="text-sm">${(item.price * item.quantity).toFixed(2)}</span></div><p className="mt-2 text-xs opacity-50">{item.size ? `Size ${item.size}` : "Size selected at product page"}{item.color ? ` · ${item.color}` : ""}</p><div className="mt-5 flex items-center gap-4"><button type="button" className="border px-3 py-1 text-xs" onClick={() => update(items.map((x,i) => i===index ? {...x, quantity: Math.max(1,x.quantity-1)} : x))}>−</button><span className="text-xs">{item.quantity}</span><button type="button" className="border px-3 py-1 text-xs" onClick={() => update(items.map((x,i) => i===index ? {...x, quantity:x.quantity+1} : x))}>+</button><button type="button" className="ml-3 text-xs underline opacity-60" onClick={() => update(items.filter((_,i)=>i!==index))}>Remove</button></div></div></article>)}</div>
        <aside className="h-fit rounded-2xl bg-[#f8f4ef] p-7"><h2 className="serif text-2xl">Summary</h2><div className="mt-7 flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div><div className="mt-3 flex justify-between text-sm"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div><div className="mt-5 flex justify-between border-t border-[#ded3cc] pt-5 text-base"><span>Total</span><span>${(subtotal+shipping).toFixed(2)}</span></div><button type="button" onClick={checkout} disabled={loading} className="mt-7 w-full bg-[#201b1b] px-5 py-4 text-xs tracking-[.2em] text-white disabled:opacity-40">{loading ? "OPENING CHECKOUT…" : "CHECKOUT"}</button>{error && <p className="mt-4 text-xs leading-5 text-red-700">{error}</p>}<p className="mt-4 text-[11px] leading-5 opacity-50">Secure payment is handled by the configured payment provider. Elarossa does not store card details.</p></aside>
      </div>}
    </section>
  </main>;
}
