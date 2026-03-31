import { test, expect } from "@playwright/experimental-ct-react";
import type { Locator } from "@playwright/test";

import {
  GuestRsvpFields,
  type GuestRsvpFieldsProps,
} from "@/src/components/guest-rsvp-fields";

async function readPayload(component: Locator) {
  return JSON.parse(
    await component.locator('input[name="payload"]').inputValue(),
  ) as {
    eventKey: string;
    invitees: Array<{
      inviteeId: string;
      fullName: string;
      attending: boolean;
      phoneNumber: string;
    }>;
    plusOne: {
      attending: boolean;
      fullName: string;
      phoneNumber: string;
    } | null;
    children: Array<{
      fullName: string;
    }>;
  };
}

function buildProps(
  overrides: Partial<GuestRsvpFieldsProps> = {},
): GuestRsvpFieldsProps {
  return {
    locale: "en",
    eventKey: "event_2",
    invitees: [
      {
        inviteeId: "11111111-1111-1111-1111-111111111111",
        fullName: "Taylor Family",
        kind: "adult",
        attending: false,
        dietaryRequirements: "",
        phoneNumber: "",
      },
    ],
    plusOneAllowed: true,
    childrenAllowed: true,
    maxChildren: 2,
    ...overrides,
  };
}

test("event two fields serialize plus-one and child attendance state", async ({
  mount,
}) => {
  const component = await mount(
    <form className="space-y-6">
      <GuestRsvpFields {...buildProps()} />
    </form>,
  );

  await component.getByLabel("Status").first().selectOption("yes");
  await component.getByLabel("Phone number").first().fill("+39 333 111 222");

  await component.getByLabel("Bringing a plus one").selectOption("yes");
  await component.getByLabel("Plus-one name").fill("Casey Family");
  await component.getByLabel("Phone number").nth(1).fill("+39 333 999 888");

  await component.getByLabel("Bringing children").selectOption("yes");
  await component.getByLabel("Number of children").selectOption("2");
  await component.getByLabel("Child name 1").fill("Ava Family");
  await component.getByLabel("Child name 2").fill("Leo Family");

  await expect(component.getByLabel("Child name 1")).toBeVisible();
  await expect(component.getByLabel("Child name 2")).toBeVisible();

  await expect
    .poll(async () => readPayload(component))
    .toMatchObject({
      eventKey: "event_2",
      invitees: [
        {
          fullName: "Taylor Family",
          attending: true,
          phoneNumber: "+39 333 111 222",
        },
      ],
      plusOne: {
        attending: true,
        fullName: "Casey Family",
        phoneNumber: "+39 333 999 888",
      },
      children: [
        { fullName: "Ava Family" },
        { fullName: "Leo Family" },
      ],
    });

  await component.getByLabel("Bringing children").selectOption("no");
  await expect(component.getByLabel("Number of children")).toBeDisabled();
  await expect
    .poll(async () => (await readPayload(component)).children)
    .toEqual([]);
});

test("event two fields hydrate existing household responses and trim removed guests", async ({
  mount,
}) => {
  const component = await mount(
    <form className="space-y-6">
      <GuestRsvpFields
        {...buildProps({
          invitees: [
            {
              inviteeId: "11111111-1111-1111-1111-111111111111",
              fullName: "Taylor Family",
              kind: "adult",
              attending: true,
              dietaryRequirements: "Vegetarian",
              phoneNumber: "+39 333 111 222",
            },
          ],
          initialPlusOne: {
            attending: true,
            fullName: "Casey Family",
            dietaryRequirements: "",
            phoneNumber: "+39 333 999 888",
          },
          initialChildren: [
            {
              fullName: "Ava Family",
              dietaryRequirements: "No nuts",
            },
            {
              fullName: "Leo Family",
              dietaryRequirements: "",
            },
          ],
        })}
      />
    </form>,
  );

  await expect(component.getByLabel("Plus-one name")).toHaveValue("Casey Family");
  await expect(component.getByLabel("Child name 1")).toHaveValue("Ava Family");
  await expect(component.getByLabel("Child name 2")).toHaveValue("Leo Family");

  await component.getByLabel("Bringing a plus one").selectOption("no");
  await expect(component.getByLabel("Plus-one name")).toHaveCount(0);

  await component.getByLabel("Number of children").selectOption("1");
  await expect(component.getByLabel("Child name 2")).toHaveCount(0);

  await expect
    .poll(async () => readPayload(component))
    .toMatchObject({
      invitees: [
        {
          fullName: "Taylor Family",
          attending: true,
          phoneNumber: "+39 333 111 222",
        },
      ],
      plusOne: {
        attending: false,
      },
      children: [{ fullName: "Ava Family" }],
    });
});

test("event one fields do not expose plus-one or child controls", async ({
  mount,
}) => {
  const component = await mount(
    <form className="space-y-6">
      <GuestRsvpFields
        {...buildProps({
          eventKey: "event_1",
          plusOneAllowed: false,
          childrenAllowed: false,
          maxChildren: 0,
        })}
      />
    </form>,
  );

  await expect(
    component.getByRole("heading", { name: "Plus one" }),
  ).toHaveCount(0);
  await expect(
    component.getByRole("heading", { name: "Children" }),
  ).toHaveCount(0);

  await component.getByLabel("Status").first().selectOption("yes");
  await component.getByLabel("Phone number").first().fill("+39 333 555 444");

  await expect
    .poll(async () => readPayload(component))
    .toMatchObject({
      eventKey: "event_1",
      plusOne: null,
      children: [],
      invitees: [
        {
          fullName: "Taylor Family",
          attending: true,
          phoneNumber: "+39 333 555 444",
        },
      ],
    });
});
