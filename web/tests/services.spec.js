const { test, expect } = require("@playwright/test");

test("services list links to service details", async ({ page }) => {
  await page.goto("/services");
  await expect(
    page.getByRole("heading", { name: "Services", level: 1 })
  ).toBeVisible();
  const card = page.locator(".service-card").first();
  await expect(card.locator("h3")).toBeVisible();
  await expect(card.locator("img")).toBeVisible();
  await card.click();
  await expect(page).toHaveURL(/\/service\//);
  await expect(page.locator(".service-detail")).toBeVisible();
});
