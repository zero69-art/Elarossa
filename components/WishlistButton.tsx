"use client";

import { useEffect, useState } from "react";

const KEY = "elarossa-wishlist";

export default function WishlistButton({ slug, name }: { slug: string; name: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem(KEY) || "[]");
      setSaved(Array.isArray(items) && items.includes(slug));
    } catch { setSaved(false); }
  }, [slug]);

  function toggle() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
      const items = Array.isArray(raw) ? raw.filter((item): item is string => typeof item === "string") : [];
      const next = items.includes(slug) ? items.filter((item) => item !== slug) : [...items, slug];
      localStorage.setItem(KEY, JSON.stringify(next));
      setSaved(next.includes(slug));
    } catch { /* wishlist is optional and must never block shopping */ }
  }

  return <button type="button" onClick={toggle} aria-pressed={saved} aria-label={saved ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`} className="absolute right-3 top-3 z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/90 text-lg backdrop-blur-sm transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a65d68]">{saved ? "♥" : "♡"}</button>;
}
