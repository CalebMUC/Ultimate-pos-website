import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { solutionCatalog } from "@/content/solutions/catalog";
import { whatsappLink } from "@/lib/whatsapp";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const popular = [
  { href: "/features", label: "All features" },
  { href: "/solutions", label: "Industries we serve" },
  { href: "/request-demo", label: "Request a free demo" },
  { href: "/request-quote", label: "Request a quote" },
  { href: "/contact", label: "Contact us" },
];

/** Helpful 404: a real 404 status (no soft 404s), with routes back into the site. */
export default function NotFound() {
  return (
    <section className="bg-hero">
      <Container className="max-w-3xl py-20 sm:py-28">
        <p className="text-sm font-semibold tracking-wider text-primary uppercase">Error 404</p>
        <h1 className="mt-3 text-4xl font-extrabold text-fg sm:text-5xl">We couldn&apos;t find that page</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-fg">
          The link may be old, or the address may have a typo. Here are some places to start instead — or ask us on
          WhatsApp and we&apos;ll point you in the right direction.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/" size="lg">
            <Home aria-hidden="true" />
            Go to the homepage
          </LinkButton>
          <LinkButton href={whatsappLink()} external variant="secondary" size="lg">
            <WhatsAppIcon className="text-[#128c4b] dark:text-whatsapp" />
            Ask on WhatsApp
          </LinkButton>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <nav aria-labelledby="popular-heading">
            <h2 id="popular-heading" className="text-lg font-bold text-fg">
              Popular pages
            </h2>
            <ul className="mt-3 space-y-1">
              {popular.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-10 items-center gap-1.5 text-primary hover:text-primary-hover"
                  >
                    <ArrowRight aria-hidden="true" className="size-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="industries-404-heading">
            <h2 id="industries-404-heading" className="text-lg font-bold text-fg">
              POS for your industry
            </h2>
            <ul className="mt-3 space-y-1">
              {solutionCatalog.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="inline-flex min-h-10 items-center gap-1.5 text-primary hover:text-primary-hover"
                  >
                    <ArrowRight aria-hidden="true" className="size-4" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
