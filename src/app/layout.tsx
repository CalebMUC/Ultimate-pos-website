import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/config/site";
import { isProduction, seoEnv } from "@/env";
import { siteSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { themeInitScript } from "@/lib/theme";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { Analytics } from "@/components/analytics/analytics";
import { ConsentBanner } from "@/components/analytics/consent-banner";
import "./globals.css";

/**
 * Every route must be fully prerendered: complete HTML, metadata and JSON-LD in the
 * initial response, with no request-time rendering. The build fails if a page breaks this.
 */
export const ensureStatic = "navigation";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `POS System Kenya with M-Pesa | ${site.name}`,
    template: `%s | ${site.name} Kenya`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    siteName: site.name,
    locale: site.ogLocale,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  // Preview and staging deployments must never be indexed.
  robots: isProduction ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
  icons: { icon: [{ url: site.logo, type: "image/svg+xml" }] },
  verification: {
    google: seoEnv.GOOGLE_SITE_VERIFICATION,
    other: {
      ...(seoEnv.BING_SITE_VERIFICATION ? { "msvalidate.01": seoEnv.BING_SITE_VERIFICATION } : {}),
      ...(seoEnv.META_DOMAIN_VERIFICATION ? { "facebook-domain-verification": seoEnv.META_DOMAIN_VERIFICATION } : {}),
    },
  },
  ...(seoEnv.FACEBOOK_APP_ID ? { facebook: { appId: seoEnv.FACEBOOK_APP_ID } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the theme script may add data-theme="dark" before React hydrates.
    <html
      lang="en-KE"
      className={`${inter.variable} ${jakarta.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only z-[60] rounded-lg bg-primary px-4 py-3 font-semibold text-primary-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppFab />
        <ConsentBanner />
        <Analytics />
        <JsonLd data={siteSchema()} />
      </body>
    </html>
  );
}
