import { render, screen } from '@testing-library/angular';
import NoteDetailPage from './[slug].page';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SeoService } from '@shared/lib/seo/seo.service';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
	injectContent,
	injectContentFiles,
	provideContent,
	withMarkdownRenderer,
} from '@analogjs/content';
import { of } from 'rxjs';

vi.mock('@analogjs/content', async () => {
	const actual = await vi.importActual<Record<string, unknown>>('@analogjs/content');
	return {
		...actual,
		injectContent: vi.fn(),
		injectContentFiles: vi.fn(),
	};
});

describe('NoteDetailPage', () => {
	it('should render details of the loaded note', async () => {
		const mockLangSignal = signal<'en' | 'es'>('en');

		const mockNote = {
			attributes: {
				title: 'Mock Title Note',
				description: 'Mock note description content.',
				date: '2026-06-17',
				category: 'algorithms',
				tags: ['mock'],
			},
			content: '# Mock Content Body',
			slug: 'mock-note',
		};
		(injectContent as unknown as ReturnType<typeof vi.fn>).mockReturnValue(of(mockNote));
		(injectContentFiles as unknown as ReturnType<typeof vi.fn>).mockReturnValue([]);

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
		expect(screen.getByText(/min read/)).toBeTruthy();
	});

	it('should render not found state when note does not exist', async () => {
		const mockLangSignal = signal<'en' | 'es'>('en');

		(injectContent as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
			of({ attributes: {}, content: '' } as never)
		);

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

		expect(screen.getByText('404')).toBeTruthy();
		expect(screen.getByText(/Note_Not_Found/)).toBeTruthy();
		expect(screen.getByText(/return_to_vault/)).toBeTruthy();
	});

	it('should render related notes when they share tags', async () => {
		const mockLangSignal = signal<'en' | 'es'>('en');

		const mockNote = {
			attributes: {
				title: 'Current Note',
				description: 'Current note description.',
				date: '2026-06-17',
				category: 'algorithms',
				tags: ['mock', 'shared'],
			},
			content: '# Content',
			slug: 'current-note',
		};
		const relatedNote = {
			attributes: {
				title: 'Related Note',
				description: 'Related note description.',
				date: '2026-06-16',
				category: 'algorithms',
				tags: ['shared', 'other'],
			},
			content: '# Related',
			slug: 'related-note',
		};
		(injectContent as unknown as ReturnType<typeof vi.fn>).mockReturnValue(of(mockNote));
		(injectContentFiles as unknown as ReturnType<typeof vi.fn>).mockReturnValue([relatedNote]);

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

		expect(screen.getByText(/related_entries/)).toBeTruthy();
		expect(screen.getByText('Related Note')).toBeTruthy();
	});
});
