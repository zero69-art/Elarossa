"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "elarossa-cart";

type CartItem = { quantity: number };

function readCount(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return 0;
    return parsed.reduce((sum: number, item: CartItem) => sum + Math.max(0, Number(item.quantity) || 0), 0);
  } catch {
    return 0;
  }
}

export default function CartBadge() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(readCount());
    const onUpdate = () => setCount(readCount());
    window.addEventListener("elarossa-cart-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("elarossa-cart-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  if (!count) return null;

  return (
    <span
      className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-[#201b1b] px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white align-middle"
      aria-label={`${count} item${count === 1 ? "" : "s"} in bag`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
