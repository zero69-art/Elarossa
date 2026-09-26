import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Accessibility audits (axe-core) against WCAG 2.1 A + AA.
 * Fails on impact: critical | serious.
 * Moderate / minor are logged but do not fail the build by default.
 */

type AxeViolation = {
  id: string;
  impact?: string | null;
  description: string;
  help: string;
  helpUrl: string;
  nodes: { html: string; target: string[] }[];
};

function formatViolations(violations: AxeViolation[]): string {
  return violations
    .map((v) => {
      const targets = v.nodes
        .slice(0, 5)
        .map((n) => `    - ${n.target.join(" ")}`)
        .join("\n");
      return `[${v.impact ?? "unknown"}] ${v.id}: ${v.help}\n  ${v.helpUrl}\n${targets}`;
    })
    .join("\n\n");
}

async function auditPage(page: import("@playwright/test").Page, path: string) {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(400);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    // Decorative / third-party noise we accept for now
    .disableRules([
      // Color-contrast on external product photos can flake; keep for chrome UI
      // "color-contrast",
    ])
    .analyze();

  const blocking = results.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious"
  ) as AxeViolation[];

  const soft = results.violations.filter(
    (v) => v.impact === "moderate" || v.impact === "minor"
  );

  if (soft.length) {
    console.warn(
      `[a11y soft] ${path}: ${soft.length} moderate/minor\n${formatViolations(soft as AxeViolation[])}`
    );
  }

  expect(
    blocking,
    blocking.length
      ? `A11y failures on ${path}:\n${formatViolations(blocking)}`
      : undefined
  ).toEqual([]);
}

test.describe("Accessibility (axe)", () => {
  test("home", async ({ page }) => {
    await auditPage(page, "/");
  });

  test("collection", async ({ page }) => {
    await auditPage(page, "/products");
  });

  test("product detail", async ({ page }) => {
    await auditPage(page, "/products/scrunch-seamless-lifting-leggings");
  });

  test("cart", async ({ page }) => {
    await auditPage(page, "/cart");
  });

  test("account", async ({ page }) => {
    await auditPage(page, "/account");
  });

  test("login", async ({ page }) => {
    await auditPage(page, "/login");
  });

  test("faq", async ({ page }) => {
    await auditPage(page, "/faq");
  });
});
