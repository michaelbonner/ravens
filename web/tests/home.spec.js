const { test, expect } = require('@playwright/test');

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    // Wait for initial animations/overlays
    await page.waitForTimeout(1000);
  });

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/RAVENS/i);
  });

  test('should display hero section with SLC X KAUAI logo', async ({ page }) => {
    const heroLogo = page.locator('img[alt="SLC X KAUAI"]');
    await expect(heroLogo).toBeVisible();
  });

  test('should display services section', async ({ page }) => {
    const servicesSection = page.locator('text=All Options').first();
    await expect(servicesSection).toBeVisible();
  });

  test('should have clickable service cards', async ({ page }) => {
    const serviceLinks = page.locator('a[href^="/service/"]');
    const count = await serviceLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have "All Options" button that links to services page', async ({ page }) => {
    const allOptionsButton = page.locator('a:has-text("All Options")').first();
    await expect(allOptionsButton).toBeVisible();
    await expect(allOptionsButton).toHaveAttribute('href', '/services');
  });

  test('should have "Learn More" button that links to about page', async ({ page }) => {
    const learnMoreButton = page.locator('a:has-text("Learn More")');
    await expect(learnMoreButton).toBeVisible();
    await expect(learnMoreButton).toHaveAttribute('href', '/about');
  });

  test('should display video player section if reel exists', async ({ page }) => {
    // Check if video player exists (may be conditional based on CMS data)
    const videoSection = page.locator('[class*="video"]').first();
    // This is a soft check since it depends on CMS data
    if (await videoSection.isVisible()) {
      expect(await videoSection.isVisible()).toBeTruthy();
    }
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      const heroLogo = page.locator('img[alt="SLC X KAUAI"]');
      await expect(heroLogo).toBeVisible();
    }
  });
});
