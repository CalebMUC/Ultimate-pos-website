import { describe, expect, it } from "vitest";
import { site } from "@/config/site";
import { whatsappContextFromPath, whatsappLink, whatsappLinkTo, whatsappMessage } from "./whatsapp";

const decodeText = (url: string) => decodeURIComponent(new URL(url).searchParams.get("text") ?? "");

describe("whatsappLink", () => {
  it("links to our number", () => {
    const url = new URL(whatsappLink());
    expect(url.origin + url.pathname).toBe(`https://wa.me/${site.whatsapp.number}`);
    expect(site.whatsapp.number).toBe("254720463710");
  });

  it("prefills an industry message on solution pages", () => {
    expect(decodeText(whatsappLink({ kind: "solution", slug: "pharmacy-chemist-pos" }))).toBe(
      "Hi Ultimate POS, I run a pharmacy and I'd like to know more about your POS.",
    );
  });

  it("prefills a quote message for pricing", () => {
    expect(decodeText(whatsappLink({ kind: "pricing" }))).toBe("Hi, I'd like a quote for Ultimate POS.");
  });

  it("falls back to the general message for an unknown industry", () => {
    expect(whatsappMessage({ kind: "solution", slug: "nope" })).toBe(
      "Hi Ultimate POS, I'd like to know more about your POS.",
    );
  });
});

describe("whatsappContextFromPath", () => {
  it.each([
    ["/", { kind: "general" }],
    ["/solutions", { kind: "general" }],
    ["/solutions/agrovet-pos", { kind: "solution", slug: "agrovet-pos" }],
    ["/pricing", { kind: "pricing" }],
    ["/request-quote", { kind: "pricing" }],
    ["/request-demo", { kind: "demo" }],
    ["/features", { kind: "features" }],
    ["/contact", { kind: "contact" }],
    ["/thank-you", { kind: "thank-you" }],
  ])("%s", (path, expected) => {
    expect(whatsappContextFromPath(path)).toEqual(expected);
  });
});

describe("whatsappLinkTo", () => {
  it("builds a wa.me link to a customer's number", () => {
    expect(whatsappLinkTo("+254712345678")).toBe("https://wa.me/254712345678");
  });
});
