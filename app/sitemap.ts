import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://elarossa.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/products`, changeFrequency: "daily", priority: 0.9 },
    ...products.map((product) => ({ url: `${baseUrl}/products/${product.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    { url: `${baseUrl}/shipping`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/returns`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, changeFrequency: "monthly", priority: 0.2 },
    { url: `${baseUrl}/terms`, changeFrequency: "monthly", priority: 0.2 },
  ];
}
