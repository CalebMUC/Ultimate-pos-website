import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { setConsent, sitemapPaths } from "./helpers";

const WCAG = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function expectNoViolations(page: Page, label: string) {
  // The Turnstile iframe is Cloudflare's, not ours.
  const results = await new AxeBuilder({ page }).withTags(WCAG).exclude("iframe").analyze();
  const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target).join(", ")}`);
  expect(summary, label).toEqual([]);
}

test.describe("Accessibility (axe, WCAG 2.2 AA)", () => {
  test("every page in the sitemap", async ({ page, request }) => {
    test.setTimeout(240_000); // one axe run per page
    await setConsent(page, "reject");
    for (const path of await sitemapPaths(request)) {
      await page.goto(path);
      await expectNoViolations(page, path);
    }
  });

  test("the thank-you page and the cookie banner", async ({ page }) => {
    await page.goto("/thank-you?type=demo");
    await expectNoViolations(page, "thank-you with banner");
  });

  test("a form showing validation errors", async ({ page }) => {
    await setConsent(page, "reject");
    await page.goto("/request-demo");
    await page.getByRole("button", { name: /request my free demo/i }).click();
    await expect(page.locator("form [role=alert]")).toBeVisible();
    await expectNoViolations(page, "demo form with errors");
  });

  test("dark theme", async ({ page }) => {
    test.setTimeout(120_000);
    await setConsent(page, "reject");
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem("ultimatepos-theme", "dark");
    });
    for (const path of ["/", "/solutions/pharmacy-chemist-pos", "/request-quote"]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await expectNoViolations(page, `${path} (dark)`);
    }
  });
});
