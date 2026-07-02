import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { setupPageSeo } from '@shared/lib/seo/page-seo';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { ogImageUrl } from '@shared/config/contact.config';
import { SectionTitleComponent } from '@shared/ui/section-title/section-title.component';
import { ExperienceTimelineComponent } from '@widgets/experience-timeline/experience-timeline.component';
import { StarLedgerComponent } from '@widgets/star-ledger/star-ledger.component';
import { ChaosPlaygroundComponent } from '@widgets/chaos-playground/chaos-playground.component';

@Component({
	selector: 'app-experience-page',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		SectionTitleComponent,
		ExperienceTimelineComponent,
		StarLedgerComponent,
		ChaosPlaygroundComponent,
	],
	template: `
		<div class="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-20">
			<!-- Work Timeline -->
			<section>
				<app-section-title>{{ i18n.t()('title.experience') }}</app-section-title>
				<app-experience-timeline />
			</section>

			<!-- STAR Ledger -->
			<section>
				<app-section-title>{{ i18n.t()('title.star-ledger') }}</app-section-title>
				<p class="font-mono text-sm text-[--color-muted] mb-6">
					{{ i18n.t()('star.subtitle') }}
				</p>
				<app-star-ledger />
			</section>

			<!-- Chaos Playground -->
			<section>
				<app-section-title>{{ i18n.t()('title.chaos-playground') }}</app-section-title>
				<p class="font-mono text-sm text-[--color-muted] mb-6">
					{{ i18n.t()('chaos.subtitle') }}
				</p>
				<app-chaos-playground />
			</section>
		</div>
	`,
})
export default class ExperiencePage {
	readonly i18n = inject(I18nService);

	constructor() {
		setupPageSeo((t) => ({
			title: t('seo.experience.title'),
			description: t('seo.experience.description'),
			ogImage: ogImageUrl(t('seo.experience.title'), t('seo.experience.description'), 'experience'),
			canonical: 'https://devsandoval.me/experience',
		}));
	}
}
