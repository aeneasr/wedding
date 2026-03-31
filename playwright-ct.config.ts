import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "@playwright/experimental-ct-react";

export default defineConfig({
  testDir: "./tests/ct",
  fullyParallel: true,
  reporter: process.env.CI ? "dot" : "list",
  use: {
    browserName: "chromium",
    trace: "on-first-retry",
    ctPort: 3101,
    ctViteConfig: {
      plugins: [react() as any],
      resolve: {
        alias: {
          "@": path.resolve(process.cwd()),
        },
      },
    },
  },
});
