"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export default function ProductViewTracker({ slug, price }: { slug: string; price: number }) {
  useEffect(() => { track("view_item", { slug, price }); }, [slug, price]);
  return null;
}
