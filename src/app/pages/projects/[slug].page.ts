import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { toSignal } from '@angular/core/rxjs-interop';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { setupPageSeo } from '@shared/lib/seo/page-seo';
import { ogImageUrl } from '@shared/config/contact.config';

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
export default class CaseStudyPage {
	readonly i18n = inject(I18nService);

	// injectContent() resolves via a Promise even when the file exists, so caseStudy()
	// stays null for at least one tick — isNotFound must react to that, not read it once.
	readonly caseStudy = toSignal(injectContent<CaseStudyAttributes>(), {
		initialValue: null,
	});
	readonly isNotFound = computed(() => {
		const study = this.caseStudy();
		return study !== null && !study.attributes?.title;
	});

	constructor() {
		setupPageSeo((t) => {
			const study = this.caseStudy();
			if (study === null) return null;

			if (!study.attributes?.title) {
				return { title: t('seo.404.title'), description: t('seo.404.description') };
			}

			const title = `${study.attributes.title} | Case Study | David Sandoval`;
			const description = study.attributes.description;
			return { title, description, ogImage: ogImageUrl(title, description, 'case-study') };
		});
	}
}
