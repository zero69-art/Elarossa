import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const secondary = product.gallery[1];
  return (
    <article className="group min-w-0">
      <Link href={`/products/${product.slug}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a65d68]">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#e9dfda]">
          <img src={product.image} alt={`${product.name} — ${product.category}`} loading="lazy" className={`h-full w-full object-cover transition duration-700 ${secondary ? "group-hover:opacity-0" : "group-hover:scale-105"}`} />
          {secondary && <img src={secondary} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:opacity-100" />}
          <span className="absolute left-3 top-3 bg-white/95 px-2.5 py-2 text-[8px] font-semibold tracking-[.16em] sm:left-4 sm:top-4 sm:text-[9px]">{product.tag}</span>
          {product.qualityStatus !== "approved" && <span className="absolute bottom-3 left-3 bg-[#201b1b]/85 px-2.5 py-2 text-[8px] font-semibold tracking-[.14em] text-white sm:left-4 sm:bottom-4">PRE-LAUNCH</span>}
        </div>
      </Link>
      <div className="flex items-start justify-between gap-3 py-3 sm:py-4">
        <div className="min-w-0"><Link href={`/products/${product.slug}`} className="text-xs leading-5 hover:underline sm:text-sm">{product.name}</Link><p className="mt-1 text-[9px] uppercase tracking-[.16em] opacity-45">{product.category}</p><div className="mt-2 flex gap-1.5" aria-label={`${product.colors.length} available colours`}>{product.colors.slice(0, 4).map((color) => <span key={color} title={color} className="h-3 w-3 rounded-full border border-[#bdb1aa]" style={{ background: color.toLowerCase() === "ivory" ? "#f4eee7" : color.toLowerCase() === "nude" ? "#caa88f" : color.toLowerCase() === "mocha" ? "#755443" : color.toLowerCase() === "stone" ? "#aaa39c" : color.toLowerCase() === "white" ? "#fff" : "#201b1b" }} />)}</div></div>
        <span className="shrink-0 text-xs font-semibold sm:text-sm">${product.price.toFixed(2)}</span>
      </div>
    </article>
  );
}
