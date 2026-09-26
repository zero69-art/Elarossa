# Site audit & cleanup (2026-09-26)

## Removed

| Item | Why |
|------|-----|
| `lib/cj-catalog.ts` | Research-only; not imported by storefront |
| `lib/cj-catalog-batch-2026-09-17b.ts` | Same |
| `app/api/cj/health` | Always returned 404 |
| `next.config` rewrites for /shop|/active|/swim|/intimates | Duplicated `app/*/page.tsx` redirects |

## Hardened

| Endpoint | Change |
|----------|--------|
| `POST /api/orders/create-cj` | **Always** requires `FULFILLMENT_SECRET` or `ADMIN_ACCESS_TOKEN` |
| `GET /api/stock` | Public: coarse in-stock only for known catalog pids; full dump admin |
| `GET /api/orders/lookup` | Recent list admin-only; email only with admin token |
| `GET /api/tracking` | Recent list admin-only |

## Kept (intentional)

- Category redirect pages (`/shop`, `/active`, …)
- Admin product importer (`/admin/products` + token)
- Shopping assistant, auth, journal, legal pages
- Stripe webhook path (primary CJ create)
- Sample-gated catalog (`qualityStatus`)

## Still not for production traffic

- `CJ_FULFILL_ON_PAYMENT` until approved SKUs + variant map
- Unsplash lifestyle images → replace with real product photos after samples
- In-memory stock/order caches → Redis when volume requires it
