import { expect, test } from "@playwright/experimental-ct-react";

import { TouchTargetHarness } from "./fixtures/touch-target-harness";

test.describe("global touch-action on interactive elements", () => {
  test("all buttons have touch-action manipulation", async ({ mount }) => {
    const component = await mount(<TouchTargetHarness />);

    const buttons = component.locator("button");
    for (const button of await buttons.all()) {
      await expect(button).toHaveCSS("touch-action", "manipulation");
    }
  });

  test("links have touch-action manipulation", async ({ mount }) => {
    const component = await mount(<TouchTargetHarness />);

    const link = component.locator("a");
    await expect(link).toHaveCSS("touch-action", "manipulation");
  });
});
