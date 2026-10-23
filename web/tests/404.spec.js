const { test, expect } = require("@playwright/test");

test("unknown page shows the site 404", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist-12345");
  expect(response.status()).toBe(404);
  await expect(page).toHaveTitle(/404.*RAVENS/i);
  await expect(
    page.getByRole("heading", { name: "Nothing here." })
  ).toBeVisible();
  await expect(
    page.getByText("The page you are looking for could not be found.")
  ).toBeVisible();
});
