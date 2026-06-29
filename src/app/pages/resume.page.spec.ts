import { ComponentFixture, TestBed } from '@angular/core/testing';
import ResumePage from './resume.page';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SeoService } from '@shared/lib/seo/seo.service';
import { Title, Meta } from '@angular/platform-browser';
import { vi } from 'vitest';

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

	it('should render a placeholder while resume is deferred', () => {
		const placeholder = fixture.nativeElement.querySelector('.min-h-screen');
		expect(placeholder).toBeTruthy();
	});

	it('should call seo.updatePage with canonical resume URL on init', () => {
		const seo = TestBed.inject(SeoService);
		const spy = vi.spyOn(seo, 'updatePage');
		fixture.componentInstance.ngOnInit();
		expect(spy).toHaveBeenCalledWith(
			expect.objectContaining({ canonical: 'https://devsandoval.me/resume' })
		);
	});
});
