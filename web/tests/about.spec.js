const { test, expect } = require("@playwright/test");

test("about page presents the crew and locations", async ({ page }) => {
  await page.goto("/about");
  await expect(
    page.getByRole("heading", { name: "About", level: 1 })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "People behind the shot." })
  ).toBeVisible();
  await expect(page.locator(".people-grid article").first()).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Based here. Ready anywhere." })
  ).toBeVisible();
});
