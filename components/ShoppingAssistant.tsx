"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type ChatProduct = { slug: string; name: string; price: number; href: string; tag: string };
type ChatLink = { label: string; href: string };
type Msg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  products?: ChatProduct[];
  links?: ChatLink[];
};

const WELCOME: Msg = {
  id: "welcome",
  role: "assistant",
  text: "Welcome to Elarossa. I can help you find activewear, swim, and intimates from our edit — or answer questions about shipping and returns. What are you looking for?",
  links: [
    { label: "Activewear", href: "/active" },
    { label: "Swim", href: "/swim" },
    { label: "Intimates", href: "/intimates" },
  ],
};

export default function ShoppingAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages, loading]);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: Msg = { id: `u-${Date.now()}`, role: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessages((m) => [
          ...m,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            text: data.error || "I couldn't respond just now. Please try again, or browse the shop.",
            links: [{ label: "Shop", href: "/shop" }],
          },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            text: data.message || "…",
            products: data.products,
            links: data.links,
          },
        ]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: "Connection issue. You can still browse the shop while I reconnect.",
          links: [{ label: "Shop", href: "/shop" }],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {open ? (
        <div
          className="flex h-[min(32rem,70vh)] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[1.5rem] border border-[#e8ded8] bg-[#f9f5f1] shadow-[0_24px_80px_rgba(32,27,27,.18)]"
          role="dialog"
          aria-label="Elarossa shopping assistant"
        >
          <header className="flex items-center justify-between border-b border-[#e8ded8] bg-[#201b1b] px-4 py-3 text-white">
            <div>
              <p className="text-[10px] font-semibold tracking-[.28em]">ELAROSSA</p>
              <p className="mt-0.5 text-xs opacity-80">Shopping assistant</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="min-h-10 min-w-10 rounded-full text-lg leading-none opacity-80 transition hover:opacity-100"
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                    msg.role === "user"
                      ? "bg-[#201b1b] text-white"
                      : "border border-[#e8ded8] bg-white text-[#201b1b]"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.products?.length ? (
                    <ul className="mt-3 space-y-2">
                      {msg.products.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={p.href}
                            className="block rounded-xl border border-[#ebe3dd] bg-[#f9f5f1] px-3 py-2 transition hover:border-[#201b1b]"
                            onClick={() => setOpen(false)}
                          >
                            <span className="text-[9px] font-semibold tracking-[.16em] opacity-50">
                              {p.tag}
                            </span>
                            <span className="mt-0.5 block text-sm font-medium">{p.name}</span>
                            <span className="mt-0.5 block text-xs opacity-60">
                              ${p.price.toFixed(2)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {msg.links?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.links.map((l) => (
                        <Link
                          key={l.href + l.label}
                          href={l.href}
                          className="rounded-full border border-[#d8cbc4] px-3 py-1 text-[10px] font-semibold tracking-[.14em] transition hover:border-[#201b1b]"
                          onClick={() => setOpen(false)}
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            {loading ? (
              <p className="text-xs opacity-50" role="status">
                Thinking…
              </p>
            ) : null}
            <div ref={endRef} />
          </div>

          <form
            className="border-t border-[#e8ded8] bg-white p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <div className="flex gap-2">
              <label htmlFor="elarossa-assistant-input" className="sr-only">
                Message
              </label>
              <input
                id="elarossa-assistant-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Leggings, swim, under $40…"
                maxLength={500}
                className="min-h-11 min-w-0 flex-1 rounded-full border border-[#d8cbc4] bg-[#f9f5f1] px-4 text-sm outline-none focus-visible:border-[#201b1b]"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="min-h-11 rounded-full bg-[#201b1b] px-4 text-[10px] font-semibold tracking-[.16em] text-white disabled:opacity-40"
              >
                SEND
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-14 min-w-14 items-center justify-center rounded-full bg-[#201b1b] text-white shadow-[0_12px_40px_rgba(32,27,27,.25)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(32,27,27,.3)]"
        aria-expanded={open}
        aria-label={open ? "Close shopping assistant" : "Open shopping assistant"}
      >
        {open ? (
          <span className="text-xl leading-none">×</span>
        ) : (
          <span className="text-[10px] font-semibold tracking-[.12em]">CHAT</span>
        )}
      </button>
    </div>
  );
}
