import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { getJournalPost, journalPosts } from "@/lib/journal";

export function generateStaticParams() { return journalPosts.map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const post = getJournalPost(slug); if (!post) return {};
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/journal/${post.slug}` }, openGraph: { type: "article", title: post.title, description: post.excerpt, images: [{ url: post.image, alt: post.title }] } };
}

export default async function JournalArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const post = getJournalPost(slug); if (!post) notFound();
  return <main className="min-h-screen"><Header /><article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20 md:px-8"><Link href="/journal" className="inline-flex min-h-11 items-center text-[10px] font-semibold tracking-[.18em] opacity-55 hover:opacity-100">← JOURNAL</Link><header className="mx-auto mt-8 max-w-3xl text-center"><p className="text-[10px] font-semibold tracking-[.25em] opacity-50">{post.category}</p><h1 className="serif mt-4 text-5xl leading-[.98] sm:text-7xl">{post.title}</h1><p className="mt-5 text-sm leading-7 opacity-65">{post.excerpt}</p></header><div className="mt-10 aspect-[16/9] overflow-hidden bg-[#e9dfda] sm:mt-14"><img src={post.image} alt={post.title} className="h-full w-full object-cover" /></div><div className="mx-auto max-w-2xl py-10 sm:py-14">{post.body.map((paragraph) => <p key={paragraph} className="mb-7 text-base leading-8 opacity-75 last:mb-0">{paragraph}</p>)}</div></article></main>;
}
