import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container } from "./layout";
import { PageHero } from "./page-hero";

type ProsePageProps = {
  title: string;
  path: string;
  breadcrumb: string;
  lead?: ReactNode;
  /** e.g. "Last updated 26 October 2026" */
  meta?: ReactNode;
  children: ReactNode;
};

/** Layout for long-form pages (legal pages): hero, then a readable text column. */
export function ProsePage({ title, path, breadcrumb, lead, meta, children }: ProsePageProps) {
  return (
    <>
      <PageHero top={<Breadcrumbs items={[{ name: breadcrumb, path }]} />} title={title} lead={lead}>
        {meta && <p className="mt-4 text-sm text-muted-fg">{meta}</p>}
      </PageHero>
      <Container className="py-12 sm:py-16">
        <div className="prose max-w-3xl sm:prose-lg prose-headings:font-display prose-headings:tracking-tight prose-h2:mt-12 prose-a:font-medium prose-a:underline-offset-2">
          {children}
        </div>
      </Container>
    </>
  );
}

/** "26 October 2026" from "2026-10-26" (fixed locale and time zone, so builds are stable). */
export function formatDate(isoDate: string) {
  return new Date(`${isoDate}T12:00:00Z`).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  });
}
