import { beforeEach, describe, expect, it, vi } from "vitest";

// --- Mocks for everything outside the action ----------------------------------------
const redirectError = (url: string) => Object.assign(new Error(`NEXT_REDIRECT:${url}`), { url });

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw redirectError(url);
  }),
}));
vi.mock("next/headers", () => ({
  headers: vi.fn(async () => new Headers({ "x-forwarded-for": "203.0.113.7", referer: "https://x/request-demo" })),
}));
vi.mock("./notify-lead", () => ({ notifyLead: vi.fn(), sendAutoReply: vi.fn() }));
vi.mock("./save-lead", () => ({ saveLead: vi.fn() }));
vi.mock("@/lib/turnstile", () => ({ verifyTurnstile: vi.fn() }));
vi.mock("@/lib/ratelimit", () => ({ checkLeadRateLimit: vi.fn() }));
vi.mock("@/lib/monitoring", () => ({ reportError: vi.fn(), reportWarning: vi.fn() }));

const { notifyLead, sendAutoReply } = await import("./notify-lead");
const { saveLead } = await import("./save-lead");
const { verifyTurnstile } = await import("@/lib/turnstile");
const { checkLeadRateLimit } = await import("@/lib/ratelimit");
const { submitDemo, submitContact } = await import("./submit-lead");
import { initialLeadState } from "./state";

// --- Helpers ------------------------------------------------------------------------
function demoForm(overrides: Record<string, string> = {}) {
  const fields: Record<string, string> = {
    fullName: "Wanjiku Kamau",
    businessName: "Kamau Mini Mart",
    phone: "0712345678",
    email: "wanjiku@example.com",
    businessType: "retail-shop-pos",
    branches: "1",
    mode: "phone",
    consent: "on",
    _t: String(Date.now() - 10_000),
    ...overrides,
  };
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) fd.append(key, value);
  return fd;
}

async function run(action: typeof submitDemo, fd: FormData) {
  try {
    return { state: await action(initialLeadState, fd), redirectedTo: null };
  } catch (error) {
    const url = (error as { url?: string }).url;
    if (!url) throw error;
    return { state: null, redirectedTo: url };
  }
}

beforeEach(() => {
  vi.mocked(checkLeadRateLimit).mockResolvedValue(true);
  vi.mocked(verifyTurnstile).mockResolvedValue("passed");
  vi.mocked(notifyLead).mockResolvedValue({ ok: true, id: "email-1" });
  vi.mocked(sendAutoReply).mockResolvedValue({ ok: true, id: "email-2" });
  vi.mocked(saveLead).mockResolvedValue({ ok: true, skipped: true });
});

// --- Tests --------------------------------------------------------------------------
describe("submitLead", () => {
  it("sends the notification and auto-reply, then redirects to the thank-you page", async () => {
    const { redirectedTo } = await run(submitDemo, demoForm());
    expect(redirectedTo).toMatch(/^\/thank-you\?type=demo&ref=[0-9a-f-]{36}$/);
    expect(notifyLead).toHaveBeenCalledOnce();
    const lead = vi.mocked(notifyLead).mock.calls[0][0];
    expect(lead.data.phone).toBe("+254712345678");
    expect(lead.verified).toBe(true);
    expect(lead.page).toBe("/request-demo");
    expect(sendAutoReply).toHaveBeenCalledOnce();
    expect(saveLead).toHaveBeenCalledOnce();
  });

  it("returns field errors and the submitted values when validation fails", async () => {
    const { state } = await run(submitDemo, demoForm({ phone: "0799", fullName: "Kept Name" }));
    expect(state).toMatchObject({ status: "error", fieldErrors: { phone: expect.stringMatching(/Kenyan/) } });
    expect(state?.status === "error" && state.values?.fullName).toBe("Kept Name");
    expect(notifyLead).not.toHaveBeenCalled();
  });

  it("silently drops honeypot submissions", async () => {
    const { redirectedTo } = await run(submitDemo, demoForm({ company_website: "http://spam" }));
    expect(redirectedTo).toBe("/thank-you?type=demo&ref=ok");
    expect(notifyLead).not.toHaveBeenCalled();
  });

  it("silently drops submissions made too quickly", async () => {
    const { redirectedTo } = await run(submitDemo, demoForm({ _t: String(Date.now() - 500) }));
    expect(redirectedTo).toBe("/thank-you?type=demo&ref=ok");
    expect(notifyLead).not.toHaveBeenCalled();
  });

  it("refuses when the rate limit is exceeded", async () => {
    vi.mocked(checkLeadRateLimit).mockResolvedValue(false);
    const { state } = await run(submitDemo, demoForm());
    expect(state).toMatchObject({ status: "error", message: expect.stringMatching(/several requests/) });
    expect(notifyLead).not.toHaveBeenCalled();
  });

  it("rejects a failed Turnstile check", async () => {
    vi.mocked(verifyTurnstile).mockResolvedValue("failed");
    const { state } = await run(submitDemo, demoForm());
    expect(state).toMatchObject({ status: "error", message: expect.stringMatching(/robot/) });
    expect(notifyLead).not.toHaveBeenCalled();
  });

  it("accepts but flags a no-JavaScript submission, and sends no auto-reply", async () => {
    vi.mocked(verifyTurnstile).mockResolvedValue("missing-token");
    const fd = demoForm();
    fd.delete("_t");
    const { redirectedTo } = await run(submitDemo, fd);
    expect(redirectedTo).toMatch(/^\/thank-you\?type=demo/);
    expect(vi.mocked(notifyLead).mock.calls[0][0].verified).toBe(false);
    expect(sendAutoReply).not.toHaveBeenCalled();
  });

  it("shows the WhatsApp fallback when the notification email fails", async () => {
    vi.mocked(notifyLead).mockResolvedValue({ ok: false, error: "Resend down" });
    const { state } = await run(submitDemo, demoForm());
    expect(state).toMatchObject({ status: "error", fallback: true, message: expect.stringMatching(/0720 463 710/) });
    expect(sendAutoReply).not.toHaveBeenCalled();
  });

  it("handles the contact form", async () => {
    const fd = new FormData();
    for (const [k, v] of Object.entries({
      fullName: "Otieno",
      phone: "+254 712 345 678",
      email: "o@example.com",
      subject: "Pricing",
      message: "How much?",
      consent: "on",
      _t: String(Date.now() - 10_000),
    }))
      fd.append(k, v);
    const { redirectedTo } = await run(submitContact, fd);
    expect(redirectedTo).toMatch(/^\/thank-you\?type=contact/);
  });
});
