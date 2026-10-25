import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

// Default share image for the homepage and any page without its own.
export const alt = "Ultimate POS — cloud POS software for Kenyan businesses, with M-Pesa built in";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "POS system for Kenyan businesses",
    title: "The POS system that runs your whole business, every branch.",
    subtitle: "Sell faster with M-Pesa, control stock in every branch and see your profit in real time.",
  });
}
