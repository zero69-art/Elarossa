import Link from "next/link";
import { products } from "@/lib/products";
import CartBadge from "@/components/CartBadge";

const collections = [
  { title: "Active", text: "Sculpted essentials for movement and studio days.", href: "/products?q=activewear", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85" },
  { title: "Swim", text: "Clean silhouettes for sun, water and escape.", href: "/products?q=swimwear", image: "https://images.unsplash.com/photo-1570976447640-acf6b1b4b6f7?auto=format&fit=crop&w=900&q=85" },
  { title: "Intimates", text: "Second-skin layers designed for everyday confidence.", href: "/products?q=lingerie", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85" },
];

export default function Home() {
  const featured = products.slice(0, 4);
  return <main>
    <div className="bg-[#201b1b] px-4 py-2.5 text-center text-[9px] tracking-[.18em] text-white sm:text-[10px] sm:tracking-[.25em]">FREE SHIPPING ON ORDERS OVER $75 · US & EUROPE</div>
    <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-7">
      <Link href="/products" className="text-[10px] tracking-[.25em] sm:text-xs">SHOP</Link>
      <Link href="/" className="serif text-xl tracking-[.12em] sm:text-3xl">ELAROSSA</Link>
      <div className="flex items-center gap-3 text-[10px] tracking-[.16em] sm:gap-5 sm:text-xs sm:tracking-[.2em]"><Link href="/products" className="hidden sm:inline">DISCOVER</Link><Link href="/cart">BAG<CartBadge /></Link></div>
    </nav>

    <section className="mx-3 overflow-hidden rounded-[1.5rem] bg-[#dfd2cc] sm:mx-6 sm:rounded-[2rem] md:mx-8">
      <div className="relative min-h-[600px] sm:min-h-[650px] md:min-h-[680px]">
        <div className="absolute inset-0 bg-cover bg-center md:left-1/2" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1400&q=85')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#201b1b]/55 via-transparent to-transparent md:bg-gradient-to-r md:from-[#dfd2cc] md:via-[#dfd2cc]/80 md:to-transparent" />
        <div className="relative z-10 flex min-h-[600px] max-w-xl flex-col justify-end px-6 pb-10 text-white sm:min-h-[650px] sm:px-10 sm:pb-14 md:min-h-[680px] md:justify-center md:px-16 md:pb-0 md:text-[#201b1b]">
          <p className="mb-4 text-[10px] tracking-[.28em] sm:text-xs sm:tracking-[.35em]">THE ELAROSSA EDIT</p>
          <h1 className="serif text-[3.4rem] leading-[.9] sm:text-6xl md:text-8xl">Feel<br/><i>beautifully</i><br/>yourself.</h1>
          <p className="mt-6 max-w-md text-sm leading-6 opacity-85">Curated feminine essentials for movement, confidence, travel and the everyday.</p>
          <Link href="/products" className="mt-7 w-fit bg-[#201b1b] px-7 py-4 text-[10px] tracking-[.2em] text-white sm:px-8 sm:text-xs">SHOP THE EDIT</Link>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:px-8">
      <div className="mb-8 flex items-end justify-between gap-5 sm:mb-10"><div><p className="text-[10px] tracking-[.28em] sm:text-xs">SHOP BY MOOD</p><h2 className="serif mt-2 text-3xl sm:mt-3 sm:text-4xl">The Elarossa Edit</h2></div><Link href="/products" className="shrink-0 text-[10px] tracking-[.15em] underline sm:text-xs">VIEW ALL</Link></div>
      <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">{collections.map(c => <Link href={c.href} key={c.title} className="group"><div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e9dfda]"><img src={c.image} alt={c.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 pt-20 text-white sm:p-6 sm:pt-24"><p className="serif text-2xl">{c.title}</p><p className="mt-1 text-xs leading-5 opacity-80">{c.text}</p></div></div></Link>)}</div>
    </section>

    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 md:px-8">
      <div className="mb-8 sm:mb-10"><p className="text-[10px] tracking-[.28em] sm:text-xs">STARTING POINT</p><h2 className="serif mt-2 text-3xl sm:text-4xl">Pieces worth discovering.</h2><p className="mt-3 max-w-xl text-sm leading-6 opacity-60">We curate first, then scale what customers actually love. Every supplier item remains subject to quality and delivery verification.</p></div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-5 md:grid-cols-4">{featured.map(p => <Link href={`/products/${p.slug}`} key={p.slug} className="group min-w-0"><div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e9dfda]"><img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><span className="absolute left-2 top-2 bg-white/90 px-2 py-1.5 text-[8px] tracking-widest sm:left-4 sm:top-4 sm:px-3 sm:py-2 sm:text-[10px]">{p.tag}</span></div><div className="flex flex-col gap-1 py-3 text-xs sm:flex-row sm:justify-between sm:gap-3 sm:py-4 sm:text-sm"><span className="line-clamp-2">{p.name}</span><span className="shrink-0">${p.price.toFixed(2)}</span></div></Link>)}</div>
    </section>

    <section className="bg-[#201b1b] px-5 py-16 text-center text-white sm:px-6 sm:py-24"><p className="text-[10px] tracking-[.28em] opacity-60">OUR STANDARD</p><h2 className="serif mx-auto mt-4 max-w-3xl text-3xl leading-tight sm:text-5xl md:text-6xl">Less noise. Better pieces. More confidence.</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-6 opacity-65">Elarossa is built around a simple idea: discover fewer pieces, choose carefully, and improve the collection based on real customer response.</p><Link href="/products" className="mt-7 inline-block border border-white/40 px-7 py-4 text-[10px] tracking-[.2em] sm:text-xs">EXPLORE COLLECTION</Link></section>

    <footer className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-[10px] sm:px-6 sm:py-12 sm:text-xs md:flex-row md:items-center md:justify-between md:px-8"><Link href="/" className="serif text-xl tracking-widest sm:text-2xl">ELAROSSA</Link><div className="flex flex-wrap gap-x-4 gap-y-3"><Link href="/privacy">PRIVACY</Link><Link href="/terms">TERMS</Link><Link href="/shipping">SHIPPING</Link><Link href="/returns">RETURNS</Link></div><span>© 2026 Elarossa</span></footer>
  </main>;
}
