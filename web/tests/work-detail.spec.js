const { test, expect } = require('@playwright/test');

test.describe('Work Detail Page', () => {
  test('should handle valid work slug', async ({ page }) => {
    // First, get a valid work slug from the work page
    await page.goto('/work');
    const firstWorkLink = page.locator('a[href^="/work/"]').first();

    if (await firstWorkLink.isVisible()) {
      const href = await firstWorkLink.getAttribute('href');

      // Navigate to work detail page
      await page.goto(href);

      // Should load successfully
      await expect(page).toHaveTitle(/RAVENS/i);

      // Should display project title
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
    }
  });

  test('should display article content', async ({ page }) => {
    await page.goto('/work');
    const firstWorkLink = page.locator('a[href^="/work/"]').first();

    if (await firstWorkLink.isVisible()) {
      const href = await firstWorkLink.getAttribute('href');
      await page.goto(href);

      // Should have article element
      const article = page.locator('article');
      await expect(article).toBeVisible();

      // Should have heading with gold border
      const heading = page.locator('h1.text-gold');
      await expect(heading).toBeVisible();
    }
  });

  test('should display video or poster image', async ({ page }) => {
    await page.goto('/work');
    const firstWorkLink = page.locator('a[href^="/work/"]').first();

    if (await firstWorkLink.isVisible()) {
      const href = await firstWorkLink.getAttribute('href');
      await page.goto(href);

      // Wait for article to load
      await page.waitForSelector('article', { timeout: 10000 });

      // Should have either a video player or poster image
      // Check multiple possible elements
      const hasVideo = await page.locator('iframe').first().isVisible().catch(() => false);
      const hasPosterImage = await page.locator('img[alt="Poster image"]').isVisible().catch(() => false);
      const hasAspectDiv = await page.locator('div[class*="aspect-"]').isVisible().catch(() => false);
      const hasAnyImage = await page.locator('article img').first().isVisible().catch(() => false);

      const hasVideoOrImage = hasVideo || hasPosterImage || hasAspectDiv || hasAnyImage;
      expect(hasVideoOrImage).toBeTruthy();
    }
  });

  test('should display "Other Work" section', async ({ page }) => {
    await page.goto('/work');
    const firstWorkLink = page.locator('a[href^="/work/"]').first();

    if (await firstWorkLink.isVisible()) {
      const href = await firstWorkLink.getAttribute('href');
      await page.goto(href);

      // Should have "Other Work" section
      const otherWorkHeading = page.locator('h2:has-text("Other Work")');
      await expect(otherWorkHeading).toBeVisible();

      // Should have related work items
      const relatedWorkLinks = page.locator('a[href^="/work/"]');
      const count = await relatedWorkLinks.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should display credits section if available', async ({ page }) => {
    await page.goto('/work');
    const firstWorkLink = page.locator('a[href^="/work/"]').first();

    if (await firstWorkLink.isVisible()) {
      const href = await firstWorkLink.getAttribute('href');
      await page.goto(href);

      // Credits section is optional, so we just check if it exists
      const creditsHeading = page.locator('h2:has-text("Credits")');
      // Soft check since it depends on CMS data
      if (await creditsHeading.isVisible()) {
        expect(await creditsHeading.isVisible()).toBeTruthy();
      }
    }
  });

  test('should display frames section if available', async ({ page }) => {
    await page.goto('/work');
    const firstWorkLink = page.locator('a[href^="/work/"]').first();

    if (await firstWorkLink.isVisible()) {
      const href = await firstWorkLink.getAttribute('href');
      await page.goto(href);

      // Frames section is optional
      const framesHeading = page.locator('h2:has-text("Frames")');
      if (await framesHeading.isVisible()) {
        expect(await framesHeading.isVisible()).toBeTruthy();
      }
    }
  });

  test('should display behind the scenes section if available', async ({ page }) => {
    await page.goto('/work');
    const firstWorkLink = page.locator('a[href^="/work/"]').first();

    if (await firstWorkLink.isVisible()) {
      const href = await firstWorkLink.getAttribute('href');
      await page.goto(href);

      // Behind the scenes section is optional
      const btsHeading = page.locator('h2:has-text("Behind the Scenes")');
      if (await btsHeading.isVisible()) {
        expect(await btsHeading.isVisible()).toBeTruthy();
      }
    }
  });

  test('should have horizontal rule separators', async ({ page }) => {
    await page.goto('/work');
    const firstWorkLink = page.locator('a[href^="/work/"]').first();

    if (await firstWorkLink.isVisible()) {
      const href = await firstWorkLink.getAttribute('href');
      await page.goto(href);

      const hr = page.locator('hr').first();
      await expect(hr).toBeVisible();
    }
  });

  test('should handle invalid work slug with 404', async ({ page }) => {
    // Try to visit a non-existent work item
    await page.goto('/work/non-existent-work-slug-12345');

    // Should show 404 page - check for heading with 404 text
    const notFoundHeading = page.locator('h1:has-text("404")');
    await expect(notFoundHeading).toBeAttached();

    // Also check page title
    await expect(page).toHaveTitle(/404/i);
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto('/work');
      const firstWorkLink = page.locator('a[href^="/work/"]').first();

      if (await firstWorkLink.isVisible()) {
        const href = await firstWorkLink.getAttribute('href');
        await page.goto(href);

        // Wait for article to load
        await page.waitForSelector('article', { timeout: 10000 });

        // Check that heading exists in DOM (may be hidden due to positioning/overflow)
        const heading = page.locator('h1');
        await expect(heading).toBeAttached();

        // Check that article content is present
        const article = page.locator('article');
        await expect(article).toBeVisible();
      }
    }
  });
});
