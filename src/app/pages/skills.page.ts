import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { setupPageSeo } from '@shared/lib/seo/page-seo';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { ogImageUrl } from '@shared/config/contact.config';
import { SkillsSectionComponent } from '@widgets/skills-section/skills-section.component';

@Component({
	selector: 'app-skills-page',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SkillsSectionComponent],
	templateUrl: './skills.page.html',
})
export default class SkillsPage {
	readonly i18n = inject(I18nService);

	constructor() {
		setupPageSeo((t) => ({
			title: t('seo.skills.title'),
			description: t('seo.skills.description'),
			ogImage: ogImageUrl(t('seo.skills.title'), t('seo.skills.description'), 'skills'),
			canonical: 'https://devsandoval.me/skills',
		}));
	}
}
