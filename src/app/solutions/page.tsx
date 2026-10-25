import { pageMetadata } from "@/lib/seo/metadata";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container } from "@/components/ui/layout";

export const metadata = pageMetadata({
  title: "POS Solutions for Kenyan Industries",
  description:
    "POS and business software for supermarkets, pharmacies, wholesalers, water refill stations, manufacturers, hardware stores, agrovets and more in Kenya.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs items={[{ name: "Solutions", path: "/solutions" }]} />
      </Container>
      <IndustryGrid
        headingLevel="h1"
        title="POS and business software for every kind of Kenyan business"
        lead="Ultimate POS has one core — fast checkout with M-Pesa, real-time stock and clear reports — and modules for the way your industry works. Choose your business to see how it fits."
      />
      <CtaBand
        title="Don't see your industry?"
        lead="Ultimate POS runs many other kinds of businesses. Tell us how yours works and we'll show you how it fits."
      />
    </>
  );
}
