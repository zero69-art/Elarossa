# CJ webhooks (Elarossa)

## Callback URL

```
POST https://elarossa.vercel.app/api/webhooks/cj
```

Must be **public HTTPS**. Respond **200 within ~3 seconds** or CJ may auto-close the topic.

## Signature

Header: `sign`  
`sign = Base64( HMAC-SHA256( secret = openId, message = raw JSON body ) )`

| Env | Purpose |
|-----|---------|
| `CJ_OPEN_ID` | `openId` from `getAccessToken` |
| `CJ_API_KEY` | API calls + register |
| `ADMIN_ACCESS_TOKEN` | Protect register endpoint |
| `CJ_WEBHOOK_SKIP_VERIFY` | `true` only for emergency debug |

## Register (stock + product + logistics)

```bash
curl -X POST https://elarossa.vercel.app/api/admin/cj-webhooks/register \
  -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"subscribe": true, "logistics": true}'
```

Calls:

1. `POST /webhook/set` — ENABLE stock, product, **logistics**
2. `POST /webhook/product/subscribe` — catalog `cjPid`s (chunks of 100)

Order topic stays **off** by default (`"order": true` to enable).

## LOGISTIC payload (CJ)

```json
{
  "messageId": "…",
  "type": "LOGISTIC",
  "messageType": "UPDATE",
  "params": {
    "orderId": "210823100016290555",
    "logisticName": "CJPacket Ordinary",
    "trackingNumber": "number12345678",
    "trackingUrl": "https://…",
    "trackingStatus": 12,
    "logisticsTrackEvents": "[{\"status\":12,\"activity\":\"Delivered\",…}]"
  }
}
```

### trackingStatus codes

| Code | Meaning |
|------|---------|
| 0 | No tracking info |
| 1 | Warehouse outbound |
| 2 | Carrier inbound |
| 3 | Carrier returned |
| 4 | Carrier outbound |
| 5 | First-mile transit |
| 6 | Arrived destination country |
| 7 | Customs started |
| 8 | Customs cleared |
| 9 | Last-mile pickup |
| 10 | Out for delivery |
| 11 | Arrival for pickup |
| 12 | **Delivered** |
| 13 | Failed / exception |
| 14 | Returned |

Handler: `lib/cj-logistics-cache.ts` → in-memory by `orderId` / tracking number.

## Read tracking

```bash
curl "https://elarossa.vercel.app/api/tracking?orderId=YOUR_CJ_ORDER_ID"
curl "https://elarossa.vercel.app/api/tracking?tracking=TRACKING_NUMBER"
curl "https://elarossa.vercel.app/api/tracking"
```

## Stock (unchanged)

```bash
curl https://elarossa.vercel.app/api/stock?pid=YOUR_CJ_PID
```

## Limits

- Cache is **per serverless instance** (not shared Redis yet).
- Keep handler fast; return 200 after signature verify even on soft parse issues.
- Map Stripe `session.id` → CJ `orderId` in fulfillment so customer support can look up tracking by your order number.
