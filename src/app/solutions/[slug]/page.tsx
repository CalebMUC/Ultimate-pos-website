import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, CircleAlert, CircleCheck } from "lucide-react";
import { getFeature } from "@/content/features";
import { getSolution, solutionSlugs, type Solution } from "@/content/solutions";
import { getSolutionSummary } from "@/content/solutions/catalog";
import { testimonialsForIndustry } from "@/content/testimonials";
import { whatsappLink } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo/metadata";
import { LinkButton } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { solutionIcons, WhatsAppIcon } from "@/components/icons";

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return pageMetadata({
    title: solution.metaTitle,
    description: solution.metaDescription,
    path: `/solutions/${solution.slug}`,
  });
}

function Challenges({ solution }: { solution: Solution }) {
  return (
    <Section aria-labelledby="challenges-heading">
      <Container>
        <SectionHeading id="challenges-heading" title={solution.challengesHeading} />
        <ul className="mt-14 grid gap-6 lg:grid-cols-2">
          {solution.challenges.map((challenge) => (
            <li
              key={challenge.problem}
              className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-7"
            >
              <p className="flex gap-3 text-muted-fg">
                <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#b45309] dark:text-[#fbbf24]" />
                <span>
                  <span className="sr-only">The problem: </span>
                  {challenge.problem}
                </span>
              </p>
              <p className="mt-4 flex flex-1 gap-3 border-t border-border pt-4 text-fg">
                <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>
                  <span className="sr-only">How Ultimate POS solves it: </span>
                  {challenge.solution}
                </span>
              </p>
              <ul className="mt-5 flex flex-wrap gap-2 pl-8" aria-label="Features used">
                {challenge.features.map((id) => {
                  const feature = getFeature(id);
                  return (
                    <li key={id}>
                      <Link
                        href={`/features#${feature.group.id}`}
                        className="inline-flex min-h-8 items-center rounded-full bg-primary-soft px-3 text-xs font-semibold text-primary-soft-fg transition-colors hover:bg-primary hover:text-primary-fg"
                      >
                        {feature.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function Story({ solution }: { solution: Solution }) {
  return (
    <Section tone="subtle" aria-labelledby="story-heading">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="story-heading" className="text-3xl font-bold text-fg sm:text-4xl">
            {solution.story.heading}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-fg">
            {solution.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="self-start rounded-3xl border border-border bg-surface p-7 shadow-card sm:p-9 lg:sticky lg:top-28">
          <h2 className="text-2xl font-bold text-fg">Getting started</h2>
          <p className="mt-4 leading-relaxed text-muted-fg">{solution.gettingStarted}</p>
          <ol className="mt-6 space-y-3">
            {["Book a free demo", "Set up and import your products", "Train your staff", "Go live"].map((step, i) => (
              <li key={step} className="flex items-center gap-3 font-medium text-fg">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-accent-fg">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <LinkButton href={`/request-demo?industry=${solution.slug}`} className="mt-8 w-full sm:w-auto">
            Book your free demo
            <ArrowRight aria-hidden="true" />
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}

function FeatureList({ solution }: { solution: Solution }) {
  return (
    <Section aria-labelledby="feature-list-heading">
      <Container>
        <SectionHeading
          id="feature-list-heading"
          eyebrow="Features"
          title={`Features for ${solution.name.toLowerCase()}`}
          lead="The parts of Ultimate POS that matter most for your business. Switch on only the modules you need."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solution.featureIds.map((id) => {
            const feature = getFeature(id);
            return (
              <li key={id} className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="flex items-start gap-2.5 font-display font-bold text-fg">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" strokeWidth={3} />
                  {feature.title}
                </h3>
                <p className="mt-2 pl-6.5 text-sm leading-relaxed text-muted-fg">{feature.description}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-10 text-center">
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary-hover"
          >
            See every Ultimate POS feature
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </p>
      </Container>
    </Section>
  );
}

function Related({ solution }: { solution: Solution }) {
  return (
    <Section aria-labelledby="related-heading" className="py-14 sm:py-16 lg:py-16">
      <Container>
        <h2 id="related-heading" className="text-2xl font-bold text-fg">
          Ultimate POS for related businesses
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {solution.related.map((slug) => {
            const related = getSolutionSummary(slug);
            if (!related) return null;
            const Icon = solutionIcons[related.icon];
            return (
              <li key={slug}>
                <Link
                  href={`/solutions/${slug}`}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-surface p-5 transition hover:border-primary/40"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-soft-fg">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span>
                    <span className="block font-display font-bold text-fg group-hover:text-primary">
                      {related.name}
                    </span>
                    <span className="mt-1 block text-sm text-muted-fg">{related.summary}</span>
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

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const Icon = solutionIcons[solution.icon];
  const testimonials = testimonialsForIndustry(solution.slug);

  return (
    <>
      <PageHero
        top={
          <Breadcrumbs
            items={[
              { name: "Solutions", path: "/solutions" },
              { name: solution.name, path: `/solutions/${solution.slug}` },
            ]}
          />
        }
        eyebrow={solution.name}
        title={solution.h1}
      >
        <div className="mt-5 grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-end">
          <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-muted-fg">
            {solution.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <LinkButton href={`/request-demo?industry=${solution.slug}`} size="lg">
                Request a free demo
                <ArrowRight aria-hidden="true" />
              </LinkButton>
              <LinkButton
                href={whatsappLink({ kind: "solution", slug: solution.slug })}
                external
                variant="secondary"
                size="lg"
              >
                <WhatsAppIcon className="text-[#128c4b] dark:text-whatsapp" />
                Chat on WhatsApp
              </LinkButton>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-surface p-7 shadow-card">
            <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-fg">
              <Icon aria-hidden="true" className="size-6" />
            </span>
            <p className="mt-5 font-display text-lg font-bold text-fg">Why {solution.name.toLowerCase()} choose us</p>
            <ul className="mt-4 space-y-3">
              {solution.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-3 text-fg">
                  <Check aria-hidden="true" className="size-4 shrink-0 text-primary" strokeWidth={3} />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageHero>

      <Challenges solution={solution} />
      <Story solution={solution} />
      <FeatureList solution={solution} />
      <Testimonials items={testimonials} title={`What ${solution.name.toLowerCase()} say about Ultimate POS`} />
      <FaqSection faqs={solution.faqs} title={`${solution.name}: frequently asked questions`} tone="subtle" />
      <Related solution={solution} />
      <CtaBand
        title={`Ready to run your ${solution.whatsappIntro.replace(/^an? /, "")} on Ultimate POS?`}
        whatsappContext={{ kind: "solution", slug: solution.slug }}
        industry={solution.slug}
      />
    </>
  );
}
