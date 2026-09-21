import { test, expect } from "@playwright/test";

test.describe("Elarossa smoke", () => {
  test("home loads with brand", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Elarossa/i);
    await expect(page.getByRole("link", { name: /Elarossa home/i })).toBeVisible();
  });

  test("shop lists products", async ({ page }) => {
    await page.goto("/shop");
    await expect(page.getByRole("heading", { name: /Elarossa Edit/i })).toBeVisible();
    const cards = page.locator('a[href^="/products/"]');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("product detail page renders", async ({ page }) => {
    await page.goto("/products/scrunch-seamless-lifting-leggings");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Leggings/i);
    await expect(page.locator("img").first()).toBeVisible();
    await expect(page.getByText(/\$\d/)).toBeVisible();
  });

  test("cart page loads", async ({ page }) => {
    await page.goto("/cart");
    await expect(page).not.toHaveTitle(/404|Error/i);
    await expect(page.locator("body")).toBeVisible();
  });

  test("trust pages load", async ({ page }) => {
    for (const path of ["/about", "/faq", "/contact", "/shipping", "/returns"]) {
      const res = await page.goto(path);
      expect(res?.ok()).toBeTruthy();
    }
  });

  test("seo assets and sitemap", async ({ request }) => {
    for (const path of ["/favicon.svg", "/logo-mark.svg", "/robots.txt", "/sitemap.xml"]) {
      const res = await request.get(path);
      expect(res.ok(), path).toBeTruthy();
    }
  });

  test("store remains gated when not live", async ({ page }) => {
    await page.goto("/products/scrunch-seamless-lifting-leggings");
    await expect(page.getByText(/SAMPLE REVIEW|QUALITY REVIEW|sample/i).first()).toBeVisible();
  });
});
