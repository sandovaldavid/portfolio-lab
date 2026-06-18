import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env['CI'];

// In CI: use the production server started by the workflow (port 3000)
// Locally: use the Vite dev server (port 5173)
const baseURL = process.env['BASE_URL'] || (isCI ? 'http://localhost:3000' : 'http://localhost:5173');

export default defineConfig({
	testDir: './e2e',
	testMatch: '**/*.spec.ts',
	fullyParallel: true,
	forbidOnly: isCI,
	retries: isCI ? 1 : 0,
	workers: isCI ? 2 : undefined,
	reporter: [
		['html', { outputFolder: 'test-results/playwright', open: 'never' }],
		['json', { outputFile: 'test-results/playwright.json' }],
		['junit', { outputFile: 'test-results/junit.xml' }],
		['list'],
	],
	use: {
		baseURL,
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
	},
	// In CI the workflow starts the server before running playwright.
	// Locally, Playwright starts the dev server automatically.
	webServer: isCI
		? undefined
		: {
				command: 'pnpm dev',
				url: baseURL,
				reuseExistingServer: true,
				timeout: 120_000,
			},
	projects: isCI
		? [
				// CI: only Chromium to keep runs fast
				{
					name: 'chromium',
					use: { ...devices['Desktop Chrome'] },
				},
			]
		: [
				// Local: full browser matrix
				{
					name: 'chromium',
					use: { ...devices['Desktop Chrome'] },
				},
				{
					name: 'firefox',
					use: { ...devices['Desktop Firefox'] },
				},
				{
					name: 'webkit',
					use: { ...devices['Desktop Safari'] },
				},
				{
					name: 'mobile-chrome',
					use: { ...devices['Pixel 5'] },
				},
				{
					name: 'mobile-safari',
					use: { ...devices['iPhone 12'] },
				},
			],
});
