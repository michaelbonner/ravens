const { test, expect } = require('@playwright/test');

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact.*RAVENS/i);
  });

  test('should display page heading', async ({ page }) => {
    // Wait for the h1 to be visible and loaded
    const heading = page.locator('h1').first();
    await heading.waitFor({ state: 'visible', timeout: 10000 });

    // Check if heading contains any text (CMS-dependent)
    const headingText = await heading.textContent();
    expect(headingText?.length).toBeGreaterThan(0);
  });

  test('should display contact form', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('should have all form fields', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="emailAddress"]');
    const phoneInput = page.locator('input[name="phoneNumber"]');
    const messageInput = page.locator('textarea[name="message"]');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(phoneInput).toBeVisible();
    await expect(messageInput).toBeVisible();
  });

  test('should have placeholders in form fields', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="emailAddress"]');
    const phoneInput = page.locator('input[name="phoneNumber"]');
    const messageInput = page.locator('textarea[name="message"]');

    await expect(nameInput).toHaveAttribute('placeholder', 'Full Name');
    await expect(emailInput).toHaveAttribute('placeholder', 'Email Address');
    await expect(phoneInput).toHaveAttribute('placeholder', 'Phone Number');
    await expect(messageInput).toHaveAttribute('placeholder', 'Message');
  });

  test('should have submit button', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toContainText('Submit');
  });

  test('form should validate required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');

    // Initially the form should have disabled button (no valid input)
    // Or it should be enabled but with opacity indicating invalid state
    const buttonClass = await submitButton.getAttribute('class');

    // Check if button has opacity-50 class (invalid state) or is disabled
    const hasOpacity = buttonClass?.includes('opacity-50');
    const isDisabled = await submitButton.isDisabled();

    // At least one should be true
    expect(hasOpacity || isDisabled).toBeTruthy();
  });

  test('form should validate email format', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="emailAddress"]');
    const phoneInput = page.locator('input[name="phoneNumber"]');
    const messageInput = page.locator('textarea[name="message"]');
    const submitButton = page.locator('button[type="submit"]');

    // Fill form with invalid email
    await nameInput.fill('John Doe');
    await emailInput.fill('invalid-email');
    await phoneInput.fill('1234567890');
    await messageInput.fill('Test message');

    // Try to submit
    await submitButton.click();

    // Wait for validation
    await page.waitForTimeout(500);

    // Should show error or keep button disabled
    const errorMessage = page.locator('text=/Invalid email/i');
    if (await errorMessage.isVisible()) {
      await expect(errorMessage).toBeVisible();
    } else {
      const isDisabled = await submitButton.isDisabled();
      expect(isDisabled).toBeTruthy();
    }
  });

  test('should accept valid form input', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="emailAddress"]');
    const phoneInput = page.locator('input[name="phoneNumber"]');
    const messageInput = page.locator('textarea[name="message"]');

    // Fill form with valid data
    await nameInput.fill('John Doe');
    await emailInput.fill('john.doe@example.com');
    await phoneInput.fill('+1 (555) 123-4567');
    await messageInput.fill('This is a test message for the contact form.');

    // Check that inputs have values
    await expect(nameInput).toHaveValue('John Doe');
    await expect(emailInput).toHaveValue('john.doe@example.com');
    await expect(phoneInput).toHaveValue('+1 (555) 123-4567');
    await expect(messageInput).toHaveValue('This is a test message for the contact form.');
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      const heading = page.locator('h1').first();
      await heading.waitFor({ state: 'visible', timeout: 10000 });

      const headingText = await heading.textContent();
      expect(headingText?.length).toBeGreaterThan(0);

      const form = page.locator('form');
      await expect(form).toBeVisible();
    }
  });
});
