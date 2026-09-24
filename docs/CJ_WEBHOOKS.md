# CJ stock & product webhooks (Elarossa)

## Callback URL

```
POST https://elarossa.vercel.app/api/webhooks/cj
```

Must be **public HTTPS**. CJ rejects localhost. Respond **200 within ~3 seconds** or the topic can auto-close.

## Signature

Header: `sign`  
`sign = Base64( HMAC-SHA256( secret = openId, message = raw JSON body ) )`

Set Vercel env:

| Variable | Purpose |
|----------|---------|
| `CJ_OPEN_ID` | `openId` from `getAccessToken` response |
| `CJ_API_KEY` | Already used for API calls |
| `ADMIN_ACCESS_TOKEN` | Protect register endpoint |
| `CJ_WEBHOOK_SKIP_VERIFY` | `true` only for emergency debug |

## One-time register

```bash
curl -X POST https://elarossa.vercel.app/api/admin/cj-webhooks/register \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"subscribe": true}'
```

This calls:

1. `POST /webhook/set` — ENABLE stock + product → your callback  
2. `POST /webhook/product/subscribe` — all catalog `cjPid`s (chunks of 100)

## Stock payload (CJ)

```json
{
  "messageId": "…",
  "type": "STOCK",
  "messageType": "UPDATE",
  "params": {
    "<vid>": [
      {
        "vid": "…",
        "pid": "…",
        "areaId": "2",
        "areaEn": "US Warehouse",
        "countryCode": "US",
        "storageNum": 12
      }
    ]
  }
}
```

We parse → in-memory cache → `GET /api/stock?pid=…`

## Limits

- Cache is **per serverless instance** (not shared Redis yet).
- Subscribe catalog PIDs only (not subscribeAll — restricted by CJ after mid-2026).
- Failed callbacks can disable the topic; keep the handler fast and return 200 after verify.

## Read stock

```bash
curl https://elarossa.vercel.app/api/stock
curl https://elarossa.vercel.app/api/stock?pid=YOUR_CJ_PID
```
