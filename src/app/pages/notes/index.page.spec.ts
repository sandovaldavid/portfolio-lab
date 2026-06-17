import { render, screen } from '@testing-library/angular';
import NotesListPage from './index.page';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SeoService } from '@shared/lib/seo/seo.service';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';

describe('NotesListPage', () => {
	it('should render search fields and category filters', async () => {
		const mockLangSignal = signal<'en' | 'es'>('en');

		await render(NotesListPage, {
			providers: [
				provideRouter([]),
				provideContent(withMarkdownRenderer()),
				{
					provide: I18nService,
					useValue: {
						lang: mockLangSignal,
						t: () => (key: string) => key,
					},
				},
				{
					provide: SeoService,
					useValue: {
						updatePage: vi.fn(),
					},
				},
			],
		});

		expect(screen.getByText('// TIL_OBSIDIAN_VAULT')).toBeTruthy();
		expect(screen.getByPlaceholderText(/Search notes/i)).toBeTruthy();
		expect(screen.getByText('ALGORITHMS')).toBeTruthy();
		expect(screen.getByText('SYSTEMS')).toBeTruthy();
	});
});
