const { test, expect } = require("@playwright/test");

test("contact form is labeled and validates required fields", async ({
  page,
}) => {
  await page.goto("/contact");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Full name" })).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Email address" })
  ).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Phone number" })
  ).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Your project" })
  ).toBeVisible();
  await page.getByRole("button", { name: /Send message/ }).click();
  await expect(page.getByText("Full name is required")).toBeVisible();
});
