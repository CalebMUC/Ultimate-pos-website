import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { whatsappLink, type WhatsAppContext } from "@/lib/whatsapp";
import { LinkButton } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";

type LeadAsideProps = {
  steps?: string[];
  whatsappContext: WhatsAppContext;
};

/** Sidebar for the lead form pages: what happens next, and every other way to reach us. */
export function LeadAside({ steps, whatsappContext }: LeadAsideProps) {
  return (
    <aside className="space-y-6" aria-label="Other ways to reach us">
      {steps && (
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
          <h2 className="text-lg font-bold text-fg">What happens next</h2>
          <ol className="mt-4 space-y-4">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-accent-fg">
                  {i + 1}
                </span>
                <span className="leading-relaxed text-muted-fg">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
        <h2 className="text-lg font-bold text-fg">Prefer to talk now?</h2>
        <p className="mt-2 text-muted-fg">WhatsApp or call us — we&apos;re happy to answer questions straight away.</p>
        <div className="mt-5 grid gap-3">
          <LinkButton href={whatsappLink(whatsappContext)} external variant="whatsapp">
            <WhatsAppIcon />
            Chat on WhatsApp
          </LinkButton>
          <LinkButton href={site.phone.tel} variant="secondary">
            <Phone aria-hidden="true" />
            Call {site.phone.display}
          </LinkButton>
        </div>
        <ul className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
          <li className="flex gap-3">
            <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
            <a href={`mailto:${site.email.sales}`} className="text-fg hover:text-primary">
              {site.email.sales}
            </a>
          </li>
          <li className="flex gap-3 text-muted-fg">
            <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
            {site.hours.display}
          </li>
          <li className="flex gap-3 text-muted-fg">
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
            {site.location.display}
          </li>
        </ul>
      </div>
    </aside>
  );
}
