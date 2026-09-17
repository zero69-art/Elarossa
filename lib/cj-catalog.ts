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
    pid: "1636554088848969728", sku: "CJDK1708829-Red-S M", sourceUrl: "https://cjdropshipping.com/product/fitness-yoga-shorts-pants-butt-lifting-seamless-leggings-women-gym-p-1636554088848969728.html", name: "Fitness Yoga Shorts Pants Butt Lifting Seamless Leggings Women Gym", category: "Activewear", cjCostFrom: 1.81,
    sizes: ["S", "M", "XL"], colors: ["Red", "Yellow", "Green", "Black", "Gray", "Royal Blue", "Khaki"], material: "Polyester fiber blend", media: { imageCountObserved: 13, videoGalleryObserved: true, exactImageUrls: ["https://cf.cjdropshipping.com/7ee37ccf-0f8e-4323-8829-dbe0a9886fa3.jpg"] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "91CD22EB-C2A3-4A16-A250-2FB17DC7FBC0", sku: "CJNSXZDD00486-Green-L", sourceUrl: "https://www.cjdropshipping.com/product/plaid-leggings-fitness-yoga-pants-womens-seamless-high-waist-breathable-gym-leggings-p-91CD22EB-C2A3-4A16-A250-2FB17DC7FBC0.html", name: "Plaid Leggings Fitness Yoga Pants Women's Seamless High Waist Breathable Gym Leggings", category: "Activewear", cjCostFrom: 2.11, cjCostTo: 6.47,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"], colors: ["Green"], material: "Nylon with Lycra lining", media: { imageCountObserved: 12, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1624701980914495488", sku: "CJLS168253301AZ", sourceUrl: "https://www.cjdropshipping.com/product/womens-suspender-tank-top-tights-p-1624701980914495488.html", name: "Women's Suspender Tank Top Tights", category: "Women's Fashion", cjCostFrom: 3.19, cjCostTo: 16.92,
    sizes: ["XS", "S", "M", "L", "XL", "2XL"], colors: ["White"], material: "Spandex", media: { imageCountObserved: 33, videoGalleryObserved: true, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "45062F6E-76F7-4F13-9797-E696A8F09256", sku: "CJNSNYWX00747-White-S", sourceUrl: "https://www.cjdropshipping.com/product/backless-bra-invisible-bralette-thin-lace-wedding-bras-low-back-underwear-push-up-brassiere-women-seamless-lingerie-sexy-bh-top-p-45062F6E-76F7-4F13-9797-E696A8F09256.html", name: "Backless Bra Invisible Bralette Thin Lace Wedding Bra", category: "Intimates", cjCostFrom: 3.75, cjCostTo: 11.25,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"], colors: ["White"], material: "Nylon, polyamide and cotton", media: { imageCountObserved: 11, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "31A457E3-EB08-45E4-8B05-0C88C53099CC", sku: "CJNSSYCS00011-Pink-A", sourceUrl: "https://cjdropshipping.com/product/large-size-strapless-bra-adhesive-sticky-push-up-bras-for-women-rabbit-brassiere-lingerie-invisible-women-hot-p-31A457E3-EB08-45E4-8B05-0C88C53099CC.html", name: "Large Size Strapless Adhesive Push-Up Bra", category: "Intimates", cjCostFrom: 0.57, cjCostTo: 1.89,
    sizes: ["A", "B", "C", "D"], colors: ["Pink"], material: "58.5% chinlon, 14.5% spandex", media: { imageCountObserved: 10, videoGalleryObserved: true, exactImageUrls: ["https://cf.cjdropshipping.com/15129216/82074451822.jpg"] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1765026105570250752", sku: "CJJS198243301AZ", sourceUrl: "https://www.cjdropshipping.com/product/yoga-jumpsuit-v-shaped-back-design-sleeveless-fitness-running-sportswear-stretch-tights-pants-for-womens-clothing-p-1765026105570250752.html", name: "Yoga Jumpsuit V-Shaped Back Sleeveless Fitness Sportswear", category: "Activewear", cjCostFrom: 12.31,
    sizes: ["S", "M", "L"], colors: ["Light Grey"], material: "78% nylon, 22% spandex", media: { imageCountObserved: 12, videoGalleryObserved: true, exactImageUrls: ["https://oss.cjdropshipping.com/product/2024/03/06/03/c553172d-6a73-4b3e-a321-d47ff9d7d724.jpg"] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "2406240825031609500", sku: "CJLY206756801AZ", sourceUrl: "https://www.cjdropshipping.com/product/chiffon-printed-short-sleeve-dress-summer-elegant-v-neck-dresses-womens-clothing-p-2406240825031609500.html", name: "Chiffon Printed Short Sleeve V-Neck Dress", category: "Women's Fashion", cjCostFrom: 5.03, cjCostTo: 9.75,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"], colors: ["Green"], material: "Chiffon / polyester fiber", media: { imageCountObserved: 14, videoGalleryObserved: true, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1392719718007312384", sku: "CJWL112679901AZ", sourceUrl: "https://www.cjdropshipping.com/product/satin-party-dress-v-neck-backless-mini-sleeveless-summer-party-dress-p-1392719718007312384.html", name: "Satin V-Neck Backless Mini Party Dress", category: "Women's Fashion", cjCostFrom: 5.60,
    sizes: ["S", "M", "L"], colors: ["White"], material: "Satin", media: { imageCountObserved: 15, videoGalleryObserved: true, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "01BBC860-23D4-43D6-98C6-F39836578014", sku: "CJNSXZDD00084-Orange-XL", sourceUrl: "https://www.cjdropshipping.com/product/booty-lifting-anti-cellulite-scrunch-leggings-without-pocket-p-01BBC860-23D4-43D6-98C6-F39836578014.html", name: "Booty Lifting Anti Cellulite Scrunch Leggings Without Pocket", category: "Activewear", cjCostFrom: 1.41, cjCostTo: 2.72,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "XXL"], colors: ["Orange", "Black", "White", "Gray", "Rose Red", "Fluorescent Green", "Orange", "Lake Blue", "Blue", "Purple"], material: "Polyester fiber and spandex", media: { imageCountObserved: 20, videoGalleryObserved: true, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1575007430336065536", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/fake-translucent-plus-size-leggings-fleece-lined-tights-fall-and-winter-warm-fleece-pantyhose-women-fleece-lined-pantyhose-thermal-winter-tights-p-1575007430336065536.html", name: "Fake Translucent Plus Size Fleece Lined Tights", category: "Women's Fashion", cjCostFrom: 0.57, cjCostTo: 2.49,
    sizes: ["80g", "80g Plus", "220g", "220g Plus", "300g", "300g Plus"], colors: ["Black", "Skin", "Coffee", "Gray"], material: "Polyester fiber", media: { imageCountObserved: 70, videoGalleryObserved: true, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "BB3F2D46-EB14-4D45-94B1-CF00A82858CE", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/solid-turtleneck-long-sweater-winter-warm-women-sweater-dress-p-BB3F2D46-EB14-4D45-94B1-CF00A82858CE.html", name: "Solid Turtleneck Long Sweater Winter Warm Women Sweater Dress", category: "Women's Fashion", cjCostFrom: 5.09, cjCostTo: 8.34,
    sizes: [], colors: [], media: { imageCountObserved: 0, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1620610802850353152", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/hip-lifting-fitness-leggings-tummy-control-workout-running-gym-yoga-pants-for-women-p-1620610802850353152.html", name: "Hip Lifting Fitness Leggings Tummy Control Workout Running Gym Yoga Pants", category: "Activewear", cjCostFrom: 5.07,
    sizes: [], colors: [], media: { imageCountObserved: 0, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1772620844519804928", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/new-polka-dot-print-suspender-dress-summer-sexy-split-long-dresses-for-womens-clothing-p-1772620844519804928.html", name: "New Polka Dot Print Suspender Dress", category: "Women's Fashion", cjCostFrom: 5.17,
    sizes: [], colors: [], media: { imageCountObserved: 0, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1699251337977933824", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/fashion-long-sleeve-zipper-jumpsuit-seamless-slimming-shapewear-for-women-romper-p-1699251337977933824.html", name: "Fashion Long Sleeve Zipper Jumpsuit Seamless Slimming Shapewear", category: "Intimates", cjCostFrom: 2.81, cjCostTo: 5.31,
    sizes: [], colors: [], media: { imageCountObserved: 0, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1419482850822066176", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/summer-womens-vintage-printed-bohemian-dress-elegant-ladies-casual-loose-v-neck-short-sleeve-long-dresses-p-1419482850822066176.html", name: "Summer Vintage Printed Bohemian Dress", category: "Women's Fashion", cjCostFrom: 4.19, cjCostTo: 5.03,
    sizes: [], colors: [], media: { imageCountObserved: 0, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1792916466007166976", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/summer-striped-printed-suspender-long-dress-with-pockets-fashion-square-neck-backless-dresses-for-beach-vacation-women-clothing-p-1792916466007166976.html", name: "Summer Striped Printed Suspender Long Dress With Pockets", category: "Women's Fashion", cjCostFrom: 8.49,
    sizes: [], colors: [], media: { imageCountObserved: 0, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1735130166671708160", sku: "CJYD192060201AZ", sourceUrl: "https://www.cjdropshipping.com/product/slim-straight-leg-pants-with-buckle-fashion-solid-color-trousers-for-womens-clothing-p-1735130166671708160.html", name: "Slim Straight-leg Pants With Buckle", category: "Women's Fashion", cjCostFrom: 4.70,
    sizes: ["S", "M", "L", "XL"], colors: ["Green"], material: "Polyester / spandex", media: { imageCountObserved: 10, videoGalleryObserved: true, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1812501149422342144", sku: "CJQB208388201AZ", sourceUrl: "https://www.cjdropshipping.com/product/ins-round-neck-vest-with-bra-summer-solid-color-bottom-sleeveless-top-womens-clothing-p-1812501149422342144.html", name: "INS Round Neck Vest With Bra", category: "Women's Fashion", cjCostFrom: 5.43,
    sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Black"], material: "Cotton / polyester", media: { imageCountObserved: 12, videoGalleryObserved: true, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1692451612414971904", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/striped-long-sleeve-shirt-fashion-ruffle-design-button-up-tops-casual-office-blouse-elegant-commuting-womens-clothing-p-1692451612414971904.html", name: "Striped Long Sleeve Shirt With Ruffle Design", category: "Women's Fashion", cjCostFrom: 7.13,
    sizes: [], colors: [], media: { imageCountObserved: 23, videoGalleryObserved: true, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "2505250240391601500", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/womens-swing-collar-draped-shirts-blouses-elegant-solid-satin-office-ladies-top-pullover-spring-long-sleeve-casual-tops-p-2505250240391601500.html", name: "Women's Swing Collar Draped Satin Blouse", category: "Women's Fashion", cjCostFrom: 4.86, cjCostTo: 6.30,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"], colors: ["Champagne", "Gray", "Blue", "Black", "Print Green", "Print Blue", "Print Black", "Print Dark Blue", "Print White Ribbon"], material: "Polyester", media: { imageCountObserved: 0, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "EFDB6BBB-5A32-43A3-B0CB-189C2D87923F", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/loose-button-lapel-cardigan-top-long-sleeve-shirt-womens-blouses-p-EFDB6BBB-5A32-43A3-B0CB-189C2D87923F.html", name: "Loose Button Lapel Cardigan Top", category: "Women's Fashion", cjCostFrom: 2.90, cjCostTo: 5.97,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL"], colors: [], media: { imageCountObserved: 0, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "F88A6B05-52D5-49DF-BEA4-579699F03169", sku: "CJNSXZDD00352-Beige abstract lines-M", sourceUrl: "https://www.cjdropshipping.com/product/printing-leggings-p-F88A6B05-52D5-49DF-BEA4-579699F03169.html", name: "Printing Leggings", category: "Activewear", cjCostFrom: 3.19,
    sizes: ["XS", "S", "M", "L", "XL"], colors: ["Beige abstract lines"], material: "Cloth", media: { imageCountObserved: 0, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1702524030173061120", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/womens-puff-long-sleeve-dresses-fashion-graceful-solid-color-slim-hip-covering-short-dress-womens-clothing-p-1702524030173061120.html", name: "Women's Puff Long Sleeve Slim Dress", category: "Women's Fashion", cjCostFrom: 5.30, cjCostTo: 6.97,
    sizes: ["S", "M", "L", "XL"], colors: ["Navy Blue", "Black", "Wine Red", "Dark Green"], material: "Polyester", media: { imageCountObserved: 0, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "5C110BC1-462B-420A-9BA1-F446A2241E62", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/fashion-detachable-hooded-jacket-with-pockets-casual-solid-color-zipper-long-sleeve-leather-coat-autumn-winter-womens-clothing-p-5C110BC1-462B-420A-9BA1-F446A2241E62.html", name: "Fashion Detachable Hooded Jacket With Pockets", category: "Women's Fashion", cjCostFrom: 12.60, cjCostTo: 16.53,
    sizes: [], colors: [], material: "Leather-style outerwear", media: { imageCountObserved: 12, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1785925368503873536", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/summer-short-sleeve-shirt-dress-fashion-solid-color-single-breasted-mid-length-loose-dress-p-1785925368503873536.html", name: "Summer Short Sleeve Shirt Dress", category: "Women's Fashion", cjCostFrom: 3.35, cjCostTo: 6.14,
    sizes: [], colors: [], material: "Cloth", media: { imageCountObserved: 23, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "2408030925201620900", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/fat-burning-high-waist-underwear-shapewear-butt-lifter-seamless-women-high-waist-slimming-panty-tummy-control-knickers-pant-briefs-ladies-body-shaper-p-2408030925201620900.html", name: "High Waist Seamless Shapewear Brief", category: "Intimates", cjCostFrom: 4.82, cjCostTo: 9.64,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"], colors: ["Black", "Skin"], material: "Nylon", media: { imageCountObserved: 0, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1770695780362366976", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/casual-suits-fashion-long-sleeve-single-breasted-jacket-top-and-slim-fit-trousers-womens-business-suits-p-1770695780362366976.html", name: "Casual Suit Long Sleeve Jacket And Slim Trousers", category: "Women's Fashion", cjCostFrom: 10.24, cjCostTo: 14.10,
    sizes: [], colors: [], media: { imageCountObserved: 0, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1686615095931047936", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/2pcs-casual-suit-lapel-button-down-blazer-jacket-and-straight-leg-pants-office-commuting-business-trousers-set-clothing-p-1686615095931047936.html", name: "2-Piece Casual Suit Blazer And Straight-Leg Pants", category: "Women's Fashion", cjCostFrom: 10.78, cjCostTo: 37.98,
    sizes: [], colors: [], media: { imageCountObserved: 51, videoGalleryObserved: true, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "42740842-F5F6-4B24-9F2B-C8820124B774", sku: "CJNSWTFY01084-Yellow-XXL", sourceUrl: "https://www.cjdropshipping.com/product/woolen-lapel-jacket-with-double-breasted-design-fashion-casual-trench-fall-winter-mid-length-coat-for-women-clothing-p-42740842-F5F6-4B24-9F2B-C8820124B774.html", name: "Woolen Lapel Double-Breasted Mid-Length Jacket", category: "Women's Fashion", cjCostFrom: 9.95,
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"], colors: ["Yellow"], material: "Woolen-style cloth", media: { imageCountObserved: 0, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1759754447854505984", sku: "CJNZ197175701AZ", sourceUrl: "https://www.cjdropshipping.com/product/womens-suit-low-waist-three-dimensional-tube-top-and-pocket-stitching-jeans-pants-p-1759754447854505984.html", name: "Women's Tube Top And Pocket-Stitch Jeans Set", category: "Women's Fashion", cjCostFrom: 6.14, cjCostTo: 19.38,
    sizes: ["XS", "S", "M", "L"], colors: ["Blue Pants"], material: "Denim-style cloth", media: { imageCountObserved: 0, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1631864402326597632", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/summer-sleeveless-dress-ins-fashion-elegant-evening-party-club-clothing-for-women-p-1631864402326597632.html", name: "Summer Sleeveless Evening Party Dress", category: "Women's Fashion", cjCostFrom: 4.70, cjCostTo: 8.68,
    sizes: ["S", "M", "L", "XL"], colors: [], material: "95% polyester, 5% elastane", media: { imageCountObserved: 0, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "2409010118191617500", sku: "CJYD212537502BY", sourceUrl: "https://www.cjdropshipping.com/product/loose-tube-top-jumpsuit-ins-fashion-backless-wide-leg-long-pants-overalls-womens-clothing-p-2409010118191617500.html", name: "Loose Tube-Top Backless Wide-Leg Jumpsuit", category: "Women's Fashion", cjCostFrom: 4.56, cjCostTo: 9.70,
    sizes: [], colors: [], media: { imageCountObserved: 0, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "2410290251461624100", sku: "CJYD217464201AZ", sourceUrl: "https://www.cjdropshipping.com/product/womens-loose-cotton-coat-faux-fur-patchwork-winter-coat-comfort-chic-long-sleeve-hooded-jacket-p-2410290251461624100.html", name: "Women's Loose Cotton Faux-Fur Patchwork Coat", category: "Women's Fashion", cjCostFrom: 14.10,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"], colors: ["Black"], material: "Cotton-style padded outerwear", media: { imageCountObserved: 6, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1781571465993789440", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/v-neck-sleeveless-jumpsuit-with-belt-design-summer-fashion-trousers-womens-clothing-p-1781571465993789440.html", name: "V-Neck Sleeveless Jumpsuit With Belt", category: "Women's Fashion", cjCostFrom: 6.65,
    sizes: [], colors: [], media: { imageCountObserved: 14, videoGalleryObserved: false, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "1751080947300175872", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/high-stretch-mid-rise-barrel-jeans-fashion-wide-leg-shape-women-casual-baggy-mid-waist-denim-jeans-p-1751080947300175872.html", name: "High Stretch Mid-Rise Barrel Jeans", category: "Women's Fashion", cjCostFrom: 5.39, cjCostTo: 10.09,
    sizes: [], colors: [], material: "Denim", media: { imageCountObserved: 60, videoGalleryObserved: true, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  },
  {
    pid: "2407220913431622300", sku: "live variant lookup required", sourceUrl: "https://www.cjdropshipping.com/product/women-yoga-sexy-sleeveless-sports-romper-yoga-jumpsuits-fitness-one-piece-workout-backless-rompers-tank-top-shorts-sportswear-p-2407220913431622300.html", name: "Women Yoga Sleeveless Sports Romper", category: "Activewear", cjCostFrom: 10.95, cjCostTo: 11.28,
    sizes: [], colors: [], material: "Sportswear fabric", media: { imageCountObserved: 31, videoGalleryObserved: true, exactImageUrls: [] }, inventoryStatus: "requires-live-check", launchStatus: "sample-required"
  }
];
