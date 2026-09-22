import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { countMappedVariants, listMappedSlugs } from "@/lib/variant-map";
import { isStoreLive } from "@/lib/fulfillment";

/** Public-ish readiness snapshot for CEO dashboard (admin token optional but recommended). */
export async function GET(request: Request) {
  const admin = process.env.ADMIN_ACCESS_TOKEN?.trim();
  if (admin) {
    const auth = request.headers.get("authorization") || "";
    if (auth !== `Bearer ${admin}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const approved = products.filter((p) => p.qualityStatus === "approved");
  const sample = products.filter((p) => p.qualityStatus === "sample-required");

  return NextResponse.json({
    storeLive: isStoreLive(),
    catalog: {
      total: products.length,
      approved: approved.length,
      sampleRequired: sample.length,
    },
    variantsMapped: countMappedVariants(),
    mappedSlugs: listMappedSlugs(),
    readiness: {
      canOpenCheckout: isStoreLive() && approved.length > 0 && countMappedVariants() > 0,
      blockers: [
        !isStoreLive() ? "ELAROSSA_STORE_LIVE is false" : null,
        approved.length === 0 ? "No products with qualityStatus approved" : null,
        countMappedVariants() === 0 ? "No CJ variant map entries" : null,
        !process.env.NEWSLETTER_WEBHOOK_URL ? "NEWSLETTER_WEBHOOK_URL unset (emails not persisted)" : null,
      ].filter(Boolean),
    },
  });
}
