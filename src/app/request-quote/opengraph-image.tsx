import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Request an Ultimate POS quote";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Pricing",
    title: "Get a POS quote for your business in KES",
    subtitle: "Starter, Business or Enterprise: tell us what you need and get a price.",
  });
}
