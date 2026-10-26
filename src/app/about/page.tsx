import { HeartHandshake, MapPin, Puzzle, Smartphone } from "lucide-react";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo/metadata";
import { LinkButton } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { WhatsAppIcon } from "@/components/icons";

export const metadata = pageMetadata({
  title: "About Us – POS Software Built in Kenya",
  description:
    "Ultimate POS is point of sale and business management software built in Kenya, for Kenyan businesses — M-Pesa, branches, stock and real numbers.",
  path: "/about",
});

/*
 * [[PLACEHOLDER]] Add your real story: when and why Ultimate POS started, who is behind it,
 * and (with permission) team photos. Don't add years, team sizes or client counts until confirmed.
 */
const values = [
  {
    icon: Smartphone,
    title: "Built around how Kenya pays",
    text: "M-Pesa isn't an add-on for us. STK push, payment matching and an M-Pesa payment log are part of the till, because that's how your customers pay.",
  },
  {
    icon: Puzzle,
    title: "Only what you need",
    text: "Modular licensing means a minimart doesn't pay for a manufacturer's tools. Switch on the modules that match how you work.",
  },
  {
    icon: MapPin,
    title: "Made for businesses that grow",
    text: "From one shop to branches in several towns, everything stays under one account — with the controls to trust what happens when you're not there.",
  },
  {
    icon: HeartHandshake,
    title: "People you can reach",
    text: `Questions get answered by people, on WhatsApp or by phone — ${site.hours.display}.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        top={<Breadcrumbs items={[{ name: "About", path: "/about" }]} />}
        eyebrow="About us"
        title="Business software built in Kenya, for the way Kenyan businesses work"
        lead="Ultimate POS brings the till, the stockroom and the books together in one cloud system — designed around M-Pesa, branches across towns and the everyday reality of running a business here."
      />

      <Section aria-labelledby="story-heading">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="story-heading" className="text-3xl font-bold text-fg sm:text-4xl">
              Why we built Ultimate POS
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted-fg">
            <p>
              Too many Kenyan businesses still run on exercise books, spreadsheets and SMS messages: stock that never
              quite matches, tills that don&apos;t balance at close of day, and owners who can only find out how a
              branch is doing by driving there.
            </p>
            <p>
              Software built for other markets often treats M-Pesa as an afterthought and multi-branch control as an
              expensive extra. We wanted one system that handles both properly — and stays simple for the people at the
              till.
            </p>
            <p>
              So Ultimate POS covers the whole business: fast checkout with M-Pesa built in, real-time stock in every
              branch, purchasing and suppliers, customer credit, deliveries and riders, production, pharmacy records and
              the reports that show where every shilling goes.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="subtle" aria-labelledby="values-heading">
        <Container>
          <SectionHeading id="values-heading" eyebrow="What we believe" title="How we work with your business" />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-5 rounded-2xl border border-border bg-surface p-7 shadow-card">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-fg">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-fg">{title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-fg">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="where-heading">
        <Container className="max-w-3xl text-center">
          <h2 id="where-heading" className="text-3xl font-bold text-fg sm:text-4xl">
            Where we are
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-fg">
            {site.location.display}. We don&apos;t run a walk-in office — we come to you for demos and setup, or meet
            you online or on the phone.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton href="/contact" size="lg">
              Contact us
            </LinkButton>
            <LinkButton href={whatsappLink()} external variant="secondary" size="lg">
              <WhatsAppIcon className="text-[#128c4b] dark:text-whatsapp" />
              Chat on WhatsApp
            </LinkButton>
          </div>
        </Container>
      </Section>

      <IndustryGrid title="The businesses we serve" />
      <CtaBand />
    </>
  );
}
