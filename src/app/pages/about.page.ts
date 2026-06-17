import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SeoService } from '@shared/lib/seo/seo.service';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SectionTitleComponent } from '@shared/ui/section-title/section-title.component';
import { AboutSectionComponent } from '@widgets/about-section/about-section.component';

@Component({
	selector: 'app-about-page',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SectionTitleComponent, AboutSectionComponent],
	template: `
		<div class="max-w-4xl mx-auto px-4 sm:px-6 py-20">
			<app-section-title>{{ i18n.t()('title.about-me') }}</app-section-title>
			<app-about-section [compact]="false" />
		</div>
	`,
})
export default class AboutPage implements OnInit {
	readonly i18n = inject(I18nService);
	private readonly seo = inject(SeoService);

	ngOnInit(): void {
		this.seo.updatePage({
			title: this.i18n.t()('seo.about.title'),
			description: this.i18n.t()('seo.about.description'),
			canonical: 'https://devsandoval.me/about',
		});
	}
}
