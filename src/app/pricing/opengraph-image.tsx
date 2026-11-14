import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Ultimate POS pricing: Starter, Business and Enterprise plans";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Pricing",
    title: "Simple plans that grow with your business",
    subtitle: "Starter, Business and Enterprise, with KRA eTIMS on Enterprise. Get a quote in KES.",
  });
}
