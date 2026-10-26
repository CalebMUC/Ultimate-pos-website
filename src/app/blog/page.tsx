import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { posts } from "@/content/blog";
import { pageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/layout";
import { PageHero } from "@/components/ui/page-hero";
import { formatDate } from "@/components/ui/prose-page";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({
  title: "POS & Business Guides for Kenya",
  description:
    "Practical guides for Kenyan business owners: choosing a POS system, reconciling M-Pesa, controlling stock across branches and more.",
  path: "/blog",
});

export default function BlogIndexPage() {
  if (posts.length === 0) notFound();

  return (
    <>
      <PageHero
        top={<Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />}
        eyebrow="Blog"
        title="Guides for running a better business"
        lead="Practical advice for Kenyan business owners on point of sale, M-Pesa, stock and growing to more branches."
      />
      <Container className="py-14 sm:py-20">
        <ul className="grid gap-6 md:grid-cols-2">
          {posts.map(({ meta }) => (
            <li key={meta.slug}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7 shadow-card">
                <p className="flex items-center gap-3 text-sm text-muted-fg">
                  <time dateTime={meta.publishedAt}>{formatDate(meta.publishedAt)}</time>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock aria-hidden="true" className="size-4" />
                    {meta.readingMinutes} min read
                  </span>
                </p>
                <h2 className="mt-4 text-2xl font-bold text-fg">
                  <Link href={`/blog/${meta.slug}`} className="hover:text-primary">
                    {meta.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 leading-relaxed text-muted-fg">{meta.description}</p>
                <Link
                  href={`/blog/${meta.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary-hover"
                >
                  Read the guide
                  <ArrowRight aria-hidden="true" className="size-4" />
                  <span className="sr-only">: {meta.title}</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </Container>
      <CtaBand />
    </>
  );
}
