import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end tests against the production build (`npm run build` first).
 * Emails are printed to the server log instead of being sent, and the lead rate limit is
 * raised so the suite's own submissions don't trip it.
 */
const PORT = 3100;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] }, testMatch: /(smoke|a11y)\.spec\.ts/ },
  ],
  webServer: {
    command: `npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    env: {
      EMAIL_TRANSPORT: "console",
      ALLOW_CONSOLE_EMAIL: "true",
      LEAD_RATE_LIMIT_PER_HOUR: "1000",
    },
  },
});
