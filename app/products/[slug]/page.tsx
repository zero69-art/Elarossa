import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, products, getMargin } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} | Elarossa`,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: `${product.name} | Elarossa`, description: product.description, images: [product.image] }
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const margin = getMargin(product);

  return (
    <main className="min-h-screen">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
        <a href="/" className="text-xs tracking-[.3em]">ELAROSSA</a>
        <a href="/products" className="text-xs tracking-[.2em] underline">SHOP ALL</a>
      </nav>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-[#e9dfda]"><img src={product.image} alt={product.name} className="h-full min-h-[520px] w-full object-cover" /></div>
        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[.3em] opacity-60">{product.category} · {product.tag}</p>
          <h1 className="serif mt-4 text-5xl leading-tight">{product.name}</h1>
          <p className="mt-5 text-2xl">${product.price.toFixed(2)}</p>
          {product.compareAtPrice && <p className="mt-1 text-sm line-through opacity-50">${product.compareAtPrice.toFixed(2)}</p>}
          <p className="mt-7 max-w-xl text-sm leading-7 opacity-75">{product.description}</p>
          <div className="mt-8"><p className="text-xs tracking-[.2em]">SIZE</p><div className="mt-3 flex flex-wrap gap-2">{product.sizes.map((size) => <button key={size} className="border border-[#d8ccc5] px-5 py-3 text-xs">{size}</button>)}</div></div>
          <div className="mt-7"><p className="text-xs tracking-[.2em]">COLOR</p><div className="mt-3 flex flex-wrap gap-2">{product.colors.map((color) => <button key={color} className="border border-[#d8ccc5] px-5 py-3 text-xs">{color}</button>)}</div></div>
          <button className="mt-9 bg-[#201b1b] px-8 py-5 text-xs tracking-[.25em] text-white">ADD TO BAG</button>
          <div className="mt-9 border-t border-[#e8ded8] pt-7"><p className="text-xs tracking-[.2em]">DETAILS</p><ul className="mt-4 space-y-2 text-sm opacity-70">{product.details.map((detail) => <li key={detail}>— {detail}</li>)}</ul></div>
          <p className="mt-7 text-[11px] leading-5 opacity-50">Elarossa quality policy: supplier products remain sample-required until fabric, fit, finish, packaging and delivery are verified.</p>
        </div>
      </section>
    </main>
  );
}
