"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";

const KEY = "elarossa-cart";

export default function QuickAdd({ product, storeLive }: { product: Product; storeLive: boolean }) {
  const [added, setAdded] = useState(false);
  const purchasable = storeLive && product.qualityStatus === "approved";

  function add() {
    if (!purchasable) return;
    try {
      const raw = localStorage.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const items = Array.isArray(parsed) ? parsed : [];
      const size = product.sizes[0] ?? "One Size";
      const color = product.colors[0] ?? "Default";
      const index = items.findIndex((item: { slug?: string; size?: string; color?: string }) => item.slug === product.slug && item.size === size && item.color === color);
      if (index >= 0) items[index].quantity = Math.min(Number(items[index].quantity) + 1, 10);
      else items.push({ slug: product.slug, name: product.name, price: product.price, quantity: 1, image: product.image, size, color });
      localStorage.setItem(KEY, JSON.stringify(items));
      window.dispatchEvent(new Event("elarossa-cart-updated"));
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1400);
    } catch { /* keep shopping usable if storage is unavailable */ }
  }

  return (
    <button type="button" onClick={add} disabled={!purchasable} aria-label={purchasable ? `Quick add ${product.name}` : `${product.name} is not available for purchase`} className="absolute inset-x-3 bottom-3 min-h-11 translate-y-2 bg-white/95 px-3 text-[9px] font-semibold tracking-[.16em] opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 disabled:hidden">
      {added ? "ADDED TO BAG ✓" : "QUICK ADD"}
    </button>
  );
}
