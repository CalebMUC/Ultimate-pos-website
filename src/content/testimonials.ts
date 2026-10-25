import type { SolutionSlug } from "@/content/solutions/catalog";

/**
 * Client testimonials.
 *
 * NEVER publish invented testimonials. Every real entry needs the client's written
 * consent (`consentObtained: true`). Entries with `isSample: true` exist only so the
 * UI can be developed; they are filtered out of production builds.
 */
export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  business: string;
  industry: SolutionSlug;
  town: string;
  /** Path under /public, e.g. /testimonials/jane-wanjiku.jpg */
  photo?: string;
  logo?: string;
  consentObtained: boolean;
  isSample?: boolean;
};

const allTestimonials: Testimonial[] = [
  {
    id: "sample-supermarket",
    quote:
      "SAMPLE — replace with a real client quote. Describe a concrete result, e.g. how cash-up time or stock losses changed.",
    name: "Sample Client",
    role: "Owner",
    business: "Sample Supermarket",
    industry: "supermarket-minimart-pos",
    town: "Kiambu",
    consentObtained: false,
    isSample: true,
  },
  {
    id: "sample-pharmacy",
    quote: "SAMPLE — replace with a real client quote about batch and expiry control or the prescription register.",
    name: "Sample Client",
    role: "Pharmacist",
    business: "Sample Chemist",
    industry: "pharmacy-chemist-pos",
    town: "Thika",
    consentObtained: false,
    isSample: true,
  },
  {
    id: "sample-water",
    quote: "SAMPLE — replace with a real client quote about deliveries, rider cash-up or fuel tracking.",
    name: "Sample Client",
    role: "Manager",
    business: "Sample Water Refill",
    industry: "water-refill-delivery-pos",
    town: "Ruiru",
    consentObtained: false,
    isSample: true,
  },
];

const showSamples = process.env.NODE_ENV !== "production" && process.env.SHOW_SAMPLE_TESTIMONIALS === "true";

export const testimonials: Testimonial[] = allTestimonials.filter((t) =>
  t.isSample ? showSamples : t.consentObtained,
);

export const hasPublishedTestimonials = testimonials.length > 0;

export function testimonialsForIndustry(industry: SolutionSlug) {
  return testimonials.filter((t) => t.industry === industry);
}
