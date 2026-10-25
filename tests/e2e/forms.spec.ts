import { expect, test } from "@playwright/test";
import { fillDemoForm, setConsent, waitLikeAHuman } from "./helpers";

test.beforeEach(async ({ page }) => {
  await setConsent(page, "reject");
});

test.describe("Lead forms (JavaScript on)", () => {
  test("shows validation errors, an error summary, and focuses the first problem", async ({ page }) => {
    await page.goto("/request-demo");
    await page.getByRole("button", { name: /request my free demo/i }).click();
    const summary = page.locator("form [role=alert]");
    await expect(summary).toContainText("problems with your form");
    await expect(page.locator("#demo-fullName")).toBeFocused();
    await expect(page.locator("#demo-phone")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#demo-phone")).toHaveAttribute("aria-describedby", /demo-phone-error/);

    await page.fill("#demo-phone", "12345");
    await page.locator("#demo-phone").blur();
    await expect(page.locator("#demo-phone-error")).toContainText("valid Kenyan mobile");
  });

  test("submits a demo request and lands on the thank-you page", async ({ page }) => {
    await page.goto("/request-demo");
    await fillDemoForm(page, "js-demo@example.com");
    await waitLikeAHuman(page);
    await page.getByRole("button", { name: /request my free demo/i }).click();
    await page.waitForURL(/\/thank-you\?type=demo&ref=[0-9a-f-]{36}/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/demo request is in/);
    await expect(page.getByRole("link", { name: /chat on whatsapp/i }).first()).toHaveAttribute(
      "href",
      /^https:\/\/wa\.me\/254720463710\?text=/,
    );
  });

  test("pre-selects the business type from the industry page link", async ({ page }) => {
    await page.goto("/request-demo?industry=pharmacy-chemist-pos");
    await expect(page.locator("#demo-businessType")).toHaveValue("pharmacy-chemist-pos");
  });

  test("quote form reveals the hardware list only when hardware is needed", async ({ page }) => {
    await page.goto("/request-quote");
    await expect(page.locator("#quote-hardwareList")).toBeHidden();
    await page.check("#quote-hardwareNeeded-yes");
    await expect(page.locator("#quote-hardwareList")).toBeVisible();
  });

  test("a filled-in honeypot is silently discarded", async ({ page }) => {
    await page.goto("/contact");
    await page.fill("#contact-fullName", "Spam Bot");
    await page.fill("#contact-phone", "0712345678");
    await page.fill("#contact-email", "bot@example.com");
    await page.fill("#contact-subject", "Buy now");
    await page.fill("#contact-message", "spam");
    await page.check("#contact-consent");
    await page.locator("#company_website").evaluate((el: HTMLInputElement) => (el.value = "http://spam.example"));
    await waitLikeAHuman(page);
    await page.getByRole("button", { name: /send message/i }).click();
    await page.waitForURL("/thank-you?type=contact&ref=ok");
  });
});

test.describe("Lead forms (JavaScript off)", () => {
  test.use({ javaScriptEnabled: false });

  test("returns server-side errors and keeps what was typed", async ({ page }) => {
    await page.goto("/request-demo");
    await page.fill("#demo-fullName", "No Script User");
    await page.fill("#demo-phone", "0799");
    await page.getByRole("button", { name: /request my free demo/i }).click();
    await expect(page.locator("form [role=alert]")).toContainText("problems with your form");
    await expect(page.locator("#demo-fullName")).toHaveValue("No Script User");
    await expect(page.locator("#demo-phone-error")).toContainText("valid Kenyan mobile");
  });

  test("submits successfully without JavaScript", async ({ page }) => {
    await page.goto("/request-demo");
    await fillDemoForm(page, "nojs-demo@example.com");
    await page.getByRole("button", { name: /request my free demo/i }).click();
    await page.waitForURL(/\/thank-you\?type=demo/);
  });
});
