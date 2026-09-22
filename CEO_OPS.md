# Elarossa — CEO operating log

**Goal:** million-dollar brand. **Constraint:** ~$0 owner capital until domain/email.

## Live status

| Area | Status |
|------|--------|
| Site | https://elarossa.vercel.app |
| Catalog | 15 SKUs, all `sample-required` |
| Checkout | **LOCKED** |
| Demand | Newsletter + PDP **Notify Me** |
| Fulfillment code | **Built & gated** (create-order, variant sync, status) |
| Variant map | Empty until admin sync after samples |

## Fulfillment stack (shipped)

| Endpoint | Purpose |
|----------|---------|
| `POST /api/admin/sync-variants` | Pull CJ vids → draft map JSON (Bearer ADMIN_ACCESS_TOKEN) |
| `GET /api/admin/fulfillment-status` | Readiness blockers |
| `POST /api/orders/create-cj` | Create CJ order — **403 unless store live + approved + mapped** |

Env:

- `ELAROSSA_STORE_LIVE=true` — only when ready
- `CJ_VARIANT_MAP_JSON` — JSON object of `slug::size::color → { vid, pid }`
- `FULFILLMENT_SECRET` — Bearer for create-cj
- `ADMIN_ACCESS_TOKEN` — admin routes
- `NEWSLETTER_WEBHOOK_URL` — Formspree etc.

## Open-store checklist (do not skip)

1. Sample hero SKU (scrunch leggings) → pass fit/quality
2. Set that product `qualityStatus: "approved"`
3. `POST /api/admin/sync-variants` → review → set `CJ_VARIANT_MAP_JSON`
4. Stripe test payment → create-cj dry run with your address
5. Then `ELAROSSA_STORE_LIVE=true`

## Owner ($0) tasks

- [ ] Formspree → `NEWSLETTER_WEBHOOK_URL`
- [ ] One CJ sample when possible
- [ ] Domain later (UPI)

## Rule

No live checkout on untested product. Demand first, samples second, automation third.
