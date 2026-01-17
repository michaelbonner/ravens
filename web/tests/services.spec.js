const { test, expect } = require('@playwright/test');

test.describe('Services Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/services');
  });

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Services.*RAVENS/i);
  });

  test('should display page heading', async ({ page }) => {
    const heading = page.locator('h1:has-text("Services")');
    await expect(heading).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    const heroSection = page.locator('h1 span:has-text("Services")');
    await expect(heroSection).toBeVisible();
  });

  test('should display service cards', async ({ page }) => {
    const serviceCards = page.locator('a[href^="/service/"]');
    const count = await serviceCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have service cards with titles', async ({ page }) => {
    const serviceTitles = page.locator('h3.text-2xl');
    const count = await serviceTitles.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have service cards with images', async ({ page }) => {
    const serviceImages = page.locator('a[href^="/service/"] img');
    const count = await serviceImages.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have clickable service cards', async ({ page }) => {
    const firstServiceCard = page.locator('a[href^="/service/"]').first();
    await expect(firstServiceCard).toBeVisible();
    const href = await firstServiceCard.getAttribute('href');
    expect(href).toMatch(/^\/service\/.+/);
  });

  test('service cards should have hover effects', async ({ page }) => {
    const firstServiceCard = page.locator('a[href^="/service/"]').first();
    await expect(firstServiceCard).toHaveClass(/border-gold/);
  });

  test('should display grid layout for services', async ({ page }) => {
    const gridContainer = page.locator('.grid');
    await expect(gridContainer).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      const heading = page.locator('h1:has-text("Services")');
      await expect(heading).toBeVisible();

      const serviceCards = page.locator('a[href^="/service/"]');
      const count = await serviceCards.count();
      expect(count).toBeGreaterThan(0);
    }
  });
});
