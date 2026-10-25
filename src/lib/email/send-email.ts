import "server-only";
import { Resend } from "resend";
import { serverEnv } from "@/env";

export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export type SendResult = { ok: true; id: string } | { ok: false; error: string };

/** Remove characters that could break out of an email header. */
const headerSafe = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

type Transport = (from: string, message: EmailMessage) => Promise<SendResult>;

const resendTransport =
  (apiKey: string): Transport =>
  async (from, message) => {
    const { data, error } = await new Resend(apiKey).emails.send({
      from,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
      replyTo: message.replyTo,
    });
    if (error || !data) return { ok: false, error: error?.message ?? "Unknown Resend error" };
    return { ok: true, id: data.id };
  };

// Local testing only: prints the email instead of sending it.
const consoleTransport: Transport = async (from, message) => {
  console.info(
    `\n[email:console] From: ${from}\nTo: ${message.to}\nReply-To: ${message.replyTo ?? "-"}\nSubject: ${message.subject}\n\n${message.text}\n`,
  );
  return { ok: true, id: `console-${Date.now()}` };
};

function pickTransport(): Transport | null {
  const env = serverEnv();
  if (env.EMAIL_TRANSPORT === "console") return consoleTransport;
  if (env.RESEND_API_KEY) return resendTransport(env.RESEND_API_KEY);
  // No key: allow the console mailer in development only. In production this is a failure,
  // so the visitor sees the WhatsApp fallback instead of a false "sent".
  return process.env.NODE_ENV === "production" ? null : consoleTransport;
}

/**
 * Send one email. Implementations are interchangeable (Resend today; Nodemailer/SMTP could
 * sit behind the same interface).
 */
export async function sendEmail(message: EmailMessage): Promise<SendResult> {
  const transport = pickTransport();
  if (!transport) return { ok: false, error: "No email transport configured (RESEND_API_KEY missing)" };

  const from = `Ultimate POS <${serverEnv().FROM_EMAIL}>`;
  try {
    return await transport(from, {
      ...message,
      to: headerSafe(message.to),
      subject: headerSafe(message.subject),
      replyTo: message.replyTo ? headerSafe(message.replyTo) : undefined,
    });
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}
