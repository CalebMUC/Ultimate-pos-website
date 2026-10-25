import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { activeSocials, site, type SocialNetwork } from "@/config/site";
import { companyLinks, getStartedLinks, legalLinks, solutionLinks, type NavLink } from "@/config/navigation";
import { whatsappLink } from "@/lib/whatsapp";
import { Container } from "@/components/ui/layout";
import { WhatsAppIcon } from "@/components/icons";
import { CookieSettingsButton } from "@/components/analytics/cookie-settings-button";
import { Logo } from "./logo";

const socialLabels: Record<SocialNetwork, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  youtube: "YouTube",
  x: "X",
};

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <h2 className="font-display text-sm font-semibold text-fg">{title}</h2>
      <ul className="mt-4 space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-9 items-center text-sm text-muted-fg transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const socials = activeSocials();

  return (
    <footer className="border-t border-border bg-bg-subtle">
      <Container className="grid gap-10 py-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-fg">{site.description}</p>

          <address className="mt-6 space-y-3 text-sm not-italic">
            <p className="flex gap-3 text-muted-fg">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{site.location.display}</span>
            </p>
            <p className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={site.phone.tel} className="font-semibold text-fg hover:text-primary">
                {site.phone.display}
              </a>
            </p>
            <p className="flex gap-3">
              <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-fg hover:text-primary"
              >
                WhatsApp {site.phone.display}
              </a>
            </p>
            <p className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`mailto:${site.email.sales}`} className="text-fg hover:text-primary">
                {site.email.sales}
              </a>
            </p>
            <p className="flex gap-3 text-muted-fg">
              <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{site.hours.display}</span>
            </p>
          </address>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
          <FooterColumn title="Solutions" links={solutionLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Get started" links={getStartedLinks} />
        </div>
      </Container>

      {/* Extra bottom padding keeps the floating WhatsApp button off the legal links */}
      <div className="border-t border-border">
        <Container className="flex flex-col gap-4 py-6 pb-24 text-sm text-muted-fg sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p>
            © <CopyrightYear /> {site.legalName}. Built in Kenya.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className="cursor-pointer hover:text-primary" />
            </li>
            {socials.map(([network, url]) => (
              <li key={network}>
                <a href={url} target="_blank" rel="noopener noreferrer me" className="hover:text-primary">
                  {socialLabels[network]}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
