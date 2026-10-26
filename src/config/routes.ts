import type { MetadataRoute } from "next";
import { hasPublishedPosts, posts } from "@/content/blog";
import { hasPublishedTestimonials } from "@/content/testimonials";
import { site } from "./site";

/**
 * Indexable static pages, for the sitemap. Add a page here when it ships, and bump
 * `updatedAt` (YYYY-MM-DD) when its content changes meaningfully.
 * Dynamic pages (solutions, blog posts) are added from their content in app/sitemap.ts.
 * Never list noindex pages (e.g. /thank-you).
 */
export type IndexableRoute = {
  path: string;
  updatedAt: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

export const staticRoutes: IndexableRoute[] = [
  { path: "/", updatedAt: "2026-10-25", changeFrequency: "weekly", priority: 1 },
  { path: "/features", updatedAt: "2026-10-25", changeFrequency: "monthly", priority: 0.9 },
  { path: "/solutions", updatedAt: "2026-10-25", changeFrequency: "monthly", priority: 0.9 },
  { path: "/request-demo", updatedAt: "2026-10-25", changeFrequency: "yearly", priority: 0.8 },
  { path: "/request-quote", updatedAt: "2026-10-25", changeFrequency: "yearly", priority: 0.8 },
  { path: "/contact", updatedAt: "2026-10-25", changeFrequency: "yearly", priority: 0.7 },
  { path: "/pricing", updatedAt: "2026-10-26", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", updatedAt: "2026-10-26", changeFrequency: "yearly", priority: 0.6 },
  { path: "/faq", updatedAt: "2026-10-26", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy-policy", updatedAt: site.legal.privacyPolicyUpdated, changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", updatedAt: site.legal.termsUpdated, changeFrequency: "yearly", priority: 0.3 },
  // Listed only once they have published content (otherwise they return 404).
  ...(hasPublishedPosts
    ? [{ path: "/blog", updatedAt: posts[0].meta.updatedAt, changeFrequency: "weekly" as const, priority: 0.7 }]
    : []),
  ...(hasPublishedTestimonials
    ? [{ path: "/testimonials", updatedAt: "2026-10-26", changeFrequency: "monthly" as const, priority: 0.6 }]
    : []),
];
