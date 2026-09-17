import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { journalPosts } from "@/lib/journal";

export const metadata: Metadata = { title: "Journal", description: "The Elarossa journal — style, movement, travel and considered everyday living." };

export default function JournalPage() {
  return <main className="min-h-screen"><Header /><div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 md:px-8"><header className="max-w-3xl"><p className="text-[10px] font-semibold tracking-[.28em]">FROM THE JOURNAL</p><h1 className="serif mt-3 text-5xl leading-none sm:text-7xl">Ideas for living beautifully.</h1><p className="mt-5 max-w-2xl text-sm leading-7 opacity-65">Notes on personal style, movement, travel and the small decisions that make everyday life feel more considered.</p></header><section className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" aria-label="Journal articles">{journalPosts.map((post, index) => <article key={post.slug} className={index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}><Link href={`/journal/${post.slug}`} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a65d68]"><div className={`overflow-hidden bg-[#e9dfda] ${index === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}`}><img src={post.image} alt={post.title} loading={index === 0 ? "eager" : "lazy"} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div><p className="mt-5 text-[9px] font-semibold tracking-[.2em] opacity-50">{post.category}</p><h2 className="serif mt-2 text-2xl sm:text-3xl">{post.title}</h2><p className="mt-2 max-w-xl text-sm leading-6 opacity-65">{post.excerpt}</p><span className="mt-4 inline-block text-[10px] font-semibold tracking-[.18em] underline underline-offset-4">READ MORE →</span></Link></article>)}</section></div></main>;
}
