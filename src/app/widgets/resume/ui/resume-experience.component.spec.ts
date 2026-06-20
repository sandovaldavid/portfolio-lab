import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumeExperienceComponent } from './resume-experience.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';

describe('ResumeExperienceComponent', () => {
	let fixture: ComponentFixture<ResumeExperienceComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ResumeExperienceComponent],
			providers: [I18nService],
		}).compileComponents();
		fixture = TestBed.createComponent(ResumeExperienceComponent);
		fixture.detectChanges();
	});

	it('should render all experience items by default', () => {
		const items = fixture.nativeElement.querySelectorAll('.experience-item');
		expect(items.length).toBeGreaterThanOrEqual(3);
	});

	it('should not render section when visible is false', () => {
		fixture.componentRef.setInput('visible', false);
		fixture.detectChanges();
		const section = fixture.nativeElement.querySelector('section');
		expect(section).toBeFalsy();
	});

	it('should show bullet-hidden class when bullet index is not in visibleBullets', () => {
		fixture.componentRef.setInput('visibleBullets', { Atena: [0, 2] });
		fixture.detectChanges();
		const hiddenBullets = fixture.nativeElement.querySelectorAll('.bullet-hidden');
		expect(hiddenBullets.length).toBeGreaterThan(0);
	});

	it('should emit toggleBullet when a hidden bullet is clicked', () => {
		let emitted: unknown = null;
		fixture.componentInstance.toggleBullet.subscribe((v: unknown) => (emitted = v));
		fixture.componentRef.setInput('visibleBullets', { Atena: [0] });
		fixture.detectChanges();
		const hiddenBullet = fixture.nativeElement.querySelector('.bullet-hidden');
		hiddenBullet?.click();
		expect(emitted).toBeTruthy();
	});
});
