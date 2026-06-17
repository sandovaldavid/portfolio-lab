import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '@shared/lib/seo/seo.service';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { ModeStateService } from '@shared/lib/mode/mode-state.service';
import { OWNER } from '@shared/config/contact.config';
import { HeroComponent } from '@widgets/hero/hero.component';
import { ProjectsGridComponent } from '@widgets/projects-grid/projects-grid.component';
import { SkillsSectionComponent } from '@widgets/skills-section/skills-section.component';
import { SectionTitleComponent } from '@shared/ui/section-title/section-title.component';
import { ScrollObserverDirective } from '@shared/lib/animation/scroll-observer.directive';
import { ChaosPlaygroundComponent } from '@widgets/chaos-playground/chaos-playground/chaos-playground.component';
import { StarLedgerComponent } from '@widgets/star-ledger/star-ledger/star-ledger.component';
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
    LstmPlaygroundComponent,
    MextThesisPitchComponent,
  ],
  template: `
    <!-- Hero -->
    <app-hero />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-24 py-20">
      
      @if (state.isArchitect()) {
        <!-- SYSTEM ARCHITECT MODE VIEW -->
        
        <!-- Featured Projects -->
        <section id="projects" aria-labelledby="projects-heading" appScrollObserver>
          <app-section-title id="projects-heading">
            {{ i18n.t()('title.projects') }}
          </app-section-title>
          <app-projects-grid [maxItems]="3" [showViewAll]="true" />
        </section>

        <!-- Tech Stack -->
        <section id="skills" aria-labelledby="skills-heading" appScrollObserver>
          <app-section-title id="skills-heading">
            {{ i18n.t()('title.technologies') }}
          </app-section-title>
          <app-skills-section [compact]="true" />
        </section>

        <!-- Chaos Engineering Simulation -->
        <section id="chaos" aria-labelledby="chaos-heading" appScrollObserver>
          <app-section-title id="chaos-heading">
            {{ i18n.t()('title.chaos-playground') }}
          </app-section-title>
          <p class="font-body text-sm text-[--color-muted] mb-6 -mt-4">
            {{ i18n.t()('chaos.subtitle') }}
          </p>
          <app-chaos-playground />
        </section>

        <!-- STAR Ledger Accomplishments -->
        <section id="star" aria-labelledby="star-heading" appScrollObserver>
          <app-section-title id="star-heading">
            {{ i18n.t()('title.star-ledger') }}
          </app-section-title>
          <p class="font-body text-sm text-[--color-muted] mb-6 -mt-4">
            {{ i18n.t()('star.subtitle') }}
          </p>
          <app-star-ledger />
        </section>

        <!-- Current role CTA -->
        <section
          class="surface-card p-8 md:p-12 text-center space-y-5 relative overflow-hidden"
          aria-label="Current role at Atena"
          appScrollObserver
        >
          <p class="font-pixel text-xs text-[--color-muted] tracking-widest uppercase">
            // {{ i18n.t()('title.current-role') }}
          </p>
          <h2 class="font-pixel text-3xl md:text-4xl text-[--color-primary]">
            Atena
          </h2>
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

      @if (state.isAcademic()) {
        <!-- RESEARCH FELLOW MODE VIEW -->
        
        <!-- LSTM Playground -->
        <section id="lstm" aria-label="LSTM Recurrent Cell simulation" appScrollObserver>
          <app-lstm-playground />
        </section>

        <!-- MEXT Thesis Abstract -->
        <section id="mext" aria-label="MEXT Research Proposal Abstract" appScrollObserver>
          <app-mext-thesis-pitch />
        </section>
      }

    </div>
  `,
})
export default class HomePage implements OnInit {
  readonly i18n = inject(I18nService);
  readonly state = inject(ModeStateService);
  readonly emailHref = `mailto:${OWNER.email}`;
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updatePage({
      title: this.i18n.t()('seo.home.title'),
      description: this.i18n.t()('seo.home.description'),
      canonical: 'https://devsandoval.me',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Juan David Sandoval',
        jobTitle: 'Software Engineer',
        url: 'https://devsandoval.me',
        email: 'contact@devsandoval.me',
        sameAs: [
          'https://github.com/sandovaldavid',
          'https://www.linkedin.com/in/sandovaldavid',
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Atena',
          url: 'https://atena.la',
        },
      },
    });
  }
}
