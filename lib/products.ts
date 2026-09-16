export type Product = {
  slug: string;
  name: string;
  category: "Activewear" | "Swimwear" | "Intimates" | "Women's Fashion";
  price: number;
  compareAtPrice?: number;
  tag: string;
  description: string;
  seoTitle: string;
  metaDescription: string;
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
    description: "A seamless women's sports bra designed for low-to-medium impact workouts, yoga and everyday activewear styling. The clean silhouette makes it easy to layer with leggings or lounge pieces.",
    seoTitle: "Seamless Sports Bra for Women | Angel Wings | Elarossa",
    metaDescription: "Shop the Angel Wings seamless sports bra for women, designed for yoga, low-impact workouts and everyday activewear styling. Explore sizes and colours.",
    details: ["Seamless construction", "Low-to-medium impact positioning", "Designed for active and lounge styling", samplePolicy],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Mocha", "Stone"],
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"],
    supplier: "CJdropshipping", supplierCostMax: 6.99, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "satin-hour-bikini",
    name: "Satin Hour Bikini",
    category: "Swimwear",
    price: 44,
    tag: "NEW",
    description: "A refined women's bikini with a clean two-piece silhouette for beach holidays, poolside days and resort styling. Designed as an easy-to-wear swimwear essential.",
    seoTitle: "Women's Bikini Swimwear | Satin Hour Two-Piece | Elarossa",
    metaDescription: "Discover the Satin Hour women's bikini, a refined two-piece swimwear style for beach holidays, pool days and resort escapes. Available in selected sizes.",
    details: ["Two-piece swim silhouette", "Resort-ready styling", "Designed for beach and pool wear", samplePolicy],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Ivory"],
    image: "https://images.unsplash.com/photo-1570976447640-acf6b1b4b6f7?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1570976447640-acf6b1b4b6f7?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"],
    supplier: "CJdropshipping", supplierCostMax: 10, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "second-skin-everyday-bra",
    name: "Second-Skin Everyday Bra",
    category: "Intimates",
    price: 34,
    tag: "EVERYDAY",
    description: "A minimalist everyday bra designed for a smooth silhouette under fitted tops, shirts and dresses. A versatile women's lingerie essential for comfortable daily styling.",
    seoTitle: "Women's Everyday Bra | Second-Skin Smooth Fit | Elarossa",
    metaDescription: "Shop the Second-Skin everyday bra for women, designed for a smooth silhouette under fitted clothing and easy daily wear. Explore Elarossa intimates.",
    details: ["Minimal everyday design", "Smooth silhouette positioning", "Designed for layering under fitted clothing", samplePolicy],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Nude", "White"],
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=1200&q=85"],
    supplier: "CJdropshipping", supplierCostMax: 8, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "sculpt-seamless-high-rise-leggings",
    name: "Sculpt Seamless High-Rise Leggings",
    category: "Activewear",
    price: 49,
    compareAtPrice: 59,
    tag: "FOUNDING EDIT",
    description: "High-rise seamless leggings designed for training, yoga, studio sessions and elevated off-duty styling. The streamlined shape pairs easily with sports bras and fitted tops.",
    seoTitle: "Women's High-Rise Seamless Leggings | Sculpt | Elarossa",
    metaDescription: "Shop high-rise seamless leggings for women, designed for yoga, training and everyday activewear styling. Explore the Elarossa Sculpt edit.",
    details: ["High-rise silhouette", "Stretch activewear positioning", "Designed for training and studio styling", samplePolicy],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Espresso", "Stone"],
    image: "https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1200&q=85"],
    supplier: "CJdropshipping", supplierCostMax: 9.5, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "silhouette-traceless-backless-bra",
    name: "Silhouette Traceless Backless Bra",
    category: "Intimates",
    price: 36,
    compareAtPrice: 45,
    tag: "SMOOTH FIT",
    description: "A discreet backless bra designed to create clean lines under fitted tops, dresses and occasionwear. The minimalist profile is made for styling where visible bra lines are distracting.",
    seoTitle: "Traceless Backless Bra for Women | Silhouette | Elarossa",
    metaDescription: "Discover a traceless backless bra for women, designed for fitted tops, dresses and occasionwear. A discreet Elarossa lingerie essential.",
    details: ["Traceless positioning", "Backless styling", "Designed for fitted outfits", samplePolicy],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Nude", "White"],
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=85"],
    supplier: "CJdropshipping", supplierCostMax: 6, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "gloss-seamless-memory-bra",
    name: "Gloss Seamless Memory Bra",
    category: "Intimates",
    price: 42,
    compareAtPrice: 52,
    tag: "NEW",
    description: "A smooth seamless bra designed for everyday wardrobes, fitted clothing and understated layering. Its polished silhouette brings a refined finish to modern lingerie styling.",
    seoTitle: "Seamless Bra for Women | Smooth Everyday Fit | Elarossa",
    metaDescription: "Shop the Gloss seamless bra for women, designed for smooth everyday layering and fitted outfits. Discover refined Elarossa intimates.",
    details: ["Seamless construction", "Smooth finish positioning", "Everyday-to-occasion versatility", samplePolicy],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Cocoa", "Nude"],
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=85"],
    supplier: "CJdropshipping", supplierCostMax: 4.87, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "grace-one-piece-swimsuit",
    name: "Grace Sculpt One-Piece Swimsuit",
    category: "Swimwear",
    price: 54,
    compareAtPrice: 68,
    tag: "RESORT EDIT",
    description: "A timeless one-piece swimsuit designed for pool days, beach holidays and resort dressing. The clean silhouette transitions easily from swimwear to polished holiday styling.",
    seoTitle: "Women's One-Piece Swimsuit | Grace Sculpt | Elarossa",
    metaDescription: "Shop the Grace Sculpt one-piece swimsuit for women, designed for beach holidays, pool days and resort styling. Explore the Elarossa swimwear edit.",
    details: ["One-piece silhouette", "Resort-ready styling", "Classic swimwear wardrobe direction", samplePolicy],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Ivory", "Deep Olive"],
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"],
    supplier: "CJdropshipping", supplierCostMax: 12, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "seamless-everyday-underwear-set",
    name: "Second-Skin Seamless Brief Set",
    category: "Intimates",
    price: 29,
    compareAtPrice: 36,
    tag: "ESSENTIAL",
    description: "A minimal seamless underwear essential designed for a smooth, low-profile silhouette under everyday clothing. An easy foundation piece for modern wardrobes.",
    seoTitle: "Women's Seamless Briefs | Second-Skin Underwear | Elarossa",
    metaDescription: "Discover women's seamless briefs designed for a smooth, low-profile fit under everyday clothing. Shop the Second-Skin underwear edit by Elarossa.",
    details: ["Seamless positioning", "Low-profile silhouette", "Designed as an everyday essential", samplePolicy],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Nude", "White"],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=85"],
    supplier: "CJdropshipping", supplierCostMax: 7.6, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "pilates-grip-studio-socks",
    name: "Pilates Grip Studio Socks",
    category: "Activewear",
    price: 24,
    compareAtPrice: 29,
    tag: "STUDIO",
    description: "Grip studio socks designed for Pilates, yoga and at-home movement routines. A practical activewear accessory that pairs with the Elarossa studio edit.",
    seoTitle: "Pilates Grip Socks for Women | Studio Socks | Elarossa",
    metaDescription: "Shop Pilates grip socks for women, designed for yoga, Pilates and studio workouts. Discover a practical Elarossa activewear accessory.",
    details: ["Grip sole concept", "Studio and lounge use", "Designed for Pilates and yoga", samplePolicy],
    sizes: ["S/M", "L/XL"],
    colors: ["Black", "Cream", "Stone"],
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85"],
    supplier: "CJdropshipping", supplierCostMax: 2, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "silk-touch-wide-leg-lounge-pants",
    name: "Silk-Touch Wide-Leg Lounge Pants",
    category: "Women's Fashion",
    price: 48,
    compareAtPrice: 59,
    tag: "LOUNGE EDIT",
    description: "Fluid wide-leg women's lounge trousers designed for travel days, relaxed evenings and polished everyday dressing. A versatile piece for an elevated capsule wardrobe.",
    seoTitle: "Women's Wide-Leg Lounge Pants | Silk-Touch | Elarossa",
    metaDescription: "Shop women's wide-leg lounge pants designed for travel, relaxed days and elevated everyday styling. Discover the Silk-Touch Elarossa edit.",
    details: ["Wide-leg silhouette", "Relaxed fit direction", "Designed for travel and lounge styling", samplePolicy],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Champagne", "Espresso"],
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85"],
    supplier: "CJdropshipping", supplierCostMax: 10.14, shippingReserve: 5, qualityStatus: "sample-required"
  },
  {
    slug: "seamless-sculpt-training-shorts",
    name: "Seamless Sculpt Training Shorts",
    category: "Activewear",
    price: 39.99,
    compareAtPrice: 49.99,
    tag: "NEW",
    description: "Seamless women's gym shorts designed for yoga, fitness and active days, with a close-fitting silhouette and quick-dry positioning for movement-focused wardrobes.",
    seoTitle: "Women's Seamless Gym Shorts | Sculpt Training | Elarossa",
    metaDescription: "Shop seamless gym shorts for women, designed for yoga, fitness and active days. Discover the Sculpt Training Shorts from Elarossa.",
    details: ["Seamless stretch construction", "Quick-dry positioning", "Designed for yoga, fitness and gym styling", samplePolicy],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black", "Grey", "Royal Blue", "Khaki"],
    image: "https://cf.cjdropshipping.com/2050/13218085177535.jpg",
    gallery: ["https://cf.cjdropshipping.com/2050/13218085177535.jpg"],
    supplier: "CJdropshipping", supplierCostMax: 1.81, shippingReserve: 5, qualityStatus: "sample-required", cjPid: "1636554088848969728"
  },
  {
    slug: "scrunch-seamless-lifting-leggings",
    name: "Scrunch Seamless Lifting Leggings",
    category: "Activewear",
    price: 44.99,
    compareAtPrice: 54.99,
    tag: "NEW",
    description: "Seamless women's leggings with a textured finish and sculpting silhouette for gym sessions, yoga and everyday activewear. Available across an extended size range.",
    seoTitle: "Scrunch Seamless Leggings for Women | Elarossa Activewear",
    metaDescription: "Discover scrunch seamless leggings for women, designed for gym, yoga and activewear styling. Explore colours and extended sizes at Elarossa.",
    details: ["Polyester and spandex construction", "Breathable and sweat-absorbent positioning", "Extended size range", samplePolicy],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    colors: ["Black", "White", "Grey", "Rose", "Orange", "Blue", "Purple"],
    image: "https://cf.cjdropshipping.com/2050/13218085177535.jpg",
    gallery: ["https://cf.cjdropshipping.com/2050/13218085177535.jpg"],
    supplier: "CJdropshipping", supplierCostMax: 2.72, shippingReserve: 5, qualityStatus: "sample-required", cjPid: "01BBC860-23D4-43D6-98C6-F39836578014"
  },
  {
    slug: "plaid-seamless-high-rise-leggings",
    name: "Plaid Seamless High-Rise Leggings",
    category: "Activewear",
    price: 42.99,
    compareAtPrice: 52.99,
    tag: "NEW",
    description: "High-rise seamless leggings for women with a textured pattern and stretch construction, suited to yoga, gym sessions and casual activewear styling.",
    seoTitle: "Women's Plaid Seamless High-Rise Leggings | Elarossa",
    metaDescription: "Shop women's plaid seamless high-rise leggings with stretch construction for yoga, gym sessions and everyday activewear styling. Explore Elarossa.",
    details: ["Nylon-rich stretch construction", "High-rise silhouette", "Designed for yoga and gym styling", samplePolicy],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["Green", "Black", "Grey", "White"],
    image: "https://cf.cjdropshipping.com/1618017923916.jpg",
    gallery: ["https://cf.cjdropshipping.com/1618017923916.jpg"],
    supplier: "CJdropshipping", supplierCostMax: 6.47, shippingReserve: 5, qualityStatus: "sample-required", cjPid: "91CD22EB-C2A3-4A16-A250-2FB17DC7FBC0"
  },
  {
    slug: "high-rise-stretch-yoga-pants",
    name: "High-Rise Stretch Yoga Pants",
    category: "Activewear",
    price: 39.99,
    compareAtPrice: 49.99,
    tag: "STUDIO",
    description: "High-rise stretch yoga pants designed for studio sessions, fitness and everyday movement. The slim silhouette is easy to style with sports bras, tanks and layers.",
    seoTitle: "High-Rise Yoga Pants for Women | Stretch Fitness Trousers | Elarossa",
    metaDescription: "Shop high-rise yoga pants for women with a stretch fit for studio workouts, fitness and everyday movement. Discover Elarossa activewear.",
    details: ["Polyester construction", "High-rise stretch silhouette", "Designed for yoga and fitness styling", samplePolicy],
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black", "Navy", "Grey", "Burgundy", "Army Green", "Blue"],
    image: "https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=1200&q=85",
    gallery: ["https://images.unsplash.com/photo-1506629905607-d9c297d93a91?auto=format&fit=crop&w=1200&q=85"],
    supplier: "CJdropshipping", supplierCostMax: 3.28, shippingReserve: 5, qualityStatus: "sample-required", cjPid: "1748621623017611264"
  },
  {
    slug: "seamless-zip-front-jumpsuit",
    name: "Seamless Zip-Front Sculpt Jumpsuit",
    category: "Activewear",
    price: 59.99,
    compareAtPrice: 74.99,
    tag: "NEW",
    description: "A fitted long-sleeve women's jumpsuit with a zip-front design for sleek activewear and athleisure styling. A statement one-piece for studio-to-street wardrobes.",
    seoTitle: "Women's Seamless Sculpt Jumpsuit | Zip Front Activewear | Elarossa",
    metaDescription: "Discover a fitted women's zip-front jumpsuit for sleek activewear and athleisure styling. Shop the Seamless Sculpt Jumpsuit by Elarossa.",
    details: ["Polyester construction", "Fitted one-piece silhouette", "Zip-front styling", samplePolicy],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Black", "Rose", "Dark Brown", "Brown"],
    image: "https://oss-cf.cjdropshipping.com/product/2023/10/09/08/eeed4233-71c8-4dd7-876a-11054b7b8f88.jpg",
    gallery: ["https://oss-cf.cjdropshipping.com/product/2023/10/09/08/eeed4233-71c8-4dd7-876a-11054b7b8f88.jpg"],
    supplier: "CJdropshipping", supplierCostMax: 5.31, shippingReserve: 5, qualityStatus: "sample-required", cjPid: "1699251337977933824"
  }
];

export function getProduct(slug: string) { return products.find((product) => product.slug === slug); }
export function getMargin(product: Product) {
  const grossProfit = product.price - product.supplierCostMax - product.shippingReserve;
  return { grossProfit, marginPercent: (grossProfit / product.price) * 100 };
}
