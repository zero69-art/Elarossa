# Stripe webhook setup (Elarossa)

## Endpoint

```
POST https://elarossa.vercel.app/api/webhooks/stripe
```

(or your custom domain)

## Stripe Dashboard

1. Developers → Webhooks → Add endpoint
2. URL: as above
3. Events:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed` (optional log)
4. Copy **Signing secret** (`whsec_…`)

## Vercel env

| Variable | Required | Purpose |
|----------|----------|---------|
| `STRIPE_SECRET_KEY` | yes | Checkout + retrieve sessions |
| `STRIPE_WEBHOOK_SECRET` | yes | Verify webhook signatures |
| `NEXT_PUBLIC_SITE_URL` | recommended | success/cancel URLs |
| `ELAROSSA_STORE_LIVE` | open cart | must be `true` to checkout |
| `CJ_FULFILL_ON_PAYMENT` | optional | `true` to auto-create CJ order after pay |
| `CJ_VARIANT_MAP_JSON` | for CJ | size/color → vid |
| `CJ_API_KEY` | for CJ | token mint |

## Behaviour

1. Customer pays via Stripe Checkout
2. Stripe POSTs signed event to `/api/webhooks/stripe`
3. Signature verified with `STRIPE_WEBHOOK_SECRET`
4. Session retrieved; cart read from `metadata.cart`
5. If `CJ_FULFILL_ON_PAYMENT=true` **and** store live **and** products approved **and** variants mapped → `createOrderV2`
6. Otherwise payment is still valid; fulfillment is skipped and logged

## Local test

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# use the temporary whsec_ from CLI as STRIPE_WEBHOOK_SECRET
```

## Important

Do **not** enable `CJ_FULFILL_ON_PAYMENT` until samples are approved and the variant map is populated.
