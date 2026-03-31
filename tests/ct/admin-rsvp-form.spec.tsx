import { test, expect } from "@playwright/experimental-ct-react";
import type { Locator } from "@playwright/test";

import { AdminRsvpHarness } from "./fixtures/admin-rsvp-harness";

const TEST_INVITATION_ID = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";

function readPayload(component: Locator) {
  return component.locator('input[name="payload"]').inputValue().then(JSON.parse) as Promise<{
    eventKey: string;
    invitees: Array<{ inviteeId: string; attending: boolean }>;
    plusOne: { attending: boolean; fullName: string } | null;
    children: Array<{ fullName: string }>;
  }>;
}

test("renders invitationId hidden field", async ({ mount }) => {
  const component = await mount(
    <AdminRsvpHarness
      invitationId={TEST_INVITATION_ID}
      locale="en"
      eventKey="event_2"
      invitees={[
        {
          inviteeId: "11111111-1111-1111-1111-111111111111",
          fullName: "Test Guest",
          kind: "adult",
          attending: false,
          dietaryRequirements: "",
          phoneNumber: "",
        },
      ]}
      plusOneAllowed={false}
      childrenAllowed={false}
      maxChildren={0}
    />,
  );

  const hiddenInput = component.locator('input[name="invitationId"]');
  await expect(hiddenInput).toHaveValue(TEST_INVITATION_ID);
});

test("admin can set attendance and fill contact details for a guest", async ({
  mount,
}) => {
  const component = await mount(
    <AdminRsvpHarness
      invitationId={TEST_INVITATION_ID}
      locale="en"
      eventKey="event_1"
      invitees={[
        {
          inviteeId: "22222222-2222-2222-2222-222222222222",
          fullName: "Elderly Guest",
          kind: "adult",
          attending: false,
          dietaryRequirements: "",
          phoneNumber: "",
        },
      ]}
      plusOneAllowed={false}
      childrenAllowed={false}
      maxChildren={0}
    />,
  );

  // Set attending
  await component.getByLabel("Status").first().selectOption("yes");

  // Fill contact details
  await component.getByLabel("Phone number").first().fill("+49 170 1234567");
  await component
    .getByLabel("Dietary requirements")
    .first()
    .fill("No gluten");

  // Verify serialized payload
  await expect
    .poll(() => readPayload(component))
    .toMatchObject({
      eventKey: "event_1",
      invitees: [
        {
          inviteeId: "22222222-2222-2222-2222-222222222222",
          attending: true,
        },
      ],
      plusOne: null,
      children: [],
    });

  // Verify invitationId still present
  await expect(component.locator('input[name="invitationId"]')).toHaveValue(
    TEST_INVITATION_ID,
  );
});

test("admin can fill plus-one and children for event two", async ({
  mount,
}) => {
  const component = await mount(
    <AdminRsvpHarness
      invitationId={TEST_INVITATION_ID}
      locale="en"
      eventKey="event_2"
      invitees={[
        {
          inviteeId: "33333333-3333-3333-3333-333333333333",
          fullName: "Main Guest",
          kind: "adult",
          attending: false,
          dietaryRequirements: "",
          phoneNumber: "",
        },
      ]}
      plusOneAllowed={true}
      childrenAllowed={true}
      maxChildren={3}
    />,
  );

  // Set main guest attending
  await component.getByLabel("Status").first().selectOption("yes");
  await component.getByLabel("Phone number").first().fill("+49 170 0000000");

  // Add plus one
  await component.getByLabel("Bringing a plus one").selectOption("yes");
  await component.getByLabel("Plus-one name").fill("Partner Name");
  await component.getByLabel("Phone number").nth(1).fill("+49 170 1111111");

  // Add children
  await component.getByLabel("Bringing children").selectOption("yes");
  await component.getByLabel("Number of children").selectOption("2");
  await component.getByLabel("Child name 1").fill("Child A");
  await component.getByLabel("Child name 2").fill("Child B");

  await expect
    .poll(() => readPayload(component))
    .toMatchObject({
      eventKey: "event_2",
      invitees: [
        {
          inviteeId: "33333333-3333-3333-3333-333333333333",
          attending: true,
        },
      ],
      plusOne: {
        attending: true,
        fullName: "Partner Name",
      },
      children: [{ fullName: "Child A" }, { fullName: "Child B" }],
    });
});

test("admin can pre-populate existing RSVP data", async ({ mount }) => {
  const component = await mount(
    <AdminRsvpHarness
      invitationId={TEST_INVITATION_ID}
      locale="en"
      eventKey="event_2"
      invitees={[
        {
          inviteeId: "44444444-4444-4444-4444-444444444444",
          fullName: "Existing Guest",
          kind: "adult",
          attending: true,
          dietaryRequirements: "Vegan",
          phoneNumber: "+49 170 5555555",
        },
      ]}
      plusOneAllowed={true}
      childrenAllowed={true}
      maxChildren={2}
      initialPlusOne={{
        attending: true,
        fullName: "Existing Partner",
        dietaryRequirements: "",
        phoneNumber: "+49 170 6666666",
      }}
      initialChildren={[
        { fullName: "Existing Child", dietaryRequirements: "No nuts" },
      ]}
    />,
  );

  // Verify pre-populated values
  await expect(component.getByLabel("Plus-one name")).toHaveValue(
    "Existing Partner",
  );
  await expect(component.getByLabel("Child name 1")).toHaveValue(
    "Existing Child",
  );

  // Verify payload reflects pre-populated state
  await expect
    .poll(() => readPayload(component))
    .toMatchObject({
      invitees: [{ attending: true }],
      plusOne: { attending: true, fullName: "Existing Partner" },
      children: [{ fullName: "Existing Child" }],
    });
});
