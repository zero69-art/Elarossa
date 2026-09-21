# Elarossa — CEO Operating System
**Mission: Earn or die. Luxury-first women's essentials. US + Europe.**

## Current state (2026-09-21)
- Storefront live on Vercel: https://elarossa.vercel.app
- Checkout gated (`ELAROSSA_STORE_LIVE=false`) until samples + fulfilment verified
- All catalog items currently `qualityStatus: "sample-required"`
- Stack: Next.js + TypeScript + Tailwind + Stripe + CJdropshipping hooks
- Missing pages fixed: /about, /faq, /contact

## Non-negotiable economics
| Metric | Target |
|--------|--------|
| Gross margin after product cost + shipping reserve | ≥ 55% |
| Max supplier cost (CJ) | Keep under `supplierCostMax` |
| Free shipping threshold | $75 |
| Max ad CAC (blended) | ≤ 25% of AOV |
| Sample approval required before `qualityStatus: "approved"` | Yes |

Never sell a product that has not passed sample review.

## Agent / Bot hierarchy (under CEO)

### 1. Product Hunter Bot
- Scans CJ catalog + trend signals for high-margin women's active / swim / intimates
- Output: candidate SKUs with cost, suggested retail, margin, image quality score
- Hard rule: reject if projected margin < 55% after shipping reserve

### 2. Quality & Sample Gate
- Orders physical samples
- Records fit, fabric, stitching, packaging, real photos
- Only then flips `qualityStatus` → `"approved"` and sets real product images

### 3. Pricing & Margin Bot
- Watches competitor pricing (similar silhouette)
- Adjusts `price` / `compareAtPrice` while protecting floor margin
- Flags when shipping reserve is too low for EU destinations

### 4. Marketing Bot
- Channels: Instagram/TikTok organic + Meta ads + email/SMS (Klaviyo or similar)
- Assets: product carousels, "founding edit" story, journal content
- Budget guardrail: never spend > $X/day without CEO approval (start $50/day test)
- Creative tests: 3 hooks × 2 creatives weekly

### 5. SEO / Store Optimization Bot
- Ensures every product has unique seoTitle + metaDescription
- Internal linking, sitemap, Core Web Vitals
- Collection pages stay clean and fast

### 6. Operations & Support Bot
- Order → CJ fulfilment mapping once live
- CS templates for shipping, returns, size questions
- Escalates refunds / quality issues to CEO

### 7. Profit / CEO Analytics Bot
- Daily dashboard: revenue, margin, CAC, ROAS, inventory risk
- Alerts on margin compression or ad spend over threshold
- Weekly "kill or scale" recommendation per SKU

## Go-live checklist (do in order)
1. [ ] Order samples for top 4–6 SKUs (founding edit + highest margin)
2. [ ] Real product photography (or high-quality lifestyle with accurate product)
3. [ ] Set `qualityStatus: "approved"` only for passed items
4. [ ] Configure Stripe live keys + webhook
5. [ ] Set `ELAROSSA_STORE_LIVE=true`
6. [ ] Soft launch email list + Instagram
7. [ ] First paid test ($50–100/day Meta) with clear ROAS kill switch
8. [ ] Monitor first 20 orders for fulfilment quality

## Immediate 7-day sprint
**Day 1–2:** Fix remaining UX/SEO gaps, expand journal, polish product pages  
**Day 3–4:** Shortlist + sample order for 5 highest-margin candidates  
**Day 5:** Creative assets for launch (static + short video)  
**Day 6:** Email welcome flow + 10% first-order code  
**Day 7:** Soft open selected SKUs + first traffic test  

## Revenue path to first $1M
- Phase 1 (0–$10k/mo): Founding edit, organic + small paid, high AOV via free-shipping threshold
- Phase 2 ($10–50k/mo): Expand approved catalog to 15–25 SKUs, retargeting, UGC
- Phase 3 ($50k+/mo): Private label / better suppliers, subscription or bundle offers, EU local fulfilment if volume justifies

Every decision is measured against cash, margin, and brand trust.  
If a SKU or channel does not contribute to contribution margin after CAC, kill it.

— CEO
