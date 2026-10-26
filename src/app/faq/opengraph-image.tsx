import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Ultimate POS frequently asked questions";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "FAQ",
    title: "Your questions about Ultimate POS, answered",
    subtitle: "M-Pesa, branches, stock, staff permissions, pricing and getting started.",
  });
}
