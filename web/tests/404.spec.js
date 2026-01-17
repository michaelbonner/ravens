const { test, expect } = require('@playwright/test');

test.describe('404 Page', () => {
  test('should display 404 page for non-existent routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist-12345');

    // Should load 404 page
    await expect(page).toHaveTitle(/404.*RAVENS/i);
  });

  test('should display 404 heading', async ({ page }) => {
    await page.goto('/non-existent-page');

    const heading = page.locator('h1');
    await expect(heading).toContainText('404');
    await expect(heading).toContainText('Not Found');
  });

  test('should display 404 message', async ({ page }) => {
    await page.goto('/non-existent-page');

    // Check that message exists in DOM (may be hidden on mobile due to viewport/CSS)
    const message = page.locator('p:has-text("could not be found")');
    await expect(message).toBeAttached();

    // Verify the text content
    const messageText = await message.textContent();
    expect(messageText).toContain('could not be found');
  });

  test('should have proper styling for 404 heading', async ({ page }) => {
    await page.goto('/non-existent-page');

    const heading = page.locator('h1');
    const classList = await heading.getAttribute('class');
    expect(classList).toContain('text-gold');
    expect(classList).toContain('border-gold');
  });

  test('should be contained in proper layout', async ({ page }) => {
    await page.goto('/non-existent-page');

    // Check for container div with proper classes
    const container = page.locator('div.container.mx-auto.text-center').first();
    await container.waitFor({ state: 'attached', timeout: 10000 });
    await expect(container).toBeAttached();
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto('/non-existent-page');

      const heading = page.locator('h1');
      await expect(heading).toBeAttached();
      await expect(heading).toContainText('404');

      const message = page.locator('p:has-text("could not be found")');
      await expect(message).toBeAttached();
    }
  });
});
