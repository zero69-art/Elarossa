import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "Shop Women's Essentials", description: "Discover Elarossa's curated activewear, swimwear and intimate essentials.", alternates: { canonical: "/products" } };
type Params = Promise<{ q?: string; category?: string; size?: string; color?: string; sort?: string }>;

export default async function ProductsPage({ searchParams }: { searchParams: Params }) {
  const params = await searchParams;
  const keyword = params.q?.trim().toLowerCase() ?? "";
  const category = params.category?.trim().toLowerCase() ?? "";
  const size = params.size?.trim().toLowerCase() ?? "";
  const color = params.color?.trim().toLowerCase() ?? "";
  const sort = params.sort ?? "featured";
  let filtered = products.filter((product) => {
    const haystack = [product.name, product.category, product.tag, product.description, ...product.details].join(" ").toLowerCase();
    return (!keyword || haystack.includes(keyword)) && (!category || product.category.toLowerCase() === category) && (!size || product.sizes.some((item) => item.toLowerCase() === size)) && (!color || product.colors.some((item) => item.toLowerCase() === color));
  });
  filtered = [...filtered].sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : sort === "newest" ? b.slug.localeCompare(a.slug) : Number(b.qualityStatus === "approved") - Number(a.qualityStatus === "approved"));
  const categories = ["Activewear", "Swimwear", "Intimates"];
  const sizes = Array.from(new Set(products.flatMap((p) => p.sizes))).sort();
  const colors = Array.from(new Set(products.flatMap((p) => p.colors))).sort();
  const filterUrl = (key: string, value: string) => { const next = new URLSearchParams(); if (key !== "category" && category) next.set("category", category); if (key !== "size" && size) next.set("size", size); if (key !== "color" && color) next.set("color", color); if (key !== "sort" && sort !== "featured") next.set("sort", sort); if (key !== "q" && keyword) next.set("q", keyword); if (value) next.set(key, value); return `/products?${next.toString()}`; };

  return <main className="min-h-screen"><Header /><div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 md:px-8"><header className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><div><p className="text-[10px] font-semibold tracking-[.28em]">THE COLLECTION</p><h1 className="serif mt-3 text-5xl leading-none sm:text-6xl md:text-7xl">The Elarossa Edit</h1><p className="mt-4 max-w-2xl text-sm leading-6 opacity-65">A focused collection of feminine essentials for movement, rest, travel and everyday confidence.</p></div><form action="/products" className="flex w-full max-w-md border-b border-[#cfc1ba] py-3"><input name="q" defaultValue={params.q ?? ""} aria-label="Search products" placeholder="Search the collection…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-45" /><button type="submit" className="ml-3 min-h-10 text-[10px] font-semibold tracking-[.18em]">SEARCH</button></form></header>
    <div className="mt-10 flex flex-col gap-4 border-y border-[#e8ded8] py-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex gap-5 overflow-x-auto text-[9px] tracking-[.16em]"><Link href="/products" className="whitespace-nowrap font-semibold">ALL</Link>{categories.map((item) => <Link key={item} href={filterUrl("category", item.toLowerCase())} className="whitespace-nowrap opacity-55 hover:opacity-100">{item.toUpperCase()}</Link>)}</div><div className="flex flex-wrap gap-2 text-[9px] tracking-[.12em]"><select aria-label="Filter by size" defaultValue={size} onChange={() => {}} className="min-h-10 border border-[#d9ccc5] bg-transparent px-3"><option value="">SIZE</option>{sizes.map((item) => <option key={item} value={item.toLowerCase()}>{item}</option>)}</select><select aria-label="Filter by color" defaultValue={color} onChange={() => {}} className="min-h-10 border border-[#d9ccc5] bg-transparent px-3"><option value="">COLOUR</option>{colors.map((item) => <option key={item} value={item.toLowerCase()}>{item}</option>)}</select><select aria-label="Sort products" defaultValue={sort} onChange={() => {}} className="min-h-10 border border-[#d9ccc5] bg-transparent px-3"><option value="featured">FEATURED</option><option value="newest">NEWEST</option><option value="price-asc">PRICE ↑</option><option value="price-desc">PRICE ↓</option></select></div></div>
    <div className="mb-7 mt-5 flex items-center justify-between text-[9px] tracking-[.16em] opacity-50"><span>{filtered.length} PIECES</span>{(keyword || category || size || color || sort !== "featured") && <Link href="/products" className="underline underline-offset-4">CLEAR FILTERS</Link>}</div>
    {filtered.length ? <section className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4" aria-label="Product collection">{filtered.map((product) => <ProductCard key={product.slug} product={product} />)}</section> : <div className="py-20 text-center"><p className="serif text-3xl">Nothing matched this edit.</p><p className="mt-3 text-sm opacity-60">Try another search, category or colour.</p><Link href="/products" className="mt-6 inline-flex min-h-11 items-center underline underline-offset-4 text-[10px] font-semibold tracking-[.18em]">VIEW ALL PIECES</Link></div>}
  </div></main>;
}
