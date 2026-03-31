import { defineConfig } from "@playwright/test";

import { e2eBaseUrl } from "./tests/setup/e2e-env";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  reporter: process.env.CI ? "dot" : "list",
  use: {
    baseURL: e2eBaseUrl,
    browserName: "chromium",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: "npx tsx tests/setup/start-e2e-stack.ts",
    url: e2eBaseUrl,
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
