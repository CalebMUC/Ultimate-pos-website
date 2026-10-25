import Image from "next/image";
import { Quote } from "lucide-react";
import { getSolutionSummary } from "@/content/solutions/catalog";
import type { Testimonial } from "@/content/testimonials";
import { Container, Section, SectionHeading } from "@/components/ui/layout";

type TestimonialsProps = {
  items: Testimonial[];
  title?: string;
  headingLevel?: "h1" | "h2";
};

/**
 * A static grid (no auto-advancing carousel, so nothing needs pausing and all quotes are
 * in the HTML). Renders nothing until real, consented testimonials exist.
 */
export function Testimonials({ items, title = "What our clients say", headingLevel = "h2" }: TestimonialsProps) {
  if (items.length === 0) return null;

  return (
    <Section aria-labelledby="testimonials-heading">
      <Container>
        <SectionHeading id="testimonials-heading" as={headingLevel} eyebrow="Client stories" title={title} />
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <li key={t.id}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7 shadow-card">
                <Quote aria-hidden="true" className="size-8 text-primary/40" />
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-fg">
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4 border-t border-border pt-5">
                  {t.photo && (
                    <Image
                      src={t.photo}
                      alt={`${t.name}, ${t.role} at ${t.business}`}
                      width={48}
                      height={48}
                      className="size-12 rounded-full object-cover"
                    />
                  )}
                  <span>
                    <span className="block font-semibold text-fg">{t.name}</span>
                    <span className="block text-sm text-muted-fg">
                      {t.role}, {t.business} · {t.town}
                    </span>
                    <span className="block text-sm text-primary">{getSolutionSummary(t.industry)?.name}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
