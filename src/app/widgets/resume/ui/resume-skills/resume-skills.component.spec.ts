import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumeSkillsComponent } from './resume-skills.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';

describe('ResumeSkillsComponent', () => {
	let fixture: ComponentFixture<ResumeSkillsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ResumeSkillsComponent],
			providers: [I18nService],
		}).compileComponents();
		fixture = TestBed.createComponent(ResumeSkillsComponent);
		fixture.detectChanges();
	});

	it('should render all skills when visibleSkills is empty', () => {
		const chips = fixture.nativeElement.querySelectorAll('.skill-chip:not(.skill-chip-hidden)');
		expect(chips.length).toBeGreaterThan(10);
	});

	it('should mark skill as hidden when not in visibleSkills', () => {
		fixture.componentRef.setInput('visibleSkills', ['Angular', 'TypeScript']);
		fixture.detectChanges();
		const hiddenChips = fixture.nativeElement.querySelectorAll('.skill-chip-hidden');
		expect(hiddenChips.length).toBeGreaterThan(0);
	});

	it('should emit toggleSkill when a skill chip is clicked', () => {
		let emitted: unknown = null;
		fixture.componentInstance.toggleSkill.subscribe((v: unknown) => (emitted = v));
		fixture.detectChanges();
		const chip = fixture.nativeElement.querySelector('.skill-chip');
		chip?.click();
		expect(emitted).toBe('Angular');
	});

	it('should hide section when visible is false', () => {
		fixture.componentRef.setInput('visible', false);
		fixture.detectChanges();
		const section = fixture.nativeElement.querySelector('section');
		expect(section).toBeFalsy();
	});
});
