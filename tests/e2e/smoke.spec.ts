import { expect, test } from "@playwright/test";
import { setConsent } from "./helpers";

const waText = async (href: string | null) => decodeURIComponent(new URL(href ?? "").searchParams.get("text") ?? "");

test.describe("Smoke", () => {
  test("homepage renders its H1 and calls to action", async ({ page }) => {
    await setConsent(page, "reject");
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("POS system");
    await expect(page.getByRole("link", { name: "Request a Free Demo", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /call us on 0720 463 710/i })).toHaveAttribute(
      "href",
      "tel:+254720463710",
    );
  });

  test("floating WhatsApp button opens our chat with a page-specific message", async ({ page }) => {
    await setConsent(page, "reject");
    const fab = page.getByRole("link", { name: "Chat with us on WhatsApp" }).last();

    await page.goto("/");
    await expect(fab).toHaveAttribute("href", /^https:\/\/wa\.me\/254720463710\?text=/);
    await expect(fab).toHaveAttribute("target", "_blank");
    await expect(fab).toHaveAttribute("rel", "noopener noreferrer");
    expect(await waText(await fab.getAttribute("href"))).toBe("Hi Ultimate POS, I'd like to know more about your POS.");

    await page.goto("/solutions/pharmacy-chemist-pos");
    expect(await waText(await fab.getAttribute("href"))).toBe(
      "Hi Ultimate POS, I run a pharmacy and I'd like to know more about your POS.",
    );

    await page.goto("/request-quote");
    expect(await waText(await fab.getAttribute("href"))).toBe("Hi, I'd like a quote for Ultimate POS.");
  });

  test("theme is white by default, and the dark choice persists", async ({ page, isMobile }) => {
    test.skip(isMobile, "The toggle lives in the mobile menu; covered on desktop");
    await page.emulateMedia({ colorScheme: "dark" });
    await setConsent(page, "reject");
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveAttribute("data-theme", "dark");
    await page.getByRole("button", { name: "Dark theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("no horizontal scrolling on any key page", async ({ page }) => {
    await setConsent(page, "reject");
    for (const path of ["/", "/features", "/solutions/water-refill-delivery-pos", "/request-quote"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
});
