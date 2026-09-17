"use client";

import { FormEvent, useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading"); setMessage("");
    try {
      const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Newsletter signup is unavailable right now.");
      setState("success"); setMessage("You're on the list. Welcome to Elarossa."); setEmail("");
    } catch (error) { setState("error"); setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again."); }
  }

  return <section className="border-y border-[#e8ded8] bg-[#efe6e0] px-5 py-16 sm:px-6 sm:py-20" aria-labelledby="newsletter-title"><div className="mx-auto max-w-3xl text-center"><p className="text-[10px] font-semibold tracking-[.28em]">JOIN ELAROSSA</p><h2 id="newsletter-title" className="serif mt-3 text-4xl sm:text-5xl">A little more beautifully.</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-6 opacity-65">10% OFF YOUR FIRST ORDER · New edits, journal notes and considered essentials.</p>{state === "success" ? <p className="mt-8 text-sm font-medium" role="status">{message}</p> : <form onSubmit={submit} className="mx-auto mt-8 flex max-w-xl flex-col gap-2 sm:flex-row"><label htmlFor="newsletter-email" className="sr-only">Your email address</label><input id="newsletter-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" className="min-h-12 min-w-0 flex-1 border border-[#d8cbc4] bg-[#f9f5f1] px-4 text-sm outline-none focus-visible:border-[#201b1b]" /><button type="submit" disabled={state === "loading"} className="min-h-12 bg-[#201b1b] px-7 text-[10px] font-semibold tracking-[.2em] text-white disabled:opacity-50">{state === "loading" ? "JOINING…" : "JOIN US →"}</button></form>}{message && state === "error" && <p className="mt-4 text-xs opacity-65" role="alert">{message}</p>}<p className="mt-4 text-[9px] leading-5 opacity-45">You can unsubscribe at any time. Your email is used only for Elarossa communications.</p></div></section>;
}
