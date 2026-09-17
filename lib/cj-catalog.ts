export type CJSourcedProduct = {
  pid: string;
  sku: string;
  sourceUrl: string;
  name: string;
  category: "Activewear" | "Swimwear" | "Intimates" | "Women's Fashion";
  cjCostFrom: number;
  cjCostTo?: number;
  sizes: string[];
  colors: string[];
  material?: string;
  media: {
    imageCountObserved: number;
    videoGalleryObserved: boolean;
    exactImageUrls: string[];
  };
  inventoryStatus: "requires-live-check";
  launchStatus: "sample-required";
};

// Sourcing manifest built from live CJ product pages. These are deliberately kept
// separate from the storefront catalog until exact media, live inventory,
// shipping and sample quality are verified for launch.
export const cjSourcedProducts: CJSourcedProduct[] = [
  {
    pid: "1636554088848969728",
    sku: "CJDK1708829-Red-S M",
    sourceUrl: "https://cjdropshipping.com/product/fitness-yoga-shorts-pants-butt-lifting-seamless-leggings-women-gym-p-1636554088848969728.html",
    name: "Fitness Yoga Shorts Pants Butt Lifting Seamless Leggings Women Gym",
    category: "Activewear",
    cjCostFrom: 1.81,
    sizes: ["S", "M", "XL"],
    colors: ["Red", "Yellow", "Green", "Black", "Gray", "Royal Blue", "Khaki"],
    material: "Polyester fiber blend",
    media: {
      imageCountObserved: 13,
      videoGalleryObserved: true,
      exactImageUrls: ["https://cf.cjdropshipping.com/7ee37ccf-0f8e-4323-8829-dbe0a9886fa3.jpg"]
    },
    inventoryStatus: "requires-live-check",
    launchStatus: "sample-required"
  },
  {
    pid: "91CD22EB-C2A3-4A16-A250-2FB17DC7FBC0",
    sku: "CJNSXZDD00486-Green-L",
    sourceUrl: "https://www.cjdropshipping.com/product/plaid-leggings-fitness-yoga-pants-womens-seamless-high-waist-breathable-gym-leggings-p-91CD22EB-C2A3-4A16-A250-2FB17DC7FBC0.html",
    name: "Plaid Leggings Fitness Yoga Pants Women's Seamless High Waist Breathable Gym Leggings",
    category: "Activewear",
    cjCostFrom: 2.11,
    cjCostTo: 6.47,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["Green"],
    material: "Nylon with Lycra lining",
    media: {
      imageCountObserved: 12,
      videoGalleryObserved: false,
      exactImageUrls: []
    },
    inventoryStatus: "requires-live-check",
    launchStatus: "sample-required"
  },
  {
    pid: "1624701980914495488",
    sku: "CJLS168253301AZ",
    sourceUrl: "https://www.cjdropshipping.com/product/womens-suspender-tank-top-tights-p-1624701980914495488.html",
    name: "Women's Suspender Tank Top Tights",
    category: "Women's Fashion",
    cjCostFrom: 3.19,
    cjCostTo: 16.92,
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["White"],
    material: "Spandex",
    media: {
      imageCountObserved: 33,
      videoGalleryObserved: true,
      exactImageUrls: []
    },
    inventoryStatus: "requires-live-check",
    launchStatus: "sample-required"
  },
  {
    pid: "45062F6E-76F7-4F13-9797-E696A8F09256",
    sku: "CJNSNYWX00747-White-S",
    sourceUrl: "https://www.cjdropshipping.com/product/backless-bra-invisible-bralette-thin-lace-wedding-bras-low-back-underwear-push-up-brassiere-women-seamless-lingerie-sexy-bh-top-p-45062F6E-76F7-4F13-9797-E696A8F09256.html",
    name: "Backless Bra Invisible Bralette Thin Lace Wedding Bra",
    category: "Intimates",
    cjCostFrom: 3.75,
    cjCostTo: 11.25,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["White"],
    material: "Nylon, polyamide and cotton",
    media: {
      imageCountObserved: 11,
      videoGalleryObserved: false,
      exactImageUrls: []
    },
    inventoryStatus: "requires-live-check",
    launchStatus: "sample-required"
  },
  {
    pid: "31A457E3-EB08-45E4-8B05-0C88C53099CC",
    sku: "CJNSSYCS00011-Pink-A",
    sourceUrl: "https://cjdropshipping.com/product/large-size-strapless-bra-adhesive-sticky-push-up-bras-for-women-rabbit-brassiere-lingerie-invisible-women-hot-p-31A457E3-EB08-45E4-8B05-0C88C53099CC.html",
    name: "Large Size Strapless Adhesive Push-Up Bra",
    category: "Intimates",
    cjCostFrom: 0.57,
    cjCostTo: 1.89,
    sizes: ["A", "B", "C", "D"],
    colors: ["Pink"],
    material: "58.5% chinlon, 14.5% spandex",
    media: {
      imageCountObserved: 10,
      videoGalleryObserved: true,
      exactImageUrls: ["https://cf.cjdropshipping.com/15129216/82074451822.jpg"]
    },
    inventoryStatus: "requires-live-check",
    launchStatus: "sample-required"
  },
  {
    pid: "1765026105570250752",
    sku: "CJJS198243301AZ",
    sourceUrl: "https://www.cjdropshipping.com/product/yoga-jumpsuit-v-shaped-back-design-sleeveless-fitness-running-sportswear-stretch-tights-pants-for-womens-clothing-p-1765026105570250752.html",
    name: "Yoga Jumpsuit V-Shaped Back Sleeveless Fitness Sportswear",
    category: "Activewear",
    cjCostFrom: 12.31,
    sizes: ["S", "M", "L"],
    colors: ["Light Grey"],
    material: "78% nylon, 22% spandex",
    media: {
      imageCountObserved: 12,
      videoGalleryObserved: true,
      exactImageUrls: ["https://oss.cjdropshipping.com/product/2024/03/06/03/c553172d-6a73-4b3e-a321-d47ff9d7d724.jpg"]
    },
    inventoryStatus: "requires-live-check",
    launchStatus: "sample-required"
  },
  {
    pid: "2406240825031609500",
    sku: "CJLY206756801AZ",
    sourceUrl: "https://www.cjdropshipping.com/product/chiffon-printed-short-sleeve-dress-summer-elegant-v-neck-dresses-womens-clothing-p-2406240825031609500.html",
    name: "Chiffon Printed Short Sleeve V-Neck Dress",
    category: "Women's Fashion",
    cjCostFrom: 5.03,
    cjCostTo: 9.75,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
    colors: ["Green"],
    material: "Chiffon / polyester fiber",
    media: {
      imageCountObserved: 14,
      videoGalleryObserved: true,
      exactImageUrls: []
    },
    inventoryStatus: "requires-live-check",
    launchStatus: "sample-required"
  },
  {
    pid: "1392719718007312384",
    sku: "CJWL112679901AZ",
    sourceUrl: "https://www.cjdropshipping.com/product/satin-party-dress-v-neck-backless-mini-sleeveless-summer-party-dress-p-1392719718007312384.html",
    name: "Satin V-Neck Backless Mini Party Dress",
    category: "Women's Fashion",
    cjCostFrom: 5.60,
    sizes: ["S", "M", "L"],
    colors: ["White"],
    material: "Satin",
    media: {
      imageCountObserved: 15,
      videoGalleryObserved: true,
      exactImageUrls: []
    },
    inventoryStatus: "requires-live-check",
    launchStatus: "sample-required"
  }
];
