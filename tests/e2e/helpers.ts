import { test, type APIRequestContext, type Page } from "@playwright/test";

/** Paths listed in the sitemap (the source of truth for indexable pages). */
export async function sitemapPaths(request: APIRequestContext): Promise<string[]> {
  const xml = await (await request.get("/sitemap.xml")).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

/** Fill the demo form with valid data. */
export async function fillDemoForm(page: Page, email = "e2e@example.com") {
  await page.fill("#demo-fullName", "Wanjiku Kamau");
  await page.fill("#demo-businessName", "Kamau Mini Mart");
  await page.fill("#demo-phone", "0712 345 678");
  await page.fill("#demo-email", email);
  await page.selectOption("#demo-businessType", "supermarket-minimart-pos");
  await page.selectOption("#demo-branches", "2-3");
  await page.check("#demo-mode-online");
  await page.check("#demo-consent");
}

/** The server drops forms submitted faster than a human could (3 s); wait past that. */
export const waitLikeAHuman = (page: Page) => page.waitForTimeout(3200);

/** Accept or reject cookies up front so the banner doesn't sit over the page. */
export async function setConsent(page: Page, choice: "accept" | "reject") {
  await page.context().addCookies([
    {
      name: "up_consent",
      value: choice === "accept" ? "v1:a1m1" : "v1:a0m0",
      url: test.info().project.use.baseURL!,
    },
  ]);
}
