import { solutionCatalog } from "@/content/solutions/catalog";
import { hasPublishedTestimonials } from "@/content/testimonials";

export type NavLink = { href: string; label: string };

export const solutionLinks: NavLink[] = solutionCatalog.map((s) => ({
  href: `/solutions/${s.slug}`,
  label: s.name,
}));

/** Main nav reads: Features · Solutions (menu) · …navAfterSolutions */
export const featuresLink: NavLink = { href: "/features", label: "Features" };

export const navAfterSolutions: NavLink[] = [
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const companyLinks: NavLink[] = [
  { href: "/about", label: "About us" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  ...(hasPublishedTestimonials ? [{ href: "/testimonials", label: "Client stories" }] : []),
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const getStartedLinks: NavLink[] = [
  { href: "/request-demo", label: "Request a free demo" },
  { href: "/request-quote", label: "Request a quote" },
  { href: "/contact", label: "Talk to sales" },
];

export const legalLinks: NavLink[] = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of service" },
];
