import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Contact Ultimate POS by phone or WhatsApp";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Contact",
    title: "Talk to the Ultimate POS team",
    subtitle: "Call or WhatsApp us — based on Kiambu Road, serving businesses across Kenya.",
  });
}
