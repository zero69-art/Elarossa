import Stripe from "stripe";

export function getStripe(): Stripe {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secret) throw new Error("STRIPE_SECRET_KEY is not configured");
  return new Stripe(secret);
}

export type CartLineMeta = {
  slug: string;
  quantity: number;
  size?: string;
  color?: string;
};

/** Compact cart for Stripe metadata (max ~500 chars per value). */
export function encodeCartMetadata(items: CartLineMeta[]): string {
  const compact = items.map((i) => ({
    s: i.slug,
    q: i.quantity,
    z: i.size || "",
    c: i.color || "",
  }));
  return JSON.stringify(compact).slice(0, 490);
}

export function decodeCartMetadata(raw: string | null | undefined): CartLineMeta[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Array<{ s?: string; q?: number; z?: string; c?: string }>;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((row) => ({
        slug: String(row.s || "").trim(),
        quantity: Math.min(10, Math.max(1, Number(row.q) || 1)),
        size: row.z ? String(row.z) : undefined,
        color: row.c ? String(row.c) : undefined,
      }))
      .filter((row) => row.slug);
  } catch {
    return [];
  }
}
