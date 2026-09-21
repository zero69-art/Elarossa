# Playwright HAR fixtures

Store recorded network cassettes here for offline API replay.

## Record

```bash
RECORD_HAR=1 npx playwright test e2e/your-spec.ts
```

Use `page.routeFromHAR('./e2e/fixtures/name.har', { url: '**/api/**', update: true, updateContent: 'embed' })`.

## Sanitize (required before commit)

```bash
npm run har:sanitize -- e2e/fixtures/name.har
npm run har:scan -- e2e/fixtures
```

`har:sanitize` redacts cookies, Authorization, API keys, JWTs, Stripe keys, and common PII JSON fields. A `.bak` is created on first sanitize (local only).

## CI gate

On every PR / push, GitHub Actions:

1. Runs `npm run har:ci:sanitize` on all `e2e/fixtures/**/*.har`
2. **Fails** if `git diff` shows changes (HAR was committed dirty)
3. Runs `npm run har:scan` for residual secret patterns

If CI fails on HAR:

```bash
npm run har:sanitize -- e2e/fixtures/<file>.har
npm run har:scan -- e2e/fixtures
git add e2e/fixtures && git commit -m "chore: sanitize HAR fixtures"
```

## Replay in CI

```ts
await page.routeFromHAR("./e2e/fixtures/name.har", {
  url: "**/api/**",
  update: false,
  notFound: "abort",
});
```

Never commit unsanitized HARs. Prefer API-only captures (not full CDN image traffic).
