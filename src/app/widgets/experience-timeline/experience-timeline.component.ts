import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { ExperienceItemComponent } from '@entities/experience/ui/experience-item.component';
import { getExperienceData } from '@entities/experience/model/experience.data';

@Component({
  selector: 'app-experience-timeline',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExperienceItemComponent],
  templateUrl: './experience-timeline.component.html',
  styleUrl: './experience-timeline.component.css',
})
export class ExperienceTimelineComponent {
  private readonly i18n = inject(I18nService);

  readonly activeTab = signal(0);
  readonly experiences = computed(() => getExperienceData(this.i18n.t()));
  readonly activeExperience = computed(() => this.experiences()[this.activeTab()]);

  tabClass(i: number): string {
    return i === this.activeTab()
      ? 'border-l-[--color-primary] border-l-2 text-[--color-primary] bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)]'
      : 'border-l-[--color-border] border-l-2 text-[--color-muted] hover:text-[--color-text] hover:border-l-[--color-border-light]';
  }
}
