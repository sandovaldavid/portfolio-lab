import { render, screen } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { injectContent, provideContent, withMarkdownRenderer } from '@analogjs/content';
import { of, Subject } from 'rxjs';
import CaseStudyPage from './[slug].page';
import { SeoService } from '@shared/lib/seo/seo.service';

vi.mock('@analogjs/content', async () => {
	const actual = await vi.importActual<Record<string, unknown>>('@analogjs/content');
	return {
		...actual,
		injectContent: vi.fn(),
	};
});

const mockStudy = {
	attributes: {
		title: 'Mock Case Study',
		description: 'Mock case study description.',
		date: '2026-06-17',
		category: 'backend',
		tags: ['mock'],
		image: '',
		project: 'mock-project',
	},
	content: '# Mock Content',
	slug: 'mock-case-study',
};

describe('CaseStudyPage', () => {
	it('should render the case study when content resolves', async () => {
		(injectContent as unknown as ReturnType<typeof vi.fn>).mockReturnValue(of(mockStudy));

		await render(CaseStudyPage, {
			providers: [
				provideRouter([]),
				provideContent(withMarkdownRenderer()),
				{ provide: SeoService, useValue: { updatePage: vi.fn() } },
			],
		});

		expect(screen.getByText('Mock Case Study')).toBeTruthy();
		expect(screen.queryByText('Case_Study_Not_Found')).toBeNull();
	});

	it('should show 404 state when case study not found', async () => {
		(injectContent as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
			of({ attributes: {}, content: '' } as never)
		);

		await render(CaseStudyPage, {
			providers: [
				provideRouter([]),
				provideContent(withMarkdownRenderer()),
				{ provide: SeoService, useValue: { updatePage: vi.fn() } },
			],
		});

		expect(screen.getByText('Case_Study_Not_Found')).toBeTruthy();
	});

	it('should show back link to projects', async () => {
		(injectContent as unknown as ReturnType<typeof vi.fn>).mockReturnValue(of(mockStudy));

		await render(CaseStudyPage, {
			providers: [
				provideRouter([]),
				provideContent(withMarkdownRenderer()),
				{ provide: SeoService, useValue: { updatePage: vi.fn() } },
			],
		});

		const backLinks = screen.getAllByText(/back_to_projects/);
		expect(backLinks.length).toBeGreaterThan(0);
	});

	it('should render the case study once content resolves asynchronously (regression: previously stuck on not-found)', async () => {
		const content$ = new Subject<typeof mockStudy>();
		(injectContent as unknown as ReturnType<typeof vi.fn>).mockReturnValue(content$);

		const { fixture } = await render(CaseStudyPage, {
			providers: [
				provideRouter([]),
				provideContent(withMarkdownRenderer()),
				{ provide: SeoService, useValue: { updatePage: vi.fn() } },
			],
		});

		// Content hasn't resolved yet: must not show the not-found state.
		expect(screen.queryByText('Case_Study_Not_Found')).toBeNull();

		content$.next(mockStudy);
		fixture.detectChanges();
		await fixture.whenStable();

		expect(screen.getByText('Mock Case Study')).toBeTruthy();
		expect(screen.queryByText('Case_Study_Not_Found')).toBeNull();
	});
});
