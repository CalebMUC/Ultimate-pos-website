import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featureGroups } from "@/content/features";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { featureIcons } from "@/components/icons";

export function FeatureGrid() {
  return (
    <Section tone="subtle" aria-labelledby="features-heading">
      <Container>
        <SectionHeading
          id="features-heading"
          eyebrow="Features"
          title="Everything you need to run the business"
          lead="Switch on only the modules you need today, and add more as you grow."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featureGroups.map((group) => {
            const Icon = featureIcons[group.icon];
            return (
              <li key={group.id}>
                <Link
                  href={`/features#${group.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift motion-reduce:hover:translate-y-0"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary-soft-fg">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-fg">{group.title}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted-fg">{group.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    See {group.title.toLowerCase()} features
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                    />
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
