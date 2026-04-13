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

  const recoverLink = page.getByRole("link", {
    name: "Einladungslink finden",
  });
  const adminLink = page.getByRole("link", { name: "Admin" });

  await expect(recoverLink).toBeVisible();
  await expect(adminLink).toBeVisible();
  await expect(recoverLink).toHaveCSS("background-color", "rgb(107, 124, 94)");
  await expect(recoverLink).toHaveCSS("color", "rgb(255, 253, 248)");
});
