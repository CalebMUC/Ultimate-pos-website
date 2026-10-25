import type { Metadata } from "next";
import { site } from "@/config/site";

type PageMetadataInput = {
  /** ≤ 60 characters including the " | Ultimate POS Kenya" suffix */
  title: string;
  /** ≤ 155 characters */
  description: string;
  /** Path of the page, e.g. "/solutions/pharmacy-chemist-pos". Used for the canonical and og:url. */
  path: string;
  /** Use the title as-is, without the site-wide suffix (homepage). */
  absoluteTitle?: boolean;
  ogType?: "website" | "article";
  noindex?: boolean;
};

/**
 * Per-page metadata with a self-referencing canonical, Open Graph and Twitter tags.
 * og:image comes from the nearest opengraph-image.tsx file.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  ogType = "website",
  noindex,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name} Kenya`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: ogType,
      siteName: site.name,
      locale: site.ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
