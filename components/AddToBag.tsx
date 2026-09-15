"use client";
import { useState } from "react";
import type { Product } from "@/lib/products";

const KEY = "elarossa-cart";

type Props = { product: Product; storeLive?: boolean };

export default function AddToBag({ product, storeLive = false }: Props) {
  const [size, setSize] = useState(product.sizes[0] ?? "One Size");
  const [color, setColor] = useState(product.colors[0] ?? "Default");
  const [added, setAdded] = useState(false);
  const sizes = product.sizes.length ? product.sizes : ["One Size"];
  const colors = product.colors.length ? product.colors : ["Default"];

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
      setAdded(true);
      setTimeout(() => setAdded(false), 1600);
    } catch { setAdded(false); }
  }

  const purchasable = storeLive && product.qualityStatus === "approved";

  return <div className="mt-7 sm:mt-8">
    <div><p className="text-[10px] tracking-[.2em]">SIZE</p><div className="mt-3 flex flex-wrap gap-2">{sizes.map(x => <button type="button" key={x} aria-pressed={size === x} onClick={() => setSize(x)} className={`min-h-11 border px-4 py-3 text-[10px] transition-colors hover:border-[#201b1b] sm:px-5 sm:text-xs ${size === x ? "border-[#201b1b] bg-[#201b1b] text-white" : "border-[#d8ccc5]"}`}>{x}</button>)}</div></div>
    <div className="mt-6"><p className="text-[10px] tracking-[.2em]">COLOR</p><div className="mt-3 flex flex-wrap gap-2">{colors.map(x => <button type="button" key={x} aria-pressed={color === x} onClick={() => setColor(x)} className={`min-h-11 border px-4 py-3 text-[10px] transition-colors hover:border-[#201b1b] sm:px-5 sm:text-xs ${color === x ? "border-[#201b1b] bg-[#201b1b] text-white" : "border-[#d8ccc5]"}`}>{x}</button>)}</div></div>
    <button type="button" onClick={add} disabled={!purchasable} className="mt-7 min-h-14 w-full bg-[#201b1b] px-6 py-4 text-[10px] tracking-[.22em] text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-45 sm:mt-9 sm:text-xs">{!storeLive ? "COMING SOON" : product.qualityStatus !== "approved" ? "SAMPLE REVIEW IN PROGRESS" : added ? "ADDED TO BAG ✓" : "ADD TO BAG"}</button>
    {!purchasable && <p className="mt-3 text-[10px] leading-5 opacity-55">This item is not available for purchase yet. Elarossa will open ordering after product quality and fulfilment checks are complete.</p>}
  </div>;
}
