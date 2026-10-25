import type { MetadataRoute } from "next";
import { staticRoutes } from "@/config/routes";
import { solutionContent, solutionSlugs } from "@/content/solutions";
import { absoluteUrl } from "@/lib/seo/schema";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: route.updatedAt,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const solutions = solutionSlugs.map((slug) => ({
    url: absoluteUrl(`/solutions/${slug}`),
    lastModified: solutionContent[slug].updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...pages, ...solutions];
}
