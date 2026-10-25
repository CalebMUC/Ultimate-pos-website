import { CalendarCheck, FileText, Phone } from "lucide-react";
import { site } from "@/config/site";
import { whatsappLink, type WhatsAppContext } from "@/lib/whatsapp";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { WhatsAppIcon } from "@/components/icons";

type CtaBandProps = {
  title?: string;
  lead?: string;
  whatsappContext?: WhatsAppContext;
  /** Pre-selects the business type on the demo and quote forms */
  industry?: string;
};

export function CtaBand({
  title = "See Ultimate POS working for your business",
  lead = "Book a free demo, ask for a quote, or just talk to us — by phone or WhatsApp.",
  whatsappContext = { kind: "general" },
  industry,
}: CtaBandProps) {
  const query = industry ? `?industry=${industry}` : "";
  return (
    <section aria-labelledby="cta-heading" className="py-16 sm:py-20">
      <Container>
        {/* Fixed brand colours: white text on #075c33 → #0a7a43 stays >= 5.4:1 in both themes */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#075c33] via-[#0a7a43] to-[#0d5a9c] px-6 py-14 text-center text-white sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-white/10 blur-2xl"
          />
          <h2 id="cta-heading" className="relative text-3xl font-bold sm:text-4xl">
            {title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-lg text-white/90">{lead}</p>
          <div className="relative mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <LinkButton href={`/request-demo${query}`} variant="inverse" size="lg">
              <CalendarCheck aria-hidden="true" />
              Request a free demo
            </LinkButton>
            <LinkButton href={`/request-quote${query}`} variant="inverse" size="lg">
              <FileText aria-hidden="true" />
              Request a quote
            </LinkButton>
            <LinkButton href={whatsappLink(whatsappContext)} external variant="whatsapp" size="lg">
              <WhatsAppIcon />
              Chat on WhatsApp
            </LinkButton>
            <LinkButton
              href={site.phone.tel}
              size="lg"
              className="border border-white/40 bg-transparent text-white hover:bg-white/10"
            >
              <Phone aria-hidden="true" />
              Call {site.phone.display}
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
