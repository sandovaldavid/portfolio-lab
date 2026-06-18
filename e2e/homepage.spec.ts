import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should load and display main sections', async ({ page }) => {
		await expect(page.locator('nav, header')).toBeVisible();
		await expect(page.locator('main, [role="main"]')).toBeVisible();
		await expect(page.locator('footer')).toBeVisible();
	});

	test('should have a valid page title', async ({ page }) => {
		const title = await page.title();
		expect(title.length).toBeGreaterThan(0);
	});

	test('accessibility: no critical violations on homepage', async ({ page }) => {
		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa'])
			.analyze();

		const critical = results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
		if (critical.length > 0) {
			console.error('[fail] Accessibility violations:');
			critical.forEach(v => console.error(`  - ${v.id}: ${v.description}`));
		}
		expect(critical).toHaveLength(0);
	});

	test('responsiveness: layout is usable on mobile (375px)', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 812 });
		await page.goto('/');
		await expect(page.locator('main, [role="main"]')).toBeVisible();
		// No horizontal scrollbar
		const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
		const viewportWidth = await page.evaluate(() => window.innerWidth);
		expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
	});

	test('responsiveness: layout is usable on tablet (768px)', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/');
		await expect(page.locator('main, [role="main"]')).toBeVisible();
		const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
		const viewportWidth = await page.evaluate(() => window.innerWidth);
		expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
	});

	test('performance: page is interactive within 5 seconds', async ({ page }) => {
		const start = Date.now();
		await page.goto('/', { waitUntil: 'networkidle' });
		const elapsed = Date.now() - start;
		expect(elapsed).toBeLessThan(5000);
	});
});
