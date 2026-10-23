const { test, expect } = require("@playwright/test");

test("project detail contains media and adjacent work", async ({ page }) => {
  await page.goto("/work");
  await page.locator(".work-tile").first().click();
  await expect(page.locator(".project-heading h1")).toBeVisible();
  await expect(
    page.locator('.project-detail [class*="aspect-"]').first()
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Other Work" })).toBeVisible();
  await expect(
    page.locator(".project-detail .work-tile").first()
  ).toBeVisible();
});

test("unknown project returns 404", async ({ page }) => {
  const response = await page.goto("/work/non-existent-work-slug-12345");
  expect(response.status()).toBe(404);
  await expect(page).toHaveTitle(/404/);
});
