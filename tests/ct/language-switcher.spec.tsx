import { expect, test } from "@playwright/experimental-ct-react";

import { LanguageSwitcherHarness } from "./fixtures/language-switcher-harness";

test("renders with the initial locale highlighted", async ({ mount }) => {
  const component = await mount(<LanguageSwitcherHarness initialLocale="en" />);

  const englishButton = component.getByRole("button", { name: "English" });
  const germanButton = component.getByRole("button", { name: "German" });

  await expect(englishButton).toHaveAttribute("aria-pressed", "true");
  await expect(englishButton).toHaveClass(/bg-\[#2f241c\]/);
  await expect(germanButton).toHaveAttribute("aria-pressed", "false");
  await expect(germanButton).toHaveClass(/border-\[#d7c2b1\]/);
});

test("switches locale on click without navigation", async ({ mount, page }) => {
  const component = await mount(<LanguageSwitcherHarness initialLocale="en" />);
  const beforeUrl = page.url();

  await component.getByRole("button", { name: "German" }).click();

  await expect.poll(() => page.url()).toBe(beforeUrl);
  await expect(component.getByTestId("locale-label")).toHaveText("Deutsch");
  await expect(
    component.getByRole("button", { name: "Deutsch" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("persists locale changes via fetch", async ({ mount, page }) => {
  let requestedLocale: string | null = null;

  await page.route("**/guest/locale**", async (route) => {
    requestedLocale = new URL(route.request().url()).searchParams.get("locale");
    await route.fulfill({
      status: 204,
      body: "",
    });
  });

  const component = await mount(<LanguageSwitcherHarness initialLocale="en" />);

  await component.getByRole("button", { name: "German" }).click();

  await expect.poll(() => requestedLocale).toBe("de");
});
