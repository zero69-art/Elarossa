"use client";
import { useState } from "react";
import type { Product } from "@/lib/products";

const KEY = "elarossa-cart";

export default function AddToBag({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0] ?? "One Size");
  const [color, setColor] = useState(product.colors[0] ?? "Default");
  const [added, setAdded] = useState(false);
  const sizes = product.sizes.length ? product.sizes : ["One Size"];
  const colors = product.colors.length ? product.colors : ["Default"];

  function add() {
    try {
      const raw = localStorage.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const items = Array.isArray(parsed) ? parsed : [];
      const i = items.findIndex((x: { slug?: string; size?: string; color?: string }) => x.slug === product.slug && x.size === size && x.color === color);
      const payload = { slug: product.slug, name: product.name, price: product.price, quantity: 1, image: product.image, size, color, cjPid: product.cjPid, cjVariants: product.cjVariants };
      if (i >= 0) items[i].quantity += 1; else items.push(payload);
      localStorage.setItem(KEY, JSON.stringify(items));
      window.dispatchEvent(new Event("elarossa-cart-updated"));
      setAdded(true);
      setTimeout(() => setAdded(false), 1600);
    } catch { setAdded(false); }
  }

  return <div className="mt-7 sm:mt-8">
    <div><p className="text-[10px] tracking-[.2em]">SIZE</p><div className="mt-3 flex flex-wrap gap-2">{sizes.map(x => <button type="button" key={x} aria-pressed={size === x} onClick={() => setSize(x)} className={`min-h-11 border px-4 py-3 text-[10px] sm:px-5 sm:text-xs ${size === x ? "border-[#201b1b] bg-[#201b1b] text-white" : "border-[#d8ccc5]"}`}>{x}</button>)}</div></div>
    <div className="mt-6"><p className="text-[10px] tracking-[.2em]">COLOR</p><div className="mt-3 flex flex-wrap gap-2">{colors.map(x => <button type="button" key={x} aria-pressed={color === x} onClick={() => setColor(x)} className={`min-h-11 border px-4 py-3 text-[10px] sm:px-5 sm:text-xs ${color === x ? "border-[#201b1b] bg-[#201b1b] text-white" : "border-[#d8ccc5]"}`}>{x}</button>)}</div></div>
    <button type="button" onClick={add} className="mt-7 min-h-14 w-full bg-[#201b1b] px-6 py-4 text-[10px] tracking-[.22em] text-white transition-opacity hover:opacity-85 sm:mt-9 sm:text-xs">{added ? "ADDED TO BAG ✓" : "ADD TO BAG"}</button>
  </div>;
}
