import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { setupPageSeo } from '@shared/lib/seo/page-seo';
import { ogImageUrl } from '@shared/config/contact.config';

@Component({
	selector: 'app-not-found-page',
	standalone: true,
	imports: [RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './[...].page.html',
	styleUrl: './[...].page.css',
})
export default class NotFoundPage {
	readonly i18n = inject(I18nService);

	constructor() {
		setupPageSeo((t) => ({
			title: t('seo.404.title'),
			description: t('seo.404.description'),
			ogImage: ogImageUrl(t('seo.404.title'), t('seo.404.description'), 'error'),
		}));
	}
}
