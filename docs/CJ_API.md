# CJ API integration (Elarossa)

## Credentials

Set **one** of:

| Env | Notes |
|-----|--------|
| `CJ_API_KEY` | Preferred. Format often `CJUserNum@api@xxxxxxxx`. Exchanged for access token. |
| `CJ_ACCESS_TOKEN` | Direct token; skips exchange (use if you already have a long-lived token). |

Never use `NEXT_PUBLIC_` for these secrets.

## Optimizations in `lib/cj.ts`

| Feature | Behavior |
|---------|----------|
| **Token cache** | In-memory per instance; refreshes ~24h before CJ expiry |
| **Token lock** | Concurrent callers share one `getAccessToken` request |
| **401/403** | Invalidate token and retry |
| **429 / 5xx** | Exponential backoff (honours `Retry-After` when present) |
| **Timeout** | 20s `AbortController` per request |
| **GET cache** | ~60s in-memory for product/list/variant reads (max ~200 keys) |
| **POST** | Never cached; order create clears GET cache |

## Helpers

- `searchCJProducts` / `getCJProduct` / `getCJVariants` — cached GETs
- `getCJProductRows` — flattens listV2 nested `content[].productList[]`
- `queryVariantsBatch` (`lib/cj-orders.ts`) — concurrency-limited variant sync
- `clearCjGetCache()` — call after admin catalog changes if needed

## Operational tips

1. If `APIkey is wrong`, regenerate the key in the CJ developer console and update Vercel env.
2. Serverless: token + GET cache are **per warm instance**; cold starts re-auth once.
3. For durable stock across instances, keep using CJ stock webhooks + optional Redis (see `lib/cj-stock-cache.ts`).
4. Do not call `createCjOrder` unless `ELAROSSA_STORE_LIVE` and quality gates pass.
