import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumeControlsComponent } from './resume-controls.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';

describe('ResumeControlsComponent', () => {
	let fixture: ComponentFixture<ResumeControlsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ResumeControlsComponent],
			providers: [I18nService],
		}).compileComponents();
		fixture = TestBed.createComponent(ResumeControlsComponent);
		fixture.detectChanges();
	});

	it('should render style switcher with 3 options', () => {
		const btns = fixture.nativeElement.querySelectorAll('.style-btn');
		expect(btns.length).toBe(3);
	});

	it('should emit styleChange when a style button is clicked', () => {
		let emitted: unknown = null;
		fixture.componentInstance.styleChange.subscribe((v: unknown) => (emitted = v));
		const atsBtnArr = Array.from(
			fixture.nativeElement.querySelectorAll('.style-btn'),
		) as HTMLElement[];
		const atsBtn = atsBtnArr.find((b) => b.textContent?.includes('ATS'));
		atsBtn?.click();
		expect(emitted).toBe('ats');
	});

	it('should emit sectionToggle when a section checkbox changes', () => {
		let emitted: unknown = null;
		fixture.componentInstance.sectionToggle.subscribe((v: unknown) => (emitted = v));
		const checkbox = fixture.nativeElement.querySelector(
			'input[type=checkbox]',
		) as HTMLInputElement;
		checkbox?.click();
		expect(emitted).toBeTruthy();
	});

	it('should emit reset when reset button is clicked', () => {
		let emitted = false;
		fixture.componentInstance.resetClick.subscribe(() => (emitted = true));
		const resetBtn = Array.from(fixture.nativeElement.querySelectorAll('.ctrl-btn')).find((b) =>
			(b as HTMLElement).classList.contains('ctrl-btn-reset'),
		) as HTMLElement;
		resetBtn?.click();
		expect(emitted).toBe(true);
	});

	it('should have no-print class (hidden in print)', () => {
		const aside = fixture.nativeElement.querySelector('aside');
		expect(aside.classList.contains('no-print')).toBe(true);
	});

	it('should toggle open state when toggle button is clicked', () => {
		const toggleBtn = fixture.nativeElement.querySelector('.controls-toggle') as HTMLElement;
		const initialState = fixture.componentInstance.open();
		toggleBtn?.click();
		expect(fixture.componentInstance.open()).toBe(!initialState);
	});
});
