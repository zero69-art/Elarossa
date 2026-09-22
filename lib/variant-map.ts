/**
 * Maps Elarossa store variants (size + color) → CJ variant IDs (vid).
 * Populate via admin sync or scripts/sync-cj-variants.mjs before going live.
 */

export type VariantKey = {
  slug: string;
  size: string;
  color: string;
};

export type CjVariantRef = {
  vid: string;
  pid: string;
  sku?: string;
  supplierPrice?: number;
  stock?: number;
};

/** Normalized lookup key */
export function variantKey(slug: string, size: string, color: string): string {
  return `${slug}::${size.trim().toLowerCase()}::${color.trim().toLowerCase()}`;
}

/**
 * Static seed map — start empty; admin/sync fills entries.
 * Shape kept in code so serverless has a cold-start source of truth
 * until a DB is added. Override at runtime via CJ_VARIANT_MAP_JSON env (optional).
 */
const SEED_MAP: Record<string, CjVariantRef> = {
  // Example after sync (do not invent vids):
  // "scrunch-seamless-lifting-leggings::m::black": { vid: "...", pid: "01BBC860-...", sku: "..." },
};

function envMap(): Record<string, CjVariantRef> {
  const raw = process.env.CJ_VARIANT_MAP_JSON?.trim();
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, CjVariantRef>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function getVariantMap(): Record<string, CjVariantRef> {
  return { ...SEED_MAP, ...envMap() };
}

export function resolveCjVariant(slug: string, size: string, color: string): CjVariantRef | null {
  const map = getVariantMap();
  return map[variantKey(slug, size, color)] ?? null;
}

export function listMappedSlugs(): string[] {
  const slugs = new Set(Object.keys(getVariantMap()).map((k) => k.split("::")[0]));
  return [...slugs];
}

export function countMappedVariants(): number {
  return Object.keys(getVariantMap()).length;
}
