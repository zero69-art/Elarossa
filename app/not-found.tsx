import Link from "next/link";

export default function NotFound() {
  return <main className="flex min-h-screen items-center px-5 py-12 sm:px-6">
    <section className="mx-auto w-full max-w-xl rounded-[2rem] border border-[#e8ded8] bg-white/65 p-8 text-center shadow-[0_24px_80px_rgba(32,27,27,.06)] sm:p-14">
      <Link href="/" className="serif text-xl tracking-[.16em] transition-opacity hover:opacity-60 sm:text-2xl">ELAROSSA</Link>
      <p className="mt-12 text-[10px] font-semibold tracking-[.3em] opacity-45">404 · PAGE NOT FOUND</p>
      <h1 className="serif mt-4 text-5xl sm:text-6xl">This piece is missing.</h1>
      <p className="mx-auto mt-5 max-w-sm text-sm leading-7 opacity-65">The page may have moved, sold out, or never existed. Let&apos;s get you back to the collection.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/products" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#201b1b] px-8 text-[10px] font-semibold tracking-[.2em] text-white transition hover:-translate-y-0.5 hover:shadow-lg sm:text-xs">SHOP THE EDIT</Link>
        <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d8ccc5] px-8 text-[10px] font-semibold tracking-[.2em] transition hover:bg-white sm:text-xs">HOME</Link>
      </div>
    </section>
  </main>;
}
