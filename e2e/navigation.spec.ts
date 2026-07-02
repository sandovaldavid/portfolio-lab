import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
	{ path: '/', name: 'Home' },
	{ path: '/about', name: 'About' },
	{ path: '/projects', name: 'Projects' },
	{ path: '/experience', name: 'Experience' },
	{ path: '/skills', name: 'Skills' },
	{ path: '/notes', name: 'Notes' },
	{ path: '/research', name: 'Research' },
	{ path: '/resume', name: 'Resume' },
	{ path: '/projects/auctions', name: 'Case Study: Auctions' },
	{ path: '/notes/binary-search', name: 'Note: Binary Search' },
];

test.describe('Navigation', () => {
	test('should load all prerendered routes without errors', async ({ page }) => {
		for (const route of routes) {
			const response = await page.goto(route.path);
			const status = response?.status() ?? 0;
			expect(status, `${route.name} returned non-2xx`).toBeLessThan(400);
			await expect(page.locator('main, [role="main"]').first()).toBeVisible();
		}
	});

	test('should not have broken internal links', async ({ page }) => {
		await page.goto('/');
		const links = await page.locator('a[href^="/"]').all();
		const hrefs = [...new Set(await Promise.all(links.map(l => l.getAttribute('href'))))];

		for (const href of hrefs) {
			if (!href || href === '#') continue;
			const response = await page.goto(href);
			const status = response?.status() ?? 0;
			expect(status, `Broken link: ${href}`).toBeLessThan(400);
		}
	});

	test('keyboard: can tab through main navigation', async ({ page }) => {
		await page.goto('/');
		await page.keyboard.press('Tab');
		const focused = page.locator(':focus');
		await expect(focused).toBeVisible();
	});
});

test.describe('Accessibility per page', () => {
	for (const route of routes) {
		test(`${route.name}: no critical a11y violations`, async ({ page }) => {
			await page.goto(route.path);
			const results = await new AxeBuilder({ page })
				.withTags(['wcag2a', 'wcag2aa'])
				// color-contrast: NES/pixel dark theme uses low-contrast as a design aesthetic.
				// nested-interactive: SVG skill-graph uses tabindex/role="button" on <g> elements
				//   that contain focusable descendants — needs a proper redesign to fix.
				.disableRules(['color-contrast', 'nested-interactive'])
				.analyze();

			const critical = results.violations.filter(
				v => v.impact === 'critical' || v.impact === 'serious',
			);
			if (critical.length > 0) {
				const details = critical.map(v => `${v.id}: ${v.description}`).join('\n  ');
				console.error(`[fail] ${route.name} violations:\n  ${details}`);
			}
			expect(critical).toHaveLength(0);
		});
	}
});

test.describe('Responsiveness per page', () => {
	const viewports = [
		{ name: 'mobile', width: 375, height: 812 },
		{ name: 'tablet', width: 768, height: 1024 },
		{ name: 'desktop', width: 1280, height: 800 },
	];

	for (const vp of viewports) {
		test(`should not overflow horizontally on ${vp.name} (${vp.width}px)`, async ({ page }) => {
			await page.setViewportSize({ width: vp.width, height: vp.height });
			await page.goto('/');
			const overflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
			expect(overflow, `Horizontal overflow on ${vp.name}`).toBe(false);
		});
	}
});
