import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { solutionCatalog } from "@/content/solutions/catalog";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { solutionIcons } from "@/components/icons";

type IndustryGridProps = {
  headingLevel?: "h1" | "h2";
  title?: string;
  lead?: string;
};

export function IndustryGrid({
  headingLevel = "h2",
  title = "Built for the way your industry works",
  lead = "Every business sells differently. Pick yours to see how Ultimate POS fits.",
}: IndustryGridProps) {
  return (
    <Section aria-labelledby="industries-heading">
      <Container>
        <SectionHeading id="industries-heading" as={headingLevel} eyebrow="Industries" title={title} lead={lead} />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {solutionCatalog.map((solution) => {
            const Icon = solutionIcons[solution.icon];
            return (
              <li key={solution.slug}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-surface p-5 transition hover:border-primary/40 hover:bg-primary-soft/40"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-soft-fg transition-colors group-hover:bg-primary group-hover:text-primary-fg">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 font-display font-bold text-fg">
                      {solution.name}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-muted-fg">{solution.summary}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
