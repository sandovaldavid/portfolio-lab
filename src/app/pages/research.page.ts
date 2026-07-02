import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LstmPlaygroundComponent } from '@widgets/lstm-playground/lstm-playground.component';
import { MextThesisPitchComponent } from '@widgets/mext-thesis-pitch/mext-thesis-pitch.component';
import { SectionTitleComponent } from '@shared/ui/section-title/section-title.component';
import { ScrollObserverDirective } from '@shared/lib/animation/scroll-observer.directive';
import { setupPageSeo } from '@shared/lib/seo/page-seo';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { ogImageUrl } from '@shared/config/contact.config';

@Component({
	selector: 'app-research-page',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		LstmPlaygroundComponent,
		MextThesisPitchComponent,
		SectionTitleComponent,
		ScrollObserverDirective,
	],
	template: `
		<div class="max-w-7xl mx-auto px-4 sm:px-6 py-28 space-y-28">
			<!-- Header -->
			<header class="text-center space-y-4 max-w-3xl mx-auto">
				<p class="font-pixel text-xs text-[--color-muted] tracking-widest uppercase">
					// {{ i18n.t()('research.eyebrow') }}
				</p>
				<h1 class="font-pixel text-3xl md:text-4xl text-[--color-primary]">
					{{ i18n.t()('research.title') }}
				</h1>
				<p class="font-body text-base text-[--color-text] leading-relaxed">
					{{ i18n.t()('research.subtitle') }}
				</p>
			</header>

			<!-- LSTM Playground -->
			<section id="lstm" class="scroll-mt-36" aria-labelledby="lstm-heading" appScrollObserver>
				<app-section-title id="lstm-heading">
					{{ i18n.t()('title.lstm-playground') }}
				</app-section-title>
				<p class="font-body text-sm text-[--color-muted] mb-6 -mt-4">
					{{ i18n.t()('lstm.subtitle') }}
				</p>
				@defer (on viewport) {
					<app-lstm-playground />
				} @placeholder {
					<div class="h-96 surface-card animate-pulse flex items-center justify-center">
						<span class="font-pixel text-xs text-[--color-muted]">Loading LSTM simulation...</span>
					</div>
				}
			</section>

			<!-- MEXT Thesis Abstract -->
			<section id="mext" class="scroll-mt-36" aria-labelledby="mext-heading" appScrollObserver>
				<app-section-title id="mext-heading">
					{{ i18n.t()('title.mext-proposal') }}
				</app-section-title>
				@defer (on viewport) {
					<app-mext-thesis-pitch />
				} @placeholder {
					<div class="h-64 surface-card animate-pulse flex items-center justify-center">
						<span class="font-pixel text-xs text-[--color-muted]"
							>Loading research proposal...</span
						>
					</div>
				}
			</section>
		</div>
	`,
})
export default class ResearchPage {
	readonly i18n = inject(I18nService);

	constructor() {
		setupPageSeo((t) => ({
			title: t('seo.research.title'),
			description: t('seo.research.description'),
			ogImage: ogImageUrl(t('seo.research.title'), t('seo.research.description'), 'research'),
			canonical: 'https://devsandoval.me/research',
		}));
	}
}
