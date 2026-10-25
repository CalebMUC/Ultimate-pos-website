import { solutionCatalog } from "@/content/solutions/catalog";
import { hasPublishedTestimonials } from "@/content/testimonials";
import { staticRoutes } from "./routes";

export type NavLink = { href: string; label: string };

/**
 * Only link to pages that exist. A page appears in the menus as soon as it is added to
 * staticRoutes in config/routes.ts (which also puts it in the sitemap), so the site never
 * ships links that 404 — bad for visitors and for crawlers.
 */
const livePaths = new Set(staticRoutes.map((route) => route.path));
const onlyLive = (links: NavLink[]) => links.filter((link) => livePaths.has(link.href));

export const solutionLinks: NavLink[] = solutionCatalog.map((s) => ({
  href: `/solutions/${s.slug}`,
  label: s.name,
}));

/** Main nav reads: Features · Solutions (menu) · …navAfterSolutions */
export const featuresLink: NavLink = { href: "/features", label: "Features" };

export const navAfterSolutions: NavLink[] = onlyLive([
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]);

export const companyLinks: NavLink[] = onlyLive([
  { href: "/about", label: "About us" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  ...(hasPublishedTestimonials ? [{ href: "/testimonials", label: "Client stories" }] : []),
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
]);

export const getStartedLinks: NavLink[] = onlyLive([
  { href: "/request-demo", label: "Request a free demo" },
  { href: "/request-quote", label: "Request a quote" },
  { href: "/contact", label: "Talk to sales" },
]);

export const legalLinks: NavLink[] = onlyLive([
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of service" },
]);
