import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { toSignal } from '@angular/core/rxjs-interop';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SeoService } from '@shared/lib/seo/seo.service';

export interface CaseStudyAttributes {
	title: string;
	description: string;
	date: string;
	category: string;
	tags: string[];
	image: string;
	project: string;
}

@Component({
	selector: 'app-case-study-page',
	standalone: true,
	imports: [RouterLink, MarkdownComponent, DatePipe],
	templateUrl: './[slug].page.html',
	styleUrl: './[slug].page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CaseStudyPage implements OnInit {
	readonly i18n = inject(I18nService);
	private readonly seo = inject(SeoService);

	readonly caseStudy = toSignal(injectContent<CaseStudyAttributes>(), {
		initialValue: null,
	});
	readonly isNotFound = signal(false);

	ngOnInit(): void {
		const study = this.caseStudy();
		if (!study || !study.attributes?.title) {
			this.isNotFound.set(true);
			this.seo.updatePage({
				title: this.i18n.t()('seo.404.title'),
				description: this.i18n.t()('seo.404.description'),
			});
		} else {
			this.seo.updatePage({
				title: `${study.attributes.title} | Case Study | David Sandoval`,
				description: study.attributes.description,
			});
		}
	}
}
