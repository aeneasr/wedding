import { expect, test } from "./fixtures";

test("landing page presents the wedding invitation design", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("invitation-card")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "We're Getting Married!" }),
  ).toBeVisible();
  await expect(page.getByText("20.08.2026")).toBeVisible();
  await expect(page.getByText("22.08.2026")).toBeVisible();
  await expect(page.getByText("Aeneas & Anna")).toBeVisible();

  const recoverLink = page.getByRole("link", {
    name: "Recover my invitation link",
  });
  const adminLink = page.getByRole("link", { name: "Admin" });

  await expect(recoverLink).toBeVisible();
  await expect(adminLink).toBeVisible();
  await expect(recoverLink).toHaveCSS("background-color", "rgb(115, 131, 115)");
  await expect(recoverLink).toHaveCSS("color", "rgb(255, 253, 248)");
});
