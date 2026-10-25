import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Ultimate POS features: M-Pesa checkout, stock control, purchasing, deliveries and reports";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Features",
    title: "Everything Ultimate POS can do for your business",
    subtitle: "M-Pesa checkout, stock per branch, purchasing, customer credit, deliveries, production and reports.",
  });
}
