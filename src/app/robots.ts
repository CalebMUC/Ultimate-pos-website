import type { MetadataRoute } from "next";
import { isProduction } from "@/env";
import { absoluteUrl } from "@/lib/seo/schema";

export default function robots(): MetadataRoute.Robots {
  // Preview and staging deployments: keep every crawler out.
  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  // CSS, JS and images stay crawlable; only the API and the post-submit page are excluded.
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
