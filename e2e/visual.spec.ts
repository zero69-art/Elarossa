import { test, expect } from "@playwright/test";

/**
 * Visual regression — Playwright compares page screenshots to committed baselines.
 *
 * Generate / refresh baselines (after intentional UI changes):
 *   npm run test:visual:update
 *
 * On failure, Playwright writes actual + expected + diff under test-results/
 * (uploaded as CI artifact "visual-diff-screenshots").
 */

async function settle(page: import("@playwright/test").Page) {
  await page.waitForLoadState("domcontentloaded");
  // Soft wait for images; don't fail visual if a remote CDN is slow
  await page.waitForTimeout(800);
  await page.evaluate(() => document.fonts?.ready).catch(() => undefined);
}

test.describe("Visual regression", () => {
  test.use({
    // Hide chat widget & sticky noise that can shift between runs
    javaScriptEnabled: true,
  });

  test.beforeEach(async ({ page }) => {
    // Reduce flakiness from sticky header / chat FAB
    await page.addInitScript(() => {
      try {
        localStorage.clear();
      } catch {
        /* ignore */
      }
    });
  });

  test("home hero + moods", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    // Mask floating chat button if present
    const chat = page.getByRole("button", { name: /shopping assistant|open shopping|chat/i });
    await expect(page).toHaveScreenshot("home-full.png", {
      fullPage: true,
      mask: [chat],
      maxDiffPixelRatio: 0.03,
    });
  });

  test("home above the fold", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    const chat = page.getByRole("button", { name: /shopping assistant|open shopping|chat/i });
    await expect(page).toHaveScreenshot("home-viewport.png", {
      fullPage: false,
      mask: [chat],
    });
  });

  test("collection page", async ({ page }) => {
    await page.goto("/products");
    await settle(page);
    const chat = page.getByRole("button", { name: /shopping assistant|open shopping|chat/i });
    await expect(page).toHaveScreenshot("products-viewport.png", {
      fullPage: false,
      mask: [chat],
      maxDiffPixelRatio: 0.03,
    });
  });

  test("product detail", async ({ page }) => {
    await page.goto("/products/scrunch-seamless-lifting-leggings");
    await settle(page);
    const chat = page.getByRole("button", { name: /shopping assistant|open shopping|chat/i });
    await expect(page).toHaveScreenshot("pdp-scrunch-leggings.png", {
      fullPage: false,
      mask: [chat],
      maxDiffPixelRatio: 0.03,
    });
  });

  test("cart empty", async ({ page }) => {
    await page.goto("/cart");
    await settle(page);
    const chat = page.getByRole("button", { name: /shopping assistant|open shopping|chat/i });
    await expect(page).toHaveScreenshot("cart-viewport.png", {
      fullPage: false,
      mask: [chat],
    });
  });
});
