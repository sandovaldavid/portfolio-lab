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
	template: `
		<!-- Hero -->
		<app-hero />

		<div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-28 py-20">
			<!-- STAR Ledger Accomplishments (protagonist section in architect mode) -->
			@if (state.isArchitect()) {
				<section id="star" class="scroll-mt-36" aria-labelledby="star-heading" appScrollObserver>
					@defer (on viewport) {
						<app-star-ledger [prominent]="true" />
					} @placeholder {
						<div class="h-96 surface-card animate-pulse flex items-center justify-center">
							<span class="font-pixel text-xs text-[--color-muted]"
								>Loading accomplishments...</span
							>
						</div>
					}
				</section>
			}

			<!-- LSTM Cell Playground (protagonist section in research mode) -->
			@if (state.isAcademic()) {
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
							<span class="font-pixel text-xs text-[--color-muted]"
								>Loading LSTM simulation...</span
							>
						</div>
					}
				</section>
			}

			<!-- About Section -->
			<section id="about" class="scroll-mt-36" aria-labelledby="about-heading" appScrollObserver>
				<app-section-title id="about-heading">
					{{ i18n.t()('title.about-me') }}
				</app-section-title>
				<app-about-section [compact]="true" />
				<div class="mt-8 text-center">
					<a
						routerLink="/about"
						class="inline-flex items-center gap-2 font-pixel text-xs px-6 py-3.5 border border-[--color-primary] text-[--color-primary] hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] transition-all duration-150 active:translate-y-[1px]"
					>
						{{ i18n.t()('home.about.view-full') }} &gt;
					</a>
				</div>
			</section>

			<!-- GitHub Contributions -->
			<section
				id="contributions"
				class="scroll-mt-36"
				aria-labelledby="contributions-heading"
				appScrollObserver
			>
				<app-section-title id="contributions-heading">
					{{ i18n.t()('contributions.title') }}
				</app-section-title>
				<app-github-contributions />
			</section>

			<!-- Experience Section -->
			<section
				id="experience"
				class="scroll-mt-36"
				aria-labelledby="experience-heading"
				appScrollObserver
			>
				<app-section-title id="experience-heading">
					{{ i18n.t()('title.experience') }}
				</app-section-title>
				<app-experience-timeline />
				<div class="mt-8 text-center">
					<a
						routerLink="/experience"
						class="inline-flex items-center gap-2 font-pixel text-xs px-6 py-3.5 border border-[--color-primary] text-[--color-primary] hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] transition-all duration-150 active:translate-y-[1px]"
					>
						{{ i18n.t()('home.experience.view-full') }} &gt;
					</a>
				</div>
			</section>

			<!-- Mode-Specific Interactive Sections -->
			@if (state.isArchitect()) {
				<!-- Chaos Engineering Simulation -->
				<section id="chaos" class="scroll-mt-36" aria-labelledby="chaos-heading" appScrollObserver>
					<app-section-title id="chaos-heading">
						{{ i18n.t()('title.chaos-playground') }}
					</app-section-title>
					<p class="font-body text-sm text-[--color-muted] mb-6 -mt-4">
						{{ i18n.t()('chaos.subtitle') }}
					</p>
					@defer (on viewport) {
						<app-chaos-playground />
					} @placeholder {
						<div class="h-96 surface-card animate-pulse flex items-center justify-center">
							<span class="font-pixel text-xs text-[--color-muted]"
								>Loading chaos simulation...</span
							>
						</div>
					}
				</section>
			}

			@if (state.isAcademic()) {
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
			}

			<!-- Featured Projects Section -->
			<section
				id="projects"
				class="scroll-mt-36"
				aria-labelledby="projects-heading"
				appScrollObserver
			>
				<app-section-title id="projects-heading">
					{{ i18n.t()('title.projects') }}
				</app-section-title>
				<app-projects-grid [maxItems]="3" [showViewAll]="false" />
				<div class="mt-8 text-center">
					<a
						routerLink="/projects"
						class="inline-flex items-center gap-2 font-pixel text-xs px-6 py-3.5 border border-[--color-primary] text-[--color-primary] hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] transition-all duration-150 active:translate-y-[1px]"
					>
						{{ i18n.t()('home.projects.view-full') }} &gt;
					</a>
				</div>
			</section>

			<!-- Tech Stack Section -->
			<section id="skills" class="scroll-mt-36" aria-labelledby="skills-heading" appScrollObserver>
				<app-section-title id="skills-heading">
					{{ i18n.t()('title.technologies') }}
				</app-section-title>
				<app-skills-section [compact]="true" />
				<div class="mt-8 text-center">
					<a
						routerLink="/skills"
						class="inline-flex items-center gap-2 font-pixel text-xs px-6 py-3.5 border border-[--color-primary] text-[--color-primary] hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] transition-all duration-150 active:translate-y-[1px]"
					>
						{{ i18n.t()('home.skills.view-full') }} &gt;
					</a>
				</div>
			</section>

			<!-- Current role CTA -->
			@if (state.isArchitect()) {
				<section
					class="surface-card p-8 md:p-12 text-center space-y-5 relative overflow-hidden"
					aria-label="Current role at Atena"
					appScrollObserver
				>
					<p class="font-pixel text-xs text-[--color-muted] tracking-widest uppercase">
						// {{ i18n.t()('title.current-role') }}
					</p>
					<h2 class="font-pixel text-3xl md:text-4xl text-[--color-primary]">Atena</h2>
					<p class="font-body text-base text-[--color-muted] max-w-md mx-auto leading-relaxed">
						{{ i18n.t()('hero.company-desc') }}
					</p>
					<div class="flex flex-wrap justify-center gap-4 pt-2">
						<a
							routerLink="/experience"
							class="inline-flex items-center font-pixel text-sm text-[--color-primary] px-6 py-3 card-border-primary hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] transition-colors duration-150"
						>
							{{ i18n.t()('experience.view-all') }}
						</a>
						<a
							[href]="emailHref"
							class="inline-flex items-center font-pixel text-sm bg-[--color-primary] text-[--color-bg] px-6 py-3 hover:brightness-110 transition-all duration-150 active:translate-y-[1px]"
						>
							{{ i18n.t()('footer.cta-button') }}
						</a>
					</div>
				</section>
			}
		</div>
	`,
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
