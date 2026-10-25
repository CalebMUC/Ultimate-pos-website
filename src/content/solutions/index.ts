import type { FeatureId } from "@/content/features";
import { solutionCatalog, type SolutionSlug } from "./catalog";
import type { SolutionContent } from "./types";
import agrovet from "./agrovet-pos";
import cosmetics from "./cosmetics-beauty-shop-pos";
import hardware from "./hardware-shop-pos";
import liquor from "./liquor-wines-spirits-pos";
import manufacturing from "./manufacturing-production-software";
import multiBranch from "./multi-branch-business-software";
import pharmacy from "./pharmacy-chemist-pos";
import retail from "./retail-shop-pos";
import supermarket from "./supermarket-minimart-pos";
import water from "./water-refill-delivery-pos";
import wholesale from "./wholesale-distribution-pos";

const solutionContent: Record<SolutionSlug, SolutionContent> = {
  "supermarket-minimart-pos": supermarket,
  "retail-shop-pos": retail,
  "wholesale-distribution-pos": wholesale,
  "pharmacy-chemist-pos": pharmacy,
  "water-refill-delivery-pos": water,
  "manufacturing-production-software": manufacturing,
  "hardware-shop-pos": hardware,
  "agrovet-pos": agrovet,
  "liquor-wines-spirits-pos": liquor,
  "cosmetics-beauty-shop-pos": cosmetics,
  "multi-branch-business-software": multiBranch,
};

export const solutionSlugs = solutionCatalog.map((s) => s.slug);

export function getSolution(slug: string) {
  const summary = solutionCatalog.find((s) => s.slug === slug);
  if (!summary) return undefined;
  return { ...summary, ...solutionContent[summary.slug] };
}

export type Solution = NonNullable<ReturnType<typeof getSolution>>;

/** Industries whose pages feature any of the given features (for cross-linking from /features). */
export function solutionsUsingFeatures(featureIds: FeatureId[]) {
  return solutionCatalog.filter((s) => solutionContent[s.slug].featureIds.some((id) => featureIds.includes(id)));
}

/** Count the words of unique copy on a page (used by the content check). */
export function solutionWordCount(content: SolutionContent) {
  const text = [
    content.h1,
    ...content.intro,
    ...content.highlights,
    content.challengesHeading,
    ...content.challenges.flatMap((c) => [c.problem, c.solution]),
    content.story.heading,
    ...content.story.paragraphs,
    content.gettingStarted,
    ...content.faqs.flatMap((f) => [f.question, f.answer]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

export { solutionContent };
