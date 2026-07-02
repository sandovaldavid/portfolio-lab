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
	template: `
		<div class="max-w-7xl mx-auto px-4 sm:px-6 py-20">
			<div class="mb-12 space-y-3">
				<p class="font-pixel text-xs text-[--color-muted] tracking-widest uppercase">
					// {{ i18n.t()('skills.page.subtitle') }}
				</p>
				<h1 class="font-pixel text-3xl md:text-4xl text-[--color-heading] font-bold">
					{{ i18n.t()('skills.page.title') }}
				</h1>
				<p class="font-body text-base text-[--color-muted] max-w-2xl leading-relaxed">
					{{ i18n.t()('skills.page.description') }}
				</p>
			</div>
			<app-skills-section [compact]="false" />
		</div>
	`,
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
