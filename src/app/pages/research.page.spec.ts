import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import ResearchPage from './research.page';

describe('ResearchPage', () => {
	let component: ResearchPage;
	let fixture: ComponentFixture<ResearchPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ResearchPage, RouterTestingModule],
			providers: [provideHttpClientTesting()],
		}).compileComponents();

		fixture = TestBed.createComponent(ResearchPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render research title', () => {
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.textContent).toContain('Investigación y Trabajo Académico');
	});

	it('should render LSTM and MEXT sections', () => {
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('#lstm')).toBeTruthy();
		expect(compiled.querySelector('#mext')).toBeTruthy();
	});
});
