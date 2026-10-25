import { site } from "@/config/site";
import { getSolutionSummary } from "@/content/solutions/catalog";

export type WhatsAppContext =
  | { kind: "general" }
  | { kind: "pricing" }
  | { kind: "demo" }
  | { kind: "contact" }
  | { kind: "features" }
  | { kind: "thank-you" }
  | { kind: "solution"; slug: string };

export function whatsappMessage(context: WhatsAppContext): string {
  switch (context.kind) {
    case "pricing":
      return "Hi, I'd like a quote for Ultimate POS.";
    case "demo":
      return "Hi Ultimate POS, I'd like to book a free demo.";
    case "features":
      return "Hi Ultimate POS, I have a question about your features.";
    case "thank-you":
      return "Hi Ultimate POS, I've just sent a request on your website.";
    case "solution": {
      const solution = getSolutionSummary(context.slug);
      if (solution) {
        return `Hi Ultimate POS, I run ${solution.whatsappIntro} and I'd like to know more about your POS.`;
      }
      return "Hi Ultimate POS, I'd like to know more about your POS.";
    }
    case "contact":
    case "general":
      return "Hi Ultimate POS, I'd like to know more about your POS.";
  }
}

/** A wa.me link to our number with a prefilled, context-specific message. */
export function whatsappLink(context: WhatsAppContext = { kind: "general" }): string {
  return `${site.whatsapp.url}?text=${encodeURIComponent(whatsappMessage(context))}`;
}

/** Work out the WhatsApp context from a pathname (used by the floating button). */
export function whatsappContextFromPath(pathname: string): WhatsAppContext {
  const [first, second] = pathname.split("/").filter(Boolean);
  switch (first) {
    case "solutions":
      return second ? { kind: "solution", slug: second } : { kind: "general" };
    case "pricing":
    case "request-quote":
      return { kind: "pricing" };
    case "request-demo":
      return { kind: "demo" };
    case "features":
      return { kind: "features" };
    case "contact":
      return { kind: "contact" };
    case "thank-you":
      return { kind: "thank-you" };
    default:
      return { kind: "general" };
  }
}

/** wa.me link to a *customer's* number (used in internal lead emails). */
export function whatsappLinkTo(e164Phone: string): string {
  return `https://wa.me/${e164Phone.replace(/\D/g, "")}`;
}
