import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { GithubContributionsComponent } from './github-contributions.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { signal } from '@angular/core';

const mockI18nService = {
	lang: signal<'en' | 'es'>('en'),
	t: () => (key: string) => key,
};

const mockWeeks = [
	{
		days: [
			{ date: '2025-06-29', level: 0 },
			{ date: '2025-07-06', level: 1 },
			{ date: '2025-07-13', level: 2 },
			{ date: '2025-07-20', level: 3 },
			{ date: '2025-07-27', level: 4 },
			{ date: '2025-08-03', level: 0 },
			{ date: '2025-08-10', level: 1 },
		],
	},
];

describe('GithubContributionsComponent', () => {
	let component: GithubContributionsComponent;
	let fixture: ComponentFixture<GithubContributionsComponent>;
	let httpMock: HttpTestingController;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [GithubContributionsComponent],
			providers: [
				provideHttpClient(),
				provideHttpClientTesting(),
				{ provide: I18nService, useValue: mockI18nService },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(GithubContributionsComponent);
		component = fixture.componentInstance;
		httpMock = TestBed.inject(HttpTestingController);
	});

	it('should create', () => {
		fixture.detectChanges();
		httpMock.expectOne('/api/v1/github-contributions').flush({ total: 0, weeks: [] });

		expect(component).toBeTruthy();
	});

	it('should render loading state before response arrives', () => {
		fixture.detectChanges();

		expect(component.isLoading()).toBe(true);
		expect(fixture.nativeElement.querySelector('.contributions-skeleton')).toBeTruthy();

		httpMock.expectOne('/api/v1/github-contributions').flush({ total: 0, weeks: [] });
	});

	it('should render contribution graph after successful fetch', async () => {
		fixture.detectChanges();

		httpMock.expectOne('/api/v1/github-contributions').flush({ total: 1234, weeks: mockWeeks });

		await fixture.whenStable();
		fixture.detectChanges();

		expect(component.isLoading()).toBe(false);
		expect(component.total()).toBe(1234);
		expect(component.weeks().length).toBe(1);

		const cells = fixture.nativeElement.querySelectorAll('[role="gridcell"]');
		expect(cells.length).toBe(7);
		expect(fixture.nativeElement.textContent).toContain('1,234');
	});

	it('should render error state when fetch fails', async () => {
		fixture.detectChanges();

		httpMock
			.expectOne('/api/v1/github-contributions')
			.flush('Service unavailable', { status: 500, statusText: 'Internal Server Error' });

		await fixture.whenStable();
		fixture.detectChanges();

		expect(component.isError()).toBe(true);
		expect(fixture.nativeElement.querySelector('.contributions-message')).toBeTruthy();
		expect(fixture.nativeElement.querySelector('.contributions-link')?.getAttribute('href')).toBe(
			'https://github.com/sandovaldavid'
		);
	});
});
