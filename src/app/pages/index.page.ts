import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { setupPageSeo } from '@shared/lib/seo/page-seo';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { ModeStateService } from '@shared/lib/mode/mode-state.service';
import { OWNER, ogImageUrl } from '@shared/config/contact.config';
import { HeroComponent } from '@widgets/hero/hero.component';
import { ProjectsGridComponent } from '@widgets/projects-grid/projects-grid.component';
import { SkillsSectionComponent } from '@widgets/skills-section/skills-section.component';
import { SectionTitleComponent } from '@shared/ui/section-title/section-title.component';
import { ScrollObserverDirective } from '@shared/lib/animation/scroll-observer.directive';
import { ChaosPlaygroundComponent } from '@widgets/chaos-playground/chaos-playground.component';
import { StarLedgerComponent } from '@widgets/star-ledger/star-ledger.component';
import { AboutSectionComponent } from '@widgets/about-section/about-section.component';
import { ExperienceTimelineComponent } from '@widgets/experience-timeline/experience-timeline.component';
import { GithubContributionsComponent } from '@widgets/github-contributions/github-contributions.component';
import { LstmPlaygroundComponent } from '@widgets/lstm-playground/lstm-playground.component';
import { MextThesisPitchComponent } from '@widgets/mext-thesis-pitch/mext-thesis-pitch.component';

@Component({
	selector: 'app-home',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		RouterLink,
		HeroComponent,
		ProjectsGridComponent,
		SkillsSectionComponent,
		SectionTitleComponent,
		ScrollObserverDirective,
		ChaosPlaygroundComponent,
		StarLedgerComponent,
		AboutSectionComponent,
		ExperienceTimelineComponent,
		GithubContributionsComponent,
		LstmPlaygroundComponent,
		MextThesisPitchComponent,
	],
	templateUrl: './index.page.html',
})
export default class HomePage {
	readonly i18n = inject(I18nService);
	readonly state = inject(ModeStateService);
	readonly emailHref = `mailto:${OWNER.email}`;

	constructor() {
		setupPageSeo((t) => ({
			title: t('seo.home.title'),
			description: t('seo.home.description'),
			ogImage: ogImageUrl(t('seo.home.title'), t('seo.home.description'), 'home'),
			canonical: 'https://devsandoval.me',
			jsonLd: {
				'@context': 'https://schema.org',
				'@type': 'Person',
				name: 'Juan David Sandoval',
				jobTitle: 'Software Engineer',
				url: 'https://devsandoval.me',
				email: 'contact@devsandoval.me',
				sameAs: ['https://github.com/sandovaldavid', 'https://www.linkedin.com/in/sandovaldavid'],
				worksFor: {
					'@type': 'Organization',
					name: 'Atena',
					url: 'https://atena.la',
				},
			},
		}));
	}
}
