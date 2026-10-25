import { describe, expect, it } from "vitest";
import { leadSubject } from "@/lib/leads/format";
import { breadcrumbSchema, faqPageSchema, siteSchema, softwareApplicationSchema } from "./schema";

describe("structured data", () => {
  const graph = siteSchema()["@graph"];
  const byType = (type: string) => graph.find((node) => node["@type"] === type) as Record<string, unknown>;

  it("describes a service-area business without a street number or geo pin", () => {
    const business = byType("ProfessionalService");
    expect(business.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "Kiambu Road",
      addressLocality: "Kiambu",
      addressRegion: "Kiambu County",
      addressCountry: "KE",
    });
    expect(business).not.toHaveProperty("geo");
    expect(business.telephone).toBe("+254720463710");
  });

  it("never includes a self-serving aggregate rating", () => {
    expect(JSON.stringify(siteSchema())).not.toContain("aggregateRating");
    expect(JSON.stringify(softwareApplicationSchema())).not.toContain("aggregateRating");
  });

  it("omits offers and reviews until real prices and testimonials exist", () => {
    const software = softwareApplicationSchema([]);
    expect(software).not.toHaveProperty("offers");
    expect(software).not.toHaveProperty("review");
    expect(software.operatingSystem).toBe("Web");
    expect(software.applicationCategory).toBe("BusinessApplication");
  });

  it("builds FAQPage and BreadcrumbList with absolute URLs", () => {
    expect(faqPageSchema([{ question: "Q?", answer: "A." }]).mainEntity[0]).toMatchObject({
      name: "Q?",
      acceptedAnswer: { text: "A." },
    });
    expect(breadcrumbSchema([{ name: "Home", path: "/" }]).itemListElement[0].item).toBe("https://ultimatepos.co.ke/");
  });
});

describe("leadSubject", () => {
  const lead = {
    type: "demo" as const,
    data: {
      fullName: "Wanjiku",
      businessName: "Kamau Mini Mart",
      phone: "+254712345678",
      email: "w@example.com",
      businessType: "pharmacy-chemist-pos",
      branches: "1",
      mode: "phone",
      message: "",
      consent: true as const,
      preferredDate: undefined,
      preferredTime: undefined,
    },
  };

  it("matches the brief's format", () => {
    expect(leadSubject(lead, false)).toBe("[Demo Request] Kamau Mini Mart – Pharmacies & chemists");
  });

  it("flags unverified leads", () => {
    expect(leadSubject(lead, true)).toBe("[Unverified] [Demo Request] Kamau Mini Mart – Pharmacies & chemists");
  });
});
