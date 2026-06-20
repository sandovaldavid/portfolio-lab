import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumeSummaryComponent } from './resume-summary.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';

describe('ResumeSummaryComponent', () => {
	let fixture: ComponentFixture<ResumeSummaryComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ResumeSummaryComponent],
			providers: [I18nService],
		}).compileComponents();
		fixture = TestBed.createComponent(ResumeSummaryComponent);
		fixture.detectChanges();
	});

	it('should render summary section when visible is true', () => {
		fixture.componentRef.setInput('visible', true);
		fixture.detectChanges();
		const section = fixture.nativeElement.querySelector('section');
		expect(section).toBeTruthy();
	});

	it('should hide section when visible is false', () => {
		fixture.componentRef.setInput('visible', false);
		fixture.detectChanges();
		const section = fixture.nativeElement.querySelector('section');
		expect(section).toBeFalsy();
	});

	it('should render summary text', () => {
		const p = fixture.nativeElement.querySelector('p');
		expect(p.textContent.length).toBeGreaterThan(50);
	});
});
