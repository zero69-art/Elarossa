"use client";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { track } from "@/lib/analytics";

const KEY = "elarossa-cart";
const WAITLIST_KEY = "elarossa-waitlist";

type Props = { product: Product; storeLive?: boolean };

export default function AddToBag({ product, storeLive = false }: Props) {
  const sizes = product.sizes.length ? product.sizes : ["One Size"];
  const colors = product.colors.length ? product.colors : ["Default"];
  const [size, setSize] = useState(sizes[0]);
  const [color, setColor] = useState(colors[0]);
  const [added, setAdded] = useState(false);
  const [email, setEmail] = useState("");
  const [waitState, setWaitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [waitMessage, setWaitMessage] = useState("");

  const purchasable = storeLive && product.qualityStatus === "approved";

  function add() {
    if (!purchasable) return;
    try {
      const raw = localStorage.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const items = Array.isArray(parsed) ? parsed : [];
      const i = items.findIndex(
        (x: { slug?: string; size?: string; color?: string }) =>
          x.slug === product.slug && x.size === size && x.color === color
      );
      const payload = {
        slug: product.slug,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        size,
        color,
      };
      if (i >= 0) items[i].quantity = Math.min(Number(items[i].quantity) + 1, 10);
      else items.push(payload);
      localStorage.setItem(KEY, JSON.stringify(items));
      window.dispatchEvent(new Event("elarossa-cart-updated"));
      track("add_to_cart", { slug: product.slug, quantity: 1, size, color, price: product.price });
      setAdded(true);
      setTimeout(() => setAdded(false), 1600);
    } catch {
      setAdded(false);
    }
  }

  async function joinWaitlist(event: React.FormEvent) {
    event.preventDefault();
    const cleaned = email.trim().toLowerCase();
    if (!cleaned) return;
    setWaitState("loading");
    setWaitMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleaned,
          source: "product-waitlist",
          product: product.slug,
          size,
          color,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not join the list.");

      // Always keep a local copy so demand is not lost if webhook is unset
      try {
        const raw = localStorage.getItem(WAITLIST_KEY);
        const list = raw ? JSON.parse(raw) : [];
        const entries = Array.isArray(list) ? list : [];
        entries.push({
          email: cleaned,
          product: product.slug,
          size,
          color,
          at: new Date().toISOString(),
        });
        localStorage.setItem(WAITLIST_KEY, JSON.stringify(entries.slice(-200)));
      } catch {
        /* ignore */
      }

      track("waitlist_join", { slug: product.slug, size, color });
      setWaitState("success");
      setWaitMessage("You're on the list. We'll notify you when this piece opens.");
      setEmail("");
    } catch (error) {
      setWaitState("error");
      setWaitMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <div className="mt-7 sm:mt-8">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-[10px] tracking-[.2em]">SIZE</p>
          <span className="text-[9px] opacity-45">SELECT ONE</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((x) => (
            <button
              type="button"
              key={x}
              aria-pressed={size === x}
              aria-label={`Size ${x}`}
              onClick={() => setSize(x)}
              className={`min-h-11 rounded-full border px-4 py-3 text-[10px] transition-all hover:-translate-y-px hover:border-[#201b1b] sm:px-5 sm:text-xs ${
                size === x ? "border-[#201b1b] bg-[#201b1b] text-white" : "border-[#d8ccc5]"
              }`}
            >
              {x}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="text-[10px] tracking-[.2em]">COLOR</p>
          <span className="text-[9px] opacity-45">{color}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {colors.map((x) => (
            <button
              type="button"
              key={x}
              aria-pressed={color === x}
              aria-label={`Color ${x}`}
              onClick={() => setColor(x)}
              className={`min-h-11 rounded-full border px-4 py-3 text-[10px] transition-all hover:-translate-y-px hover:border-[#201b1b] sm:px-5 sm:text-xs ${
                color === x ? "border-[#201b1b] bg-[#201b1b] text-white" : "border-[#d8ccc5]"
              }`}
            >
              {x}
            </button>
          ))}
        </div>
      </div>

      {purchasable ? (
        <button
          type="button"
          onClick={add}
          className="mt-7 min-h-14 w-full rounded-full bg-[#201b1b] px-6 py-4 text-[10px] tracking-[.22em] text-white transition-all hover:-translate-y-px hover:shadow-lg sm:mt-9 sm:text-xs"
        >
          {added ? "ADDED TO BAG ✓" : "ADD TO BAG"}
        </button>
      ) : (
        <div className="mt-7 sm:mt-9">
          <p className="text-[10px] font-semibold tracking-[.2em]">FOUNDING LIST</p>
          <p className="mt-2 text-xs leading-5 opacity-65">
            This piece is in sample review. Leave your email and preferred size — we notify founding members first.
          </p>
          {waitState === "success" ? (
            <p className="mt-4 text-sm font-medium" role="status">
              {waitMessage}
            </p>
          ) : (
            <form onSubmit={joinWaitlist} className="mt-4 flex flex-col gap-2 sm:flex-row">
              <label htmlFor={`waitlist-${product.slug}`} className="sr-only">
                Email for waitlist
              </label>
              <input
                id={`waitlist-${product.slug}`}
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="min-h-12 min-w-0 flex-1 border border-[#d8cbc4] bg-white/50 px-4 text-sm outline-none focus-visible:border-[#201b1b]"
              />
              <button
                type="submit"
                disabled={waitState === "loading"}
                className="min-h-12 bg-[#201b1b] px-6 text-[10px] font-semibold tracking-[.18em] text-white disabled:opacity-50"
              >
                {waitState === "loading" ? "SAVING…" : "NOTIFY ME →"}
              </button>
            </form>
          )}
          {waitState === "error" && waitMessage ? (
            <p className="mt-3 text-xs opacity-65" role="alert">
              {waitMessage}
            </p>
          ) : null}
          <p className="mt-3 text-[10px] leading-5 opacity-55">
            Status: {!storeLive ? "store closed until launch" : "sample review in progress"}. No charge until we open orders.
          </p>
        </div>
      )}
    </div>
  );
}
