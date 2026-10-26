import { notFound } from "next/navigation";
import { getPost, posts } from "@/content/blog";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og-image";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.meta.slug }));
}

// One image per article, with article-specific alt text.
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  return [
    {
      id: "og",
      size: ogSize,
      contentType: ogContentType,
      alt: post ? `${post.meta.title} — a guide from Ultimate POS` : "Ultimate POS",
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return renderOgImage({
    eyebrow: "Guide",
    title: post.meta.title,
    subtitle: post.meta.description,
  });
}
