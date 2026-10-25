import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { featureGroups } from "@/content/features";
import { solutionsUsingFeatures } from "@/content/solutions";
import { whatsappLink } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo/metadata";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { PageHero } from "@/components/ui/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { featureIcons, WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "POS Features: M-Pesa, Stock & Reports",
  description:
    "Every Ultimate POS feature: M-Pesa checkout, stock control per branch, purchasing, customer credit, deliveries, production, pharmacy and reports.",
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        top={<Breadcrumbs items={[{ name: "Features", path: "/features" }]} />}
        eyebrow="Features"
        title="Everything Ultimate POS can do for your business"
        lead="From the till to the stockroom to the profit and loss report. Switch on only the modules you need — deliveries, production, pharmacy, bundles, cash-up and more — and add others as you grow."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/request-demo" size="lg">
            See it in a free demo
            <ArrowRight aria-hidden="true" />
          </LinkButton>
          <LinkButton href={whatsappLink({ kind: "features" })} external variant="secondary" size="lg">
            <WhatsAppIcon className="text-[#128c4b] dark:text-whatsapp" />
            Ask a question on WhatsApp
          </LinkButton>
        </div>
      </PageHero>

      {/* In-page navigation: sticks below the site header */}
      <nav
        aria-label="Feature groups"
        className="sticky top-16 z-30 border-b border-border bg-bg/90 backdrop-blur-md lg:top-18"
      >
        <Container>
          <ul className="-mx-4 flex [scrollbar-width:none] gap-1 overflow-x-auto px-4 py-2 sm:mx-0 sm:px-0">
            {featureGroups.map((group) => (
              <li key={group.id} className="shrink-0">
                <a
                  href={`#${group.id}`}
                  className="inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap text-muted-fg transition-colors hover:bg-primary-soft hover:text-primary-soft-fg"
                >
                  {group.title}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {featureGroups.map((group, index) => {
        const Icon = featureIcons[group.icon];
        const industries = solutionsUsingFeatures(group.features.map((f) => f.id));

        return (
          <section
            key={group.id}
            id={group.id}
            aria-labelledby={`${group.id}-heading`}
            // Clear the sticky header + in-page nav when jumping to an anchor
            className={cn("scroll-mt-36 py-16 sm:py-20", index % 2 === 1 && "bg-bg-subtle")}
          >
            <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
              <div>
                <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-fg">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h2 id={`${group.id}-heading`} className="mt-5 text-3xl font-bold text-fg">
                  {group.title}
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-muted-fg">{group.summary}</p>
                {industries.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-fg">Popular with</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {industries.slice(0, 6).map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/solutions/${s.slug}`}
                            className="inline-flex min-h-8 items-center rounded-full border border-border bg-surface px-3 text-sm text-muted-fg transition-colors hover:border-primary hover:text-primary"
                          >
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <ul className="grid gap-4 sm:grid-cols-2">
                {group.features.map((feature) => (
                  <li key={feature.id} className="rounded-2xl border border-border bg-surface p-6 shadow-card">
                    <h3 className="flex items-start gap-2.5 text-lg font-bold text-fg">
                      <Check aria-hidden="true" className="mt-1 size-4.5 shrink-0 text-primary" strokeWidth={3} />
                      {feature.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-fg">{feature.description}</p>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        );
      })}

      <CtaBand
        title="See these features working for your business"
        lead="In a free demo we show you the features that matter to your type of business — nothing you don't need."
        whatsappContext={{ kind: "features" }}
      />
    </>
  );
}
