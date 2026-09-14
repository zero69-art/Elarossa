import type { Metadata } from "next";
import Link from "next/link";
import { searchCJProducts, getCJProductRows, toCJStoreProduct } from "@/lib/cj";
import { products as fallbackProducts } from "@/lib/products";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Shop Women's Essentials | Elarossa", description: "Discover curated women's activewear, swimwear and intimates from Elarossa." };
type SearchParams = Promise<{ q?: string; page?: string }>;

const filters = ["", "activewear", "swimwear", "lingerie"];

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const keyword = params.q?.trim() ?? "";
  const page = Math.max(1, Number(params.page || 1) || 1);
  let liveProducts = [] as ReturnType<typeof toCJStoreProduct>[];
  let live = true;
  let total = 0;
  try {
    const response = await searchCJProducts(keyword, page, 24);
    const rows = getCJProductRows(response);
    liveProducts = rows.map(toCJStoreProduct).filter(p => p.image);
    total = Number(response?.data?.total ?? response?.data?.totalCount ?? response?.data?.count ?? 0);
  } catch { live = false; }
  const visibleProducts = live && liveProducts.length ? liveProducts : fallbackProducts;
  const hasNext = live ? (total ? page * 24 < total : liveProducts.length === 24) : false;
  const query = keyword ? `q=${encodeURIComponent(keyword)}&` : "";

  return <main className="min-h-screen">
    <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-7"><Link href="/" className="serif text-xl tracking-[.12em] sm:text-3xl">ELAROSSA</Link><div className="flex gap-4 text-[10px] tracking-[.18em] sm:gap-5 sm:text-xs"><Link href="/">HOME</Link><Link href="/cart">BAG</Link></div></nav>
    <header className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-10 md:px-8"><div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><div><p className="text-[10px] tracking-[.28em] sm:text-xs">THE COLLECTION</p><h1 className="serif mt-3 text-4xl sm:text-5xl md:text-7xl">The Elarossa Edit</h1><p className="mt-4 max-w-2xl text-sm leading-6 opacity-65">A focused collection of feminine essentials. We keep the catalogue broad behind the scenes, but the storefront stays curated so quality comes first.</p></div><form className="flex w-full max-w-md border-b border-[#201b1b] pb-2" action="/products"><input name="q" defaultValue={keyword} aria-label="Search products" placeholder="Search bras, bikinis, activewear…" className="min-w-0 flex-1 bg-transparent text-sm outline-none"/><button className="ml-3 text-[10px] tracking-[.2em] sm:text-xs" type="submit">SEARCH</button></form></div><div className="mt-7 flex flex-wrap gap-2 border-b border-[#e8ded8] pb-4 text-[9px] tracking-[.18em] sm:gap-5 sm:text-[10px]">{filters.map(filter => <Link key={filter || "all"} href={filter ? `/products?q=${filter}` : "/products"} className={`${keyword === filter ? "border-b border-[#201b1b] pb-2" : "opacity-55"}`}>{filter ? filter.toUpperCase() : "ALL"}</Link>)}<span className="ml-auto hidden opacity-45 sm:inline">{live ? "LIVE CATALOGUE" : "CURATED FALLBACK"}</span></div></header>
    <section className="mx-auto grid max-w-7xl grid-cols-2 gap-x-3 gap-y-8 px-4 pb-12 sm:gap-5 sm:px-6 md:px-8 lg:grid-cols-4">{visibleProducts.map(product => <Link key={product.slug} href={`/products/${product.slug}`} className="group min-w-0"><div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e9dfda] sm:rounded-3xl"><img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><span className="absolute left-2 top-2 bg-white/90 px-2 py-1.5 text-[8px] tracking-widest sm:left-4 sm:top-4 sm:px-3 sm:py-2 sm:text-[10px]">{product.tag}</span></div><div className="flex flex-col gap-1 py-3 text-xs sm:flex-row sm:justify-between sm:gap-3 sm:py-4 sm:text-sm"><span className="line-clamp-2">{product.name}</span><span className="shrink-0">${product.price.toFixed(2)}</span></div><p className="text-[9px] uppercase tracking-wider opacity-45 sm:text-[10px]">{product.category}</p></Link>)}</section>
    {live && (page > 1 || hasNext) && <nav className="mx-auto flex max-w-7xl justify-between px-4 pb-16 text-[10px] tracking-[.2em] sm:px-6 sm:pb-20 md:px-8">{page > 1 ? <Link href={`/products?${query}page=${page - 1}`} className="underline">← PREVIOUS</Link> : <span/>}{hasNext ? <Link href={`/products?${query}page=${page + 1}`} className="underline">NEXT →</Link> : <span/>}</nav>}
  </main>;
}
