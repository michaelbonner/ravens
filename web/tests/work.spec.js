const { test, expect } = require("@playwright/test");

test("work gallery links to project details", async ({ page }) => {
  await page.goto("/work");
  await expect(
    page.getByRole("heading", { name: "Work", level: 1 })
  ).toBeVisible();
  const tile = page.locator(".work-tile").first();
  await expect(tile.locator("img")).toBeVisible();
  await tile.click();
  await expect(page).toHaveURL(/\/work\//);
  await expect(page.locator(".project-detail")).toBeVisible();
});
