import { readFile } from "node:fs/promises";

import type { Download, Page } from "@playwright/test";

import { expect, test } from "./fixtures";

async function openInvitation(page: Page, invitationUrl: string) {
  await page.goto(invitationUrl);
  await expect(page).toHaveURL(/\/guest$/);
}

async function toggleAttendanceRow(page: Page, name: string) {
  const checkbox = page.getByRole("checkbox", { name, exact: true });
  const id = await checkbox.getAttribute("id");
  await page.locator(`label[for="${id}"]`).click();
}

const mealLabel: Record<"meat" | "vegetarian", string> = {
  meat: "Fleisch",
  vegetarian: "Vegetarisch",
};

async function fillPrimaryAdultAttendance(
  page: Page,
  options: {
    name: string;
    mealPreference?: "meat" | "vegetarian";
    phoneNumber: string;
  },
) {
  await toggleAttendanceRow(page, options.name);

  if (options.mealPreference) {
    await page.getByLabel("Essenswunsch").first().click();
    await page.getByRole("option", { name: mealLabel[options.mealPreference] }).click();
  }

  await page.getByLabel("Telefonnummer").first().fill(options.phoneNumber);
}

async function submitHouseholdEventTwoRsvp(page: Page) {
  await fillPrimaryAdultAttendance(page, {
    name: "Taylor Family",
    mealPreference: "vegetarian",
    phoneNumber: "+39 333 111 222",
  });

  await toggleAttendanceRow(page, "Household member 1");
  await toggleAttendanceRow(page, "Child 1");
  await toggleAttendanceRow(page, "Child 2");

  await page.getByRole("button", { name: "Antwort speichern" }).click();
  await expect(page.getByText("Deine Antwort wurde gespeichert.").first()).toBeVisible();
}

async function submitAdminRespondedFamilyRsvp(page: Page) {
  await fillPrimaryAdultAttendance(page, {
    name: "Riley Response",
    phoneNumber: "+39 333 111 222",
  });

  await toggleAttendanceRow(page, "Household member 1");
  await toggleAttendanceRow(page, "Child 1");

  await page.getByRole("button", { name: "Antwort speichern" }).click();
  await expect(page.getByText("Deine Antwort wurde gespeichert.").first()).toBeVisible();
}

async function loginAdmin(page: Page, password: string) {
  await page.goto("/admin");
  await page.getByLabel("Shared password").fill(password);
  await page.getByRole("button", { name: "Open dashboard" }).click();

  await expect(
    page.getByRole("heading", { name: "Invitation state at a glance" }),
  ).toBeVisible();
}

async function searchAdminDashboard(page: Page, term: string) {
  const searchInput = page.getByPlaceholder("Search guest, email, or external ID");
  await searchInput.fill(term);
  await page.getByRole("button", { name: "Filter" }).click();
  await expect(page).toHaveURL(new RegExp(`search=${term}`));
}

async function readDownload(download: Download) {
  const downloadPath = await download.path();

  if (!downloadPath) {
    throw new Error("Playwright did not persist the calendar download.");
  }

  return readFile(downloadPath, "utf8");
}

test.describe("Mobile guest flows", () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test("household RSVPs can be submitted and edited through the guest page", async ({
    page,
    manifest,
  }) => {
    await openInvitation(page, manifest.invitations.family.url);

    await submitHouseholdEventTwoRsvp(page);

    await openInvitation(page, manifest.invitations.family.url);
    await expect(page.getByRole("checkbox", { name: "Taylor Family" })).toBeChecked();
    await expect(page.getByRole("checkbox", { name: "Household member 1" })).toBeChecked();
    await expect(page.getByRole("checkbox", { name: "Child 1" })).toBeChecked();
    await expect(page.getByRole("checkbox", { name: "Child 2" })).toBeChecked();

    // They were just checked — toggle to uncheck them
    await toggleAttendanceRow(page, "Household member 1");
    await toggleAttendanceRow(page, "Child 1");
    await toggleAttendanceRow(page, "Child 2");
    await page.getByRole("button", { name: "Antwort speichern" }).click();
    await expect(page.getByText("Deine Antwort wurde gespeichert.").first()).toBeVisible();

    await openInvitation(page, manifest.invitations.family.url);
    await expect(page.getByRole("checkbox", { name: "Household member 1" })).not.toBeChecked();
    await expect(page.getByRole("checkbox", { name: "Child 1" })).not.toBeChecked();
    await expect(page.getByRole("checkbox", { name: "Child 2" })).not.toBeChecked();
  });
});

test.describe("Name-change + attending regression", () => {
  test.use({
    viewport: { width: 1280, height: 900 },
  });

  test("status stays attending immediately after save when primary was checked", async ({
    page,
    manifest,
  }) => {
    await openInvitation(page, manifest.invitations.family.url);

    // Ensure Taylor Family is attending (may already be checked from a prior test run)
    const isChecked = await page.getByRole("checkbox", { name: "Taylor Family" }).isChecked();
    if (!isChecked) {
      await toggleAttendanceRow(page, "Taylor Family");
    }
    await page.getByLabel("Telefonnummer").first().fill("+39 111 222 333");

    await page.getByRole("button", { name: "Antwort speichern" }).click();

    // Wait for the post-save navigation to complete (/guest?saved=1).
    await expect(page).toHaveURL(/saved=1/);
    await expect(page.getByText("Deine Antwort wurde gespeichert.").first()).toBeVisible();

    // The primary checkbox must still be checked without a hard reload.
    await expect(page.getByRole("checkbox", { name: "Taylor Family" })).toBeChecked();
  });
});

test.describe("Desktop guest and admin flows", () => {
  test.use({
    viewport: { width: 1280, height: 900 },
  });

  test("guests can RSVP and download the calendar file", async ({
    page,
    manifest,
  }) => {
    await openInvitation(page, manifest.invitations.individual.url);

    await expect(page.getByLabel("Full name")).toHaveCount(0);
    await expect(page.getByLabel("Person type")).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: /Add to calendar|Zum Kalender/i }),
    ).toHaveCount(0);

    await fillPrimaryAdultAttendance(page, {
      name: "Alex Both",
      mealPreference: "meat",
      phoneNumber: "+39 333 444 555",
    });
    await page.getByRole("button", { name: "Antwort speichern" }).click();
    await expect(page.getByText("Deine Antwort wurde gespeichert.").first()).toBeVisible();

    await openInvitation(page, manifest.invitations.individual.url);
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("link", { name: /Add to calendar|Zum Kalender/i }).click();
    const calendarFile = await readDownload(await downloadPromise);

    expect(calendarFile).toContain("BEGIN:VCALENDAR");
    expect(calendarFile).toContain("TRIGGER:-P1M");
    expect(calendarFile).toContain(manifest.invitations.individual.url);
  });

  test("logged-out guests are redirected to recovery and recovery stays generic", async ({
    page,
    manifest,
  }) => {
    const successMessage =
      "Wenn diese E-Mail-Adresse zu einer Einladung gehört, haben wir den Link erneut gesendet.";

    await openInvitation(page, manifest.invitations.individual.url);
    await page
      .getByRole("button", { name: "Abmelden" })
      .click();
    await expect(page).toHaveURL("/");

    await page.goto("/guest");
    await expect(page).toHaveURL(/\/recover$/);
    await expect(
      page.getByRole("heading", { name: "Deinen Einladungslink finden" }),
    ).toBeVisible();

    await page
      .getByLabel("E-Mail-Adresse der Einladung")
      .fill(manifest.invitations.individual.primaryEmail);
    await page.getByRole("button", { name: "Link senden" }).click();
    await expect(page.getByText(successMessage)).toBeVisible();

    await page.goto("/recover");
    await page
      .getByLabel("E-Mail-Adresse der Einladung")
      .fill(manifest.unknownRecoveryEmail);
    await page.getByRole("button", { name: "Link senden" }).click();
    await expect(page.getByText(successMessage)).toBeVisible();

    await page.goto(manifest.invitations.individual.url);
    await expect(page).toHaveURL(/\/guest$/);
    await expect(
      page.getByRole("heading", { name: "Alex Both", level: 1 }),
    ).toBeVisible();
  });

  test("admin sees opened invitations and household RSVP attendee details", async ({
    page,
    manifest,
  }) => {
    await openInvitation(page, manifest.invitations.adminOpenedOnly.url);

    await openInvitation(page, manifest.invitations.adminRespondedFamily.url);
    await submitAdminRespondedFamilyRsvp(page);

    await loginAdmin(page, manifest.adminPassword);

    await searchAdminDashboard(page, "admin-opened-only");
    const openedCard = page.locator("section").filter({
      hasText: "admin-opened-only",
    });
    await expect(openedCard.getByText("Access count: 1")).toBeVisible();
    await expect(openedCard.getByText("pending")).toBeVisible();

    await searchAdminDashboard(page, "admin-responded-family");
    const respondedCard = page.locator("section").filter({
      hasText: "admin-responded-family",
    });
    await expect(respondedCard.getByText("attending")).toBeVisible();
    await respondedCard.getByRole("link", { name: "Manage invitation" }).click();

    await expect(page.getByText("Current RSVP state")).toBeVisible();
    await expect(
      page.getByText("Riley Response | adult | attending"),
    ).toBeVisible();
    await expect(
      page.getByText("Household member 1 | adult | attending"),
    ).toBeVisible();
    await expect(
      page.getByText("Child 1 | child | attending"),
    ).toBeVisible();
    await expect(page.getByText("rsvp_updated")).toBeVisible();
    await expect(page.getByText("link_opened")).toBeVisible();
  });
});
