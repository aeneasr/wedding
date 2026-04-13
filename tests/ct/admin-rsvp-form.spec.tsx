import { test, expect } from "@playwright/experimental-ct-react";
import type { Locator, Page } from "@playwright/test";

import { AdminRsvpHarness } from "./fixtures/admin-rsvp-harness";

const TEST_INVITATION_ID = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";

/** Toggle an attendance checkbox row by clicking its visible label. */
async function toggleAttendanceRow(component: Locator, name: string) {
  const checkbox = component.getByRole("checkbox", { name, exact: true });
  const id = await checkbox.getAttribute("id");
  await component.locator(`label[for="${id}"]`).click();
}

function readPayload(component: Locator) {
  return component.locator('input[name="payload"]').inputValue().then(JSON.parse) as Promise<{
    invitees: Array<{
      inviteeId: string;
      fullName: string;
      kind: "adult" | "child";
      attending: boolean;
    }>;
  }>;
}

/** Click the nth meal-preference trigger then pick an option from the portal. */
async function selectMealOption(component: Locator, page: Page, nth: number, optionName: string) {
  await component.getByLabel("Essenswunsch").nth(nth).click();
  await page.getByRole("option", { name: optionName }).click();
}

test("renders invitationId hidden field", async ({ mount }) => {
  const component = await mount(
    <AdminRsvpHarness
      invitationId={TEST_INVITATION_ID}
      locale="de"
      invitationMode="individual"
      invitees={[
        {
          inviteeId: "11111111-1111-4111-8111-111111111111",
          fullName: "Test Guest",
          kind: "adult",
          isPrimary: true,
          attending: false,
          dietaryRequirements: "",
          phoneNumber: "",
        },
      ]}
    />,
  );

  const hiddenInput = component.locator('input[name="invitationId"]');
  await expect(hiddenInput).toHaveValue(TEST_INVITATION_ID);
});

test("admin can set attendance and fill contact details for an individual guest", async ({
  mount,
  page,
}) => {
  const component = await mount(
    <AdminRsvpHarness
      invitationId={TEST_INVITATION_ID}
      locale="de"
      invitationMode="individual"
      invitees={[
        {
          inviteeId: "22222222-2222-4222-8222-222222222222",
          fullName: "Elderly Guest",
          kind: "adult",
          isPrimary: true,
          attending: false,
          dietaryRequirements: "",
          phoneNumber: "",
        },
      ]}
    />,
  );

  await toggleAttendanceRow(component, "Elderly Guest");
  await component.getByLabel("Telefonnummer").first().fill("+49 170 1234567");
  await selectMealOption(component, page, 0, "Fleisch");

  await expect
    .poll(() => readPayload(component))
    .toMatchObject({
      invitees: [
        {
          inviteeId: "22222222-2222-4222-8222-222222222222",
          attending: true,
        },
      ],
    });

  await expect(component.locator('input[name="invitationId"]')).toHaveValue(
    TEST_INVITATION_ID,
  );
});

test("admin can set attendance for a household roster", async ({ mount }) => {
  const component = await mount(
    <AdminRsvpHarness
      invitationId={TEST_INVITATION_ID}
      locale="de"
      invitationMode="household"
      invitees={[
        {
          inviteeId: "33333333-3333-4333-8333-333333333333",
          fullName: "Main Guest",
          kind: "adult",
          isPrimary: true,
          attending: false,
          dietaryRequirements: "",
          phoneNumber: "",
        },
        {
          inviteeId: "44444444-4444-4444-8444-444444444444",
          fullName: "Household member 1",
          kind: "adult",
          isPrimary: false,
          attending: false,
          dietaryRequirements: "",
          phoneNumber: "",
        },
        {
          inviteeId: "55555555-5555-4555-8555-555555555555",
          fullName: "Child 1",
          kind: "child",
          isPrimary: false,
          attending: false,
          dietaryRequirements: "",
          phoneNumber: "",
        },
      ]}
    />,
  );

  await toggleAttendanceRow(component, "Main Guest");
  await component.getByLabel("Telefonnummer").first().fill("+49 170 0000000");

  await toggleAttendanceRow(component, "Household member 1");
  await toggleAttendanceRow(component, "Child 1");

  await expect
    .poll(() => readPayload(component))
    .toMatchObject({
      invitees: [
        {
          inviteeId: "33333333-3333-4333-8333-333333333333",
          attending: true,
        },
        {
          inviteeId: "44444444-4444-4444-8444-444444444444",
          attending: true,
        },
        {
          inviteeId: "55555555-5555-4555-8555-555555555555",
          attending: true,
        },
      ],
    });
});

test("admin can pre-populate existing household RSVP data", async ({ mount }) => {
  const component = await mount(
    <AdminRsvpHarness
      invitationId={TEST_INVITATION_ID}
      locale="de"
      invitationMode="household"
      invitees={[
        {
          inviteeId: "66666666-6666-4666-8666-666666666666",
          fullName: "Existing Guest",
          kind: "adult",
          isPrimary: true,
          attending: true,
          dietaryRequirements: "vegetarian",
          phoneNumber: "+49 170 5555555",
        },
        {
          inviteeId: "77777777-7777-4777-8777-777777777777",
          fullName: "Existing Partner",
          kind: "adult",
          isPrimary: false,
          attending: true,
          dietaryRequirements: "",
          phoneNumber: "",
        },
        {
          inviteeId: "88888888-8888-4888-8888-888888888888",
          fullName: "Existing Child",
          kind: "child",
          isPrimary: false,
          attending: true,
          // Old free-text value — should be sanitized to ""
          dietaryRequirements: "No nuts",
          phoneNumber: "",
        },
      ]}
    />,
  );

  await expect(component.getByRole("checkbox", { name: "Existing Guest" })).toBeChecked();
  await expect(component.getByRole("checkbox", { name: "Existing Partner" })).toBeChecked();
  await expect(component.getByRole("checkbox", { name: "Existing Child" })).toBeChecked();

  // Verify payload has correct dietary values
  await expect
    .poll(() => readPayload(component))
    .toMatchObject({
      invitees: [
        { attending: true, dietaryRequirements: "vegetarian" },
        { attending: true, dietaryRequirements: "" },
        { attending: true, dietaryRequirements: "" },
      ],
    });
});
