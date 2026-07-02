import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { setupPageSeo } from '@shared/lib/seo/page-seo';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { ogImageUrl } from '@shared/config/contact.config';
import { ResumeComponent } from '@widgets/resume/resume.component';

@Component({
	selector: 'app-resume-page',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ResumeComponent],
	template: `@defer (on viewport) {
			<app-resume />
		} @placeholder {
			<div class="min-h-screen"></div>
		}`,
})
export default class ResumePage {
	readonly i18n = inject(I18nService);

	constructor() {
		setupPageSeo((t) => ({
			title: t('seo.resume.title'),
			description: t('seo.resume.description'),
			ogImage: ogImageUrl(t('seo.resume.title'), t('seo.resume.description'), 'resume'),
			canonical: 'https://devsandoval.me/resume',
		}));
	}
}
