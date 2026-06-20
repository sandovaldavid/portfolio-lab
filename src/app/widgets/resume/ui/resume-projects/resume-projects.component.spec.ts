import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumeProjectsComponent } from './resume-projects.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';

describe('ResumeProjectsComponent', () => {
	let fixture: ComponentFixture<ResumeProjectsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ResumeProjectsComponent],
			providers: [I18nService],
		}).compileComponents();
		fixture = TestBed.createComponent(ResumeProjectsComponent);
		fixture.detectChanges();
	});

	it('should render all projects when visibleProjects is empty', () => {
		fixture.componentRef.setInput('visibleProjects', []);
		fixture.detectChanges();
		const items = fixture.nativeElement.querySelectorAll('.project-item:not(.project-hidden)');
		expect(items.length).toBeGreaterThanOrEqual(3);
	});

	it('should hide a project when its title is not in visibleProjects', () => {
		fixture.componentRef.setInput('visibleProjects', ['UNP Campus Map']);
		fixture.detectChanges();
		const hidden = fixture.nativeElement.querySelectorAll('.project-hidden');
		expect(hidden.length).toBeGreaterThan(0);
	});

	it('should emit toggleProject when project item is clicked', () => {
		let emitted: unknown = null;
		fixture.componentInstance.toggleProject.subscribe((v: unknown) => (emitted = v));
		fixture.detectChanges();
		const item = fixture.nativeElement.querySelector('.project-item');
		item?.click();
		expect(typeof emitted).toBe('string');
		expect((emitted as string).length).toBeGreaterThan(0);
	});

	it('should hide section when visible is false', () => {
		fixture.componentRef.setInput('visible', false);
		fixture.detectChanges();
		const section = fixture.nativeElement.querySelector('section');
		expect(section).toBeFalsy();
	});
});
