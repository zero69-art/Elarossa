import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop Women's Activewear, Swimwear & Intimates | Elarossa",
  description: "Shop Elarossa's curated women's activewear, swimwear and intimate essentials. Designed for confidence, movement and elevated everyday style."
};

export default function ProductsPage() {
  return (
    <main>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7"><Link href="/" className="serif text-3xl tracking-[.12em]">ELAROSSA</Link><Link href="/" className="text-xs tracking-[.2em] underline">HOME</Link></nav>
      <header className="mx-auto max-w-7xl px-6 pb-14 pt-10"><p className="text-xs tracking-[.3em]">THE COLLECTION</p><h1 className="serif mt-4 text-5xl md:text-7xl">The Elarossa Edit</h1><p className="mt-5 max-w-2xl text-sm leading-6 opacity-70">A focused collection of feminine essentials. We prioritize quality, fit and customer trust over catalogue size.</p></header>
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 md:grid-cols-3">{products.map((product) => <Link key={product.slug} href={`/products/${product.slug}`} className="group"><div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#e9dfda]"><img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><span className="absolute left-4 top-4 bg-white/90 px-3 py-2 text-[10px] tracking-widest">{product.tag}</span></div><div className="flex justify-between py-4 text-sm"><span>{product.name}</span><span>${product.price.toFixed(2)}</span></div><p className="text-xs opacity-50">{product.category}</p></Link>)}</section>
    </main>
  );
}
