"use client";

import { useState } from "react";

export default function ProductAccordions({ details }: { details: string[] }) {
  const [open, setOpen] = useState<string | null>("DETAILS");
  const rows: Record<string, string[]> = { DETAILS: details, SHIPPING: ["Delivery estimate: 5–12 business days.", "Complimentary shipping applies to orders over $75.", "Available destination countries are shown during checkout."], RETURNS: ["Returns are handled according to the Elarossa returns policy.", "Hygiene-sensitive items may have restrictions where applicable.", "Refunds are returned to the original payment method after eligibility is confirmed."], CARE: ["Follow the garment care information supplied with the final sampled product.", "Because supplier products are sample-reviewed before approval, final care instructions should be confirmed against the approved item."] };
  return <div className="mt-8 border-t border-[#e5dad4]">{Object.entries(rows).map(([title, content]) => <div key={title} className="border-b border-[#e5dad4]"><button type="button" onClick={() => setOpen(open === title ? null : title)} aria-expanded={open === title} className="flex min-h-14 w-full items-center justify-between text-left text-[10px] font-semibold tracking-[.2em]"><span>{title}</span><span aria-hidden="true" className="text-lg font-normal">{open === title ? "−" : "+"}</span></button>{open === title && <div className="pb-5 text-sm leading-7 opacity-65"><ul className="space-y-2">{content.map((item) => <li key={item}>— {item}</li>)}</ul></div>}</div>)}</div>;
}
