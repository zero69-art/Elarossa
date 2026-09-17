import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";
import CartBadge from "@/components/CartBadge";

export const metadata: Metadata = {
  title: "Shop Women's Essentials | Elarossa",
  description: "Discover Elarossa's curated activewear, swimwear and intimate essentials.",
};

type SearchParams = Promise<{ q?: string }>;
const filters = ["", "activewear", "swimwear", "intimates"];

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const keyword = params.q?.trim().toLowerCase() ?? "";
  const filteredProducts = products.filter((product) => {
    if (!keyword) return true;
    const haystack = [product.name, product.category, product.tag, product.description, ...product.details].join(" ").toLowerCase();
    return haystack.includes(keyword);
  });

  return (
    <main className="min-h-screen">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-7 md:px-8">
        <Link href="/" className="serif text-xl tracking-[.12em] sm:text-3xl">ELAROSSA</Link>
        <div className="flex items-center gap-4 text-[10px] tracking-[.18em] sm:gap-6 sm:text-xs">
          <Link href="/" className="hidden opacity-65 transition-opacity hover:opacity-100 sm:inline">HOME</Link>
          <Link href="/cart" className="transition-opacity hover:opacity-60">BAG <CartBadge /></Link>
        </div>
      </nav>

      <header className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-10 md:px-8">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] tracking-[.28em] sm:text-xs">THE COLLECTION</p>
            <h1 className="serif mt-3 text-4xl leading-none sm:text-5xl md:text-7xl">The Elarossa Edit</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 opacity-65">A focused collection of feminine essentials for movement, rest, travel and everyday confidence.</p>
          </div>
          <form className="flex w-full max-w-md rounded-full border border-[#d9cbc4] bg-white/45 px-4 py-3" action="/products">
            <input name="q" defaultValue={params.q ?? ""} aria-label="Search products" placeholder="Search the collection…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-45" />
            <button className="ml-3 text-[10px] font-semibold tracking-[.2em] transition-opacity hover:opacity-55 sm:text-xs" type="submit">SEARCH</button>
          </form>
        </div>
        <div className="mt-8 flex items-center gap-3 overflow-x-auto border-b border-[#e8ded8] pb-4 text-[9px] tracking-[.18em] sm:gap-6 sm:text-[10px]">
          {filters.map((filter) => <Link key={filter || "all"} href={filter ? `/products?q=${filter}` : "/products"} className={`whitespace-nowrap transition-opacity hover:opacity-100 ${keyword === filter ? "border-b border-[#201b1b] pb-2 font-semibold" : "opacity-50"}`}>{filter ? filter.toUpperCase() : "ALL PIECES"}</Link>)}
          <span className="ml-auto hidden whitespace-nowrap opacity-45 sm:inline">{filteredProducts.length} PIECES</span>
        </div>
      </header>

      {filteredProducts.length > 0 ? (
        <section className="mx-auto grid max-w-7xl grid-cols-2 gap-x-3 gap-y-9 px-4 pb-16 sm:gap-5 sm:px-6 sm:pb-20 md:px-8 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className="group min-w-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e9dfda] sm:rounded-3xl">
                <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1.5 text-[8px] tracking-widest sm:left-4 sm:top-4 sm:px-3 sm:py-2 sm:text-[10px]">{product.tag}</span>
                {product.qualityStatus !== "approved" && <span className="absolute bottom-2 left-2 rounded-full bg-[#201b1b]/80 px-2.5 py-1.5 text-[8px] tracking-wide text-white sm:bottom-4 sm:left-4">PRE-LAUNCH</span>}
              </div>
              <div className="flex flex-col gap-1 py-3 sm:py-4">
                <div className="flex items-start justify-between gap-3 text-xs sm:text-sm"><span className="line-clamp-2 leading-5">{product.name}</span><span className="shrink-0">${product.price.toFixed(2)}</span></div>
                <p className="text-[9px] uppercase tracking-wider opacity-45 sm:text-[10px]">{product.category}</p>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <div className="mx-auto max-w-2xl px-4 pb-24 text-center"><p className="text-sm opacity-65">No pieces matched your search.</p><Link href="/products" className="mt-5 inline-block underline text-xs tracking-[.18em]">VIEW ALL PIECES</Link></div>
      )}
    </main>
  );
}
