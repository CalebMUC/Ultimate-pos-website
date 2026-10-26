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

/** The site-wide share image (src/app/opengraph-image.tsx). */
const defaultImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — cloud POS software for Kenyan businesses, with M-Pesa built in`,
};

/**
 * Per-page metadata with a self-referencing canonical, Open Graph and Twitter tags.
 * og:image comes from the page's own opengraph-image.tsx when it has one (file-based images
 * take priority). Otherwise this falls back to the site-wide image: setting `openGraph` here
 * replaces the parent's, so without the fallback such pages would have no share image.
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
      images: [defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [defaultImage],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
