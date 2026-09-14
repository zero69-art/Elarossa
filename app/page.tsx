const products = [
  { name: "Sculpt Seamless Set", price: "$39", tag: "BESTSELLER", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80" },
  { name: "Satin Hour Bikini", price: "$34", tag: "NEW", image: "https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=900&q=80" },
  { name: "Second Skin Bra", price: "$29", tag: "EVERYDAY", image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80" },
];

export default function Home() {
  return (
    <main>
      <div className="bg-[#201b1b] px-4 py-2 text-center text-[11px] tracking-[.2em] text-white">FREE SHIPPING ON ORDERS OVER $75</div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
        <div className="text-xs tracking-[.3em]">MENU</div>
        <div className="serif text-3xl tracking-[.12em]">ELAROSSA</div>
        <div className="flex gap-5 text-xs"><span>SEARCH</span><span>ACCOUNT</span><span>BAG (0)</span></div>
      </nav>

      <section className="relative mx-4 overflow-hidden rounded-[2rem] bg-[#dfd2cc] px-7 py-20 md:mx-8 md:px-16 md:py-32">
        <div className="relative z-10 max-w-xl">
          <p className="mb-5 text-xs tracking-[.35em]">THE NEW FEMININE STANDARD</p>
          <h1 className="serif text-5xl leading-[.95] md:text-8xl">Made to feel<br/><i>beautifully</i> you.</h1>
          <p className="mt-7 max-w-md text-sm leading-6 opacity-75">Elevated essentials designed for movement, confidence and every version of you.</p>
          <button className="mt-8 bg-[#201b1b] px-8 py-4 text-xs tracking-[.2em] text-white">SHOP THE EDIT</button>
        </div>
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-cover bg-center md:block" style={{backgroundImage:"url('https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85')"}} />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8">
        <div className="mb-10 flex items-end justify-between"><div><p className="text-xs tracking-[.3em]">CURATED FOR YOU</p><h2 className="serif mt-3 text-4xl">The Elarossa Edit</h2></div><span className="text-xs underline">VIEW ALL</span></div>
        <div className="grid gap-5 md:grid-cols-3">{products.map(p => <article key={p.name}><div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e9dfda]"><img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-500 hover:scale-105"/><span className="absolute left-4 top-4 bg-white/90 px-3 py-2 text-[10px] tracking-widest">{p.tag}</span></div><div className="flex justify-between py-4 text-sm"><span>{p.name}</span><span>{p.price}</span></div></article>)}</div>
      </section>

      <section className="bg-[#201b1b] px-6 py-20 text-center text-white md:py-28"><p className="text-xs tracking-[.3em] opacity-60">ELAROSSA INTELLIGENCE</p><h2 className="serif mx-auto mt-4 max-w-3xl text-4xl md:text-6xl">A smarter way to discover what feels right.</h2><p className="mx-auto mt-6 max-w-xl text-sm leading-6 opacity-70">Personalized drops, curated collections and a shopping experience that gets better with every visit.</p></section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 text-xs md:flex-row md:items-center md:justify-between"><span className="serif text-2xl tracking-widest">ELAROSSA</span><span>© 2026 Elarossa. All rights reserved.</span><span>INSTAGRAM · TIKTOK · CONTACT</span></footer>
    </main>
  );
}
