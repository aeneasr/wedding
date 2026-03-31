import { readFile } from "node:fs/promises";

import { test as base, expect } from "@playwright/test";

import type { E2eManifest } from "../setup/seed-playwright-data";
import { e2eManifestPath } from "../setup/e2e-env";

export const test = base.extend<{
  manifest: E2eManifest;
}>({
  manifest: async ({}, use) => {
    const rawManifest = await readFile(e2eManifestPath, "utf8");
    await use(JSON.parse(rawManifest) as E2eManifest);
  },
});

export { expect };
