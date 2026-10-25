import { expect, test } from "@playwright/test";
import { sitemapPaths } from "./helpers";

const SITE = "https://ultimatepos.co.ke";

test.describe("SEO and crawlability", () => {
  test("every sitemap URL is a 200, self-canonical page with complete metadata in the raw HTML", async ({
    request,
  }) => {
    const paths = await sitemapPaths(request);
    expect(paths.length).toBeGreaterThan(10);
    const titles = new Set<string>();

    for (const path of paths) {
      // Raw HTML as a crawler sees it: no JavaScript runs here.
      const res = await request.get(path, { headers: { "User-Agent": "facebookexternalhit/1.1" } });
      expect(res.status(), path).toBe(200);
      const html = await res.text();

      const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
      expect(title.length, `${path} title`).toBeGreaterThan(10);
      expect(title.replace(/&amp;/g, "&").length, `${path} title ≤ 60`).toBeLessThanOrEqual(60);
      expect(titles.has(title), `${path} duplicate title`).toBe(false);
      titles.add(title);

      const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? "";
      expect(description.replace(/&amp;/g, "&").length, `${path} description ≤ 155`).toBeLessThanOrEqual(155);
      expect(description.length, `${path} description`).toBeGreaterThan(50);

      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
      expect(canonical && new URL(canonical).pathname.replace(/\/$/, ""), `${path} canonical`).toBe(
        path.replace(/\/$/, ""),
      );

      expect(html.match(/<h1[\s>]/g)?.length, `${path} has one H1`).toBe(1);
      for (const tag of ["og:title", "og:description", "og:url", "og:image", "og:image:width", "og:image:alt"]) {
        expect(html, `${path} ${tag}`).toContain(`property="${tag}"`);
      }
      expect(html).toContain('name="twitter:card" content="summary_large_image"');
      expect(html).toContain(`content="${SITE}`);

      // Every JSON-LD block must be valid JSON.
      for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        expect(() => JSON.parse(json), `${path} JSON-LD`).not.toThrow();
      }
    }
  });

  test("homepage carries the site-wide structured data", async ({ request }) => {
    const html = await (await request.get("/", { headers: { "User-Agent": "Googlebot" } })).text();
    const types = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(
      ([, json]) => {
        const data = JSON.parse(json);
        return data["@graph"] ? data["@graph"].map((n: { "@type": string }) => n["@type"]) : [data["@type"]];
      },
    );
    expect(types).toEqual(
      expect.arrayContaining(["Organization", "ProfessionalService", "WebSite", "SoftwareApplication", "FAQPage"]),
    );
    expect(html).not.toContain("aggregateRating");
    expect(html).toContain('lang="en-KE"');
    expect(html).toContain('content="en_KE"');
  });

  test("share images are 1200×630 PNGs", async ({ request }) => {
    for (const path of ["/opengraph-image", "/solutions/pharmacy-chemist-pos/opengraph-image/og"]) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
      expect(res.headers()["content-type"]).toBe("image/png");
      const png = await res.body();
      expect(png.readUInt32BE(16), `${path} width`).toBe(1200);
      expect(png.readUInt32BE(20), `${path} height`).toBe(630);
      expect(png.length).toBeLessThan(8 * 1024 * 1024);
    }
  });

  test("robots.txt links the sitemap and keeps the thank-you page out", async ({ request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain(`Sitemap: ${SITE}/sitemap.xml`);
    expect(robots).toContain("Disallow: /thank-you");
    expect(robots).toContain("Disallow: /api/");
    expect(robots).not.toMatch(/Disallow: \/\s*$/m);
  });

  test("thank-you page is noindex and not in the sitemap", async ({ request }) => {
    const html = await (await request.get("/thank-you")).text();
    expect(html).toMatch(/<meta name="robots" content="noindex/);
    expect(await sitemapPaths(request)).not.toContain("/thank-you");
  });

  test("missing pages return a real 404", async ({ request }) => {
    expect((await request.get("/no-such-page")).status()).toBe(404);
    expect((await request.get("/solutions/no-such-industry")).status()).toBe(404);
  });

  test("security headers are set", async ({ request }) => {
    const headers = (await request.get("/")).headers();
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["strict-transport-security"]).toContain("max-age=");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"]).toContain("camera=()");
    expect(headers["x-powered-by"]).toBeUndefined();
  });
});
