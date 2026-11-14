import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { solutionCatalog } from "@/content/solutions/catalog";
import { solutionImages } from "@/content/solutions/images";
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
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {solutionCatalog.map((solution) => {
            const Icon = solutionIcons[solution.icon];
            const image = solutionImages[solution.slug];
            return (
              <li key={solution.slug}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:border-primary/40 hover:shadow-card"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden bg-bg-subtle">
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 300px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      style={{ objectPosition: image.position }}
                    />
                    <span className="absolute bottom-3 left-3 grid size-10 place-items-center rounded-xl bg-surface/95 text-primary shadow-card">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col p-5">
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
        <p className="mt-6 text-right text-xs text-muted-fg">
          <Link href="/solutions#photo-credits" className="underline-offset-2 hover:text-primary hover:underline">
            Photo credits
          </Link>
        </p>
      </Container>
    </Section>
  );
}

/** Attribution for every industry photo (required by their Creative Commons licences). */
export function PhotoCredits() {
  return (
    <Section aria-labelledby="photo-credits" className="py-12 sm:py-14 lg:py-14">
      <Container>
        <h2 id="photo-credits" className="text-lg font-bold text-fg">
          Photo credits
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-fg">
          Industry photos not taken by Ultimate POS are from Wikimedia Commons, used under the licences below. Most show
          real Kenyan businesses. The businesses in these credited photos are not Ultimate POS customers.
        </p>
        <ul className="mt-5 grid gap-x-8 gap-y-2 text-sm text-muted-fg md:grid-cols-2">
          {solutionCatalog.map((solution) => {
            const { credit } = solutionImages[solution.slug];
            if (!credit) return null; // our own photos need no credit
            return (
              <li key={solution.slug}>
                <span className="font-medium text-fg">{solution.name}:</span>{" "}
                <a href={credit.sourceUrl} className="underline underline-offset-2 hover:text-primary">
                  photo
                </a>{" "}
                by {credit.author},{" "}
                {credit.licenseUrl ? (
                  <a href={credit.licenseUrl} className="underline underline-offset-2 hover:text-primary">
                    {credit.license}
                  </a>
                ) : (
                  credit.license
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
