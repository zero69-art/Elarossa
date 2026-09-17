import Link from "next/link";
import { products } from "@/lib/products";
import CartBadge from "@/components/CartBadge";

const collections = [
  { title: "Active", eyebrow: "MOVE WITH EASE", text: "Sculpted essentials for movement and studio days.", href: "/products?q=activewear", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85" },
  { title: "Swim", eyebrow: "SUN · WATER · ESCAPE", text: "Clean silhouettes for sun, water and escape.", href: "/products?q=swimwear", image: "https://images.unsplash.com/photo-1570976447640-acf6b1b4b6f7?auto=format&fit=crop&w=1200&q=85" },
  { title: "Intimates", eyebrow: "EVERYDAY CONFIDENCE", text: "Second-skin layers designed for everyday confidence.", href: "/products?q=intimates", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=85" },
];

const buttonClass = "inline-flex min-h-12 items-center justify-center bg-[#201b1b] px-6 text-[10px] font-semibold tracking-[.2em] text-white transition hover:bg-[#a65d68] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a65d68] sm:px-8 sm:text-xs";

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <main className="min-h-screen">
      <div className="bg-[#201b1b] px-4 py-2.5 text-center text-[9px] font-semibold tracking-[.18em] text-white sm:text-[10px] sm:tracking-[.25em]" role="note">
        FREE SHIPPING ON ORDERS OVER $75 · US & EUROPE
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-7 md:px-8">
        <Link href="/products" className="rounded-sm text-[10px] font-semibold tracking-[.25em] transition hover:text-[#a65d68] focus-visible:outline focus-visible:outline-2 sm:text-xs">SHOP</Link>
        <Link href="/" aria-label="Elarossa home" className="serif text-xl tracking-[.12em] sm:text-3xl">ELAROSSA</Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-3 text-[10px] font-semibold tracking-[.16em] sm:gap-5 sm:text-xs sm:tracking-[.2em]">
          <Link href="/products" className="hidden transition hover:text-[#a65d68] sm:inline">DISCOVER</Link>
          <Link href="/cart" className="flex min-h-11 items-center gap-1 rounded-sm transition hover:text-[#a65d68] focus-visible:outline focus-visible:outline-2">BAG <CartBadge /></Link>
        </nav>
      </header>

      <section className="mx-3 overflow-hidden rounded-[1.5rem] bg-[#dfd2cc] sm:mx-6 sm:rounded-[2rem] md:mx-8" aria-labelledby="hero-title">
        <div className="relative isolate min-h-[590px] sm:min-h-[650px] md:min-h-[680px]">
          <div className="absolute inset-0 -z-10 bg-cover bg-center md:left-1/2" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1600&q=85')" }} aria-hidden="true" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#201b1b]/75 via-[#201b1b]/10 to-transparent md:bg-gradient-to-r md:from-[#dfd2cc] md:via-[#dfd2cc]/90 md:to-transparent" aria-hidden="true" />
          <div className="flex min-h-[590px] max-w-xl flex-col justify-end px-6 pb-10 text-white sm:min-h-[650px] sm:px-10 sm:pb-14 md:min-h-[680px] md:justify-center md:px-16 md:pb-0 md:text-[#201b1b]">
            <p className="mb-4 text-[10px] font-semibold tracking-[.28em] sm:text-xs sm:tracking-[.35em]">THE ELAROSSA EDIT</p>
            <h1 id="hero-title" className="serif text-[3.35rem] leading-[.92] sm:text-6xl md:text-8xl">Feel<br /><i>beautifully</i><br />yourself.</h1>
            <p className="mt-6 max-w-md text-sm leading-6 opacity-90">Curated feminine essentials for movement, confidence, travel and the everyday.</p>
            <Link href="/products" className={`${buttonClass} mt-7 w-fit`}>SHOP THE EDIT <span className="ml-4" aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:px-8" aria-labelledby="collections-title">
        <div className="mb-8 flex items-end justify-between gap-5 sm:mb-10">
          <div><p className="text-[10px] font-semibold tracking-[.28em] sm:text-xs">SHOP BY MOOD</p><h2 id="collections-title" className="serif mt-2 text-3xl sm:mt-3 sm:text-4xl">The Elarossa Edit</h2></div>
          <Link href="/products" className="shrink-0 text-[10px] font-semibold tracking-[.15em] underline underline-offset-4 transition hover:text-[#a65d68] sm:text-xs">VIEW ALL ↗</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {collections.map((collection) => (
            <Link href={collection.href} key={collection.title} className="group rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a65d68]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e9dfda]">
                <img src={collection.image} alt={`${collection.title} collection`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-24 text-white sm:p-6 sm:pt-28"><p className="text-[9px] font-semibold tracking-[.2em] opacity-80">{collection.eyebrow}</p><p className="serif mt-2 text-2xl">{collection.title}</p><p className="mt-1 text-xs leading-5 opacity-85">{collection.text}</p><span className="mt-4 inline-block text-[10px] font-semibold tracking-[.18em] underline underline-offset-4">EXPLORE ↗</span></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 md:px-8" aria-labelledby="featured-title">
        <div className="mb-8 sm:mb-10"><p className="text-[10px] font-semibold tracking-[.28em] sm:text-xs">STARTING POINT</p><h2 id="featured-title" className="serif mt-2 text-3xl sm:text-4xl">Pieces worth discovering.</h2><p className="mt-3 max-w-xl text-sm leading-6 opacity-65">We curate first, then scale what customers actually love. Every supplier item remains subject to quality and delivery verification.</p></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-5 md:grid-cols-4">
          {featured.map((product) => (
            <Link href={`/products/${product.slug}`} key={product.slug} className="group min-w-0 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a65d68]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e9dfda]"><img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-2 top-2 bg-white/95 px-2 py-1.5 text-[8px] font-semibold tracking-widest sm:left-4 sm:top-4 sm:px-3 sm:py-2 sm:text-[10px]">{product.tag}</span></div>
              <div className="flex flex-col gap-1 py-3 text-xs sm:flex-row sm:justify-between sm:gap-3 sm:py-4 sm:text-sm"><span className="line-clamp-2 leading-5">{product.name}</span><span className="shrink-0 font-semibold">${product.price.toFixed(2)}</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#201b1b] px-5 py-16 text-center text-white sm:px-6 sm:py-24" aria-labelledby="standard-title"><p className="text-[10px] font-semibold tracking-[.28em] opacity-60">OUR STANDARD</p><h2 id="standard-title" className="serif mx-auto mt-4 max-w-3xl text-3xl leading-tight sm:text-5xl md:text-6xl">Less noise. Better pieces. More confidence.</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-6 opacity-70">Discover fewer pieces, choose carefully, and help shape the collection through real customer response.</p><Link href="/products" className="mt-7 inline-flex min-h-12 items-center border border-white/50 px-7 text-[10px] font-semibold tracking-[.2em] transition hover:bg-white hover:text-[#201b1b] sm:text-xs">EXPLORE COLLECTION ↗</Link></section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-[10px] sm:px-6 sm:py-12 sm:text-xs md:flex-row md:items-center md:justify-between md:px-8"><Link href="/" className="serif text-xl tracking-widest sm:text-2xl">ELAROSSA</Link><div className="flex flex-wrap gap-x-4 gap-y-3"><Link href="/privacy" className="transition hover:text-[#a65d68]">PRIVACY</Link><Link href="/terms" className="transition hover:text-[#a65d68]">TERMS</Link><Link href="/shipping" className="transition hover:text-[#a65d68]">SHIPPING</Link><Link href="/returns" className="transition hover:text-[#a65d68]">RETURNS</Link></div><span>© 2026 Elarossa</span></footer>
    </main>
  );
}
