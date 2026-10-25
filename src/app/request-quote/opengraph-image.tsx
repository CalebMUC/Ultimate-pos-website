import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Request an Ultimate POS quote";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Pricing",
    title: "Get a POS quote for your business in KES",
    subtitle: "Pay only for the modules, branches and tills you need.",
  });
}
