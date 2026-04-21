import type { Page } from "@playwright/test";

import { expect, test } from "./fixtures";

const REGISTRATION_CODE = "anna+aeneas";

const mealLabel = { meat: "Fleisch", vegetarian: "Vegetarisch" } as const;

async function selectMealPreference(
  page: Page,
  index: number,
  preference: keyof typeof mealLabel,
) {
  await page.getByLabel("Essenswunsch").nth(index).click();
  await page.getByRole("option", { name: mealLabel[preference] }).click();
}

async function loginAdmin(page: Page, password: string) {
  await page.goto("/admin");
  await page.getByLabel("Gemeinsames Passwort").fill(password);
  await page.getByRole("button", { name: "Dashboard öffnen" }).click();
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
    await page.goto("/");
    await page.getByLabel("Einladungs-Passwort").fill(REGISTRATION_CODE);
    await page.getByRole("button", { name: "Weiter" }).click();
    await page.getByLabel("Vollständiger Name").fill("E2E Registrant");
    await page.getByLabel("Deine E-Mail").fill("e2e-register@example.com");
    await page.getByLabel("Telefonnummer (optional)").fill("+49 170 1111111");
    await selectMealPreference(page, 0, "meat");
    await page.getByRole("button", { name: "Weitere Person hinzufügen" }).click();
    const nameInputs = page.getByLabel("Vollständiger Name");
    await nameInputs.nth(1).fill("E2E Partner");
    await selectMealPreference(page, 1, "vegetarian");
    await page.getByRole("button", { name: "Anmeldung absenden" }).click();
    await expect(page).toHaveURL(/\/register\/thanks$/);
    await expect(
      page.getByRole("heading", { name: "Danke für deine Antwort!" }),
    ).toBeVisible();
  });

  test("shows a gate error when the invitation password is wrong", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByLabel("Einladungs-Passwort").fill("obviously-wrong");
    await page.getByRole("button", { name: "Weiter" }).click();
    await expect(
      page.getByText("Das Einladungs-Passwort stimmt leider nicht."),
    ).toBeVisible();
    // Post-gate form must remain hidden — user cannot reach the name input.
    await expect(page.getByLabel("Vollständiger Name")).toHaveCount(0);
  });

  test("duplicate email triggers silent recovery and lands on thanks", async ({
    page,
    manifest,
  }) => {
    const existingEmail = manifest.invitations.individual.primaryEmail;
    await page.goto("/");
    await page.getByLabel("Einladungs-Passwort").fill(REGISTRATION_CODE);
    await page.getByRole("button", { name: "Weiter" }).click();
    await page.getByLabel("Vollständiger Name").fill("Duplicate Person");
    await page.getByLabel("Deine E-Mail").fill(existingEmail);
    await selectMealPreference(page, 0, "meat");
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
    await page.goto("/");
    await page.getByLabel("Einladungs-Passwort").fill(REGISTRATION_CODE);
    await page.getByRole("button", { name: "Weiter" }).click();
    await page.getByLabel("Vollständiger Name").fill("Phone Roundtrip");
    await page.getByLabel("Deine E-Mail").fill(testEmail);
    await page.getByLabel("Telefonnummer (optional)").fill(testPhone);
    await selectMealPreference(page, 0, "vegetarian");
    await page.getByRole("button", { name: "Anmeldung absenden" }).click();
    await expect(page).toHaveURL(/\/register\/thanks$/);

    // Open the guest page via admin and verify the phone is pre-filled
    await openGuestPageByPrimaryEmail(page, testEmail, manifest.adminPassword);

    const phoneInput = page.getByLabel("Telefonnummer (optional)");
    await expect(phoneInput).toHaveValue(testPhone);
  });
});
