import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export const alt = "About Ultimate POS — business software built in Kenya";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "About us",
    title: "Business software built in Kenya, for Kenyan businesses",
    subtitle: "The till, the stockroom and the books in one cloud system.",
  });
}
