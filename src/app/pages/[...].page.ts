import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SeoService } from '@shared/lib/seo/seo.service';
import { ogImageUrl } from '@shared/config/contact.config';

@Component({
	selector: 'app-not-found-page',
	standalone: true,
	imports: [RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './[...].page.html',
	styleUrl: './[...].page.css',
})
export default class NotFoundPage implements OnInit {
	readonly i18n = inject(I18nService);
	private readonly seo = inject(SeoService);

	ngOnInit(): void {
		const t = this.i18n.t();
		this.seo.updatePage({
			title: t('seo.404.title'),
			description: t('seo.404.description'),
			ogImage: ogImageUrl(t('seo.404.title'), t('seo.404.description'), 'error'),
		});
	}
}
