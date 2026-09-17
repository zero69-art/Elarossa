import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProduct } from "@/lib/products";
import AddToBag from "@/components/AddToBag";
import CartBadge from "@/components/CartBadge";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.seoTitle, description: product.metaDescription, keywords: [product.name, "women's fashion", product.category.toLowerCase(), "Elarossa"], alternates: { canonical: `/products/${product.slug}` }, openGraph: { title: product.seoTitle, description: product.metaDescription, images: [{ url: product.image, alt: `${product.name} | Elarossa` }] } };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const storeLive = process.env.ELAROSSA_STORE_LIVE === "true";
  const gallery = product.gallery.length ? product.gallery.slice(0, 4) : [product.image];

  return <main className="min-h-screen">
    <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-7">
      <Link href="/" className="serif text-xl tracking-[.12em] sm:text-3xl" aria-label="Elarossa home">ELAROSSA</Link>
      <div className="flex items-center gap-4 text-[10px] tracking-[.18em] sm:gap-5 sm:text-xs"><Link href="/products" className="transition-opacity hover:opacity-60">SHOP</Link><Link href="/cart" className="transition-opacity hover:opacity-60">BAG<CartBadge /></Link></div>
    </nav>
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 md:px-8">
      <Link href="/products" className="inline-flex min-h-11 items-center text-[10px] tracking-[.18em] opacity-55 transition-opacity hover:opacity-100">← BACK TO EDIT</Link>
      <section className="mt-5 grid gap-8 md:mt-8 md:grid-cols-[minmax(0,1.15fr)_minmax(340px,.85fr)] md:gap-12 lg:gap-16">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">{gallery.map((image, index) => <div key={`${image}-${index}`} className={`group overflow-hidden rounded-2xl bg-[#e9dfda] sm:rounded-3xl ${index === 0 ? "col-span-2" : ""}`}><img src={image} alt={`${product.name} | Elarossa | ${product.category} ${index + 1}`} className={`w-full object-cover transition duration-700 group-hover:scale-[1.025] ${index === 0 ? "aspect-[4/5]" : "aspect-square"}`} /></div>)}</div>
        <div className="md:sticky md:top-6 md:h-fit">
          <div className="flex flex-wrap items-center gap-2 text-[9px] tracking-[.2em] opacity-55"><span>{product.category}</span><span>·</span><span>{product.tag}</span></div>
          <h1 className="serif mt-3 text-4xl leading-[1.02] sm:text-5xl md:text-6xl">{product.name}</h1>
          <div className="mt-5 flex items-baseline gap-3"><p className="text-xl sm:text-2xl">${product.price.toFixed(2)}</p>{product.compareAtPrice && <p className="text-sm line-through opacity-40">${product.compareAtPrice.toFixed(2)}</p>}</div>
          <div className="mt-5 flex flex-wrap gap-2 text-[9px] tracking-[.16em]"><span className="rounded-full border border-[#d8ccc5] px-3 py-2">CURATED ITEM</span><span className="rounded-full border border-[#d8ccc5] px-3 py-2">QUALITY CHECKED</span></div>
          <p className="mt-6 max-w-xl text-sm leading-7 opacity-70">{product.description}</p>
          <AddToBag product={product} storeLive={storeLive}/>
          <div className="mt-9 border-t border-[#e8ded8] pt-6"><p className="text-[10px] tracking-[.2em]">DETAILS</p><ul className="mt-4 space-y-2 text-sm leading-6 opacity-65">{product.details.map(detail=><li key={detail}>— {detail}</li>)}</ul></div>
          <div className="mt-7 grid grid-cols-3 border-y border-[#e8ded8] py-5 text-center"><div><p className="text-[9px] tracking-[.15em] opacity-50">SHIPPING</p><p className="mt-1 text-[11px]">5–12 DAYS</p></div><div className="border-x border-[#e8ded8]"><p className="text-[9px] tracking-[.15em] opacity-50">PACKING</p><p className="mt-1 text-[11px]">CAREFULLY</p></div><div><p className="text-[9px] tracking-[.15em] opacity-50">SUPPORT</p><p className="mt-1 text-[11px]">HERE TO HELP</p></div></div>
          <div className="mt-7 rounded-2xl bg-white/45 p-5 text-[10px] leading-5 opacity-70"><strong className="text-[11px] opacity-100">QUALITY REVIEW</strong><br />Supplier sample verification is required before this item is approved for sale. Product claims are kept conservative until that review is complete.</div>
        </div>
      </section>
    </div>
  </main>;
}
