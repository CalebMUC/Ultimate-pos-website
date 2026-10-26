import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { formatDate, ProsePage } from "@/components/ui/prose-page";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Ultimate POS collects, uses and protects your personal data under the Kenya Data Protection Act, 2019, and how to exercise your rights.",
  path: "/privacy-policy",
});

/*
 * [[PLACEHOLDER]] Have a Kenyan data-protection lawyer review this page before launch.
 * Service providers below are the ones the website code actually uses; update the list if
 * you change provider (e.g. host somewhere other than Vercel).
 */
const processors = [
  { name: "Vercel", purpose: "Website hosting and delivery", where: "United States / global network" },
  { name: "Resend", purpose: "Sending enquiry notifications and confirmation emails", where: "United States" },
  {
    name: "Cloudflare (Turnstile)",
    purpose: "Telling people apart from spam bots on our forms",
    where: "Global network",
  },
  { name: "Upstash", purpose: "Limiting repeated form submissions (spam protection)", where: "Global network" },
  { name: "Sentry", purpose: "Detecting website errors (no form contents are sent)", where: "United States" },
  { name: "Google Analytics", purpose: "Website statistics — only with your consent", where: "United States" },
  { name: "Meta (Facebook) Pixel", purpose: "Measuring our adverts — only with your consent", where: "United States" },
];

const cookies = [
  { name: "up_consent", type: "Essential", purpose: "Remembers your cookie choices", duration: "180 days" },
  {
    name: "ultimatepos-theme (local storage)",
    type: "Essential",
    purpose: "Remembers light or dark theme",
    duration: "Until you clear it",
  },
  {
    name: "_ga, _ga_*",
    type: "Analytics (optional)",
    purpose: "Google Analytics statistics",
    duration: "Up to 2 years",
  },
  { name: "_fbp", type: "Marketing (optional)", purpose: "Meta Pixel advert measurement", duration: "Up to 90 days" },
];

export default function PrivacyPolicyPage() {
  const { legal } = site;
  return (
    <ProsePage
      title="Privacy policy"
      path="/privacy-policy"
      breadcrumb="Privacy policy"
      lead="How we collect, use and protect your personal data when you use this website or contact us, in line with the Kenya Data Protection Act, 2019."
      meta={`Last updated ${formatDate(legal.privacyPolicyUpdated)}`}
    >
      <h2>Who we are</h2>
      <p>
        This website is run by {legal.entityName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;), based on {site.location.area},{" "}
        {site.location.locality}, Kenya. We are the data controller for the personal data described in this policy.
        {legal.odpcRegistrationNumber &&
          ` We are registered with the Office of the Data Protection Commissioner (registration number ${legal.odpcRegistrationNumber}).`}
      </p>
      <p>
        You can contact us about privacy at <a href={`mailto:${site.email.sales}`}>{site.email.sales}</a> or on{" "}
        <a href={site.phone.tel}>{site.phone.display}</a>.
      </p>
      <p>
        This policy covers this website and enquiries made through it. Data that our customers store in the Ultimate POS
        software itself is covered by the customer agreement for that software.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Details you give us</strong> when you request a demo or quote or send a message: your name, business
          name, phone number, email address, type of business, number of branches and tills, the modules you are
          interested in, preferred demo time, and anything you write in your message.
        </li>
        <li>
          <strong>Technical data</strong> needed to run and protect the website: your IP address (used for spam
          protection and rate limiting), browser type and the pages you request.
        </li>
        <li>
          <strong>Statistics and advert measurement</strong> — only if you accept analytics or marketing cookies (see
          below).
        </li>
      </ul>
      <p>We do not ask for, and ask you not to send us, sensitive personal data through the website.</p>

      <h2>How and why we use it</h2>
      <ul>
        <li>
          To respond to your enquiry — call or message you, arrange a demo, or prepare a quote. Our basis is your
          consent, which you give with the checkbox on our forms, and the steps you ask us to take before entering into
          a contract.
        </li>
        <li>
          To keep the website secure and free of spam. Our basis is our legitimate interest in protecting our website
          and our team.
        </li>
        <li>
          To understand how the website is used and measure our adverts — only with your consent, which you can change
          at any time under &ldquo;Cookie settings&rdquo; at the bottom of every page.
        </li>
      </ul>
      <p>We do not sell your personal data, and we do not use it for automated decision-making.</p>

      <h2>Who we share it with</h2>
      <p>
        We use the following service providers to run the website. They process data on our behalf and only for the
        purposes above:
      </p>
      {/* Scrollable on small screens, so it must be keyboard-focusable (WCAG 2.1.1). */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div className="not-prose overflow-x-auto rounded-lg" tabIndex={0} role="region" aria-label="Service providers">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border-strong text-fg">
              <th scope="col" className="py-2 pr-4 font-semibold">
                Provider
              </th>
              <th scope="col" className="py-2 pr-4 font-semibold">
                Purpose
              </th>
              <th scope="col" className="py-2 font-semibold">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {processors.map((p) => (
              <tr key={p.name} className="border-b border-border text-muted-fg">
                <td className="py-2 pr-4 font-medium text-fg">{p.name}</td>
                <td className="py-2 pr-4">{p.purpose}</td>
                <td className="py-2">{p.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Some of these providers process data outside Kenya. Where they do, we rely on providers that commit to
        appropriate safeguards for your data, as the Data Protection Act requires. We may also disclose data where the
        law requires us to.
      </p>

      <h2>Cookies</h2>
      <p>
        Essential cookies are always on because the website needs them. Analytics and marketing cookies are off until
        you choose to allow them, and you can change your choice at any time under &ldquo;Cookie settings&rdquo; at the
        bottom of every page.
      </p>
      {/* Scrollable on small screens, so it must be keyboard-focusable (WCAG 2.1.1). */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div className="not-prose overflow-x-auto rounded-lg" tabIndex={0} role="region" aria-label="Cookies we use">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border-strong text-fg">
              <th scope="col" className="py-2 pr-4 font-semibold">
                Name
              </th>
              <th scope="col" className="py-2 pr-4 font-semibold">
                Type
              </th>
              <th scope="col" className="py-2 pr-4 font-semibold">
                Purpose
              </th>
              <th scope="col" className="py-2 font-semibold">
                Kept for
              </th>
            </tr>
          </thead>
          <tbody>
            {cookies.map((c) => (
              <tr key={c.name} className="border-b border-border text-muted-fg">
                <td className="py-2 pr-4 font-medium text-fg">{c.name}</td>
                <td className="py-2 pr-4">{c.type}</td>
                <td className="py-2 pr-4">{c.purpose}</td>
                <td className="py-2">{c.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>How long we keep it</h2>
      <p>
        If you contact us but do not become a customer, we keep your enquiry for up to {legal.leadRetentionMonths}{" "}
        months and then delete it. If you become a customer, we keep your contact details for as long as you are a
        customer and afterwards for as long as the law requires.
      </p>

      <h2>How we protect it</h2>
      <p>
        The website is served only over encrypted connections (HTTPS). Access to enquiries is limited to the people who
        need it to respond to you, and our forms are protected against spam and abuse.
      </p>

      <h2>Your rights</h2>
      <p>Under the Data Protection Act, 2019 you have the right to:</p>
      <ul>
        <li>be informed of how your personal data is used;</li>
        <li>access the personal data we hold about you;</li>
        <li>object to the processing of all or part of your personal data;</li>
        <li>have false or misleading data corrected; and</li>
        <li>have false, misleading or unnecessary data deleted.</li>
      </ul>
      <p>
        To use any of these rights, or to withdraw your consent, contact us at{" "}
        <a href={`mailto:${site.email.sales}`}>{site.email.sales}</a> or on{" "}
        <a href={site.phone.tel}>{site.phone.display}</a>. If you are unhappy with how we handle your data, you can
        complain to the Office of the Data Protection Commissioner at{" "}
        <a href="https://www.odpc.go.ke" target="_blank" rel="noopener noreferrer">
          www.odpc.go.ke
        </a>
        .
      </p>

      <h2>Children</h2>
      <p>This website is meant for businesses and is not directed at children under 18.</p>

      <h2>Changes to this policy</h2>
      <p>
        If we change this policy, we will update the date at the top of this page. Read our{" "}
        <Link href="/terms">terms of use</Link> for the rules that apply to using this website.
      </p>
    </ProsePage>
  );
}
