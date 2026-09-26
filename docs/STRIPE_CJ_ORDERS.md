# Stripe → CJ order integration (Elarossa)

## Flow

```
Customer Checkout
    → POST /api/checkout  (Stripe Session + metadata.cart)
    → Stripe payment
    → POST /api/webhooks/stripe  (checkout.session.completed)
    → fulfillPaidCheckoutSession()
         gates: ELAROSSA_STORE_LIVE + CJ_FULFILL_ON_PAYMENT
         + product qualityStatus === approved
         + CJ_VARIANT_MAP_JSON (size/color → vid)
    → createOrderV2 (lib/cj-orders)
    → order-bridge (session ↔ cjOrderId)
    → Stripe session metadata: cj_order_id, cj_fulfill
    → later: CJ LOGISTIC webhook → /api/tracking?session=cs_…
```

## Env flags

| Variable | Value | Effect |
|----------|-------|--------|
| `STRIPE_SECRET_KEY` | `sk_…` | Checkout + retrieve |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` | Verify webhook |
| `ELAROSSA_STORE_LIVE` | `true` | Open checkout + allow fulfill |
| `CJ_FULFILL_ON_PAYMENT` | `true` | Auto-create CJ order after pay |
| `CJ_API_KEY` | key | Auth for createOrder |
| `CJ_VARIANT_MAP_JSON` | JSON map | slug::size::color → `{ vid, pid }` |
| `CJ_OPEN_ID` | openId | Logistics webhook verify |

**Do not** set `CJ_FULFILL_ON_PAYMENT=true` until samples are approved and the variant map is filled.

## Cart metadata

Checkout stores compact JSON in `session.metadata.cart`:

```json
[{"s":"slug","q":1,"z":"M","c":"Black"}]
```

Also `order_items` human string as fallback.

Shipping comes from Stripe `shipping_details` / `collected_information` + phone collection.

## Idempotency

- CJ `orderNumber` = Stripe `session.id` (`cs_…`)
- In-process bridge skips re-create if already `ok` on that instance
- Stripe retries on `cj_create_failed` (webhook returns 500)

## Lookups

```bash
# After pay
curl "https://elarossa.vercel.app/api/orders/lookup?session=cs_test_…"

# Logistics after ship
curl "https://elarossa.vercel.app/api/tracking?session=cs_test_…"
curl "https://elarossa.vercel.app/api/tracking?orderId=CJ_ORDER_ID"
```

## Variant map

1. Admin: `POST /api/admin/sync-variants` with `ADMIN_ACCESS_TOKEN`
2. Review returned `map`
3. Set Vercel env `CJ_VARIANT_MAP_JSON` to the map object JSON

## Go-live checklist

1. [ ] Stripe webhook endpoint live + secret on Vercel  
2. [ ] At least one product `qualityStatus: "approved"`  
3. [ ] Variant map covers that product’s sizes/colors  
4. [ ] CJ wallet has balance (createOrder still needs pay step in MyCJ if not auto-paid)  
5. [ ] `ELAROSSA_STORE_LIVE=true`  
6. [ ] `CJ_FULFILL_ON_PAYMENT=true`  
7. [ ] Logistics webhook registered  
8. [ ] Test mode payment → check logs + `/api/orders/lookup`  
