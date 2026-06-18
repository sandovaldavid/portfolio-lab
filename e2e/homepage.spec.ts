import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('[info] should load homepage successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/Portfolio|devsandoval/i);
	});

	test('[info] should display main content', async ({ page }) => {
		const main = page.locator('main');
		await expect(main).toBeVisible();
	});

	test('[info] should have navigation menu', async ({ page }) => {
		const nav = page.locator('nav, [role="navigation"]');
		await expect(nav).toBeVisible();
	});

	test('[info] should have footer', async ({ page }) => {
		const footer = page.locator('footer');
		await expect(footer).toBeVisible();
	});
});
