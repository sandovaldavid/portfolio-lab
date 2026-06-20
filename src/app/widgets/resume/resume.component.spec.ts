import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumeComponent } from './resume.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';

describe('ResumeComponent', () => {
	let fixture: ComponentFixture<ResumeComponent>;

	beforeEach(async () => {
		localStorage.clear();
		await TestBed.configureTestingModule({
			imports: [ResumeComponent],
			providers: [I18nService],
		}).compileComponents();
		fixture = TestBed.createComponent(ResumeComponent);
		fixture.detectChanges();
	});

	it('should render the resume layout', () => {
		const layout = fixture.nativeElement.querySelector('.resume-layout');
		expect(layout).toBeTruthy();
	});

	it('should apply modern style class by default', () => {
		const doc = fixture.nativeElement.querySelector('.resume-document');
		expect(doc.classList.contains('resume-document--modern')).toBe(true);
	});

	it('should apply ats class when style is set to ats', () => {
		fixture.componentInstance.onStyleChange('ats');
		fixture.detectChanges();
		const doc = fixture.nativeElement.querySelector('.resume-document');
		expect(doc.classList.contains('resume-document--ats')).toBe(true);
	});

	it('should apply harvard class when style is set to harvard', () => {
		fixture.componentInstance.onStyleChange('harvard');
		fixture.detectChanges();
		const doc = fixture.nativeElement.querySelector('.resume-document');
		expect(doc.classList.contains('resume-document--harvard')).toBe(true);
	});

	it('should hide a section when sectionToggle is called', () => {
		fixture.componentInstance.onSectionToggle('summary');
		fixture.detectChanges();
		expect(fixture.componentInstance.isSectionVisible('summary')).toBe(false);
	});

	it('should restore all sections as visible after resetState', () => {
		fixture.componentInstance.onSectionToggle('summary');
		fixture.componentInstance.onSectionToggle('education');
		fixture.componentInstance.resetState();
		expect(fixture.componentInstance.isSectionVisible('summary')).toBe(true);
		expect(fixture.componentInstance.isSectionVisible('education')).toBe(true);
	});

	it('should persist style to localStorage when changed', () => {
		fixture.componentInstance.onStyleChange('harvard');
		fixture.detectChanges();
		const stored = JSON.parse(localStorage.getItem('resume-builder-state') ?? '{}');
		expect(stored.style).toBe('harvard');
	});

	it('should restore state from localStorage on init', async () => {
		localStorage.setItem(
			'resume-builder-state',
			JSON.stringify({
				style: 'ats',
				visibleSections: ['experience', 'skills'],
				visibleBullets: {},
				visibleProjects: [],
				visibleSkills: [],
			}),
		);

		await TestBed.resetTestingModule();
		await TestBed.configureTestingModule({
			imports: [ResumeComponent],
			providers: [I18nService],
		}).compileComponents();
		const newFixture = TestBed.createComponent(ResumeComponent);
		newFixture.componentInstance.ngOnInit();
		expect(newFixture.componentInstance.activeStyle()).toBe('ats');
		expect(newFixture.componentInstance.isSectionVisible('summary')).toBe(false);
	});
});
