import { expect, test, type Page } from "@playwright/test";

const thirdParty = /googletagmanager\.com|google-analytics\.com|connect\.facebook\.net|facebook\.com\/tr/;

/** Record third-party analytics requests, answering them locally so no real data is sent. */
async function watchThirdParty(page: Page) {
  const requests: string[] = [];
  await page.route(thirdParty, (route) => {
    requests.push(route.request().url());
    return route.fulfill({ status: 200, contentType: "application/javascript", body: "" });
  });
  return requests;
}

test.describe("Cookie consent", () => {
  test("loads no analytics or pixels before consent", async ({ page }) => {
    const requests = await watchThirdParty(page);
    await page.goto("/");
    await expect(page.getByRole("region", { name: /cookies on this site/i })).toBeVisible();
    await page.waitForLoadState("networkidle");
    expect(requests).toEqual([]);
  });

  test("rejecting keeps analytics off and hides the banner", async ({ page }) => {
    const requests = await watchThirdParty(page);
    await page.goto("/");
    await page.getByRole("button", { name: "Reject all" }).click();
    await expect(page.getByRole("region", { name: /cookies on this site/i })).toBeHidden();
    await page.reload();
    await page.waitForLoadState("networkidle");
    expect(requests).toEqual([]);
    await expect(page.getByRole("region", { name: /cookies on this site/i })).toBeHidden();
  });

  test("accepting loads GA4 (when configured)", async ({ page }) => {
    test.skip(!process.env.NEXT_PUBLIC_GA_ID, "Build with NEXT_PUBLIC_GA_ID to test the GA4 loader");
    const requests = await watchThirdParty(page);
    await page.goto("/");
    await page.getByRole("button", { name: "Accept all" }).click();
    await expect.poll(() => requests.some((url) => url.includes("googletagmanager.com/gtag/js"))).toBe(true);
  });

  test("the WhatsApp button moves above the banner, and the footer reopens settings", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("region", { name: /cookies on this site/i });
    const fab = page.getByRole("link", { name: "Chat with us on WhatsApp" }).last();
    const bannerBox = (await banner.boundingBox())!;
    const fabBox = (await fab.boundingBox())!;
    expect(fabBox.y + fabBox.height).toBeLessThanOrEqual(bannerBox.y + 1);

    await page.getByRole("button", { name: "Accept all" }).click();
    await page.getByRole("button", { name: "Cookie settings" }).click();
    await expect(banner).toBeVisible();
    await expect(page.getByLabel(/analytics/i)).toBeChecked();
  });
});
