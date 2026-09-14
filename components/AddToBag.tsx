"use client";
import { useState } from "react";
import type { Product } from "@/lib/products";

const KEY = "elarossa-cart";

export default function AddToBag({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0] ?? "One Size");
  const [color, setColor] = useState(product.colors[0] ?? "Default");
  const [added, setAdded] = useState(false);

  function add() {
    const raw = localStorage.getItem(KEY);
    const items = raw ? JSON.parse(raw) : [];
    const i = items.findIndex((x: { slug: string; size?: string; color?: string }) => x.slug === product.slug && x.size === size && x.color === color);
    const payload = {
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      size,
      color,
      cjPid: product.cjPid,
      cjVariants: product.cjVariants,
    };
    if (i >= 0) items[i].quantity += 1;
    else items.push(payload);
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("elarossa-cart-updated"));
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return <>
    <div className="mt-8"><p className="text-xs tracking-[.2em]">SIZE</p><div className="mt-3 flex flex-wrap gap-2">{product.sizes.map((x) => <button type="button" key={x} onClick={() => setSize(x)} className={`border px-5 py-3 text-xs ${size === x ? "border-[#201b1b] bg-[#201b1b] text-white" : "border-[#d8ccc5]"}`}>{x}</button>)}</div></div>
    <div className="mt-7"><p className="text-xs tracking-[.2em]">COLOR</p><div className="mt-3 flex flex-wrap gap-2">{product.colors.map((x) => <button type="button" key={x} onClick={() => setColor(x)} className={`border px-5 py-3 text-xs ${color === x ? "border-[#201b1b] bg-[#201b1b] text-white" : "border-[#d8ccc5]"}`}>{x}</button>)}</div></div>
    <button type="button" onClick={add} className="mt-9 w-full bg-[#201b1b] px-8 py-5 text-xs tracking-[.25em] text-white">{added ? "ADDED TO BAG ✓" : "ADD TO BAG"}</button>
  </>;
}
