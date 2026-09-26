"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type User = { id: string; email: string; name: string };

export default function AccountClient({ user }: { user: User }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-[10px] font-semibold tracking-[.28em]">ELAROSSA ACCOUNT</p>
      <h1 className="serif mt-4 text-5xl leading-none sm:text-6xl">
        {user.name ? `Hello, ${user.name}` : "Your account"}
      </h1>
      <p className="mt-4 text-sm opacity-65">{user.email}</p>
      <div className="mt-10 space-y-4 border border-[#e8ded8] bg-white/60 p-6">
        <p className="text-sm leading-7 opacity-70">
          Order history and saved addresses will appear here once checkout is fully open and fulfilment is connected. Until then, you can browse the edit and use Notify Me on product pages.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/shop"
            className="inline-flex min-h-11 items-center rounded-full bg-[#201b1b] px-6 text-[10px] font-semibold tracking-[.18em] text-white"
          >
            SHOP →
          </Link>
          <button
            type="button"
            onClick={() => void logout()}
            disabled={loading}
            className="inline-flex min-h-11 items-center rounded-full border border-[#201b1b] px-6 text-[10px] font-semibold tracking-[.18em] disabled:opacity-50"
          >
            {loading ? "SIGNING OUT…" : "SIGN OUT"}
          </button>
        </div>
      </div>
    </div>
  );
}
