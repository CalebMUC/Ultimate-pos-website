import { Plus } from "lucide-react";
import type { Faq } from "@/content/faqs";
import { faqPageSchema } from "@/lib/seo/schema";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { JsonLd } from "@/components/seo/json-ld";
import { cn } from "@/lib/cn";

type FaqSectionProps = {
  faqs: Faq[];
  title?: string;
  lead?: string;
  headingLevel?: "h1" | "h2";
  tone?: "default" | "subtle";
};

/**
 * Accordion built on native <details>: keyboard accessible, works without JavaScript,
 * and every answer is present in the server HTML for crawlers.
 */
export function FaqList({ faqs, className }: { faqs: Faq[]; className?: string }) {
  return (
    <div className={cn("divide-y divide-border rounded-2xl border border-border bg-surface", className)}>
      {faqs.map((faq) => (
        <details key={faq.question} className="group px-6">
          <summary className="flex min-h-16 items-center justify-between gap-6 py-5 text-left font-display text-lg font-semibold text-fg">
            <span>{faq.question}</span>
            <Plus
              aria-hidden="true"
              className="size-5 shrink-0 text-primary transition-transform group-open:rotate-45"
            />
          </summary>
          <p className="pb-6 leading-relaxed text-muted-fg">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

/** A titled FAQ section. Also emits FAQPage JSON-LD, so use it at most once per page. */
export function FaqSection({
  faqs,
  title = "Frequently asked questions",
  lead,
  headingLevel = "h2",
  tone,
}: FaqSectionProps) {
  return (
    <Section tone={tone} aria-labelledby="faq-heading">
      <JsonLd data={faqPageSchema(faqs)} />
      <Container className="max-w-4xl">
        <SectionHeading id="faq-heading" as={headingLevel} eyebrow="FAQ" title={title} lead={lead} />
        <FaqList faqs={faqs} className="mt-12" />
      </Container>
    </Section>
  );
}
