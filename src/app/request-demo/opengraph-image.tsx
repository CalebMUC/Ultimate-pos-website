import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Book a free Ultimate POS demo";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Free demo",
    title: "Book your free Ultimate POS demo",
    subtitle: "On-site, online or by phone — see it working for your type of business.",
  });
}
