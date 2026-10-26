import { expect, test } from "@playwright/test";
import { setConsent, sitemapPaths } from "./helpers";

test.describe("Content pages", () => {
  test("legal, pricing, about, FAQ and blog pages are in the sitemap", async ({ request }) => {
    const paths = await sitemapPaths(request);
    for (const path of ["/privacy-policy", "/terms", "/pricing", "/about", "/faq", "/blog"]) {
      expect(paths, path).toContain(path);
    }
    expect(paths.some((p) => p.startsWith("/blog/"))).toBe(true);
  });

  test("menus and footer link to the new pages", async ({ page }) => {
    await setConsent(page, "reject");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    for (const name of ["Pricing", "About", "Blog"]) {
      await expect(nav.getByRole("link", { name, exact: true })).toBeVisible();
    }
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByRole("link", { name: "Privacy policy" })).toHaveAttribute("href", "/privacy-policy");
    await expect(footer.getByRole("link", { name: "Terms of service" })).toHaveAttribute("href", "/terms");
    await expect(footer.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/faq");
  });

  test("blog posts carry BlogPosting structured data", async ({ request }) => {
    const slug = (await sitemapPaths(request)).find((p) => p.startsWith("/blog/"))!;
    const html = await (await request.get(slug, { headers: { "User-Agent": "Googlebot" } })).text();
    const types = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
      ([, json]) => JSON.parse(json)["@type"],
    );
    expect(types).toEqual(expect.arrayContaining(["BlogPosting", "BreadcrumbList"]));
    expect(html).toContain('property="og:type" content="article"');
  });

  test("FAQ page has one FAQPage block covering every group", async ({ request }) => {
    const html = await (await request.get("/faq")).text();
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map(([, json]) => JSON.parse(json))
      .filter((d) => d["@type"] === "FAQPage");
    expect(blocks).toHaveLength(1);
    expect(blocks[0].mainEntity.length).toBeGreaterThan(10);
  });

  test("testimonials page stays a 404 until real testimonials exist", async ({ request }) => {
    expect((await request.get("/testimonials")).status()).toBe(404);
  });

  test("the 404 page is helpful and returns a real 404 status", async ({ page }) => {
    await setConsent(page, "reject");
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("We couldn't find that page");
    await expect(page.getByRole("link", { name: "Go to the homepage" })).toHaveAttribute("href", "/");
    await expect(page.getByRole("link", { name: "Request a free demo" }).first()).toBeVisible();
  });
});
