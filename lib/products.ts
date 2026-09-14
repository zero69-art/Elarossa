export type Product = {
  slug: string;
  name: string;
  category: "Activewear" | "Swimwear" | "Intimates";
  price: number;
  compareAtPrice?: number;
  tag: string;
  description: string;
  details: string[];
  sizes: string[];
  colors: string[];
  image: string;
  gallery: string[];
  supplier: "CJdropshipping";
  supplierCostMax: number;
  shippingReserve: number;
  qualityStatus: "candidate" | "sample-required" | "approved";
};

export const products: Product[] = [
  {
    slug: "angel-wings-seamless-sports-bra",
    name: "Angel Wings Seamless Sports Bra",
    category: "Activewear",
    price: 39.99,
    compareAtPrice: 49.99,
    tag: "FOUNDING EDIT",
    description: "A clean, sculpting activewear essential designed for low-to-medium impact movement and an elevated everyday look.",
    details: ["Seamless construction", "Supportive everyday fit", "Designed for active and lounge styling", "Final fabric and fit must be sample-tested before launch"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Mocha", "Stone"],
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85"],
    supplier: "CJdropshipping",
    supplierCostMax: 6.99,
    shippingReserve: 5,
    qualityStatus: "sample-required"
  },
  {
    slug: "satin-hour-bikini",
    name: "Satin Hour Bikini",
    category: "Swimwear",
    price: 44,
    tag: "NEW",
    description: "A refined swim silhouette for resort days, poolside afternoons and effortless vacation styling.",
    details: ["Two-piece swim silhouette", "Multiple sizes", "Designed for resort styling", "Sample verification required before launch"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Ivory"],
    image: "https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=1200&q=85"],
    supplier: "CJdropshipping",
    supplierCostMax: 10,
    shippingReserve: 5,
    qualityStatus: "sample-required"
  },
  {
    slug: "second-skin-everyday-bra",
    name: "Second Skin Everyday Bra",
    category: "Intimates",
    price: 34,
    tag: "EVERYDAY",
    description: "A minimalist everyday layer focused on a smooth silhouette and understated comfort.",
    details: ["Minimal everyday design", "Soft-touch positioning", "Multiple sizes", "Sample verification required before launch"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Nude", "White"],
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85"],
    supplier: "CJdropshipping",
    supplierCostMax: 8,
    shippingReserve: 5,
    qualityStatus: "sample-required"
  }
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getMargin(product: Product) {
  const grossProfit = product.price - product.supplierCostMax - product.shippingReserve;
  return { grossProfit, marginPercent: (grossProfit / product.price) * 100 };
}
