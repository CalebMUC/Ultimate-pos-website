import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from "@react-email/components";

export type LeadNotificationProps = {
  heading: string;
  rows: [string, string][];
  phoneE164: string;
  phoneDisplay: string;
  whatsappUrl: string;
  email: string;
  unverified: boolean;
  submittedAt: string;
  page: string;
};

const green = "#0a7a43";

/** Internal notification sent to the sales inbox for every lead. React escapes all values. */
export function LeadNotification({
  heading,
  rows,
  phoneE164,
  phoneDisplay,
  whatsappUrl,
  email,
  unverified,
  submittedAt,
  page,
}: LeadNotificationProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{`${heading} — call ${phoneDisplay}`}</Preview>
      <Body style={{ backgroundColor: "#f3f8f5", fontFamily: "Arial, Helvetica, sans-serif", margin: 0 }}>
        <Container style={{ backgroundColor: "#ffffff", margin: "24px auto", padding: "28px", maxWidth: "600px" }}>
          <Heading as="h1" style={{ color: "#0e1c16", fontSize: "22px", margin: "0 0 4px" }}>
            {heading}
          </Heading>
          <Text style={{ color: "#4a5a53", fontSize: "13px", margin: "0 0 20px" }}>
            Received {submittedAt} from {page}
          </Text>

          {unverified && (
            <Text
              style={{
                backgroundColor: "#fff7ed",
                border: "1px solid #fdba74",
                borderRadius: "6px",
                color: "#9a3412",
                fontSize: "13px",
                padding: "10px 12px",
              }}
            >
              Unverified: this submission did not pass the anti-spam check (often a visitor with JavaScript turned off).
              Check it looks genuine before calling.
            </Text>
          )}

          <Section style={{ margin: "8px 0 20px" }}>
            <Link
              href={`tel:${phoneE164}`}
              style={{
                backgroundColor: green,
                borderRadius: "8px",
                color: "#ffffff",
                display: "inline-block",
                fontWeight: "bold",
                marginRight: "8px",
                padding: "12px 18px",
                textDecoration: "none",
              }}
            >
              Call {phoneDisplay}
            </Link>
            <Link
              href={whatsappUrl}
              style={{
                backgroundColor: "#25d366",
                borderRadius: "8px",
                color: "#062e17",
                display: "inline-block",
                fontWeight: "bold",
                padding: "12px 18px",
                textDecoration: "none",
              }}
            >
              WhatsApp
            </Link>
          </Section>

          <table width="100%" cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse", fontSize: "14px" }}>
            <tbody>
              {rows.map(([label, value]) => (
                <tr key={label}>
                  <td
                    style={{
                      borderBottom: "1px solid #dbe6e0",
                      color: "#4a5a53",
                      padding: "10px 12px 10px 0",
                      verticalAlign: "top",
                      width: "34%",
                    }}
                  >
                    {label}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #dbe6e0",
                      color: "#0e1c16",
                      padding: "10px 0",
                      verticalAlign: "top",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Hr style={{ borderColor: "#dbe6e0", margin: "24px 0 12px" }} />
          <Text style={{ color: "#4a5a53", fontSize: "12px", margin: 0 }}>
            Reply to this email to answer {email} directly.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
