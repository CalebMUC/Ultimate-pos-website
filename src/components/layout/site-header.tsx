import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { site } from "@/config/site";
import { featuresLink, navAfterSolutions, solutionLinks } from "@/config/navigation";
import { solutionCatalog } from "@/content/solutions/catalog";
import { cn } from "@/lib/cn";
import { whatsappLink } from "@/lib/whatsapp";
import { buttonClasses, LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { solutionIcons, WhatsAppIcon } from "@/components/icons";
import { Logo } from "./logo";
import { NavDisclosure } from "./nav-disclosure";
import { ThemeToggle } from "./theme-toggle";

const navLinkClass =
  "inline-flex min-h-11 items-center rounded-lg px-3 text-[0.95rem] font-medium text-fg/85 transition-colors hover:bg-bg-subtle hover:text-fg";

function SolutionsMenu() {
  return (
    <NavDisclosure
      className="group relative"
      summaryClassName={cn(navLinkClass, "gap-1")}
      summary={
        <>
          Solutions
          <ChevronDown aria-hidden="true" className="size-4 transition-transform group-open:rotate-180" />
        </>
      }
    >
      <div className="absolute top-full left-0 z-50 mt-2 w-[44rem] rounded-2xl border border-border bg-surface-raised p-3 shadow-lift">
        <ul className="grid grid-cols-2 gap-1">
          {solutionCatalog.map((solution) => {
            const Icon = solutionIcons[solution.icon];
            return (
              <li key={solution.slug}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-bg-subtle"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary-soft-fg">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-fg">{solution.name}</span>
                    <span className="block text-sm leading-snug text-muted-fg">{solution.summary}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-2 border-t border-border pt-2">
          <Link
            href="/solutions"
            className="flex items-center justify-between rounded-xl p-3 text-sm font-semibold text-primary hover:bg-bg-subtle"
          >
            See all industries we serve
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </NavDisclosure>
  );
}

function MobileMenu() {
  return (
    <NavDisclosure
      className="group lg:hidden"
      summaryClassName={buttonClasses("ghost", "md", "px-3")}
      summary={
        <>
          <Menu aria-hidden="true" className="group-open:hidden" />
          <X aria-hidden="true" className="hidden group-open:block" />
          <span className="sr-only">Menu</span>
        </>
      }
    >
      <div className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-surface-raised shadow-lift">
        <Container className="py-4">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              <li>
                <Link href={featuresLink.href} className={cn(navLinkClass, "w-full")}>
                  {featuresLink.label}
                </Link>
              </li>
              <li>
                <details className="group/sol">
                  <summary className={cn(navLinkClass, "w-full justify-between")}>
                    Solutions
                    <ChevronDown aria-hidden="true" className="size-4 transition-transform group-open/sol:rotate-180" />
                  </summary>
                  <ul className="mt-1 ml-3 space-y-1 border-l border-border pl-3">
                    {solutionLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className={cn(navLinkClass, "w-full text-muted-fg")}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/solutions" className={cn(navLinkClass, "w-full font-semibold text-primary")}>
                        All industries
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              {navAfterSolutions.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={cn(navLinkClass, "w-full")}>
                    {link.label}
                  </Link>
                </li>
              ))}
              {site.appLoginUrl && (
                <li>
                  <a href={site.appLoginUrl} className={cn(navLinkClass, "w-full")}>
                    Log in
                  </a>
                </li>
              )}
            </ul>
          </nav>
          <ThemeToggle withLabel className="mt-1 w-full justify-start" />
          <div className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
            <LinkButton href="/request-demo" size="lg">
              Request a free demo
            </LinkButton>
            <LinkButton href="/request-quote" variant="secondary" size="lg">
              Request a quote
            </LinkButton>
          </div>
        </Container>
      </div>
    </NavDisclosure>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/90 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75">
      <Container className="relative flex h-16 items-center gap-4 lg:h-18">
        <Logo className="mr-auto lg:mr-4" />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            <li>
              <Link href={featuresLink.href} className={navLinkClass}>
                {featuresLink.label}
              </Link>
            </li>
            <li>
              <SolutionsMenu />
            </li>
            {navAfterSolutions.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={navLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 lg:ml-auto lg:gap-2">
          <ThemeToggle className="hidden lg:inline-flex" />
          {/* Call: visible at every width */}
          <a
            href={site.phone.tel}
            className={buttonClasses("ghost", "md", "px-3 text-primary xl:text-fg")}
            aria-label={`Call us on ${site.phone.display}`}
          >
            <Phone aria-hidden="true" />
            <span className="hidden xl:inline">{site.phone.display}</span>
          </a>
          {/* WhatsApp: header shortcut on mobile; the floating button covers desktop */}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("ghost", "md", "px-3 text-[#128c4b] lg:hidden dark:text-whatsapp")}
            aria-label="Chat with us on WhatsApp"
          >
            <WhatsAppIcon />
          </a>
          {site.appLoginUrl && (
            <a href={site.appLoginUrl} className={cn(navLinkClass, "hidden lg:inline-flex")}>
              Log in
            </a>
          )}
          <LinkButton href="/request-demo" className="hidden lg:inline-flex">
            Request a demo
          </LinkButton>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
