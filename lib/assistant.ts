import { products, type Product } from "@/lib/products";

export type AssistantReply = {
  message: string;
  products?: Array<{ slug: string; name: string; price: number; href: string; tag: string }>;
  links?: Array<{ label: string; href: string }>;
};

function storeLive() {
  return process.env.ELAROSSA_STORE_LIVE === "true";
}

function card(p: Product) {
  return {
    slug: p.slug,
    name: p.name,
    price: p.price,
    href: `/products/${p.slug}`,
    tag: p.tag,
  };
}

function searchProducts(query: string, limit = 4): Product[] {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9+]+/)
    .filter((t) => t.length > 1);

  if (!terms.length) return products.slice(0, limit);

  const scored = products.map((p) => {
    const hay = [p.name, p.category, p.tag, p.description, p.metaDescription, ...p.colors, ...p.details]
      .join(" ")
      .toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (hay.includes(t)) score += 2;
      if (p.name.toLowerCase().includes(t)) score += 3;
      if (p.category.toLowerCase().includes(t)) score += 2;
    }
    // category boosts
    if (/legging|yoga|gym|active|workout|studio/.test(query) && p.category === "Activewear") score += 2;
    if (/swim|bikini|beach|resort|pool/.test(query) && p.category === "Swimwear") score += 2;
    if (/bra|intimate|brief|lingerie|underwear/.test(query) && p.category === "Intimates") score += 2;
    if (/set|matching/.test(query) && /set/i.test(p.name)) score += 2;
    return { p, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.p);
}

function budgetMax(text: string): number | null {
  const m = text.match(/\$?\s*(\d{2,4})\s*(?:dollars?|usd)?/i);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

/** Catalog-grounded assistant — never invents prices or reviews. */
export function answerAssistant(userMessage: string): AssistantReply {
  const text = userMessage.trim();
  if (!text) {
    return {
      message: "I'm here whenever you're ready — tell me what you're looking for, or ask about shipping and returns.",
    };
  }

  const lower = text.toLowerCase();

  // Shipping
  if (/ship|deliver|postage|freight|how long|arrival/.test(lower)) {
    return {
      message: storeLive()
        ? "Standard delivery is typically estimated at about 5–12 business days after fulfilment, depending on destination. Exact options appear at checkout once ordering is open for a piece."
        : "We're still completing product quality checks before full ordering opens. When a piece is available to order, shipping estimates (about 5–12 business days for standard delivery) will show at checkout. You can join the founding list on any product page to be notified first.",
      links: [
        { label: "Shop the edit", href: "/shop" },
        { label: "FAQ", href: "/faq" },
      ],
    };
  }

  // Returns
  if (/return|refund|exchange|size.?wrong/.test(lower)) {
    return {
      message:
        "Returns and exchanges will follow the policy published on our FAQ and order confirmation once a product is fully approved for sale. Because many pieces are still in sample review, please wait for the live policy on the FAQ page before purchasing. If you've already paid via Stripe, keep your confirmation email and contact us through the contact page.",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/contact" },
      ],
    };
  }

  // Store status / when can I buy
  if (/when.*(buy|order|available|launch)|sold out|can i (buy|order)|checkout|add to (bag|cart)/.test(lower)) {
    return {
      message: storeLive()
        ? "Checkout is open for approved pieces. Choose your size and colour on the product page, then add to bag."
        : "Ordering is temporarily closed while we finish sample quality checks. You can still browse the full edit and use Notify Me on any product page to join the founding list — no charge until we open orders.",
      links: [
        { label: "Browse products", href: "/products" },
        { label: "Shop", href: "/shop" },
      ],
    };
  }

  // Greeting
  if (/^(hi|hello|hey|good (morning|afternoon|evening))\b/.test(lower) || lower.length < 12 && /help|assist/.test(lower)) {
    return {
      message:
        "Welcome to Elarossa. I can help you find activewear, swim, and intimates from our current edit — or answer shipping and returns questions. What are you looking for?",
      links: [
        { label: "Activewear", href: "/active" },
        { label: "Swim", href: "/swim" },
        { label: "Intimates", href: "/intimates" },
      ],
    };
  }

  // Budget filter
  const max = budgetMax(lower);
  let matches = searchProducts(lower, 6);
  if (max != null) {
    matches = matches.filter((p) => p.price <= max);
    if (!matches.length) {
      matches = products.filter((p) => p.price <= max).slice(0, 4);
    }
  }

  // Category-only asks
  if (!matches.length) {
    if (/active|gym|yoga|legging|workout/.test(lower)) {
      matches = products.filter((p) => p.category === "Activewear").slice(0, 4);
    } else if (/swim|bikini|beach/.test(lower)) {
      matches = products.filter((p) => p.category === "Swimwear").slice(0, 4);
    } else if (/bra|intimate|brief/.test(lower)) {
      matches = products.filter((p) => p.category === "Intimates").slice(0, 4);
    }
  }

  if (matches.length) {
    const under = max != null ? ` under $${max}` : "";
    const gated = matches.every((p) => p.qualityStatus !== "approved") || !storeLive();
    const note = gated
      ? " These pieces are listed for the founding edit; ordering opens after sample approval — use Notify Me on the product page if you'd like first access."
      : " Open a product page for sizes, colours, and details.";
    return {
      message: `Here are pieces from our catalog that match what you described${under}.${note}`,
      products: matches.slice(0, 4).map(card),
      links: [{ label: "View all", href: "/shop" }],
    };
  }

  return {
    message:
      "I can only recommend pieces from our live catalog, and I may have missed a match. Try words like leggings, bikini, sports bra, or a budget such as under 40 — or browse the shop directly.",
    links: [
      { label: "Shop", href: "/shop" },
      { label: "All products", href: "/products" },
    ],
  };
}
