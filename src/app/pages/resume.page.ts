import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SeoService } from '@shared/lib/seo/seo.service';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { ogImageUrl } from '@shared/config/contact.config';
import { ResumeComponent } from '@widgets/resume/resume.component';

@Component({
	selector: 'app-resume-page',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ResumeComponent],
	template: `<app-resume />`,
})
export default class ResumePage implements OnInit {
	readonly i18n = inject(I18nService);
	private readonly seo = inject(SeoService);

	ngOnInit(): void {
		const t = this.i18n.t();
		this.seo.updatePage({
			title: t('seo.resume.title'),
			description: t('seo.resume.description'),
			ogImage: ogImageUrl(t('seo.resume.title'), t('seo.resume.description'), 'resume'),
			canonical: 'https://devsandoval.me/resume',
		});
	}
}
