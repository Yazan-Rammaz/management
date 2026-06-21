import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3006",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    // `npm run dev` serves on 3006 (see package.json / AGENTS.md §10) — the
    // wait URL must match the dev port or the webServer times out.
    url: "http://localhost:3006",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "laptop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 1024 } },
    },
    {
      name: "tablet",
      use: { ...devices["iPad (gen 7)"] },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 14 Pro Max"] },
    },
  ],
});
