import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { getCJProduct, getCJVariants, toCJStoreProduct } from "@/lib/cj";

// Admin-gated. Fetches one CJ product plus its variants and returns the
// storefront-shaped product object (see toCJStoreProduct) ready to paste
// into lib/products.ts. The site's catalogue is static TypeScript, so
// this deliberately does not write files at request time — Vercel's
// production filesystem is read-only, and any changes made this way
// wouldn't survive the next deployment anyway.
export async function GET(request: Request, { params }: { params: Promise<{ pid: string }> }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { pid } = await params;
  if (!pid) return NextResponse.json({ error: "Missing product id." }, { status: 400 });

  try {
    const [productRes, variantRes] = await Promise.all([
      getCJProduct(pid),
      getCJVariants(pid).catch(() => null),
    ]);

    const raw = productRes?.data ?? productRes;
    if (!raw) return NextResponse.json({ error: "Product not found." }, { status: 404 });

    const variants = Array.isArray(variantRes?.data) ? variantRes.data : [];
    const item = {
      ...raw,
      pid: String(raw.pid ?? pid),
      productNameEn: String(raw.productNameEn ?? raw.productName ?? "CJ Product"),
      bigImage: raw.bigImage ?? raw.productImage,
      productImageSet: Array.isArray(raw.productImageSet) ? raw.productImageSet : [],
      variants,
    };

    const storeProduct = toCJStoreProduct(item);
    return NextResponse.json({ product: storeProduct });
  } catch (error) {
    const message = error instanceof Error ? error.message : "CJ product request failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
