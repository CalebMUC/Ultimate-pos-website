import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Ultimate POS guides for Kenyan businesses";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Blog",
    title: "Guides for running a better business in Kenya",
    subtitle: "Point of sale, M-Pesa, stock control and growing to more branches.",
  });
}
