import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TechPillComponent } from '@shared/ui/tech-pill/tech-pill.component';
import { FEATURED_TECHS, TAGS } from '@entities/technology/model/technology.model';
import type { Technology } from '@entities/technology/model/technology.model';
import { ScrollObserverDirective } from '@shared/lib/animation/scroll-observer.directive';

const TECH_CATEGORIES: { label: string; techs: Technology[] }[] = [
  {
    label: 'Frontend',
    techs: [TAGS.ANGULAR, TAGS.TYPESCRIPT, TAGS.REACT, TAGS.NEXTJS, TAGS.TAILWIND, TAGS.RXJS],
  },
  {
    label: 'Backend',
    techs: [TAGS.DOTNET, TAGS.CSHARP, TAGS.PYTHON, TAGS.DJANGO, TAGS.EXPRESS, TAGS.JAVASCRIPT, TAGS.JAVA, TAGS.SPRING],
  },
  {
    label: 'Databases',
    techs: [TAGS.POSTGRESQL, TAGS.SQLSERVER, TAGS.MYSQL, TAGS.SQLITE],
  },
  {
    label: 'Tools',
    techs: [TAGS.CLOUDINARY, TAGS.ASTRO, TAGS.BOOTSTRAP, TAGS.CHARTJS, TAGS.SANITY, TAGS.AZURE, TAGS.WORDPRESS],
  },
];

@Component({
  selector: 'app-skills-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TechPillComponent, ScrollObserverDirective],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.css',
})
export class SkillsSectionComponent {
  readonly compact = input(true);
  readonly techCategories = TECH_CATEGORIES;

  readonly carouselTechs = computed(() => [...FEATURED_TECHS, ...FEATURED_TECHS]);
}
