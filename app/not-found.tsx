import Link from "next/link";

export default function NotFound() {
  return <main className="flex min-h-screen items-center justify-center px-6 py-20 text-center">
    <div>
      <p className="text-xs tracking-[.3em] opacity-60">ELAROSSA</p>
      <h1 className="serif mt-5 text-5xl">Page not found.</h1>
      <p className="mx-auto mt-5 max-w-sm text-sm leading-7 opacity-70">The page you're looking for doesn't exist or may have moved.</p>
      <Link href="/products" className="mt-8 inline-block bg-[#201b1b] px-8 py-4 text-xs tracking-[.2em] text-white">SHOP THE EDIT</Link>
    </div>
  </main>;
}
