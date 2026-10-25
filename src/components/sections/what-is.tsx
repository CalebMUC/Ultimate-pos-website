import { BarChart3, Boxes, ScanBarcode } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/layout";

const pillars = [
  {
    icon: ScanBarcode,
    title: "Sell",
    text: "A fast till with barcode scanning, M-Pesa STK push, bundles, discounts and shift cash-ups that balance to the shilling.",
  },
  {
    icon: Boxes,
    title: "Stock",
    text: "Real-time stock per branch, transfers between branches, batch and expiry tracking, purchase orders and supplier ledgers.",
  },
  {
    icon: BarChart3,
    title: "Insight",
    text: "Sales, profit and loss, profit by product, margins and expenses — so you decide with numbers, not guesses.",
  },
];

export function WhatIs() {
  return (
    <Section aria-labelledby="what-is-heading">
      <Container>
        <SectionHeading
          id="what-is-heading"
          eyebrow="What is Ultimate POS?"
          title="One system for the till, the stockroom and the books"
          lead="Ultimate POS is cloud-based point of sale and business management software made in Kenya. It replaces the exercise book, the spreadsheet and the guesswork with one system your whole team uses — at the counter, in the store and on the road."
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <li key={title} className="relative rounded-2xl border border-border bg-surface p-7 shadow-card">
              <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-fg">
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-fg">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted-fg">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
