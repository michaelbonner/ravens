const { test, expect } = require("@playwright/test");

test("service detail has content and related services", async ({ page }) => {
  await page.goto("/services");
  await page.locator(".service-card").first().click();
  await expect(page.locator(".site-hero h1")).toBeVisible();
  await expect(page.locator(".service-detail")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Other services" })
  ).toBeVisible();
  await expect(
    page.locator(".related-services .service-card").first()
  ).toBeVisible();
});

test("unknown service returns 404", async ({ page }) => {
  const response = await page.goto("/service/non-existent-service-slug-12345");
  expect(response.status()).toBe(404);
  await expect(page).toHaveTitle(/404/);
});
