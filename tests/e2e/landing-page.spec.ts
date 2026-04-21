import { expect, test } from "./fixtures";

test("landing page presents the wedding invitation design", async ({ page }) => {
  await page.goto("/");

  const invitationCard = page.getByTestId("invitation-card");
  await expect(invitationCard).toBeVisible();
  await expect(
    invitationCard.getByRole("img", {
      name: /Hochzeitseinladung für Anna und Aeneas/i,
    }),
  ).toBeVisible();

  // Landing page now embeds the registration gate directly.
  await expect(page.getByLabel("Einladungs-Passwort")).toBeVisible();
  await expect(page.getByRole("button", { name: "Weiter" })).toBeVisible();

  const recoverLink = page.getByRole("link", {
    name: "Bereits angemeldet? Änderungen vornehmen",
  });
  await expect(recoverLink).toBeVisible();
  await expect(recoverLink).toHaveAttribute("href", "/recover");
});
