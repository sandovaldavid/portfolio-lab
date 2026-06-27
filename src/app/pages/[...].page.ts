import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SeoService } from '@shared/lib/seo/seo.service';

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
		this.seo.updatePage({
			title: this.i18n.t()('seo.404.title'),
			description: this.i18n.t()('seo.404.description'),
		});
	}
}
