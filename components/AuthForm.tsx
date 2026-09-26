"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Mode = "login" | "register";

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(mode === "login" ? "/api/auth/login" : "/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "login" ? { email, password } : { email, password, name }
        ),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      router.push("/account");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === "register" ? (
        <div>
          <label htmlFor="auth-name" className="text-[10px] font-semibold tracking-[.18em]">
            NAME
          </label>
          <input
            id="auth-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 min-h-12 w-full border border-[#d8cbc4] bg-white/80 px-4 text-sm outline-none focus-visible:border-[#201b1b]"
          />
        </div>
      ) : null}
      <div>
        <label htmlFor="auth-email" className="text-[10px] font-semibold tracking-[.18em]">
          EMAIL
        </label>
        <input
          id="auth-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 min-h-12 w-full border border-[#d8cbc4] bg-white/80 px-4 text-sm outline-none focus-visible:border-[#201b1b]"
        />
      </div>
      <div>
        <label htmlFor="auth-password" className="text-[10px] font-semibold tracking-[.18em]">
          PASSWORD
        </label>
        <input
          id="auth-password"
          type="password"
          required
          minLength={8}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 min-h-12 w-full border border-[#d8cbc4] bg-white/80 px-4 text-sm outline-none focus-visible:border-[#201b1b]"
        />
        {mode === "register" ? (
          <p className="mt-2 text-[10px] opacity-50">At least 8 characters.</p>
        ) : null}
      </div>
      {error ? (
        <p className="text-xs text-red-800/80" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="min-h-12 w-full rounded-full bg-[#201b1b] text-[10px] font-semibold tracking-[.2em] text-white disabled:opacity-50"
      >
        {loading ? "PLEASE WAIT…" : mode === "login" ? "SIGN IN →" : "CREATE ACCOUNT →"}
      </button>
    </form>
  );
}
