# Elarossa — CEO operating log

**Goal:** million-dollar brand. **Constraint:** owner capital ≈ $0 (domain + email only when ready).

## Current state (2026-09-22)

| Area | Status |
|------|--------|
| Live site | https://elarossa.vercel.app — healthy |
| Catalog | 15 SKUs, CJ-sourced, sample-required |
| Checkout | **Closed** until samples approved + `ELAROSSA_STORE_LIVE=true` |
| Demand capture | Homepage newsletter + **PDP Notify Me** waitlist |
| QA | GitHub Actions: typecheck, media, CJ, HAR scan, Playwright, post-deploy |
| Domain | Owner buys later (UPI); keep Vercel URL until then |

## This week's CEO actions (in progress)

1. **Demand before inventory risk** — Notify Me on every gated PDP (shipped). Collect size/color intent.
2. **Persist emails** — Owner: create free Formspree form → set `NEWSLETTER_WEBHOOK_URL` on Vercel.
3. **Sample one hero SKU** — Scrunch Seamless Lifting Leggings (highest story fit). Approve or kill.
4. **Domain when ready** — Brandable `.com` / `.shop` via UPI registrar; point to Vercel; `hello@` mailbox.
5. **Organic only** — Pinterest + 3 journal posts; no paid ads until first approved sample.

## Revenue rule

No open cart on untested product. **Earn trust first, then earn money.**

## Bot stack

| Bot | Job |
|-----|-----|
| Catalog | CJ search, margin ≥52%, media validation |
| QA | Playwright smoke + HAR secret gate |
| Capture | Newsletter + product waitlist API |
| Quality | `qualityStatus` must be `approved` before live sell |

## Owner checklist (you)

- [ ] Set `NEWSLETTER_WEBHOOK_URL` (Formspree free)
- [ ] Order 1–2 CJ samples of founding leggings when you can
- [ ] Buy domain + email when budget allows
- [ ] Do **not** set `ELAROSSA_STORE_LIVE=true` until sample passes

## Next CEO moves after webhook is set

- Weekly digest of waitlist emails by SKU
- Open only `approved` SKUs
- Stripe test checkout rehearsal
