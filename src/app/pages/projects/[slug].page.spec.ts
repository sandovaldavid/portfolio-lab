import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import CaseStudyPage from './[slug].page';

describe('CaseStudyPage', () => {
	it('should render', async () => {
		TestBed.configureTestingModule({
			imports: [CaseStudyPage],
			providers: [provideRouter([]), provideContent(withMarkdownRenderer())],
		});

		const fixture = TestBed.createComponent(CaseStudyPage);
		fixture.detectChanges();
		expect(fixture).toBeTruthy();
	});

	it('should show 404 state when case study not found', () => {
		TestBed.configureTestingModule({
			imports: [CaseStudyPage],
			providers: [provideRouter([]), provideContent(withMarkdownRenderer())],
		});

		const fixture = TestBed.createComponent(CaseStudyPage);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.textContent).toContain('Case_Study_Not_Found');
	});

	it('should show back link to projects', () => {
		TestBed.configureTestingModule({
			imports: [CaseStudyPage],
			providers: [provideRouter([]), provideContent(withMarkdownRenderer())],
		});

		const fixture = TestBed.createComponent(CaseStudyPage);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		const backLink = compiled.querySelector('a[routerLink="/projects"]');
		expect(backLink).toBeTruthy();
	});
});
