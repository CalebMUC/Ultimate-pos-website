import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Ultimate POS solutions for Kenyan supermarkets, pharmacies, wholesalers and more";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Solutions",
    title: "POS and business software for every kind of Kenyan business",
    subtitle: "Supermarkets, pharmacies, wholesalers, water refill stations, manufacturers, hardware stores and more.",
  });
}
