import type { MetadataRoute } from "next";

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
];
