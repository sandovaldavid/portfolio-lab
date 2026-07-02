# End-to-End Testing with Playwright

[info] This document explains how to write and run E2E tests using Playwright.

## Setup

### Installation

Playwright is already included in devDependencies. Install browsers:

```bash
pnpm exec playwright install
```

### Running Tests

```bash
# Run all E2E tests
pnpm test:e2e

# Run tests in UI mode (interactive)
pnpm test:e2e:ui

# Run tests in specific browser
pnpm exec playwright test --project=chromium

# Run specific test file
pnpm exec playwright test e2e/homepage.spec.ts

# Run tests matching pattern
pnpm exec playwright test --grep "should load"

# Debug mode (opens inspector)
pnpm exec playwright test --debug
```

## Writing Tests

### Basic Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('[info] should do something', async ({ page }) => {
    // Arrange
    const button = page.locator('button:has-text("Click")');

    // Act
    await button.click();

    // Assert
    await expect(page).toHaveURL('/expected-url');
  });
});
```

### Common Locators

```typescript
// By text
page.locator('button:has-text("Click me")');

// By role
page.locator('[role="button"]');

// By CSS selector
page.locator('.button-primary');

// By data-testid (recommended)
page.locator('[data-testid="submit-button"]');

// Combining
page.locator('form').locator('input[type="email"]');
```

### Assertions

```typescript
// URL checks
await expect(page).toHaveURL('/about');

// Content checks
await expect(page.locator('h1')).toHaveText('Welcome');

// Visibility
await expect(element).toBeVisible();
await expect(element).toBeHidden();

// State
await expect(button).toBeEnabled();
await expect(button).toBeDisabled();

// Count
await expect(page.locator('li')).toHaveCount(5);
```

### Waiting

```typescript
// Wait for element
await page.locator('.modal').waitFor({ state: 'visible' });

// Wait for navigation
await page.waitForURL('/expected-url');

// Wait for condition
await page.waitForFunction(() => window.myVar === true);

// Wait for timeout
await page.waitForTimeout(1000);
```

## Test Organization

### File Structure

```
e2e/
├── homepage.spec.ts        # Homepage tests
├── navigation.spec.ts      # Navigation flow tests
├── auth.spec.ts            # Authentication tests
└── performance.spec.ts     # Performance tests
```

### Naming Convention

[info] Use descriptive test names:

```typescript
// Good
test('[info] should load homepage and display projects');

// Avoid
test('test 1');
test('it works');
```

## Best Practices

### 1. Use Data-Testid

Add `data-testid` to elements in templates for reliable selection:

```html
<button data-testid="submit-button">Submit</button>
```

```typescript
await page.locator('[data-testid="submit-button"]').click();
```

### 2. Avoid Hard Waits

```typescript
// Bad
await page.waitForTimeout(1000);

// Good
await page.locator('.success-message').waitFor();
```

### 3. Use Page Objects

```typescript
class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.locator('[data-testid="email"]').fill(email);
    await this.page.locator('[data-testid="password"]').fill(password);
    await this.page.locator('button:has-text("Login")').click();
  }
}

test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password');
});
```

### 4. Test Accessibility

```typescript
test('[info] should be keyboard navigable', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('a[href="/about"]')).toBeFocused();
});
```

### 5. Mobile Testing

Tests automatically run on mobile devices:

```typescript
test('should work on mobile', async ({ page }) => {
  // This runs on Pixel 5 and iPhone 12 automatically
  await page.goto('/');
  const menu = page.locator('[role="navigation"]');
  await expect(menu).toBeVisible();
});
```

## CI/CD Integration

[info] Tests run automatically on:

- **Pull Requests**: to main/develop branches
- **Schedule**: Weekly (Sunday 2 AM UTC)

### Viewing Results

1. **Locally**: Reports open automatically after test run
2. **GitHub**: Artifacts uploaded to workflow runs (`playwright-report`)
   - https://github.com/sandovaldavid/portfolio/actions

## Debugging

### UI Mode

Most visual way to debug tests:

```bash
pnpm test:e2e:ui
```

### Debug Mode

Opens inspector to step through tests:

```bash
pnpm exec playwright test --debug
```

### Headed Mode

See browser during test execution:

```bash
pnpm exec playwright test --headed
```

### Screenshots & Videos

Automatically captured on failure:

```bash
# Enable always
pnpm exec playwright test --screenshot=on

# Keep videos
pnpm exec playwright test --video=on
```

## Troubleshooting

### Tests fail locally but pass in CI

[warning] Common causes:

- Timing issues: Use waitFor instead of hard waits
- Responsive design: Test on multiple viewports
- Network: Mock API calls if needed

### Flaky Tests

[warning] Make them reliable:

```typescript
// Wait for specific state instead of timeout
await page.locator('.spinner').waitFor({ state: 'hidden' });

// Retry specific actions
await page.locator('button').click({ timeout: 10000 });
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
