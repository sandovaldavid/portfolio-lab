import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('[info] should navigate to about page', async ({ page }) => {
		const aboutLink = page.locator('a[href*="about"], a:has-text("About")').first();
		if (await aboutLink.isVisible()) {
			await aboutLink.click();
			await expect(page).toHaveURL(/\/about/);
		}
	});

	test('[info] should navigate to projects page', async ({ page }) => {
		const projectsLink = page.locator('a[href*="projects"], a:has-text("Projects")').first();
		if (await projectsLink.isVisible()) {
			await projectsLink.click();
			await expect(page).toHaveURL(/\/projects/);
		}
	});

	test('[info] should navigate to experience page', async ({ page }) => {
		const experienceLink = page.locator('a[href*="experience"], a:has-text("Experience")').first();
		if (await experienceLink.isVisible()) {
			await experienceLink.click();
			await expect(page).toHaveURL(/\/experience/);
		}
	});

	test('[info] should navigate to skills page', async ({ page }) => {
		const skillsLink = page.locator('a[href*="skills"], a:has-text("Skills")').first();
		if (await skillsLink.isVisible()) {
			await skillsLink.click();
			await expect(page).toHaveURL(/\/skills/);
		}
	});

	test('[info] should navigate to notes page', async ({ page }) => {
		const notesLink = page.locator('a[href*="notes"], a:has-text("Notes")').first();
		if (await notesLink.isVisible()) {
			await notesLink.click();
			await expect(page).toHaveURL(/\/notes/);
		}
	});
});
