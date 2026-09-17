"use client";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { track } from "@/lib/analytics";

const KEY = "elarossa-cart";
type Props = { product: Product; storeLive?: boolean };

export default function AddToBag({ product, storeLive = false }: Props) {
  const sizes = product.sizes.length ? product.sizes : ["One Size"];
  const colors = product.colors.length ? product.colors : ["Default"];
  const [size, setSize] = useState(sizes[0]);
  const [color, setColor] = useState(colors[0]);
  const [added, setAdded] = useState(false);

  function add() {
    if (!storeLive || product.qualityStatus !== "approved") return;
    try {
      const raw = localStorage.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const items = Array.isArray(parsed) ? parsed : [];
      const i = items.findIndex((x: { slug?: string; size?: string; color?: string }) => x.slug === product.slug && x.size === size && x.color === color);
      const payload = { slug: product.slug, name: product.name, price: product.price, quantity: 1, image: product.image, size, color };
      if (i >= 0) items[i].quantity = Math.min(Number(items[i].quantity) + 1, 10); else items.push(payload);
      localStorage.setItem(KEY, JSON.stringify(items));
      window.dispatchEvent(new Event("elarossa-cart-updated"));
      track("add_to_cart", { slug: product.slug, quantity: 1, size, color, price: product.price });
      setAdded(true);
      setTimeout(() => setAdded(false), 1600);
    } catch { setAdded(false); }
  }

  const purchasable = storeLive && product.qualityStatus === "approved";
  return <div className="mt-7 sm:mt-8">
    <div><div className="flex items-center justify-between"><p className="text-[10px] tracking-[.2em]">SIZE</p><span className="text-[9px] opacity-45">SELECT ONE</span></div><div className="mt-3 flex flex-wrap gap-2">{sizes.map(x => <button type="button" key={x} aria-pressed={size === x} aria-label={`Size ${x}`} onClick={() => setSize(x)} className={`min-h-11 rounded-full border px-4 py-3 text-[10px] transition-all hover:-translate-y-px hover:border-[#201b1b] sm:px-5 sm:text-xs ${size === x ? "border-[#201b1b] bg-[#201b1b] text-white" : "border-[#d8ccc5]"}`}>{x}</button>)}</div></div>
    <div className="mt-6"><div className="flex items-center justify-between"><p className="text-[10px] tracking-[.2em]">COLOR</p><span className="text-[9px] opacity-45">{color}</span></div><div className="mt-3 flex flex-wrap gap-2">{colors.map(x => <button type="button" key={x} aria-pressed={color === x} aria-label={`Color ${x}`} onClick={() => setColor(x)} className={`min-h-11 rounded-full border px-4 py-3 text-[10px] transition-all hover:-translate-y-px hover:border-[#201b1b] sm:px-5 sm:text-xs ${color === x ? "border-[#201b1b] bg-[#201b1b] text-white" : "border-[#d8ccc5]"}`}>{x}</button>)}</div></div>
    <button type="button" onClick={add} disabled={!purchasable} className="mt-7 min-h-14 w-full rounded-full bg-[#201b1b] px-6 py-4 text-[10px] tracking-[.22em] text-white transition-all hover:-translate-y-px hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-45 sm:mt-9 sm:text-xs">{!storeLive ? "COMING SOON" : product.qualityStatus !== "approved" ? "SAMPLE REVIEW IN PROGRESS" : added ? "ADDED TO BAG ✓" : "ADD TO BAG"}</button>
    {!purchasable && <p className="mt-3 rounded-xl bg-[#efe6e0] p-3 text-[10px] leading-5 opacity-70">Ordering opens after product quality and fulfilment checks are complete.</p>}
  </div>;
}
