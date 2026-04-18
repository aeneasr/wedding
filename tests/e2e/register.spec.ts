import type { Page } from "@playwright/test";

import { expect, test } from "./fixtures";

const REGISTRATION_CODE = "anna+aeneas";

async function loginAdmin(page: Page, password: string) {
  await page.goto("/admin");
  await page.getByLabel("Shared password").fill(password);
  await page.getByRole("button", { name: "Open dashboard" }).click();
  await expect(
    page.getByRole("heading", { name: "Einladungen auf einen Blick" }),
  ).toBeVisible();
}

async function openGuestPageByPrimaryEmail(
  page: Page,
  email: string,
  adminPassword: string,
) {
  await loginAdmin(page, adminPassword);

  const searchInput = page.getByPlaceholder("Gast oder E-Mail suchen");
  await searchInput.fill(email);
  await page.getByRole("button", { name: "Filtern" }).click();
  await expect(page).toHaveURL(new RegExp(`search=${encodeURIComponent(email)}`));

  const card = page.locator("div").filter({ hasText: email }).first();
  await card.getByRole("link", { name: "Einladung verwalten" }).click();

  const invitationLinkInput = page.getByLabel("Einladungslink");
  const guestUrl = await invitationLinkInput.inputValue();

  await page.goto(guestUrl);
  await expect(page).toHaveURL(/\/guest$/);
}

test.describe("/register", () => {
  test("happy path creates an invitation and redirects to thanks", async ({
    page,
  }) => {
    await page.goto("/register");
    await page.getByLabel("Einladungscode").fill(REGISTRATION_CODE);
    await page.getByRole("button", { name: "Weiter" }).click();
    await page.getByLabel("Dein vollständiger Name").fill("E2E Registrant");
    await page.getByLabel("Deine E-Mail").fill("e2e-register@example.com");
    await page.getByLabel("Telefonnummer (optional)").fill("+49 170 1111111");
    await page.getByRole("button", { name: "Weitere Person hinzufügen" }).click();
    const nameInputs = page.getByLabel("Dein vollständiger Name");
    await nameInputs.nth(1).fill("E2E Partner");
    await page.getByRole("button", { name: "Anmeldung absenden" }).click();
    await expect(page).toHaveURL(/\/register\/thanks$/);
    await expect(page.getByRole("heading", { name: "Danke!" })).toBeVisible();
  });

  test("shows the form-level error from the server when the code is wrong", async ({
    page,
  }) => {
    await page.goto("/register");
    await page.getByLabel("Einladungscode").fill("obviously-wrong");
    await page.getByRole("button", { name: "Weiter" }).click();
    await page.getByLabel("Dein vollständiger Name").fill("Should Not Save");
    await page.getByLabel("Deine E-Mail").fill("bad-code@example.com");
    await page.getByRole("button", { name: "Anmeldung absenden" }).click();
    await expect(page).toHaveURL(/\/register$/);
    await expect(page.getByText("Invalid code.")).toBeVisible();
  });

  test("duplicate email triggers silent recovery and lands on thanks", async ({
    page,
    manifest,
  }) => {
    const existingEmail = manifest.invitations.individual.primaryEmail;
    await page.goto("/register");
    await page.getByLabel("Einladungscode").fill(REGISTRATION_CODE);
    await page.getByRole("button", { name: "Weiter" }).click();
    await page.getByLabel("Dein vollständiger Name").fill("Duplicate Person");
    await page.getByLabel("Deine E-Mail").fill(existingEmail);
    await page.getByRole("button", { name: "Anmeldung absenden" }).click();
    await expect(page).toHaveURL(/\/register\/thanks$/);
  });

  test("phone number entered during registration pre-fills on the guest RSVP page", async ({
    page,
    manifest,
  }) => {
    const testEmail = "e2e-phone-roundtrip@example.com";
    const testPhone = "+49 170 9999999";

    // Register with a phone number
    await page.goto("/register");
    await page.getByLabel("Einladungscode").fill(REGISTRATION_CODE);
    await page.getByRole("button", { name: "Weiter" }).click();
    await page.getByLabel("Dein vollständiger Name").fill("Phone Roundtrip");
    await page.getByLabel("Deine E-Mail").fill(testEmail);
    await page.getByLabel("Telefonnummer (optional)").fill(testPhone);
    await page.getByRole("button", { name: "Anmeldung absenden" }).click();
    await expect(page).toHaveURL(/\/register\/thanks$/);

    // Open the guest page via admin and verify the phone is pre-filled
    await openGuestPageByPrimaryEmail(page, testEmail, manifest.adminPassword);

    const phoneInput = page.getByLabel("Telefonnummer (optional)");
    await expect(phoneInput).toHaveValue(testPhone);
  });
});
