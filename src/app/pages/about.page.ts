import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { setupPageSeo } from '@shared/lib/seo/page-seo';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { ogImageUrl } from '@shared/config/contact.config';
import { SectionTitleComponent } from '@shared/ui/section-title/section-title.component';
import { AboutSectionComponent } from '@widgets/about-section/about-section.component';

@Component({
	selector: 'app-about-page',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SectionTitleComponent, AboutSectionComponent],
	templateUrl: './about.page.html',
})
export default class AboutPage {
	readonly i18n = inject(I18nService);

	constructor() {
		setupPageSeo((t) => ({
			title: t('seo.about.title'),
			description: t('seo.about.description'),
			ogImage: ogImageUrl(t('seo.about.title'), t('seo.about.description'), 'about'),
			canonical: 'https://devsandoval.me/about',
		}));
	}
}
