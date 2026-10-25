import { homeFaqs } from "@/content/faqs";
import { testimonials } from "@/content/testimonials";
import { pageMetadata } from "@/lib/seo/metadata";
import { softwareApplicationSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { WhatIs } from "@/components/sections/what-is";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { Spotlight } from "@/components/sections/spotlight";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Testimonials } from "@/components/sections/testimonials";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({
  title: "POS System Kenya with M-Pesa | Ultimate POS",
  description:
    "Cloud POS software for Kenyan businesses: M-Pesa payments, stock control in every branch, purchasing and real-time reports. Book a free demo.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema(testimonials)} />
      <Hero />
      <TrustStrip />
      <WhatIs />
      <FeatureGrid />
      <IndustryGrid />
      <Spotlight />
      <HowItWorks />
      <Testimonials items={testimonials.slice(0, 6)} />
      <PricingTeaser />
      <FaqSection faqs={homeFaqs} />
      <CtaBand />
    </>
  );
}
