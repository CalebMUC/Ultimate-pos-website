import type { FeatureId } from "@/content/features";
import type { Faq } from "@/content/faqs";
import type { SolutionSlug } from "./catalog";

/**
 * Copy for one industry landing page. Every page must be unique and useful to that
 * industry (no keyword-swapped doorway pages), and may only reference real features.
 */
export type SolutionContent = {
  slug: SolutionSlug;
  /** Last meaningful content change (YYYY-MM-DD). Used for the sitemap's lastModified. */
  updatedAt: string;
  /** ≤ 39 characters: the layout appends " | Ultimate POS Kenya" (≤ 60 total) */
  metaTitle: string;
  /** ≤ 155 characters */
  metaDescription: string;
  h1: string;
  /** Intro paragraphs under the H1 */
  intro: string[];
  /** Three short benefit chips shown in the hero */
  highlights: [string, string, string];
  challengesHeading: string;
  challenges: {
    problem: string;
    solution: string;
    features: FeatureId[];
  }[];
  /** A short narrative section describing a working day with Ultimate POS */
  story: { heading: string; paragraphs: string[] };
  /** Industry-specific paragraph on how setup and go-live work */
  gettingStarted: string;
  /** Features listed in the "Features for …" grid */
  featureIds: FeatureId[];
  faqs: Faq[];
  related: SolutionSlug[];
};
