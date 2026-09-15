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
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: `${product.name} | Elarossa`, description: product.description, images: [product.image] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const storeLive = process.env.ELAROSSA_STORE_LIVE === "true";
  const gallery = product.gallery.length ? product.gallery.slice(0, 4) : [product.image];

  return <main className="min-h-screen">
    <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-7"><Link href="/" className="serif text-xl tracking-[.12em] sm:text-3xl">ELAROSSA</Link><div className="flex gap-4 text-[10px] tracking-[.18em] sm:gap-5 sm:text-xs"><Link href="/products">SHOP</Link><Link href="/cart">BAG<CartBadge /></Link></div></nav>
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 md:px-8">
      <Link href="/products" className="text-[10px] tracking-[.18em] opacity-55">← BACK TO EDIT</Link>
      <section className="mt-7 grid gap-8 md:mt-10 md:grid-cols-2 md:gap-12">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">{gallery.map((image, index) => <div key={`${image}-${index}`} className={`overflow-hidden rounded-2xl bg-[#e9dfda] ${index === 0 ? "col-span-2" : ""}`}><img src={image} alt={`${product.name} ${index + 1}`} className={`w-full object-cover ${index === 0 ? "aspect-[4/5]" : "aspect-square"}`} /></div>)}</div>
        <div className="md:sticky md:top-8 md:h-fit"><p className="text-[10px] tracking-[.28em] opacity-55">{product.category} · {product.tag}</p><h1 className="serif mt-3 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">{product.name}</h1><p className="mt-5 text-xl sm:text-2xl">${product.price.toFixed(2)}</p>{product.compareAtPrice && <p className="mt-1 text-sm line-through opacity-45">${product.compareAtPrice.toFixed(2)}</p>}<p className="mt-6 max-w-xl text-sm leading-7 opacity-70">{product.description}</p><AddToBag product={product} storeLive={storeLive}/><div className="mt-8 border-t border-[#e8ded8] pt-6"><p className="text-[10px] tracking-[.2em]">DETAILS</p><ul className="mt-4 space-y-2 text-sm opacity-65">{product.details.map(detail=><li key={detail}>— {detail}</li>)}</ul></div><div className="mt-7 border-t border-[#e8ded8] pt-6 text-[10px] leading-5 opacity-55"><strong className="text-sm opacity-100">QUALITY REVIEW</strong><br />This collection item is currently marked for supplier sample verification before any quality claim is made.</div></div>
      </section>
    </div>
  </main>;
}
