const { test, expect } = require("@playwright/test");

test.use({ viewport: { width: 1366, height: 768 } });

test("hero video covers the hero at laptop sizes", async ({ page }) => {
  await page.goto("/");
  await page.locator(".site-hero-video iframe").waitFor({ state: "attached" });

  await page.locator(".site-hero-video").evaluate((element) => {
    element.style.setProperty("--hero-video-aspect", "2.4");
    element.style.setProperty("--hero-video-inverse-aspect", String(1 / 2.4));
  });

  const dimensions = await page.evaluate(() => {
    const hero = document.querySelector(".site-hero").getBoundingClientRect();
    const iframe = document
      .querySelector(".site-hero-video iframe")
      .getBoundingClientRect();
    return { hero, iframe };
  });

  expect(dimensions.iframe.width).toBeGreaterThanOrEqual(dimensions.hero.width);
  expect(dimensions.iframe.height).toBeGreaterThanOrEqual(
    dimensions.hero.height
  );
  expect(dimensions.iframe.width / dimensions.iframe.height).toBeCloseTo(
    2.4,
    1
  );
});
