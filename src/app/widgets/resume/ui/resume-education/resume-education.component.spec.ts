import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumeEducationComponent } from './resume-education.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';

describe('ResumeEducationComponent', () => {
	let fixture: ComponentFixture<ResumeEducationComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ResumeEducationComponent],
			providers: [I18nService],
		}).compileComponents();
		fixture = TestBed.createComponent(ResumeEducationComponent);
		fixture.detectChanges();
	});

	it('should render education section', () => {
		const section = fixture.nativeElement.querySelector('section');
		expect(section).toBeTruthy();
	});

	it('should render degree name', () => {
		const degree = fixture.nativeElement.querySelector('.edu-degree');
		expect(degree.textContent.trim().length).toBeGreaterThan(5);
	});

	it('should hide section when visible is false', () => {
		fixture.componentRef.setInput('visible', false);
		fixture.detectChanges();
		const section = fixture.nativeElement.querySelector('section');
		expect(section).toBeFalsy();
	});
});
