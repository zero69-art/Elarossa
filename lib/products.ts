import { newSkus } from "./products-new-skus";

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
  video?: string;
  supplier: "CJdropshipping";
  supplierCostMax: number;
  shippingReserve: number;
  qualityStatus: "candidate" | "sample-required" | "approved";
  cjPid?: string;
  cjVariants?: Array<Record<string, unknown>>;
};

const samplePolicy = "Final fabric, fit, stitching, sizing, packaging and delivery must be sample-tested before launch.";

const catalogProducts: Product[] = [
  {
    slug: "scrunch-seamless-lifting-leggings",
    name: "Scrunch Seamless Lifting Leggings",
    category: "Activewear",
    price: 29.99,
    compareAtPrice: 35.99,
    tag: "FOUNDING EDIT",
    description: "High-rise seamless leggings with a sculpting scrunch back and soft stretch for studio sessions, training and everyday movement.",
    seoTitle: "Scrunch Seamless Lifting Leggings for Women",
    metaDescription: "Shop the Scrunch Seamless Lifting Leggings — curated activewear from Elarossa.",
    details: ["Scrunch lifting silhouette", "High-rise waist", "Seamless stretch construction", samplePolicy],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    colors: ["Black", "White", "Grey", "Rose", "Blue", "Purple"],
    image: "https://cf.cjdropshipping.com/2050/13218085177535.jpg",
    gallery: ["https://cf.cjdropshipping.com/2050/13218085177535.jpg", "https://cf.cjdropshipping.com/15308928/1652116581528.png", "https://cf.cjdropshipping.com/15308928/315641876067.png"],
    supplier: "CJdropshipping",
    supplierCostMax: 2.37,
    shippingReserve: 5,
    qualityStatus: "sample-required",
    cjPid: "01BBC860-23D4-43D6-98C6-F39836578014",
    video: "https://download-only-api.cjdropshipping.com/e026d4aa6f2871ef800d4531958d0102/b6786e41fa10465b926e5b6ec8ec3409-07c532b7732e8519552a3c762e0d3ba4-ld.mp4"
  },
  {
    slug: "sculpt-high-waist-yoga-shorts",
    name: "Sculpt High-Waist Yoga Shorts",
    category: "Activewear",
    price: 29.99,
    compareAtPrice: 35.99,
    tag: "NEW",
    description: "Seamless high-waist yoga shorts with a close fit for Pilates, studio work and warm-weather movement.",
    seoTitle: "Sculpt High-Waist Yoga Shorts for Women",
    metaDescription: "Shop the Sculpt High-Waist Yoga Shorts — curated activewear from Elarossa.",
    details: ["High-waist hold", "Seamless quick-dry feel", "Studio-to-street silhouette", samplePolicy],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Blue", "Coffee", "Dark Grey", "Light Blue", "Glacier Blue"],
    image: "https://oss-cf.cjdropshipping.com/product/2025/04/07/10/e8809cf5-34c2-481c-bfe3-5d3d79db4d89.jpg",
    gallery: ["https://oss-cf.cjdropshipping.com/product/2025/04/07/10/e8809cf5-34c2-481c-bfe3-5d3d79db4d89.jpg", "https://oss-cf.cjdropshipping.com/product/2025/01/04/10/b29810ed-32df-479d-b954-da9820219c3f.jpg", "https://oss-cf.cjdropshipping.com/product/2025/06/24/09/b37ea039-060d-4968-a69e-03d726903c93.jpg"],
    supplier: "CJdropshipping",
    supplierCostMax: 2.79,
    shippingReserve: 5,
    qualityStatus: "sample-required",
    cjPid: "2501041035191622000",
    video: "https://download-only-api.cjdropshipping.com/7044060c138971f080246733a78e0102/22b2f786c9fa4fb4a3ecca8951faad90-29ec7b2d98bac382b391e2d3db10ab3f-ld.mp4"
  },
  {
    slug: "scrunch-seamless-gym-shorts",
    name: "Scrunch Seamless Gym Shorts",
    category: "Activewear",
    price: 29.99,
    compareAtPrice: 35.99,
    tag: "NEW",
    description: "Butt-lift scrunch shorts in seamless stretch for gym days, walks and low-impact training.",
    seoTitle: "Scrunch Seamless Gym Shorts for Women",
    metaDescription: "Shop the Scrunch Seamless Gym Shorts — curated activewear from Elarossa.",
    details: ["Scrunch back detail", "Stretch seamless fabric", "Compact active short", samplePolicy],
    sizes: ["S", "M", "L"],
    colors: ["Black", "Brown", "Dark Green", "Gray", "Teal"],
    image: "https://cf.cjdropshipping.com/15432480/343123727488.jpg",
    gallery: ["https://cf.cjdropshipping.com/15432480/343123727488.jpg", "https://cf.cjdropshipping.com/2056/1882035166481.png", "https://cf.cjdropshipping.com/2056/378551458156.png"],
    supplier: "CJdropshipping",
    supplierCostMax: 2.86,
    shippingReserve: 5,
    qualityStatus: "sample-required",
    cjPid: "79BA0102-9418-4FDA-A0EF-38FEAD85A0DB"
  },
  {
    slug: "soft-print-yoga-running-shorts",
    name: "Soft Print Yoga Running Shorts",
    category: "Activewear",
    price: 29.99,
    compareAtPrice: 35.99,
    tag: "ESSENTIAL",
    description: "Soft lightweight running and yoga shorts for warm days and easy movement.",
    seoTitle: "Soft Print Yoga Running Shorts for Women",
    metaDescription: "Shop Soft Print Yoga Running Shorts — curated activewear from Elarossa.",
    details: ["Soft stretch blend", "Lightweight everyday short", "Easy summer activewear", samplePolicy],
    sizes: ["One Size"],
    colors: ["Charcoal", "Dark Green", "Dark Purple", "Grey Blue", "Light Green"],
    image: "https://cf.cjdropshipping.com/f14b4ebd-5209-480d-9a31-906fbf4d85f8.jpg",
    gallery: ["https://cf.cjdropshipping.com/f14b4ebd-5209-480d-9a31-906fbf4d85f8.jpg", "https://cf.cjdropshipping.com/72226546-fa5f-4b70-a1fb-e2056ada56d2.jpg"],
    supplier: "CJdropshipping",
    supplierCostMax: 1.45,
    shippingReserve: 5,
    qualityStatus: "sample-required",
    cjPid: "1665931601995780096"
  },
  {
    slug: "moisture-wick-seamless-yoga-leggings",
    name: "Moisture-Wick Seamless Yoga Leggings",
    category: "Activewear",
    price: 34.99,
    compareAtPrice: 42.99,
    tag: "STUDIO",
    description: "Seamless nylon-blend leggings with moisture-wicking positioning for yoga and training.",
    seoTitle: "Moisture-Wick Seamless Yoga Leggings for Women",
    metaDescription: "Shop Moisture-Wick Seamless Yoga Leggings — curated activewear from Elarossa.",
    details: ["Moisture-wicking seamless knit", "Full-length silhouette", "Studio-focused stretch", samplePolicy],
    sizes: ["S", "M", "L"],
    colors: ["Black", "Blue", "Green", "Grey", "Pink"],
    image: "https://cf.cjdropshipping.com/1614320128731.jpg",
    gallery: ["https://cf.cjdropshipping.com/1614320128731.jpg", "https://cf.cjdropshipping.com/1614320128736.jpg"],
    supplier: "CJdropshipping",
    supplierCostMax: 5.05,
    shippingReserve: 5,
    qualityStatus: "sample-required",
    cjPid: "1365184564892405760"
  },
  {
    slug: "breathable-seamless-sports-bra",
    name: "Breathable Seamless Sports Bra",
    category: "Intimates",
    price: 29.99,
    compareAtPrice: 35.99,
    tag: "EVERYDAY",
    description: "Seamless sports bra with soft shaping and breathable stretch for low-to-medium impact movement and everyday layering.",
    seoTitle: "Breathable Seamless Sports Bra for Women",
    metaDescription: "Shop the Breathable Seamless Sports Bra — curated intimates from Elarossa.",
    details: ["Seamless soft structure", "Breathable stretch", "Everyday active and lounge", samplePolicy],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Mint", "Pink", "Nude", "White"],
    image: "https://cf.cjdropshipping.com/2061/1379167572577.jpg",
    gallery: ["https://cf.cjdropshipping.com/2061/1379167572577.jpg", "https://cf.cjdropshipping.com/2061/160702526410.jpg"],
    supplier: "CJdropshipping",
    supplierCostMax: 2.29,
    shippingReserve: 5,
    qualityStatus: "sample-required",
    cjPid: "D3F3DCC0-844F-4F1F-A669-A22439B2867D"
  },
  {
    slug: "second-skin-seamless-briefs",
    name: "Second-Skin Seamless Briefs",
    category: "Intimates",
    price: 29.99,
    compareAtPrice: 35.99,
    tag: "ESSENTIAL",
    description: "Low-profile seamless briefs designed for a smooth line under clothing in soft stretch nylon.",
    seoTitle: "Second-Skin Seamless Briefs for Women",
    metaDescription: "Shop Second-Skin Seamless Briefs — curated intimates from Elarossa.",
    details: ["Seamless no-show line", "Soft nylon stretch", "Everyday essential", samplePolicy],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Khaki"],
    image: "https://cf.cjdropshipping.com/15836832/3574097292921.jpg",
    gallery: ["https://cf.cjdropshipping.com/15836832/3574097292921.jpg", "https://cf.cjdropshipping.com/20200318/4611215098832.jpg"],
    supplier: "CJdropshipping",
    supplierCostMax: 1.28,
    shippingReserve: 5,
    qualityStatus: "sample-required",
    cjPid: "5EE5974E-C449-45EB-B9A4-EA2CBED72A4B"
  },
  {
    slug: "sport-one-piece-swimsuit",
    name: "Sport One-Piece Swimsuit",
    category: "Swimwear",
    price: 34.99,
    compareAtPrice: 42.99,
    tag: "RESORT EDIT",
    description: "Sport-inspired one-piece with a clean silhouette for pool days and resort wear.",
    seoTitle: "Sport One-Piece Swimsuit for Women",
    metaDescription: "Shop the Sport One-Piece Swimsuit — curated swimwear from Elarossa.",
    details: ["One-piece swim silhouette", "Sport-resort hybrid", "Multiple colour options", samplePolicy],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Army Green", "Black", "Brick Red", "Coralline", "Floral"],
    image: "https://cf.cjdropshipping.com/quick/product/29aa0a3c-e0de-448a-a1e3-5a3365771108.jpg",
    gallery: ["https://cf.cjdropshipping.com/quick/product/29aa0a3c-e0de-448a-a1e3-5a3365771108.jpg", "https://cf.cjdropshipping.com/quick/product/9b324349-9219-469a-a23a-729724e8162a.jpg"],
    supplier: "CJdropshipping",
    supplierCostMax: 5.47,
    shippingReserve: 5,
    qualityStatus: "sample-required",
    cjPid: "2406251239371618200"
  },
  {
    slug: "traceless-backless-bra",
    name: "Silhouette Traceless Backless Bra",
    category: "Intimates",
    price: 34.99,
    compareAtPrice: 42.99,
    tag: "SMOOTH FIT",
    description: "Discreet backless bra designed for clean lines under fitted tops, dresses and occasionwear.",
    seoTitle: "Silhouette Traceless Backless Bra for Women",
    metaDescription: "Shop the Silhouette Traceless Backless Bra — curated intimates from Elarossa.",
    details: ["Backless low-line design", "Traceless under clothing", "Occasion and everyday layering", samplePolicy],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["Black", "Grey", "Nude"],
    image: "https://cf.cjdropshipping.com/eac7d3b1-df5d-41bf-a537-44bdb2f62730.jpg",
    gallery: ["https://cf.cjdropshipping.com/eac7d3b1-df5d-41bf-a537-44bdb2f62730.jpg", "https://cf.cjdropshipping.com/e5bea2d4-ba7d-4a67-b989-44c2a4ee636b.png"],
    supplier: "CJdropshipping",
    supplierCostMax: 3.51,
    shippingReserve: 5,
    qualityStatus: "sample-required",
    cjPid: "45062F6E-76F7-4F13-9797-E696A8F09256",
    video: "https://download-only-api.cjdropshipping.com/2b2ef4284c5240bc93d5b1d863c849af/344d7d03ef52449583ffbac4ba868f34-bf5ae9ac046c609df1d507cbed7fc78e-ld.mp4"
  },
  {
    slug: "seamless-training-shorts",
    name: "Seamless Training Shorts",
    category: "Activewear",
    price: 29.99,
    compareAtPrice: 35.99,
    tag: "NEW",
    description: "Seamless butt-lifting training shorts for yoga, fitness and active days.",
    seoTitle: "Seamless Training Shorts for Women",
    metaDescription: "Shop Seamless Training Shorts — curated activewear from Elarossa.",
    details: ["Seamless stretch construction", "Training-focused fit", "Multiple colour options", samplePolicy],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray", "Green", "Khaki", "Pink", "Red"],
    image: "https://cf.cjdropshipping.com/5b8dbaeb-3282-4353-af6a-fe47cc9f04a8.jpg",
    gallery: ["https://cf.cjdropshipping.com/5b8dbaeb-3282-4353-af6a-fe47cc9f04a8.jpg", "https://cf.cjdropshipping.com/194e8e76-98ab-4f18-a6c1-11a4cb719a2e.jpg"],
    supplier: "CJdropshipping",
    supplierCostMax: 1.81,
    shippingReserve: 5,
    qualityStatus: "sample-required",
    cjPid: "1636554088848969728",
    video: "https://download-only-api.cjdropshipping.com/f8771820c46c71edacb06632b68f0102/6f24ff242f1746b29a8d3d65501ea94d-4dbf892a4360fbb9bf3da030af983fe4-ld.mp4"
  }
];

export const products: Product[] = [...catalogProducts, ...(newSkus as typeof catalogProducts)];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
export function getMargin(product: Product) {
  const grossProfit = product.price - product.supplierCostMax - product.shippingReserve;
  return { grossProfit, marginPercent: (grossProfit / product.price) * 100 };
}
