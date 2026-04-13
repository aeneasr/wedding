import { test, expect } from "@playwright/experimental-ct-react";
import type { Locator, Page } from "@playwright/test";

import {
  GuestRsvpFields,
  type GuestRsvpFieldsProps,
} from "@/src/components/guest-rsvp-fields";

/** Toggle an attendance checkbox row by clicking its visible label. */
async function toggleAttendanceRow(component: Locator, name: string) {
  const checkbox = component.getByRole("checkbox", { name, exact: true });
  const id = await checkbox.getAttribute("id");
  await component.locator(`label[for="${id}"]`).click();
}

async function readPayload(component: Locator) {
  return JSON.parse(
    await component.locator('input[name="payload"]').inputValue(),
  ) as {
    invitees: Array<{
      inviteeId: string;
      fullName: string;
      kind: "adult" | "child";
      isPrimary: boolean;
      attending: boolean;
      dietaryRequirements: string;
      phoneNumber: string;
    }>;
  };
}

/** Click the nth meal-preference trigger then pick an option from the portal. */
async function selectMealOption(component: Locator, page: Page, nth: number, optionName: string) {
  await component.getByLabel("Essenswunsch").nth(nth).click();
  await page.getByRole("option", { name: optionName }).click();
}

function buildProps(
  overrides: Partial<GuestRsvpFieldsProps> = {},
): GuestRsvpFieldsProps {
  return {
    locale: "de",
    invitationMode: "household",
    invitees: [
      {
        inviteeId: "11111111-1111-4111-8111-111111111111",
        fullName: "Taylor Family",
        kind: "adult",
        isPrimary: true,
        attending: false,
        dietaryRequirements: "",
        phoneNumber: "",
      },
      {
        inviteeId: "22222222-2222-4222-8222-222222222222",
        fullName: "Household member 1",
        kind: "adult",
        isPrimary: false,
        attending: false,
        dietaryRequirements: "",
        phoneNumber: "",
      },
      {
        inviteeId: "33333333-3333-4333-8333-333333333333",
        fullName: "Child 1",
        kind: "child",
        isPrimary: false,
        attending: false,
        dietaryRequirements: "",
        phoneNumber: "",
      },
    ],
    ...overrides,
  };
}

test("checklist rows toggle attendance and serialize correctly", async ({
  mount,
}) => {
  const component = await mount(
    <form className="space-y-6">
      <GuestRsvpFields {...buildProps()} />
    </form>,
  );

  await toggleAttendanceRow(component, "Taylor Family");
  await component.getByLabel("Telefonnummer").first().fill("+39 333 111 222");

  await toggleAttendanceRow(component, "Household member 1");
  await toggleAttendanceRow(component, "Child 1");

  await expect
    .poll(async () => readPayload(component))
    .toMatchObject({
      invitees: [
        {
          fullName: "Taylor Family",
          attending: true,
          phoneNumber: "+39 333 111 222",
        },
        {
          fullName: "Household member 1",
          kind: "adult",
          attending: true,
        },
        {
          fullName: "Child 1",
          kind: "child",
          attending: true,
        },
      ],
    });
});

test("checklist hydrates existing attendance responses", async ({
  mount,
}) => {
  const component = await mount(
    <form className="space-y-6">
      <GuestRsvpFields
        {...buildProps({
          invitees: [
            {
              inviteeId: "11111111-1111-4111-8111-111111111111",
              fullName: "Taylor Family",
              kind: "adult",
              isPrimary: true,
              attending: true,
              dietaryRequirements: "vegetarian",
              phoneNumber: "+39 333 111 222",
            },
            {
              inviteeId: "22222222-2222-4222-8222-222222222222",
              fullName: "Casey Family",
              kind: "adult",
              isPrimary: false,
              attending: true,
              dietaryRequirements: "",
              phoneNumber: "",
            },
            {
              inviteeId: "33333333-3333-4333-8333-333333333333",
              fullName: "Ava Family",
              kind: "child",
              isPrimary: false,
              attending: true,
              dietaryRequirements: "meat",
              phoneNumber: "",
            },
          ],
        })}
      />
    </form>,
  );

  await expect(component.getByRole("checkbox", { name: "Taylor Family" })).toBeChecked();
  await expect(component.getByRole("checkbox", { name: "Casey Family" })).toBeChecked();
  await expect(component.getByRole("checkbox", { name: "Ava Family" })).toBeChecked();

  await expect
    .poll(async () => readPayload(component))
    .toMatchObject({
      invitees: [
        {
          fullName: "Taylor Family",
          kind: "adult",
          attending: true,
        },
        {
          fullName: "Casey Family",
          kind: "adult",
          attending: true,
        },
        {
          fullName: "Ava Family",
          kind: "child",
          attending: true,
        },
      ],
    });
});

test("individual mode shows single checklist row", async ({
  mount,
}) => {
  const component = await mount(
    <form className="space-y-6">
      <GuestRsvpFields
        {...buildProps({
          invitationMode: "individual",
          invitees: [
            {
              inviteeId: "11111111-1111-4111-8111-111111111111",
              fullName: "Taylor Family",
              kind: "adult",
              isPrimary: true,
              attending: false,
              dietaryRequirements: "",
              phoneNumber: "",
            },
          ],
        })}
      />
    </form>,
  );

  await expect(component.getByRole("checkbox", { name: "Taylor Family" })).toHaveCount(1);
  await expect(component.getByRole("checkbox", { name: "Taylor Family" })).not.toBeChecked();

  await toggleAttendanceRow(component, "Taylor Family");
  await component.getByLabel("Telefonnummer").first().fill("+39 333 555 444");

  await expect
    .poll(async () => readPayload(component))
    .toMatchObject({
      invitees: [
        {
          fullName: "Taylor Family",
          attending: true,
          phoneNumber: "+39 333 555 444",
        },
      ],
    });
});

test("unchecking attendance hides detail fields", async ({
  mount,
  page,
}) => {
  const component = await mount(
    <form className="space-y-6">
      <GuestRsvpFields {...buildProps()} />
    </form>,
  );

  // Mark attending and verify detail fields appear
  await toggleAttendanceRow(component, "Taylor Family");
  await expect(component.getByLabel("Essenswunsch")).toHaveCount(1);
  await expect(component.getByLabel("Telefonnummer")).toHaveCount(1);

  await component.getByLabel("Telefonnummer").first().fill("+39 999 888 777");
  await selectMealOption(component, page, 0, "Vegetarisch");

  // Uncheck and verify fields disappear
  await toggleAttendanceRow(component, "Taylor Family");

  await expect(component.getByLabel("Essenswunsch")).toHaveCount(0);
  await expect(component.getByLabel("Telefonnummer")).toHaveCount(0);

  // State is preserved in payload
  await expect
    .poll(async () => readPayload(component))
    .toMatchObject({
      invitees: [
        {
          fullName: "Taylor Family",
          attending: false,
          phoneNumber: "+39 999 888 777",
          dietaryRequirements: "vegetarian",
        },
        { fullName: "Household member 1", attending: false },
        { fullName: "Child 1", attending: false },
      ],
    });
});

test("non-primary attending guest shows meal preference but no phone number", async ({
  mount,
  page,
}) => {
  const component = await mount(
    <form className="space-y-6">
      <GuestRsvpFields {...buildProps()} />
    </form>,
  );

  // Mark only the child as attending
  await toggleAttendanceRow(component, "Child 1");

  await expect(component.getByLabel("Essenswunsch")).toHaveCount(1);
  await expect(component.getByLabel("Telefonnummer")).toHaveCount(0);

  await selectMealOption(component, page, 0, "Fleisch");

  await expect
    .poll(async () => readPayload(component))
    .toMatchObject({
      invitees: [
        { fullName: "Taylor Family", attending: false },
        { fullName: "Household member 1", attending: false },
        { fullName: "Child 1", kind: "child", attending: true, dietaryRequirements: "meat" },
      ],
    });
});

test("old free-text dietary values are sanitized to empty on load", async ({
  mount,
}) => {
  const component = await mount(
    <form className="space-y-6">
      <GuestRsvpFields
        {...buildProps({
          invitees: [
            {
              inviteeId: "11111111-1111-4111-8111-111111111111",
              fullName: "Taylor Family",
              kind: "adult",
              isPrimary: true,
              attending: true,
              dietaryRequirements: "vegan", // old free-text value
              phoneNumber: "+39 111 222 333",
            },
          ],
        })}
      />
    </form>,
  );

  // The meal preference trigger should show the placeholder (empty value sanitized)
  await expect
    .poll(async () => readPayload(component))
    .toMatchObject({
      invitees: [{ dietaryRequirements: "" }],
    });
});

test("shows phone number error message when fieldErrors targets invitee phone", async ({
  mount,
}) => {
  const component = await mount(
    <form className="space-y-6">
      <GuestRsvpFields
        {...buildProps({
          invitees: [
            {
              inviteeId: "11111111-1111-4111-8111-111111111111",
              fullName: "Taylor Family",
              kind: "adult",
              isPrimary: true,
              attending: true,
              dietaryRequirements: "",
              phoneNumber: "",
            },
          ],
        })}
        state={{
          error: "Please review the highlighted fields.",
          fieldErrors: { "invitees.0.phoneNumber": ["Phone number is required."] },
        }}
      />
    </form>,
  );

  await expect(component.getByText("Phone number is required.")).toBeVisible();
});

test("highlights phone number input with aria-invalid when field error present", async ({
  mount,
}) => {
  const component = await mount(
    <form className="space-y-6">
      <GuestRsvpFields
        {...buildProps({
          invitees: [
            {
              inviteeId: "11111111-1111-4111-8111-111111111111",
              fullName: "Taylor Family",
              kind: "adult",
              isPrimary: true,
              attending: true,
              dietaryRequirements: "",
              phoneNumber: "",
            },
          ],
        })}
        state={{
          error: "Please review the highlighted fields.",
          fieldErrors: { "invitees.0.phoneNumber": ["Phone number is required."] },
        }}
      />
    </form>,
  );

  await expect(component.getByLabel("Telefonnummer")).toHaveAttribute("aria-invalid", "true");
});

test("does not mark meal preference field as invalid when only phone has an error", async ({
  mount,
}) => {
  const component = await mount(
    <form className="space-y-6">
      <GuestRsvpFields
        {...buildProps({
          invitees: [
            {
              inviteeId: "11111111-1111-4111-8111-111111111111",
              fullName: "Taylor Family",
              kind: "adult",
              isPrimary: true,
              attending: true,
              dietaryRequirements: "",
              phoneNumber: "",
            },
          ],
        })}
        state={{
          error: "Please review the highlighted fields.",
          fieldErrors: { "invitees.0.phoneNumber": ["Phone number is required."] },
        }}
      />
    </form>,
  );

  await expect(component.getByLabel("Essenswunsch")).not.toHaveAttribute("aria-invalid");
});

test("meal preference select saves chosen value in payload", async ({
  mount,
  page,
}) => {
  const component = await mount(
    <form className="space-y-6">
      <GuestRsvpFields
        {...buildProps({
          invitees: [
            {
              inviteeId: "11111111-1111-4111-8111-111111111111",
              fullName: "Taylor Family",
              kind: "adult",
              isPrimary: true,
              attending: true,
              dietaryRequirements: "",
              phoneNumber: "+39 100 200 300",
            },
          ],
        })}
      />
    </form>,
  );

  await selectMealOption(component, page, 0, "Vegetarisch");

  await expect
    .poll(async () => readPayload(component))
    .toMatchObject({
      invitees: [
        {
          fullName: "Taylor Family",
          attending: true,
          dietaryRequirements: "vegetarian",
        },
      ],
    });
});

test("household detail fields appear for each attending guest", async ({
  mount,
  page,
}) => {
  const component = await mount(
    <form className="space-y-6">
      <GuestRsvpFields {...buildProps()} />
    </form>,
  );

  // Mark primary attending
  await toggleAttendanceRow(component, "Taylor Family");
  await component.getByLabel("Telefonnummer").first().fill("+39 100 200 300");
  await selectMealOption(component, page, 0, "Fleisch");

  // Mark household member attending
  await toggleAttendanceRow(component, "Household member 1");
  await selectMealOption(component, page, 1, "Vegetarisch");

  // Mark child attending
  await toggleAttendanceRow(component, "Child 1");
  await selectMealOption(component, page, 2, "Fleisch");

  await expect
    .poll(async () => readPayload(component))
    .toMatchObject({
      invitees: [
        {
          inviteeId: "11111111-1111-4111-8111-111111111111",
          fullName: "Taylor Family",
          kind: "adult",
          isPrimary: true,
          attending: true,
          phoneNumber: "+39 100 200 300",
          dietaryRequirements: "meat",
        },
        {
          inviteeId: "22222222-2222-4222-8222-222222222222",
          fullName: "Household member 1",
          kind: "adult",
          isPrimary: false,
          attending: true,
          phoneNumber: "",
          dietaryRequirements: "vegetarian",
        },
        {
          inviteeId: "33333333-3333-4333-8333-333333333333",
          fullName: "Child 1",
          kind: "child",
          isPrimary: false,
          attending: true,
          phoneNumber: "",
          dietaryRequirements: "meat",
        },
      ],
    });
});
