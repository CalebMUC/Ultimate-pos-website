import { notFound } from "next/navigation";
import { getSolution, solutionSlugs } from "@/content/solutions";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

// One image per industry, with industry-specific alt text.
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const solution = getSolution(params.slug);
  return [
    {
      id: "og",
      size: ogSize,
      contentType: ogContentType,
      alt: solution ? `Ultimate POS for ${solution.name.toLowerCase()} in Kenya` : "Ultimate POS",
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  return renderOgImage({
    eyebrow: solution.name,
    title: solution.metaTitle,
    subtitle: solution.summary,
  });
}
