import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumeHeaderComponent } from './resume-header.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';

describe('ResumeHeaderComponent', () => {
	let fixture: ComponentFixture<ResumeHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ResumeHeaderComponent],
			providers: [I18nService],
		}).compileComponents();
		fixture = TestBed.createComponent(ResumeHeaderComponent);
		fixture.detectChanges();
	});

	it('should render full name', () => {
		const h1 = fixture.nativeElement.querySelector('h1');
		expect(h1.textContent).toContain('Juan David Sandoval Salvador');
	});

	it('should render email link', () => {
		const links = fixture.nativeElement.querySelectorAll('a');
		const emailLink = Array.from(links).find(
			(a: unknown) => (a as HTMLAnchorElement).href.includes('mailto:'),
		);
		expect(emailLink).toBeTruthy();
	});

	it('should render linkedin link', () => {
		const links = fixture.nativeElement.querySelectorAll('a');
		const linkedinLink = Array.from(links).find((a: unknown) =>
			(a as HTMLAnchorElement).textContent?.includes('linkedin'),
		);
		expect(linkedinLink).toBeTruthy();
	});
});
