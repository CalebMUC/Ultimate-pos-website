import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { formatDate, ProsePage } from "@/components/ui/prose-page";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms that apply when you use the Ultimate POS website, request a demo or quote, or contact us. Governed by the laws of Kenya.",
  path: "/terms",
});

// [[PLACEHOLDER]] Have a Kenyan lawyer review these terms before launch.
export default function TermsPage() {
  const { legal } = site;
  return (
    <ProsePage
      title="Terms of use"
      path="/terms"
      breadcrumb="Terms of use"
      lead="The rules that apply when you use this website. Please read them; by using the site you agree to them."
      meta={`Last updated ${formatDate(legal.termsUpdated)}`}
    >
      <h2>About these terms</h2>
      <p>
        This website ({site.url.replace(/^https?:\/\//, "")}) is run by {legal.entityName}, based on{" "}
        {site.location.area}, {site.location.locality}, Kenya. These terms cover your use of the website only. Use of
        the Ultimate POS software is covered by a separate customer agreement.
      </p>

      <h2>Information on this website</h2>
      <p>
        We work to keep the information on this website accurate and up to date, but it is provided for general
        information. Features, modules and availability can change, and what is included for your business depends on
        the modules and plan you choose. Nothing on this website is an offer that you can accept to form a contract.
      </p>

      <h2>Demos and quotes</h2>
      <p>
        Requesting a demo or a quote is free and does not commit you to anything. A quote is an estimate based on the
        information you give us. A contract only exists once we have both agreed to it in writing.
      </p>

      <h2>Using this website</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the website or its forms to send spam, false information or anything unlawful;</li>
        <li>try to gain unauthorised access to the website, its servers or the data behind it;</li>
        <li>interfere with the website&apos;s security features, or overload it with automated requests; or</li>
        <li>copy the website&apos;s content in a way that breaks these terms or the law.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The Ultimate POS name and logo, and the text, design and graphics on this website, belong to {legal.entityName}{" "}
        or its licensors. You may view and share pages for your own business purposes, but you may not reuse our content
        commercially without our written permission.
      </p>

      <h2>Links to other services</h2>
      <p>
        The website links to services run by others, such as WhatsApp. We are not responsible for those services or
        their content, and their own terms and privacy policies apply when you use them.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent the law allows, we are not liable for any loss that results from relying on information on this
        website or from the website being temporarily unavailable. Nothing in these terms limits any rights you have
        that cannot be limited under Kenyan law.
      </p>

      <h2>Your privacy</h2>
      <p>
        Our <Link href="/privacy-policy">privacy policy</Link> explains how we handle personal data you give us through
        this website.
      </p>

      <h2>Changes to these terms</h2>
      <p>We may update these terms from time to time. The date at the top of this page shows when they last changed.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of Kenya, and the courts of Kenya have jurisdiction over any dispute.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${site.email.sales}`}>{site.email.sales}</a> or call{" "}
        <a href={site.phone.tel}>{site.phone.display}</a>.
      </p>
    </ProsePage>
  );
}
