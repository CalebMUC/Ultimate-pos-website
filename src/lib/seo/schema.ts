import { activeSocials, site } from "@/config/site";
import { featureGroups } from "@/content/features";
import type { Faq } from "@/content/faqs";
import type { Testimonial } from "@/content/testimonials";

/**
 * Structured data builders (schema.org JSON-LD). Rules we follow:
 * - Only real facts from config/site.ts and content/*. No invented ratings or prices.
 * - No self-serving aggregateRating on Organization / LocalBusiness (Google ignores or penalises it).
 * - The business is a service-area business: street-level address only, no geo pin.
 */

export type BreadcrumbItem = { name: string; path: string };

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

const ids = {
  organization: absoluteUrl("/#organization"),
  business: absoluteUrl("/#business"),
  website: absoluteUrl("/#website"),
  software: absoluteUrl("/#software"),
};

function organization() {
  const sameAs = activeSocials().map(([, url]) => url);
  return {
    "@type": "Organization",
    "@id": ids.organization,
    name: site.name,
    url: site.url,
    logo: { "@type": "ImageObject", url: absoluteUrl(site.logo), width: 512, height: 512 },
    email: site.email.sales,
    telephone: site.phone.e164,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phone.e164,
        email: site.email.sales,
        contactType: "sales",
        areaServed: site.location.countryCode,
        availableLanguage: ["en", "sw"],
      },
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** LocalBusiness subtype for a service-area business (no walk-in office). */
function business() {
  return {
    "@type": "ProfessionalService",
    "@id": ids.business,
    name: site.name,
    description: site.description,
    url: site.url,
    image: absoluteUrl(site.logo),
    logo: absoluteUrl(site.logo),
    telephone: site.phone.e164,
    email: site.email.sales,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.area,
      addressLocality: site.location.locality,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    areaServed: { "@type": "Country", name: site.location.country },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.hours.days,
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    parentOrganization: { "@id": ids.organization },
  };
}

function website() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    name: site.name,
    url: site.url,
    inLanguage: site.locale,
    publisher: { "@id": ids.organization },
  };
}

/** Site-wide graph rendered in the root layout. */
export function siteSchema() {
  return { "@context": "https://schema.org", "@graph": [organization(), business(), website()] };
}

/**
 * The product itself (home and /features). `offers` appears only once a real price is
 * published in config/site.ts; `review` only for real, consented testimonials.
 */
export function softwareApplicationSchema(testimonials: Testimonial[] = []) {
  const price = site.pricing.fromKesPerMonth;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": ids.software,
    name: site.name,
    description: site.description,
    url: site.url,
    image: absoluteUrl(site.logo),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: site.locale,
    publisher: { "@id": ids.organization },
    featureList: featureGroups.flatMap((group) => group.features.map((feature) => feature.title)),
    ...(price !== null
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: site.currency,
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price,
              priceCurrency: site.currency,
              unitCode: "MON",
            },
          },
        }
      : {}),
    ...(testimonials.length > 0
      ? {
          review: testimonials.map((t) => ({
            "@type": "Review",
            reviewBody: t.quote,
            author: { "@type": "Person", name: t.name },
          })),
        }
      : {}),
  };
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

type BlogPostingInput = {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
};

/** Blog article. The author is the organisation (no invented people). */
export function blogPostingSchema(post: BlogPostingInput) {
  const url = absoluteUrl(post.path);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: absoluteUrl(post.image),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: site.locale,
    author: { "@type": "Organization", "@id": ids.organization, name: site.name },
    publisher: { "@id": ids.organization },
  };
}
