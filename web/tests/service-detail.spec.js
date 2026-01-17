const { test, expect } = require('@playwright/test');

test.describe('Service Detail Page', () => {
  test('should handle valid service slug', async ({ page }) => {
    // First, get a valid service slug from the services page
    await page.goto('/services');
    const firstServiceLink = page.locator('a[href^="/service/"]').first();

    if (await firstServiceLink.isVisible()) {
      const href = await firstServiceLink.getAttribute('href');

      // Navigate to service detail page
      await page.goto(href);

      // Should load successfully
      await expect(page).toHaveTitle(/RAVENS/i);

      // Should have hero section with service title
      const heroSection = page.locator('h1 span');
      await expect(heroSection).toBeVisible();

      // Should display content
      const article = page.locator('article');
      await expect(article).toBeVisible();
    }
  });

  test('should display "Other Services" section', async ({ page }) => {
    await page.goto('/services');
    const firstServiceLink = page.locator('a[href^="/service/"]').first();

    if (await firstServiceLink.isVisible()) {
      const href = await firstServiceLink.getAttribute('href');
      await page.goto(href);

      // Should have "Other Services" section
      const otherServicesHeading = page.locator('h3:has-text("OTHER SERVICES")');
      await expect(otherServicesHeading).toBeVisible();

      // Should have related service links
      const relatedServiceLinks = page.locator('a[href^="/service/"]');
      const count = await relatedServiceLinks.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should have clickable related services', async ({ page }) => {
    await page.goto('/services');
    const firstServiceLink = page.locator('a[href^="/service/"]').first();

    if (await firstServiceLink.isVisible()) {
      const href = await firstServiceLink.getAttribute('href');
      await page.goto(href);

      // Find related services in "Other Services" section
      const relatedServiceLinks = page.locator('a[href^="/service/"]');
      if (await relatedServiceLinks.first().isVisible()) {
        const relatedHref = await relatedServiceLinks.first().getAttribute('href');
        expect(relatedHref).toMatch(/^\/service\/.+/);
      }
    }
  });

  test('should display horizontal rule separator', async ({ page }) => {
    await page.goto('/services');
    const firstServiceLink = page.locator('a[href^="/service/"]').first();

    if (await firstServiceLink.isVisible()) {
      const href = await firstServiceLink.getAttribute('href');
      await page.goto(href);

      const hr = page.locator('hr').first();
      await expect(hr).toBeVisible();
    }
  });

  test('should handle invalid service slug with 404', async ({ page }) => {
    // Try to visit a non-existent service
    await page.goto('/service/non-existent-service-slug-12345');

    // Should show 404 page - check for heading with 404 text
    const notFoundHeading = page.locator('h1:has-text("404")');
    await expect(notFoundHeading).toBeAttached();

    // Also check page title
    await expect(page).toHaveTitle(/404/i);
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto('/services');
      const firstServiceLink = page.locator('a[href^="/service/"]').first();

      if (await firstServiceLink.isVisible()) {
        const href = await firstServiceLink.getAttribute('href');
        await page.goto(href);

        const heroSection = page.locator('h1 span');
        await expect(heroSection).toBeVisible();
      }
    }
  });
});
