import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TechPillComponent } from '@shared/ui/tech-pill/tech-pill.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import type { ProjectItem } from '../../model/project.model';

const MAX_TAGS = 4;

@Component({
	selector: 'app-project-card',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TechPillComponent],
	templateUrl: './project-card.component.html',
	styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
	readonly project = input.required<ProjectItem>();
	readonly cardIndex = input(0);

	private readonly i18n = inject(I18nService);

	readonly indexLabel = computed(() => String(this.cardIndex() + 1).padStart(2, '0'));

	readonly visibleTags = computed(() => this.project().tags.slice(0, MAX_TAGS));

	readonly hiddenTagsCount = computed(() => Math.max(0, this.project().tags.length - MAX_TAGS));

	readonly hasMetrics = computed(() =>
		Boolean(this.project().metrics?.length || this.project().lighthouse)
	);

	readonly lighthouseAverage = computed(() => {
		const scores = this.project().lighthouse;
		if (!scores) return null;
		return Math.round(
			(scores.performance + scores.accessibility + scores.bestPractices + scores.seo) / 4
		);
	});

	readonly t = () => this.i18n.t();
}
