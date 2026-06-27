import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import NotFoundPage from './[...].page';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SeoService } from '@shared/lib/seo/seo.service';

describe('NotFoundPage', () => {
	let component: NotFoundPage;
	let fixture: ComponentFixture<NotFoundPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NotFoundPage, RouterTestingModule],
			providers: [
				{
					provide: I18nService,
					useValue: {
						t: () => (key: string) => {
							const translations: Record<string, string> = {
								'404.title': '404',
								'404.heading': 'Page_Not_Found',
								'404.description': 'The route you requested does not exist.',
								'404.back-home': 'Return to Base',
								'404.view-projects': 'View Projects',
								'seo.404.title': '404 — Page Not Found',
								'seo.404.description': 'Page not found.',
							};
							return translations[key] ?? key;
						},
					},
				},
				{
					provide: SeoService,
					useValue: {
						updatePage: vi.fn(),
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(NotFoundPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render 404 heading', () => {
		const compiled = fixture.nativeElement;
		const heading = compiled.querySelector('.glitch');
		expect(heading?.textContent?.trim()).toContain('404');
	});

	it('should render navigation links', () => {
		const compiled = fixture.nativeElement;
		const links = compiled.querySelectorAll('a');
		expect(links.length).toBe(2);
		expect(links[0]?.getAttribute('routerLink')).toBe('/');
		expect(links[1]?.getAttribute('routerLink')).toBe('/projects');
	});

	it('should call seo.updatePage on init', () => {
		const seoService = TestBed.inject(SeoService);
		expect(seoService.updatePage).toHaveBeenCalledWith({
			title: '404 — Page Not Found',
			description: 'Page not found.',
		});
	});
});
