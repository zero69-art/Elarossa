import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { journalPosts } from "@/lib/journal";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://elarossa.vercel.app";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/shop`, changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/active`, changeFrequency: "daily", priority: 0.85 },
    { url: `${baseUrl}/swim`, changeFrequency: "daily", priority: 0.85 },
    { url: `${baseUrl}/intimates`, changeFrequency: "daily", priority: 0.85 },
    { url: `${baseUrl}/journal`, changeFrequency: "weekly", priority: 0.7 },
    ...journalPosts.map((post) => ({ url: `${baseUrl}/journal/${post.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...products.map((product) => ({ url: `${baseUrl}/products/${product.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/shipping`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/returns`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, changeFrequency: "monthly", priority: 0.2 },
    { url: `${baseUrl}/terms`, changeFrequency: "monthly", priority: 0.2 },
  ];
}
