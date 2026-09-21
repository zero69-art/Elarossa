# Elarossa

Luxury-first women's ecommerce storefront for the USA and Europe.

**Live:** [elarossa.vercel.app](https://elarossa.vercel.app)

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Stripe Checkout
- CJdropshipping integration (planned / gated)
- Vercel-ready

## Commerce architecture
```
Storefront → catalog → cart/checkout → orders → CJdropshipping → analytics → AI commerce agents
```

## AI / Bot system (under CEO)
| Agent | Role |
|-------|------|
| Product Hunter | Find high-margin candidates on CJ + trends |
| Quality Gate | Sample review → approve or reject |
| Pricing & Margin | Protect ≥55% gross after shipping reserve |
| Marketing | Creative tests, Meta, email, organic |
| SEO / Store | Titles, meta, speed, collections |
| Operations / CS | Fulfilment + support templates |
| Profit / CEO Analytics | Daily P&L, kill-or-scale signals |

Automated actions use hard budget, margin, loss and approval guardrails. See `CEO_OPS.md`.

## Local development
```bash
cp .env.example .env.local
# fill STRIPE_SECRET_KEY, ADMIN_ACCESS_TOKEN, etc.
npm install
npm run dev
```

## Scripts
- `npm run typecheck`
- `npm run build`
- `npm run validate:media`
- `npm run validate:cj`

## Important env
| Variable | Purpose |
|----------|---------|
| `ELAROSSA_STORE_LIVE` | Must be `true` to open checkout |
| `STRIPE_SECRET_KEY` | Live or test Stripe key |
| `ADMIN_ACCESS_TOKEN` | Protects /admin and CJ API routes |
| `CJ_ACCESS_TOKEN` | Supplier API |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin |

**Do not set `ELAROSSA_STORE_LIVE=true` until samples, legal and fulfilment are verified.**

## Status
Founding edit is in pre-launch quality gate. Missing static pages (`/about`, `/faq`, `/contact`) have been added. Focus is now samples → real photography → selective go-live → first paid traffic.
