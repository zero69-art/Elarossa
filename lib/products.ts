export type Product = {
  slug: string;
  name: string;
  category: "Activewear" | "Swimwear" | "Intimates" | "Women's Fashion";
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
  cjPid?: string;
  cjVariants?: Array<Record<string, unknown>>;
};

const samplePolicy = "Final fabric, fit, stitching, sizing, packaging and delivery must be sample-tested before launch.";

export const products: Product[] = [
  {
    slug: "angel-wings-seamless-sports-bra",
    name: "Angel Wings Seamless Sports Bra",
    category: "Activewear",
    price: 39.99,
    compareAtPrice: 49.99,
    tag: "FOUNDING EDIT",
    description: "A clean, sculpting activewear essential designed for low-to-medium impact movement and an elevated everyday look.",
    details: ["Seamless construction", "Supportive everyday fit", "Designed for active and lounge styling", samplePolicy],
    sizes: ["S", "M", "L", "XL"], colors: ["Black", "Mocha", "Stone"],
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85"], supplier: "CJdropshipping", supplierCostMax: 6.99, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "satin-hour-bikini", name: "Satin Hour Bikini", category: "Swimwear", price: 44, tag: "NEW",
    description: "A refined two-piece swim silhouette for resort days, poolside afternoons and effortless vacation styling.", details: ["Two-piece swim silhouette", "Multiple sizes", "Designed for resort styling", samplePolicy], sizes: ["S", "M", "L", "XL"], colors: ["Black", "Ivory"], image: "https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=1200&q=85", gallery: ["https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=1200&q=85"], supplier: "CJdropshipping", supplierCostMax: 10, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "second-skin-everyday-bra", name: "Second-Skin Everyday Bra", category: "Intimates", price: 34, tag: "EVERYDAY",
    description: "A minimalist everyday layer focused on a smooth silhouette and understated comfort.", details: ["Minimal everyday design", "Soft-touch positioning", "Multiple sizes", samplePolicy], sizes: ["S", "M", "L", "XL"], colors: ["Black", "Nude", "White"], image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85", gallery: ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85"], supplier: "CJdropshipping", supplierCostMax: 8, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "sculpt-seamless-high-rise-leggings", name: "Sculpt Seamless High-Rise Leggings", category: "Activewear", price: 49, compareAtPrice: 59, tag: "BESTSELLER",
    description: "A high-rise activewear staple designed for a streamlined silhouette, training days and elevated off-duty looks.", details: ["High-rise silhouette", "Stretch performance positioning", "Easy pairing with Elarossa activewear", samplePolicy], sizes: ["S", "M", "L", "XL"], colors: ["Black", "Espresso", "Stone"], image: "https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=1200&q=85", gallery: ["https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=1200&q=85"], supplier: "CJdropshipping", supplierCostMax: 9.5, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "silhouette-traceless-backless-bra", name: "Silhouette Traceless Backless Bra", category: "Intimates", price: 36, compareAtPrice: 45, tag: "SMOOTH FIT",
    description: "A discreet bra designed for clean lines under fitted tops, dresses and occasionwear.", details: ["Traceless positioning", "Backless styling", "Designed for fitted outfits", samplePolicy], sizes: ["S", "M", "L", "XL"], colors: ["Black", "Nude", "White"], image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85", gallery: ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85"], supplier: "CJdropshipping", supplierCostMax: 6, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "gloss-seamless-memory-bra", name: "Gloss Seamless Memory Bra", category: "Intimates", price: 42, compareAtPrice: 52, tag: "NEW",
    description: "A polished everyday bra concept with a smooth finish and refined silhouette for modern wardrobes.", details: ["Seamless construction", "Smooth finish positioning", "Everyday-to-occasion versatility", samplePolicy], sizes: ["S", "M", "L", "XL"], colors: ["Black", "Cocoa", "Nude"], image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85", gallery: ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85"], supplier: "CJdropshipping", supplierCostMax: 4.87, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "grace-one-piece-swimsuit", name: "Grace Sculpt One-Piece Swimsuit", category: "Swimwear", price: 54, compareAtPrice: 68, tag: "RESORT EDIT",
    description: "A timeless one-piece designed to move from the pool to resort styling with a clean, sophisticated finish.", details: ["One-piece silhouette", "Resort-ready styling", "Classic wardrobe direction", samplePolicy], sizes: ["S", "M", "L", "XL"], colors: ["Black", "Ivory", "Deep Olive"], image: "https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=1200&q=85", gallery: ["https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=1200&q=85"], supplier: "CJdropshipping", supplierCostMax: 12, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "seamless-everyday-underwear-set", name: "Second-Skin Seamless Brief Set", category: "Intimates", price: 29, compareAtPrice: 36, tag: "ESSENTIAL",
    description: "A minimal underwear essential built around a smooth, low-profile silhouette for everyday wear.", details: ["Seamless positioning", "Low-profile silhouette", "Designed as an everyday essential", samplePolicy], sizes: ["S", "M", "L", "XL"], colors: ["Black", "Nude", "White"], image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85", gallery: ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85"], supplier: "CJdropshipping", supplierCostMax: 7.6, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "pilates-grip-studio-socks", name: "Pilates Grip Studio Socks", category: "Activewear", price: 24, compareAtPrice: 29, tag: "STUDIO",
    description: "A polished studio accessory for Pilates, yoga and at-home movement routines.", details: ["Grip sole concept", "Studio and lounge use", "Easy add-on to activewear orders", samplePolicy], sizes: ["S/M", "L/XL"], colors: ["Black", "Cream", "Stone"], image: "https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=1200&q=85", gallery: ["https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=1200&q=85"], supplier: "CJdropshipping", supplierCostMax: 2, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "silk-touch-wide-leg-lounge-pants", name: "Silk-Touch Wide-Leg Lounge Pants", category: "Activewear", price: 48, compareAtPrice: 59, tag: "LOUNGE EDIT",
    description: "A fluid wide-leg silhouette designed for elevated lounging, travel days and polished everyday dressing.", details: ["Wide-leg silhouette", "Relaxed fit direction", "Designed for travel and lounge styling", samplePolicy], sizes: ["S", "M", "L", "XL"], colors: ["Black", "Champagne", "Espresso"], image: "https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=1200&q=85", gallery: ["https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=1200&q=85"], supplier: "CJdropshipping", supplierCostMax: 10.14, shippingReserve: 5, qualityStatus: "sample-required"
  }
];

export function getProduct(slug: string) { return products.find((product) => product.slug === slug); }
export function getMargin(product: Product) {
  const grossProfit = product.price - product.supplierCostMax - product.shippingReserve;
  return { grossProfit, marginPercent: (grossProfit / product.price) * 100 };
}
