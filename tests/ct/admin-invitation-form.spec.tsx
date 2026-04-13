import { test, expect } from "@playwright/experimental-ct-react";

import { EventCheckboxes } from "./fixtures/event-checkboxes";

test("hides household-only controls for individual invitations", async ({
  mount,
}) => {
  const component = await mount(
    <EventCheckboxes initialInvitationMode="individual" />,
  );

  await expect(component.getByLabel("Additional household members")).toHaveCount(0);
  await expect(component.getByLabel("Person type")).toHaveCount(0);
});

test("shows household count control for household invitations", async ({
  mount,
}) => {
  const component = await mount(
    <EventCheckboxes initialInvitationMode="household" />,
  );

  await expect(component.getByLabel("Additional household members")).toBeVisible();
});

test("adds structured household rows when the additional-member count changes", async ({
  mount,
}) => {
  const component = await mount(
    <EventCheckboxes initialInvitationMode="household" initialAdditionalMembers={1} />,
  );

  await expect(component.getByLabel("Person type")).toHaveCount(1);

  await component.getByLabel("Additional household members").selectOption("3");
  await expect(component.getByLabel("Person type")).toHaveCount(3);

  await component.getByLabel("Additional household members").selectOption("1");
  await expect(component.getByLabel("Person type")).toHaveCount(1);
});

test("switching back to individual removes extra household rows", async ({
  mount,
}) => {
  const component = await mount(
    <EventCheckboxes initialInvitationMode="household" initialAdditionalMembers={2} />,
  );

  await expect(component.getByLabel("Person type")).toHaveCount(2);

  await component.getByLabel("Invitation mode").selectOption("individual");
  await expect(component.getByLabel("Additional household members")).toHaveCount(0);
  await expect(component.getByLabel("Person type")).toHaveCount(0);
});
