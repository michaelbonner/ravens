const { test, expect } = require("@playwright/test");

test("project poster stays visible while Vimeo is loading", async ({
  page,
}) => {
  await page.clock.install();
  await page.route("**/player.vimeo.com/**", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 30000));
    await route.abort();
  });

  await page.goto("/work/all-the-flavor", { waitUntil: "domcontentloaded" });

  const poster = page.getByRole("img", {
    name: /all the flavor video poster/i,
  });
  await expect(poster).toBeVisible();
  await expect
    .poll(() =>
      poster.evaluate((image) => image.complete && image.naturalWidth > 0)
    )
    .toBe(true);
  await expect(page.getByText("Loading video")).toBeVisible();

  await page.clock.fastForward(16000);
  await expect(page.getByText("Still loading video")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Watch on Vimeo" })
  ).toBeVisible();
});
