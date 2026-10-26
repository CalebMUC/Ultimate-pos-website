import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getPost, posts } from "@/content/blog";
import { pageMetadata } from "@/lib/seo/metadata";
import { blogPostingSchema } from "@/lib/seo/schema";
import { Container } from "@/components/ui/layout";
import { formatDate } from "@/components/ui/prose-page";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaBand } from "@/components/sections/cta-band";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.meta.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const base = pageMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${slug}`,
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.meta.publishedAt,
      modifiedTime: post.meta.updatedAt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { meta, Content } = post;
  const path = `/blog/${slug}`;

  return (
    <>
      <JsonLd
        data={blogPostingSchema({
          title: meta.title,
          description: meta.description,
          path,
          image: `${path}/opengraph-image/og`,
          publishedAt: meta.publishedAt,
          updatedAt: meta.updatedAt,
        })}
      />
      <article>
        <header className="bg-hero border-b border-border">
          <Container className="max-w-3xl py-12 sm:py-16">
            <Breadcrumbs
              items={[
                { name: "Blog", path: "/blog" },
                { name: meta.title, path },
              ]}
            />
            <h1 className="mt-8 text-3xl leading-tight font-extrabold text-fg sm:text-4xl lg:text-5xl">{meta.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-fg">{meta.description}</p>
            <p className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-fg">
              <span>By the Ultimate POS team</span>
              <span aria-hidden="true">·</span>
              <time dateTime={meta.publishedAt}>{formatDate(meta.publishedAt)}</time>
              {meta.updatedAt !== meta.publishedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated <time dateTime={meta.updatedAt}>{formatDate(meta.updatedAt)}</time>
                  </span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden="true" className="size-4" />
                {meta.readingMinutes} min read
              </span>
            </p>
          </Container>
        </header>
        <Container className="max-w-3xl py-12 sm:py-16">
          <div className="prose max-w-none sm:prose-lg prose-headings:font-display prose-headings:tracking-tight prose-h2:mt-12 prose-a:font-medium prose-a:underline-offset-2">
            <Content />
          </div>
          <p className="mt-12 border-t border-border pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary-hover"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              All guides
            </Link>
          </p>
        </Container>
      </article>
      <CtaBand />
    </>
  );
}
