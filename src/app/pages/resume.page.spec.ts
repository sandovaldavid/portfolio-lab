import { ComponentFixture, TestBed } from '@angular/core/testing';
import ResumePage from './resume.page';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SeoService } from '@shared/lib/seo/seo.service';
import { Title, Meta } from '@angular/platform-browser';

describe('ResumePage', () => {
	let fixture: ComponentFixture<ResumePage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ResumePage],
			providers: [I18nService, SeoService, Title, Meta],
		}).compileComponents();
		fixture = TestBed.createComponent(ResumePage);
		fixture.detectChanges();
	});

	it('should render the resume component', () => {
		const resume = fixture.nativeElement.querySelector('app-resume');
		expect(resume).toBeTruthy();
	});
});
