import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { queryVariants } from "@/lib/cj-orders";
import { variantKey } from "@/lib/variant-map";

/**
 * Admin: pull CJ variants for catalog PIDs and return a draft variant map JSON.
 * Does NOT write to git — copy into CJ_VARIANT_MAP_JSON or lib/variant-map.ts after review.
 *
 * Auth: Authorization: Bearer $ADMIN_ACCESS_TOKEN
 */
export async function POST(request: Request) {
  const admin = process.env.ADMIN_ACCESS_TOKEN?.trim();
  if (!admin) {
    return NextResponse.json({ error: "ADMIN_ACCESS_TOKEN not configured" }, { status: 503 });
  }
  const auth = request.headers.get("authorization") || "";
  if (auth !== `Bearer ${admin}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { slug?: string } = {};
  try {
    body = await request.json();
  } catch {
    /* all products */
  }

  const targets = body.slug
    ? products.filter((p) => p.slug === body.slug)
    : products.filter((p) => p.cjPid);

  const map: Record<
    string,
    { vid: string; pid: string; sku?: string; rawName?: string; stock?: number }
  > = {};
  const errors: string[] = [];

  for (const product of targets) {
    if (!product.cjPid) continue;
    try {
      const data = await queryVariants(product.cjPid);
      const list = Array.isArray(data)
        ? data
        : Array.isArray((data as { variants?: unknown })?.variants)
          ? (data as { variants: unknown[] }).variants
          : Array.isArray((data as { data?: unknown })?.data)
            ? (data as { data: unknown[] }).data
            : [];

      for (const raw of list) {
        const v = raw as Record<string, unknown>;
        const vid = String(v.vid || v.variantId || "");
        if (!vid) continue;
        const name = String(v.variantNameEn || v.variantKey || v.variantSku || "");
        const parts = name.split(/\s*[-\/|,]\s*/).map((p) => p.trim()).filter(Boolean);
        let size = "One Size";
        let color = "Default";
        for (const part of parts) {
          if (/^(xxs|xs|s|m|l|xl|xxl|xxxl|2xl|3xl|4xl|5xl|one\s*size)$/i.test(part)) size = part;
          else color = part;
        }
        // Prefer matching store size/color lists when possible
        const matchedSize =
          product.sizes.find((s) => s.toLowerCase() === size.toLowerCase()) || size;
        const matchedColor =
          product.colors.find((c) => c.toLowerCase() === color.toLowerCase()) || color;

        map[variantKey(product.slug, matchedSize, matchedColor)] = {
          vid,
          pid: product.cjPid,
          sku: v.variantSku ? String(v.variantSku) : undefined,
          rawName: name,
          stock: typeof v.variantSellQuantity === "number" ? v.variantSellQuantity : undefined,
        };
      }
    } catch (e) {
      errors.push(`${product.slug}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  return NextResponse.json({
    ok: true,
    count: Object.keys(map).length,
    map,
    errors,
    hint: "Review map, then set Vercel env CJ_VARIANT_MAP_JSON to this JSON (map object only).",
  });
}
