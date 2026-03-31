import { test, expect } from "@playwright/experimental-ct-react";

import { EventCheckboxes } from "./fixtures/event-checkboxes";

test("disables plus-one and children checkboxes when Event Two is unchecked", async ({
  mount,
}) => {
  const component = await mount(
    <EventCheckboxes initialEvent2Invited={false} />,
  );

  await expect(
    component.getByRole("checkbox", { name: "Event Two: plus one allowed" }),
  ).toBeDisabled();
  await expect(
    component.getByRole("checkbox", { name: "Event Two: children allowed" }),
  ).toBeDisabled();
});

test("enables plus-one and children checkboxes when Event Two is checked", async ({
  mount,
}) => {
  const component = await mount(
    <EventCheckboxes initialEvent2Invited={true} />,
  );

  await expect(
    component.getByRole("checkbox", { name: "Event Two: plus one allowed" }),
  ).toBeEnabled();
  await expect(
    component.getByRole("checkbox", { name: "Event Two: children allowed" }),
  ).toBeEnabled();
});

test("toggles disabled state when Event Two checkbox is clicked", async ({
  mount,
}) => {
  const component = await mount(
    <EventCheckboxes initialEvent2Invited={true} />,
  );

  const event2 = component.getByRole("checkbox", { name: "Invite to Event Two" });
  const plusOne = component.getByRole("checkbox", { name: "Event Two: plus one allowed" });
  const children = component.getByRole("checkbox", { name: "Event Two: children allowed" });

  await expect(plusOne).toBeEnabled();
  await expect(children).toBeEnabled();

  await event2.uncheck();
  await expect(plusOne).toBeDisabled();
  await expect(children).toBeDisabled();

  await event2.check();
  await expect(plusOne).toBeEnabled();
  await expect(children).toBeEnabled();
});

test("applies opacity-40 to labels when Event Two unchecked", async ({
  mount,
}) => {
  const component = await mount(
    <EventCheckboxes initialEvent2Invited={false} />,
  );

  const plusOneLabel = component
    .getByRole("checkbox", { name: "Event Two: plus one allowed" })
    .locator("..");
  const childrenLabel = component
    .getByRole("checkbox", { name: "Event Two: children allowed" })
    .locator("..");

  await expect(plusOneLabel).toHaveClass(/opacity-40/);
  await expect(childrenLabel).toHaveClass(/opacity-40/);
});

test("removes opacity-40 from labels when Event Two checked", async ({
  mount,
}) => {
  const component = await mount(
    <EventCheckboxes initialEvent2Invited={true} />,
  );

  const plusOneLabel = component
    .getByRole("checkbox", { name: "Event Two: plus one allowed" })
    .locator("..");

  await expect(plusOneLabel).not.toHaveClass(/opacity-40/);
});
