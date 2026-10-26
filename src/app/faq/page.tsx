import { faqGroups } from "@/content/faqs";
import { faqPageSchema } from "@/lib/seo/schema";
import { pageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/layout";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqList } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({
  title: "POS Questions Answered – FAQ",
  description:
    "Answers to common questions about Ultimate POS: M-Pesa, branches, stock, staff permissions, pricing, getting started and support.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqGroups.flatMap((group) => group.faqs))} />
      <PageHero
        top={<Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />}
        eyebrow="FAQ"
        title="Frequently asked questions"
        lead="Everything people usually ask before they switch to Ultimate POS. Can't find your answer? WhatsApp or call us."
      >
        <nav aria-label="FAQ topics" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {faqGroups.map((group) => (
              <li key={group.id}>
                <a
                  href={`#${group.id}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-border bg-surface px-4 text-sm font-medium text-muted-fg transition-colors hover:border-primary hover:text-primary"
                >
                  {group.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <Container className="max-w-4xl space-y-14 py-14 sm:py-20">
        {faqGroups.map((group) => (
          <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`} className="scroll-mt-28">
            <h2 id={`${group.id}-heading`} className="text-2xl font-bold text-fg sm:text-3xl">
              {group.title}
            </h2>
            <FaqList faqs={group.faqs} className="mt-6" />
          </section>
        ))}
      </Container>

      <CtaBand title="Still have a question?" lead="Ask us directly — on WhatsApp, by phone, or book a free demo." />
    </>
  );
}
