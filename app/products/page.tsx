import type { Metadata } from "next";
import Link from "next/link";
import { searchCJProducts, getCJProductRows, toCJStoreProduct } from "@/lib/cj";
import { products as fallbackProducts } from "@/lib/products";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Shop Women's Fashion | Elarossa",
  description: "Explore Elarossa's live women's fashion catalogue powered by CJdropshipping, with activewear, swimwear, intimates and more.",
};

type SearchParams = Promise<{ q?: string; page?: string }>;

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
    liveProducts = rows.map(toCJStoreProduct);
    total = Number(response?.data?.total ?? response?.data?.totalCount ?? response?.data?.count ?? 0);
  } catch {
    live = false;
  }

  const visibleProducts = live && liveProducts.length ? liveProducts : fallbackProducts;
  const hasNext = live ? (total ? page * 24 < total : liveProducts.length === 24) : false;

  return (
    <main>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
        <Link href="/" className="serif text-3xl tracking-[.12em]">ELAROSSA</Link>
        <div className="flex gap-5 text-xs tracking-[.2em]"><Link href="/" className="underline">HOME</Link><Link href="/cart" className="underline">BAG</Link></div>
      </nav>

      <header className="mx-auto max-w-7xl px-6 pb-10 pt-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs tracking-[.3em]">THE COLLECTION</p>
            <h1 className="serif mt-4 text-5xl md:text-7xl">The Elarossa Edit</h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 opacity-70">A live women&apos;s fashion catalogue connected directly to CJdropshipping. Browse real supplier products, then refine the collection before launch.</p>
          </div>
          <form className="flex w-full max-w-md border-b border-[#201b1b] pb-2" action="/products">
            <input name="q" defaultValue={keyword} placeholder="Search bras, bikinis, activewear..." className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
            <button className="text-xs tracking-[.2em]" type="submit">SEARCH</button>
          </form>
        </div>
        <div className="mt-7 flex items-center justify-between text-[10px] tracking-[.18em] opacity-60">
          <span>{live ? "LIVE CJ CATALOGUE" : "CATALOGUE FALLBACK"}</span>
          <span>{liveProducts.length ? `${liveProducts.length} PRODUCTS ON THIS PAGE` : `${fallbackProducts.length} CURATED PRODUCTS`}</span>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <Link key={product.slug} href={`/products/${product.slug}`} className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#e9dfda]">
              <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute left-4 top-4 bg-white/90 px-3 py-2 text-[10px] tracking-widest">{product.tag}</span>
            </div>
            <div className="flex justify-between gap-4 py-4 text-sm"><span>{product.name}</span><span className="shrink-0">${product.price.toFixed(2)}</span></div>
            <p className="text-xs opacity-50">{product.category}</p>
          </Link>
        ))}
      </section>

      {live && (page > 1 || hasNext) && (
        <nav className="mx-auto flex max-w-7xl justify-between px-6 pb-20 text-xs tracking-[.2em]">
          {page > 1 ? <Link href={`/products?${keyword ? `q=${encodeURIComponent(keyword)}&` : ""}page=${page - 1}`} className="underline">← PREVIOUS</Link> : <span />}
          {hasNext ? <Link href={`/products?${keyword ? `q=${encodeURIComponent(keyword)}&` : ""}page=${page + 1}`} className="underline">NEXT →</Link> : <span />}
        </nav>
      )}
    </main>
  );
}
