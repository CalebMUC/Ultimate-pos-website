import type { ReactNode } from "react";
import { Container } from "./layout";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Rendered above the eyebrow, e.g. breadcrumbs */
  top?: ReactNode;
  children?: ReactNode;
};

/** Standard H1 header for inner pages. */
export function PageHero({ eyebrow, title, lead, top, children }: PageHeroProps) {
  return (
    <section className="bg-hero relative overflow-hidden border-b border-border">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      <Container className="relative py-12 sm:py-16 lg:py-20">
        {top}
        <div className="max-w-3xl">
          {eyebrow && (
            <p className={`${top ? "mt-8" : ""} text-sm font-semibold tracking-wider text-primary uppercase`}>
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 text-3xl leading-tight font-extrabold text-fg sm:text-4xl lg:text-5xl">{title}</h1>
          {lead && <p className="mt-5 text-lg leading-relaxed text-muted-fg sm:text-xl">{lead}</p>}
        </div>
        {children}
      </Container>
    </section>
  );
}
