import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Ultimate POS pricing: pay only for the modules, branches and tills you need";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Pricing",
    title: "Pricing that fits your business — pay only for what you use",
    subtitle: "Modules, branches and tills you need. Get a tailored quote in KES.",
  });
}
