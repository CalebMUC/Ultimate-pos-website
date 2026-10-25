import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/monitoring", () => ({ reportError: vi.fn(), reportWarning: vi.fn() }));

describe("checkLeadRateLimit (in-memory fallback)", () => {
  it("allows 5 submissions per hour per IP and per email, then refuses", async () => {
    const { checkLeadRateLimit } = await import("./ratelimit");
    const results: boolean[] = [];
    for (let i = 0; i < 6; i++) results.push(await checkLeadRateLimit({ ip: "198.51.100.1", email: "a@example.com" }));
    expect(results).toEqual([true, true, true, true, true, false]);
  });

  it("counts the email separately, so a new IP can't reset it", async () => {
    const { checkLeadRateLimit } = await import("./ratelimit");
    for (let i = 0; i < 5; i++) await checkLeadRateLimit({ ip: `198.51.100.${10 + i}`, email: "same@example.com" });
    expect(await checkLeadRateLimit({ ip: "198.51.100.99", email: "SAME@example.com" })).toBe(false);
  });
});
