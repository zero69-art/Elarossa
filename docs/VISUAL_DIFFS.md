# Visual diff screenshots (Playwright)

Elarossa uses Playwright **screenshot comparison** to catch unintended UI changes.

## Commands

```bash
# Run visual suite only (needs baselines)
npm run test:visual

# Create or refresh baseline PNGs after intentional design changes
npm run test:visual:update

# Against production
PLAYWRIGHT_BASE_URL=https://elarossa.vercel.app npm run test:visual:update
```

Baselines live under:

```
e2e/visual.spec.ts-snapshots/
```

Commit those PNGs so CI can compare.

## On failure

Playwright writes three images per failed assertion under `test-results/`:

| File | Meaning |
|------|---------|
| `*-expected.png` | Committed baseline |
| `*-actual.png` | What the browser rendered |
| `*-diff.png` | Red/pink highlight of pixel differences |

CI uploads `test-results/` as artifact **`visual-diff-screenshots`**.

## Tips

- Prefer updating snapshots only when the UI change is intentional.
- Linux CI vs local macOS can differ slightly; `maxDiffPixelRatio` is set to ~2–3%.
- Chat FAB is masked so it does not fail every run.
