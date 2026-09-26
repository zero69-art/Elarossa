"use client";

import { FormEvent, useState } from "react";

type Props = {
  /** `inline` = form only for homepage panels; `section` = full band (default) */
  variant?: "section" | "inline";
};

export default function Newsletter({ variant = "section" }: Props) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Newsletter signup is unavailable right now.");
      setState("success");
      setMessage("You're on the list. Welcome to Elarossa.");
      setEmail("");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  const form = (
    <>
      {state === "success" ? (
        <p className="mt-4 text-sm font-medium text-[#201b1b]" role="status">
          {message}
        </p>
      ) : (
        <form
          onSubmit={submit}
          className={`mt-4 flex flex-col gap-2 ${variant === "inline" ? "" : "mx-auto max-w-xl sm:flex-row"}`}
        >
          <label htmlFor={`newsletter-email-${variant}`} className="sr-only">
            Your email address
          </label>
          <input
            id={`newsletter-email-${variant}`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email address"
            className="min-h-12 min-w-0 flex-1 border border-[#d8cbc4] bg-[#f9f5f1] px-4 text-sm text-[#201b1b] outline-none focus-visible:border-[#201b1b]"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="cta-ink min-h-12 px-7 text-[10px] font-semibold tracking-[.2em] disabled:opacity-50"
          >
            {state === "loading" ? "JOINING…" : "JOIN US →"}
          </button>
        </form>
      )}
      {message && state === "error" ? (
        <p className="mt-3 text-xs text-[#201b1b]/70" role="alert">
          {message}
        </p>
      ) : null}
      <p className="mt-3 text-[9px] leading-5 text-[#201b1b]/50">
        You can unsubscribe at any time. Your email is used only for Elarossa communications.
      </p>
    </>
  );

  if (variant === "inline") {
    return <div className="w-full">{form}</div>;
  }

  return (
    <section
      className="border-y border-[#e8ded8] bg-[#efe6e0] px-5 py-16 sm:px-6 sm:py-20"
      aria-labelledby="newsletter-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] font-semibold tracking-[.28em] text-[#201b1b]">JOIN ELAROSSA</p>
        <h2 id="newsletter-title" className="serif mt-3 text-4xl text-[#201b1b] sm:text-5xl">
          A little more beautifully.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#201b1b]/65">
          New edits, journal notes and considered essentials, delivered occasionally.
        </p>
        {form}
      </div>
    </section>
  );
}
