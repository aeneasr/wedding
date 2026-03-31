import { readFile } from "node:fs/promises";

import type { Download, Page } from "@playwright/test";

import { expect, test } from "./fixtures";

async function openInvitation(page: Page, invitationUrl: string) {
  await page.goto(invitationUrl);
  await expect(page).toHaveURL(/\/guest$/);
}

async function fillNamedAdultAttendance(
  page: Page,
  options: {
    dietaryRequirements?: string;
    phoneNumber: string;
  },
) {
  await page.getByLabel("Status").first().selectOption("yes");

  if (options.dietaryRequirements) {
    await page
      .getByLabel("Dietary requirements")
      .first()
      .fill(options.dietaryRequirements);
  }

  await page.getByLabel("Phone number").first().fill(options.phoneNumber);
}

async function submitHouseholdEventTwoRsvp(
  page: Page,
  options: {
    plusOneName: string;
    plusOnePhone: string;
    childNames: string[];
  },
) {
  await fillNamedAdultAttendance(page, {
    dietaryRequirements: "Vegetarian",
    phoneNumber: "+39 333 111 222",
  });

  await page.getByLabel("Bringing a plus one").selectOption("yes");
  await page.getByLabel("Plus-one name").fill(options.plusOneName);
  await page.getByLabel("Phone number").nth(1).fill(options.plusOnePhone);

  await page.getByLabel("Bringing children").selectOption("yes");
  await page
    .getByLabel("Number of children")
    .selectOption(String(options.childNames.length));

  for (const [index, childName] of options.childNames.entries()) {
    await page.getByLabel(`Child name ${index + 1}`).fill(childName);
  }

  await page.getByRole("button", { name: "Save RSVP" }).click();
  await expect(page.getByText("Your RSVP has been saved.")).toBeVisible();
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

function guestEventCard(page: Page, eventName: string) {
  return page.locator("section").filter({
    has: page.getByRole("heading", { name: eventName }),
  });
}

test.describe("Mobile guest flows", () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test("event-one-only invitations stay isolated from event two", async ({
    page,
    manifest,
  }) => {
    await openInvitation(page, manifest.invitations.eventOneOnly.url);

    await expect(page.getByRole("heading", { name: "Sky Event" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Event One" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Event Two" })).toHaveCount(0);

    const detailsResponse = await page.goto("/guest/event/event_2");
    expect(detailsResponse?.status()).toBe(404);
    await expect(page.getByText(/This page could not be found/i)).toBeVisible();

    const rsvpResponse = await page.goto("/guest/event/event_2/rsvp");
    expect(rsvpResponse?.status()).toBe(404);
  });

  test("event-two-only invitations stay isolated from event one", async ({
    page,
    manifest,
  }) => {
    await openInvitation(page, manifest.invitations.eventTwoOnly.url);

    await expect(
      page.getByRole("heading", { name: "Jordan Event" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Event Two" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Event One" })).toHaveCount(0);

    const detailsResponse = await page.goto("/guest/event/event_1");
    expect(detailsResponse?.status()).toBe(404);
    await expect(page.getByText(/This page could not be found/i)).toBeVisible();

    const rsvpResponse = await page.goto("/guest/event/event_1/rsvp");
    expect(rsvpResponse?.status()).toBe(404);
  });

  test("event two household RSVPs can be submitted and edited through the same link", async ({
    page,
    manifest,
  }) => {
    await openInvitation(page, manifest.invitations.familyEventTwo.url);
    await page.goto("/guest/event/event_2/rsvp");

    await submitHouseholdEventTwoRsvp(page, {
      plusOneName: "Casey Family",
      plusOnePhone: "+39 333 777 888",
      childNames: ["Ava Family", "Leo Family"],
    });

    await page.goto("/guest/event/event_2/rsvp");
    await expect(page.getByLabel("Plus-one name")).toHaveValue("Casey Family");
    await expect(page.getByLabel("Child name 1")).toHaveValue("Ava Family");
    await expect(page.getByLabel("Child name 2")).toHaveValue("Leo Family");

    await page.getByLabel("Bringing a plus one").selectOption("no");
    await page.getByLabel("Bringing children").selectOption("no");
    await page.getByRole("button", { name: "Save RSVP" }).click();
    await expect(page.getByText("Your RSVP has been saved.")).toBeVisible();

    await page.goto("/guest/event/event_2/rsvp");
    await expect(page.getByLabel("Bringing a plus one")).toHaveValue("no");
    await expect(page.getByLabel("Plus-one name")).toHaveCount(0);
    await expect(page.getByLabel("Number of children")).toHaveValue("0");
    await expect(page.getByLabel("Number of children")).toBeDisabled();
  });
});

test.describe("Desktop guest and admin flows", () => {
  test.use({
    viewport: { width: 1280, height: 900 },
  });

  test("both-events guests can RSVP for event one and download the calendar file", async ({
    page,
    manifest,
  }) => {
    await openInvitation(page, manifest.invitations.bothEvents.url);

    await expect(page.getByRole("heading", { name: "Event One" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Event Two" })).toBeVisible();

    await page.goto("/guest/event/event_1");
    await expect(
      page.getByRole("link", { name: "Add to calendar" }),
    ).toHaveCount(0);

    await page.goto("/guest/event/event_1/rsvp");
    await expect(
      page.getByRole("heading", { name: "Plus one" }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: "Children" }),
    ).toHaveCount(0);

    await fillNamedAdultAttendance(page, {
      dietaryRequirements: "No shellfish",
      phoneNumber: "+39 333 444 555",
    });
    await page.getByRole("button", { name: "Save RSVP" }).click();
    await expect(page.getByText("Your RSVP has been saved.")).toBeVisible();

    await page.goto("/guest");
    await expect(guestEventCard(page, "Event One").getByText("Attending")).toBeVisible();
    await expect(guestEventCard(page, "Event Two").getByText("Pending")).toBeVisible();

    await page.goto("/guest/event/event_1");
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("link", { name: "Add to calendar" }).click();
    const calendarFile = await readDownload(await downloadPromise);

    expect(calendarFile).toContain("BEGIN:VCALENDAR");
    expect(calendarFile).toContain("TRIGGER:-P1M");
    expect(calendarFile).toContain(manifest.invitations.bothEvents.url);
  });

  test("logged-out guests are redirected to recovery and recovery stays generic", async ({
    page,
    manifest,
  }) => {
    const successMessage =
      "If that email address matches an existing invitation, a recovery message has been sent.";

    await openInvitation(page, manifest.invitations.eventTwoOnly.url);
    await page
      .getByRole("button", { name: "Clear this browser session" })
      .click();
    await expect(page).toHaveURL("/");

    await page.goto("/guest");
    await expect(page).toHaveURL(/\/recover$/);
    await expect(
      page.getByRole("heading", { name: "Recover your invitation link" }),
    ).toBeVisible();

    await page
      .getByLabel("Invitation email address")
      .fill(manifest.invitations.eventTwoOnly.primaryEmail);
    await page.getByRole("button", { name: "Send recovery email" }).click();
    await expect(page.getByText(successMessage)).toBeVisible();

    await page.goto("/recover");
    await page
      .getByLabel("Invitation email address")
      .fill(manifest.unknownRecoveryEmail);
    await page.getByRole("button", { name: "Send recovery email" }).click();
    await expect(page.getByText(successMessage)).toBeVisible();

    await page.goto(manifest.invitations.eventTwoOnly.url);
    await expect(page).toHaveURL(/\/guest$/);
    await expect(
      page.getByRole("heading", { name: "Jordan Event" }),
    ).toBeVisible();
  });

  test("admin sees opened invitations and household RSVP attendee details", async ({
    page,
    manifest,
  }) => {
    await openInvitation(page, manifest.invitations.adminOpenedOnly.url);

    await openInvitation(page, manifest.invitations.adminRespondedFamily.url);
    await page.goto("/guest/event/event_2/rsvp");
    await submitHouseholdEventTwoRsvp(page, {
      plusOneName: "Jamie Response",
      plusOnePhone: "+39 333 222 111",
      childNames: ["Ava Response"],
    });

    await loginAdmin(page, manifest.adminPassword);

    await searchAdminDashboard(page, "admin-opened-only");
    const openedCard = page.locator("section").filter({
      hasText: "admin-opened-only",
    });
    await expect(openedCard.getByText("Access count: 1")).toBeVisible();
    await expect(openedCard.getByText("event_2: pending")).toBeVisible();

    await searchAdminDashboard(page, "admin-responded-family");
    const respondedCard = page.locator("section").filter({
      hasText: "admin-responded-family",
    });
    await expect(respondedCard.getByText("event_2: attending")).toBeVisible();
    await respondedCard.getByRole("link", { name: "Manage invitation" }).click();

    await expect(page.getByText("Current RSVP state")).toBeVisible();
    await expect(
      page.getByText("Riley Response | named_guest | attending"),
    ).toBeVisible();
    await expect(
      page.getByText("Jamie Response | plus_one | attending"),
    ).toBeVisible();
    await expect(
      page.getByText("Ava Response | child | attending"),
    ).toBeVisible();
    await expect(page.getByText("rsvp_updated")).toBeVisible();
    await expect(page.getByText("link_opened")).toBeVisible();
  });
});
