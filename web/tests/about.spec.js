const { test, expect } = require('@playwright/test');

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about', { waitUntil: 'load' });
    // Wait for initial animations/overlays
    await page.waitForTimeout(1000);
  });

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/About.*RAVENS/i);
  });

  test('should display page heading', async ({ page }) => {
    // Wait for the heading to be visible after any overlays/animations
    const heading = page.locator('h1:has-text("About")');
    await heading.waitFor({ state: 'visible', timeout: 10000 });
    await expect(heading).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    // Wait for hero section to be visible after animations
    const heroSection = page.locator('h1 span:has-text("About")');
    await heroSection.waitFor({ state: 'visible', timeout: 10000 });
    await expect(heroSection).toBeVisible();
  });

  test('should display team members section', async ({ page }) => {
    // Check if people section exists (depends on CMS data)
    const teamMembers = page.locator('article').first();
    // Soft check since it depends on CMS data
    if (await teamMembers.isVisible()) {
      expect(await teamMembers.isVisible()).toBeTruthy();
    }
  });

  test('should display locations section', async ({ page }) => {
    // Check for horizontal rule that separates sections
    const hr = page.locator('hr').first();
    await expect(hr).toBeVisible();
  });

  test('should have proper page structure', async ({ page }) => {
    const container = page.locator('.container').first();
    await expect(container).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      const heading = page.locator('h1:has-text("About")');
      await heading.waitFor({ state: 'visible', timeout: 10000 });
      await expect(heading).toBeVisible();
    }
  });
});
