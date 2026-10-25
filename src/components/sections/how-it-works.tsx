import { CalendarCheck, GraduationCap, Rocket, Upload } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/layout";

const steps = [
  {
    icon: CalendarCheck,
    title: "Book a demo",
    text: "We walk you through Ultimate POS using examples from your type of business, and answer your questions.",
  },
  {
    icon: Upload,
    title: "Set up and import",
    text: "We set up your branches, users and modules, and import your products and categories from Excel or CSV.",
  },
  {
    icon: GraduationCap,
    title: "Train your staff",
    text: "Cashiers, storekeepers and managers learn the parts of the system they will use every day.",
  },
  {
    icon: Rocket,
    title: "Go live",
    text: "Start selling, and keep our phone and WhatsApp handy for anything you need afterwards.",
  },
];

export function HowItWorks() {
  return (
    <Section aria-labelledby="how-heading">
      <Container>
        <SectionHeading id="how-heading" eyebrow="How it works" title="From first call to first sale in four steps" />
        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-linear-to-r from-primary via-accent to-primary opacity-40 lg:block"
          />
          <ol className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative text-center">
                <span className="relative mx-auto grid size-14 place-items-center rounded-2xl border border-border bg-surface text-primary shadow-card">
                  <Icon aria-hidden="true" className="size-6" />
                  <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-accent text-xs font-bold text-accent-fg">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-5 text-lg font-bold text-fg">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs leading-relaxed text-muted-fg">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
