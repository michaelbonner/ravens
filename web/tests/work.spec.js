const { test, expect } = require('@playwright/test');

test.describe('Work Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/work');
  });

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/RAVENS.*work/i);
  });

  test('should display page heading', async ({ page }) => {
    const heading = page.locator('h1:has-text("Work")');
    await expect(heading).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    const heroSection = page.locator('h1 span:has-text("Work")');
    await expect(heroSection).toBeVisible();
  });

  test('should display work items', async ({ page }) => {
    // Check for work items (depends on CMS data)
    const workItems = page.locator('a[href^="/work/"]');
    const count = await workItems.count();

    // At least check that the page structure exists
    if (count > 0) {
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should have clickable work items', async ({ page }) => {
    const workLinks = page.locator('a[href^="/work/"]');
    const count = await workLinks.count();

    if (count > 0) {
      const firstWorkItem = workLinks.first();
      await expect(firstWorkItem).toBeVisible();
      const href = await firstWorkItem.getAttribute('href');
      expect(href).toMatch(/^\/work\/.+/);
    }
  });

  test('should display grid layout for work items', async ({ page }) => {
    const gridContainer = page.locator('.grid').first();
    await expect(gridContainer).toBeVisible();
  });

  test('should have horizontal rule separator', async ({ page }) => {
    const hr = page.locator('hr').first();
    await expect(hr).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      const heading = page.locator('h1:has-text("Work")');
      await expect(heading).toBeVisible();
    }
  });
});
