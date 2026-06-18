import { render, screen } from '@testing-library/angular';
import NoteDetailPage from './[slug].page';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SeoService } from '@shared/lib/seo/seo.service';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
	injectContent,
	provideContent,
	withMarkdownRenderer,
} from '@analogjs/content';
import { of } from 'rxjs';

// Mock injectContent
// eslint-disable-next-line @typescript-eslint/no-explicit-any
vi.mock('@analogjs/content', async () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const actual = await vi.importActual<any>('@analogjs/content');
	return {
		...actual,
		injectContent: vi.fn(),
	};
});

describe('NoteDetailPage', () => {
	it('should render details of the loaded note', async () => {
		const mockLangSignal = signal<'en' | 'es'>('en');

		// Setup mock return value for injectContent
		const mockNote = {
			attributes: {
				title: 'Mock Title Note',
				description: 'Mock note description content.',
				date: '2026-06-17',
				category: 'algorithms',
				tags: ['mock'],
			},
			content: '# Mock Content Body',
		};
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(injectContent as any).mockReturnValue(of(mockNote));

		await render(NoteDetailPage, {
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

		expect(screen.getByText(/back_to_vault/)).toBeTruthy();
		expect(screen.getByText('Mock Title Note')).toBeTruthy();
		expect(screen.getByText('Mock note description content.')).toBeTruthy();
	});
});
