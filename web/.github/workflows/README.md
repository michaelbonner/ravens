# GitHub Actions Workflows

This directory contains automated CI/CD workflows for the RAVENS project.

## Workflows

### 1. CI Workflow (`ci.yml`)

**Triggers:**
- Push to `master` or `main` branches
- Pull requests to `master` or `main` branches

**Jobs:**

#### Lint
- Runs ESLint to check code quality
- Fast feedback on code style issues

#### Test (Matrix Strategy)
- Runs Playwright tests across 3 browsers in parallel:
  - Chromium (Chrome/Edge)
  - Firefox
  - WebKit (Safari)
- Each browser runs independently
- Uploads test artifacts only on failure

#### Test Mobile
- Runs mobile-specific tests:
  - Mobile Chrome (Pixel 5 emulation)
  - Mobile Safari (iPhone 12 emulation)
- Tests responsive design and mobile interactions

**Benefits:**
- Comprehensive cross-browser testing
- Parallel execution for faster results
- Separate mobile testing job

### 2. Quick Test Workflow (`playwright.yml`)

**Triggers:**
- Push to feature branches (not master/main)
- Pull request events (opened, synchronized, reopened)

**Jobs:**

#### Quick Test
- Runs Chromium tests only for fast feedback
- Shorter timeout (30 minutes vs 60 minutes)
- Uploads artifacts only on failure
- 7-day retention instead of 30 days

**Benefits:**
- Faster CI feedback for development
- Reduced CI minutes usage
- Good for rapid iteration

## Configuration

### Node.js Version
All workflows use Node.js 18 (LTS) for stability and compatibility with the OpenSSL legacy provider.

### Caching
- NPM dependencies are cached using `actions/setup-node@v4`
- Speeds up subsequent workflow runs

### Test Artifacts

Artifacts are automatically uploaded on test failures:

1. **Playwright Report** (`playwright-report/`)
   - HTML report with test results
   - Screenshots and videos of failures
   - Detailed test execution logs

2. **Test Results** (`test-results/`)
   - Raw test output
   - Traces for debugging
   - Screenshots of failed tests

### Artifact Retention
- CI workflow: 30 days
- Quick test workflow: 7 days

## Viewing Test Results

### In GitHub Actions UI

1. Navigate to the **Actions** tab in your repository
2. Click on a workflow run
3. View job logs and test summaries
4. Download artifacts from failed jobs

### Local Debugging

If tests fail in CI:

1. Download the artifacts from the workflow run
2. Extract the `playwright-report` folder
3. Open `index.html` in your browser
4. View detailed traces and screenshots

Or use the Playwright trace viewer:

```bash
npx playwright show-trace path/to/trace.zip
```

## Best Practices

### For Feature Branches

- Quick test workflow runs automatically
- Only Chromium tests for speed
- Fix any failures before merging

### For Main Branches

- Full CI workflow runs with all browsers
- Mobile tests included
- All tests must pass before deployment

### Optimizing CI Time

The current setup is optimized for:
- **Parallel execution**: Browser tests run simultaneously
- **Selective installation**: Only required browsers are installed
- **Conditional artifacts**: Uploaded only on failure
- **Smart caching**: Dependencies cached between runs

## Troubleshooting

### Tests Pass Locally But Fail in CI

1. Check Node.js version matches (18)
2. Verify environment variables are set
3. Review CI logs for specific errors
4. Download artifacts to debug

### Timeout Issues

- Default timeout: 60 minutes (CI), 30 minutes (quick)
- Individual test timeout: 30 seconds
- Navigation timeout: 30 seconds
- Increase if needed in `playwright.config.js`

### Flaky Tests

If tests are flaky in CI:
- They already retry 2x in CI (configured in `playwright.config.js`)
- Check for timing issues
- Add explicit waits for async operations
- Review screenshots from failures

## Customization

### Running Specific Tests

Modify the workflow to run specific tests:

```yaml
- name: Run specific tests
  run: npm test -- tests/home.spec.js
```

### Adding New Browsers

Add to the matrix in `ci.yml`:

```yaml
matrix:
  browser: [chromium, firefox, webkit, msedge]
```

### Changing Node Version

Update in all workflows:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # Change here
```

## Cost Optimization

Current setup minimizes CI minutes:
- Quick tests on feature branches (Chromium only)
- Full tests only on main branches
- Parallel execution reduces wall time
- Artifacts only on failure

Estimated CI time per run:
- Quick test: ~5-10 minutes
- Full CI: ~15-20 minutes (parallel)
