import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import HomePage from './index.page';
import { ModeStateService, type PortfolioMode } from '@shared/lib/mode/mode-state.service';
import { I18nService } from '@shared/lib/i18n/i18n.service';

describe('HomePage', () => {
	let component: HomePage;
	let fixture: ComponentFixture<HomePage>;
	let httpMock: HttpTestingController;
	let currentMode: ReturnType<typeof signal<PortfolioMode>>;

	const setMode = (mode: PortfolioMode) => {
		currentMode.set(mode);
		fixture.detectChanges();
	};

	const flushContributions = () => {
		httpMock.expectOne('/api/v1/github-contributions').flush({ total: 0, weeks: [] });
	};

	beforeEach(async () => {
		currentMode = signal<PortfolioMode>('SYSTEM_ARCHITECT');

		const mockModeStateService = {
			currentMode,
			isArchitect: () => currentMode() === 'SYSTEM_ARCHITECT',
			isAcademic: () => currentMode() === 'RESEARCH_FELLOW',
		};

		const mockI18nService = {
			lang: signal<'en' | 'es'>('en'),
			t: () => (key: string) => key,
		};

		await TestBed.configureTestingModule({
			imports: [HomePage, RouterTestingModule],
			providers: [
				provideHttpClientTesting(),
				{ provide: ModeStateService, useValue: mockModeStateService },
				{ provide: I18nService, useValue: mockI18nService },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HomePage);
		component = fixture.componentInstance;
		httpMock = TestBed.inject(HttpTestingController);
		fixture.detectChanges();
		flushContributions();
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render architect-specific sections in SYSTEM_ARCHITECT mode', () => {
		const element = fixture.nativeElement as HTMLElement;

		expect(element.querySelector('section#star')).toBeTruthy();
		expect(element.querySelector('section#chaos')).toBeTruthy();
		expect(element.querySelector('section#lstm')).toBeFalsy();
		expect(element.querySelector('section#mext')).toBeFalsy();
	});

	it('should render research-specific sections in RESEARCH_FELLOW mode', () => {
		setMode('RESEARCH_FELLOW');

		const element = fixture.nativeElement as HTMLElement;

		expect(element.querySelector('section#lstm')).toBeTruthy();
		expect(element.querySelector('section#mext')).toBeTruthy();
		expect(element.querySelector('section#star')).toBeFalsy();
		expect(element.querySelector('section#chaos')).toBeFalsy();
	});

	it('should always render shared sections regardless of mode', () => {
		const element = fixture.nativeElement as HTMLElement;

		expect(element.querySelector('section#about')).toBeTruthy();
		expect(element.querySelector('section#contributions')).toBeTruthy();
		expect(element.querySelector('section#experience')).toBeTruthy();
		expect(element.querySelector('section#projects')).toBeTruthy();
		expect(element.querySelector('section#skills')).toBeTruthy();

		setMode('RESEARCH_FELLOW');

		expect(element.querySelector('section#about')).toBeTruthy();
		expect(element.querySelector('section#contributions')).toBeTruthy();
		expect(element.querySelector('section#experience')).toBeTruthy();
		expect(element.querySelector('section#projects')).toBeTruthy();
		expect(element.querySelector('section#skills')).toBeTruthy();
	});

	it('should hide current role CTA in RESEARCH_FELLOW mode', () => {
		const element = fixture.nativeElement as HTMLElement;
		expect(element.querySelector('section[aria-label="Current role at Atena"]')).toBeTruthy();

		setMode('RESEARCH_FELLOW');

		expect(element.querySelector('section[aria-label="Current role at Atena"]')).toBeFalsy();
	});
});
