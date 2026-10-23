const { test, expect } = require("@playwright/test");

test("home introduces the work and services", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Special film tactics." })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Explore our work/ })
  ).toHaveAttribute("href", "/work");
  await expect(page.locator(".service-card").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /All options/ })).toHaveAttribute(
    "href",
    "/services"
  );
});

test("mobile navigation opens and navigates", async ({ page, isMobile }) => {
  test.skip(!isMobile);
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open menu" });
  await menu.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" })
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Contact" })
    .click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
