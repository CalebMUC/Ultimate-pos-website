import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from "@react-email/components";

export type LeadAutoReplyProps = {
  firstName: string;
  /** e.g. "demo request" */
  requestLabel: string;
  /** What happens next, e.g. "We'll call you within 1 business day to arrange your demo." */
  nextStep: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsappUrl: string;
  siteUrl: string;
  serviceArea: string;
};

const green = "#0a7a43";

/** Branded confirmation sent to the person who filled in the form. */
export function LeadAutoReply({
  firstName,
  requestLabel,
  nextStep,
  phoneDisplay,
  phoneTel,
  whatsappUrl,
  siteUrl,
  serviceArea,
}: LeadAutoReplyProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{`Thanks ${firstName}, we've received your ${requestLabel}.`}</Preview>
      <Body style={{ backgroundColor: "#f3f8f5", fontFamily: "Arial, Helvetica, sans-serif", margin: 0 }}>
        <Container style={{ backgroundColor: "#ffffff", margin: "24px auto", maxWidth: "560px" }}>
          <Section style={{ backgroundColor: green, padding: "20px 28px" }}>
            <Text style={{ color: "#ffffff", fontSize: "20px", fontWeight: "bold", margin: 0 }}>Ultimate POS</Text>
          </Section>

          <Section style={{ padding: "28px" }}>
            <Heading as="h1" style={{ color: "#0e1c16", fontSize: "22px", margin: "0 0 16px" }}>
              Thanks {firstName}, we&apos;ve received your {requestLabel}.
            </Heading>
            <Text style={{ color: "#0e1c16", fontSize: "16px", lineHeight: "24px" }}>{nextStep}</Text>
            <Text style={{ color: "#0e1c16", fontSize: "16px", lineHeight: "24px" }}>
              Can&apos;t wait? Chat with us on WhatsApp or call us now — we&apos;re happy to help.
            </Text>

            <Section style={{ margin: "24px 0" }}>
              <Link
                href={whatsappUrl}
                style={{
                  backgroundColor: "#25d366",
                  borderRadius: "8px",
                  color: "#062e17",
                  display: "inline-block",
                  fontWeight: "bold",
                  marginRight: "8px",
                  padding: "12px 18px",
                  textDecoration: "none",
                }}
              >
                Chat on WhatsApp
              </Link>
              <Link
                href={phoneTel}
                style={{
                  border: `2px solid ${green}`,
                  borderRadius: "8px",
                  color: green,
                  display: "inline-block",
                  fontWeight: "bold",
                  padding: "10px 16px",
                  textDecoration: "none",
                }}
              >
                Call {phoneDisplay}
              </Link>
            </Section>

            <Hr style={{ borderColor: "#dbe6e0", margin: "24px 0 16px" }} />
            <Text style={{ color: "#4a5a53", fontSize: "13px", lineHeight: "20px", margin: 0 }}>
              Ultimate POS · {serviceArea}
              <br />
              <Link href={siteUrl} style={{ color: green }}>
                {siteUrl.replace(/^https?:\/\//, "")}
              </Link>
            </Text>
            <Text style={{ color: "#4a5a53", fontSize: "12px", lineHeight: "18px" }}>
              You are receiving this because you contacted us through our website. We only use your details to respond
              to your request.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
