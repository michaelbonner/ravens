# Playwright Tests

This directory contains end-to-end tests for the RAVENS website using Playwright.

## Test Coverage

The test suite covers:

- **Home Page** (`home.spec.js`) - Hero section, services grid, navigation links
- **About Page** (`about.spec.js`) - Team members, locations, page structure
- **Services Page** (`services.spec.js`) - Service cards, grid layout, navigation
- **Service Detail Pages** (`service-detail.spec.js`) - Individual service pages with related services
- **Work Page** (`work.spec.js`) - Work items grid, navigation
- **Work Detail Pages** (`work-detail.spec.js`) - Individual project pages with credits, frames, and behind-the-scenes
- **Contact Page** (`contact.spec.js`) - Contact form, validation, submission
- **404 Page** (`404.spec.js`) - Not found page handling

## Running Tests

### Prerequisites

Before running tests, make sure Playwright browsers are installed:

```bash
npx playwright install
```

### Available Commands

```bash
# Run all tests (headless mode)
bun run test

# Run tests with browser UI visible
bun run test:headed

# Run tests with Playwright UI mode (interactive)
bun run test:ui

# Run tests in specific browsers
bun run test:chromium
bun run test:firefox
bun run test:webkit

# Run mobile tests only
bun run test:mobile

# Run tests in debug mode
bun run test:debug

# View test report
bun run test:report
```

## Test Configuration

The tests are configured in `playwright.config.js` with:

- Base URL: `http://localhost:3000`
- Multiple browser projects: Chromium, Firefox, WebKit
- Mobile device emulation: Pixel 5, iPhone 12
- Automatic dev server startup before tests
- Screenshot on failure
- Trace on first retry

## Writing New Tests

When adding new tests:

1. Create a new `.spec.js` file in the `tests/` directory
2. Follow the existing test structure
3. Use descriptive test names
4. Include mobile responsiveness tests when applicable
5. Handle CMS-dependent content gracefully with conditional checks

## Continuous Integration

The project includes GitHub Actions workflows for automated testing:

### CI Workflow (`.github/workflows/ci.yml`)

Runs on pushes to `master`/`main` branches and pull requests:

- **Lint Job**: Runs ESLint checks
- **Test Jobs**: Runs tests in parallel across browsers (Chromium, Firefox, WebKit)
- **Mobile Test Job**: Runs mobile-specific tests (iOS Safari, Android Chrome)

### Quick Test Workflow (`.github/workflows/playwright.yml`)

Runs on feature branch pushes and PRs:

- Quick smoke tests using Chromium only
- Faster feedback for development branches
- Uploads artifacts only on failure

### Viewing CI Results

1. Go to the Actions tab in your GitHub repository
2. Click on a workflow run to see details
3. Failed tests will have artifacts (screenshots, traces, reports) attached
4. Download artifacts to debug failed tests locally

## Notes

- Tests automatically start the development server before running
- Some tests include conditional checks for CMS-dependent content
- Mobile tests run on both Chrome and Safari emulation
- Failed tests automatically capture screenshots and traces
- CI uses Node.js 18 with OpenSSL legacy provider for compatibility
