"use client";
import { useEffect, useState } from "react";

const TOKEN_KEY = "elarossa-admin-token";

type CJRow = {
  pid: string;
  productNameEn: string;
  bigImage?: string;
  productImageSet?: string[];
  sellPrice?: string | number;
  categoryNameEn?: string;
  categoryName?: string;
};

type StoreProduct = {
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  tag: string;
  description: string;
  details: string[];
  sizes: string[];
  colors: string[];
  image: string;
  gallery: string[];
  supplier: string;
  supplierCostMax: number;
  shippingReserve: number;
  qualityStatus: string;
  cjPid?: string;
};

function toTsLiteral(p: StoreProduct) {
  const str = (s: string) => JSON.stringify(s);
  const arr = (a: string[]) => `[${a.map(str).join(", ")}]`;
  return `  {
    slug: ${str(p.slug)}, name: ${str(p.name)}, category: ${str(p.category)}, price: ${p.price}${p.compareAtPrice ? `, compareAtPrice: ${p.compareAtPrice}` : ""}, tag: ${str(p.tag)},
    description: ${str(p.description)}, details: ${arr(p.details)}, sizes: ${arr(p.sizes)}, colors: ${arr(p.colors)},
    image: ${str(p.image)}, gallery: ${arr(p.gallery)}, supplier: ${str(p.supplier)}, supplierCostMax: ${p.supplierCostMax}, shippingReserve: ${p.shippingReserve}, qualityStatus: ${str(p.qualityStatus)}, cjPid: ${str(p.cjPid ?? "")}
  },`;
}

export default function AdminProductsPage() {
  const [token, setToken] = useState("");
  const [savedToken, setSavedToken] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CJRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<StoreProduct | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(TOKEN_KEY);
    if (stored) { setToken(stored); setSavedToken(stored); }
  }, []);

  function saveToken() {
    sessionStorage.setItem(TOKEN_KEY, token);
    setSavedToken(token);
  }

  async function search(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true); setError(""); setSelected(null);
    try {
      const res = await fetch(`/api/cj/products?q=${encodeURIComponent(query)}`, { headers: { "x-admin-token": savedToken } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed.");
      setResults(data.products ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed.");
      setResults([]);
    } finally { setLoading(false); }
  }

  async function selectProduct(pid: string) {
    setDetailLoading(true); setError(""); setSelected(null); setCopied(false);
    try {
      const res = await fetch(`/api/cj/products/${pid}`, { headers: { "x-admin-token": savedToken } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load product.");
      setSelected(data.product);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load product.");
    } finally { setDetailLoading(false); }
  }

  function copySnippet() {
    if (!selected) return;
    navigator.clipboard.writeText(toTsLiteral(selected));
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  if (!savedToken) {
    return <main className="mx-auto max-w-sm px-6 py-24">
      <h1 className="serif text-3xl">Admin</h1>
      <p className="mt-3 text-sm opacity-60">Enter the admin access token to browse the CJ catalogue.</p>
      <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Admin token" className="mt-6 w-full border border-[#d8ccc5] px-4 py-3 text-sm outline-none" />
      <button onClick={saveToken} className="mt-4 w-full bg-[#201b1b] px-5 py-3 text-xs tracking-[.2em] text-white">CONTINUE</button>
    </main>;
  }

  return <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:px-8">
    <div className="flex items-center justify-between gap-4"><h1 className="serif text-3xl">CJ Product Import</h1><button onClick={() => { sessionStorage.removeItem(TOKEN_KEY); setSavedToken(""); }} className="text-xs underline opacity-60">Sign out</button></div>
    <p className="mt-2 max-w-2xl text-sm opacity-60">Search CJdropshipping&apos;s live catalogue, pick a product, then copy the generated entry into <code>lib/products.ts</code>. This tool does not write files or publish anything automatically.</p>

    <form onSubmit={search} className="mt-6 flex gap-3">
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search CJ catalogue, e.g. seamless bra" className="flex-1 border border-[#d8ccc5] px-4 py-3 text-sm outline-none" />
      <button type="submit" disabled={loading} className="bg-[#201b1b] px-6 py-3 text-xs tracking-[.2em] text-white disabled:opacity-40">{loading ? "SEARCHING…" : "SEARCH"}</button>
    </form>

    {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

    <div className="mt-8 grid gap-6 md:grid-cols-[1fr_360px]">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {results.map((row) => <button key={row.pid} onClick={() => selectProduct(row.pid)} className="text-left">
          <div className="aspect-square overflow-hidden rounded-xl bg-[#e9dfda]"><img src={row.bigImage || row.productImageSet?.[0] || ""} alt={row.productNameEn} className="h-full w-full object-cover" /></div>
          <p className="mt-2 line-clamp-2 text-xs">{row.productNameEn}</p>
          <p className="text-xs opacity-50">{row.categoryNameEn || row.categoryName} · cost ${row.sellPrice}</p>
        </button>)}
        {!loading && !results.length && <p className="text-sm opacity-50">No results yet — search above.</p>}
      </div>

      {(detailLoading || selected) && <aside className="h-fit border border-[#e8ded8] p-5">
        {detailLoading && <p className="text-sm opacity-60">Loading product…</p>}
        {selected && <>
          <img src={selected.image} alt={selected.name} className="aspect-[4/5] w-full rounded-xl object-cover" />
          <p className="mt-4 text-sm font-medium">{selected.name}</p>
          <p className="mt-1 text-xs opacity-60">Supplier cost: ${selected.supplierCostMax.toFixed(2)} · Suggested retail: ${selected.price.toFixed(2)}</p>
          <p className="mt-1 text-xs opacity-60">Sizes: {selected.sizes.join(", ")}</p>
          <p className="text-xs opacity-60">Colors: {selected.colors.join(", ")}</p>
          <button onClick={copySnippet} className="mt-4 w-full bg-[#201b1b] px-4 py-3 text-xs tracking-[.2em] text-white">{copied ? "COPIED ✓" : "COPY lib/products.ts ENTRY"}</button>
        </>}
      </aside>}
    </div>
  </main>;
}
