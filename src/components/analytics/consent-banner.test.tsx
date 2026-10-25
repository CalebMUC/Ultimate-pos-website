// @vitest-environment jsdom
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { openConsentSettings, readConsent } from "@/lib/consent";
import { ConsentBanner } from "./consent-banner";

class ResizeObserverStub {
  observe() {}
  disconnect() {}
}

function clearConsentCookie() {
  document.cookie = "up_consent=; Max-Age=0; Path=/";
}

beforeEach(() => {
  globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver;
  clearConsentCookie();
});
afterEach(() => {
  cleanup();
  clearConsentCookie();
});

describe("ConsentBanner", () => {
  it("asks for consent when no choice has been saved", () => {
    render(<ConsentBanner />);
    expect(screen.getByRole("region", { name: /cookies on this site/i })).toBeTruthy();
    // Accept and Reject are offered side by side, with equal weight.
    expect(screen.getByRole("button", { name: "Accept all" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Reject all" })).toBeTruthy();
  });

  it("stores a rejection and disappears", async () => {
    render(<ConsentBanner />);
    await userEvent.click(screen.getByRole("button", { name: "Reject all" }));
    expect(readConsent()).toEqual({ analytics: false, marketing: false });
    expect(screen.queryByRole("region", { name: /cookies on this site/i })).toBeNull();
  });

  it("lets the visitor choose categories individually", async () => {
    render(<ConsentBanner />);
    await userEvent.click(screen.getByRole("button", { name: "Choose" }));
    expect((screen.getByLabelText(/essential/i) as HTMLInputElement).disabled).toBe(true);
    await userEvent.click(screen.getByLabelText(/analytics/i));
    await userEvent.click(screen.getByRole("button", { name: "Save my choices" }));
    expect(readConsent()).toEqual({ analytics: true, marketing: false });
  });

  it("re-opens from the footer's cookie settings link", async () => {
    render(<ConsentBanner />);
    await userEvent.click(screen.getByRole("button", { name: "Accept all" }));
    expect(screen.queryByRole("region", { name: /cookies on this site/i })).toBeNull();
    act(() => openConsentSettings());
    expect(screen.getByRole("region", { name: /cookies on this site/i })).toBeTruthy();
    expect((screen.getByLabelText(/marketing/i) as HTMLInputElement).checked).toBe(true);
  });
});
