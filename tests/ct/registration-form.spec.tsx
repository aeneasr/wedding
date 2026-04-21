import { expect, test } from "@playwright/experimental-ct-react";

import { RegistrationFormHarness } from "./fixtures/registration-form-harness";

/**
 * Tests for RegistrationForm behaviour.
 *
 * We mount `RegistrationFormHarness` rather than the real `RegistrationForm`
 * component because `RegistrationForm` calls `useActionState(registerGuestAction, …)`
 * and `registerGuestAction` is a Next.js server action that imports
 * `next/headers`, `next/navigation`, Node `crypto`, and a database driver —
 * none of which are available in the Vite-based CT environment.
 * The harness replicates all client-side UI logic faithfully.
 */

test.describe("RegistrationForm", () => {
  test("shows the gate step by default", async ({ mount }) => {
    const component = await mount(<RegistrationFormHarness />);
    await expect(component.getByLabel("Einladungs-Passwort")).toBeVisible();
    // Before the gate is cleared, the post-gate form is not rendered at all.
    // Use toHaveCount(0) because the element is absent from the DOM entirely.
    await expect(component.getByLabel("Vollständiger Name")).toHaveCount(0);
  });

  test("reveals the form after continue", async ({ mount }) => {
    const component = await mount(<RegistrationFormHarness />);
    await component
      .getByLabel("Einladungs-Passwort")
      .fill("irrelevant-client-side");
    await component.getByRole("button", { name: "Weiter" }).click();
    await expect(component.getByLabel("Vollständiger Name").first()).toBeVisible();
  });

  test("can add and remove additional people up to the cap", async ({
    mount,
  }) => {
    const component = await mount(<RegistrationFormHarness />);
    await component.getByLabel("Einladungs-Passwort").fill("x");
    await component.getByRole("button", { name: "Weiter" }).click();

    const addBtn = component.getByRole("button", {
      name: "Weitere Person hinzufügen",
    });
    await addBtn.click();
    await expect(
      component.getByRole("button", { name: "Entfernen" }).first(),
    ).toBeVisible();

    // Repeatedly add until cap (maxHouseholdMembers = 10; primary + 9 additional)
    for (let i = 0; i < 8; i += 1) {
      if (await addBtn.isVisible()) await addBtn.click();
    }
    // At cap, the "add person" button is removed from the DOM by the ternary.
    // Use toHaveCount(0) because the element is absent, not just invisible.
    await expect(addBtn).toHaveCount(0);
  });

  test("renders the post-gate form immediately when initialCode is provided", async ({
    mount,
  }) => {
    const component = await mount(
      <RegistrationFormHarness initialCode="anna+aeneas" />,
    );
    // Gate input must be gone — we skipped straight past it.
    await expect(
      component.getByLabel("Einladungs-Passwort"),
    ).toHaveCount(0);
    // Post-gate form is visible.
    await expect(
      component.getByLabel("Vollständiger Name").first(),
    ).toBeVisible();
  });
});
