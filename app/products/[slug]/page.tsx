import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProduct, products, getMargin } from "@/lib/products";
import AddToBag from "@/components/AddToBag";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Elarossa`,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: `${product.name} | Elarossa`, description: product.description, images: [product.image] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const margin = getMargin(product);

  return (
    <main className="min-h-screen">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
        <Link href="/" className="text-xs tracking-[.3em]">ELAROSSA</Link>
        <div className="flex gap-5 text-xs tracking-[.2em]"><Link href="/products" className="underline">SHOP ALL</Link><Link href="/cart" className="underline">BAG</Link></div>
      </nav>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-[#e9dfda]"><img src={product.image} alt={product.name} className="h-full min-h-[520px] w-full object-cover" /></div>
        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[.3em] opacity-60">{product.category} · {product.tag}</p>
          <h1 className="serif mt-4 text-5xl leading-tight">{product.name}</h1>
          <p className="mt-5 text-2xl">${product.price.toFixed(2)}</p>
          {product.compareAtPrice && <p className="mt-1 text-sm line-through opacity-50">${product.compareAtPrice.toFixed(2)}</p>}
          <p className="mt-7 max-w-xl text-sm leading-7 opacity-75">{product.description}</p>
          <AddToBag product={product} />
          <div className="mt-9 border-t border-[#e8ded8] pt-7"><p className="text-xs tracking-[.2em]">DETAILS</p><ul className="mt-4 space-y-2 text-sm opacity-70">{product.details.map((detail) => <li key={detail}>— {detail}</li>)}</ul></div>
          <div className="mt-7 grid grid-cols-2 gap-3 text-[11px] opacity-60"><p>PLANNED GROSS MARGIN<br/><strong className="text-sm opacity-100">{margin.marginPercent.toFixed(0)}%</strong></p><p>QUALITY STATUS<br/><strong className="text-sm opacity-100">SAMPLE REQUIRED</strong></p></div>
          <p className="mt-7 text-[11px] leading-5 opacity-50">Elarossa quality policy: supplier products remain sample-required until fabric, fit, finish, packaging and delivery are verified.</p>
        </div>
      </section>
    </main>
  );
}
