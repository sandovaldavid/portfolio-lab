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
	templateUrl: './research.page.html',
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
