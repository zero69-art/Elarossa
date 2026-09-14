import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const baseUrl = "https://elarossa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/products`, changeFrequency: "daily", priority: 0.9 },
    ...products.map((product) => ({ url: `${baseUrl}/products/${product.slug}`, changeFrequency: "weekly" as const, priority: 0.8 }))
  ];
}
