import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TechPillComponent } from '@shared/ui/tech-pill/tech-pill.component';
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

	readonly indexLabel = computed(() => String(this.cardIndex() + 1).padStart(2, '0'));

	readonly visibleTags = computed(() => this.project().tags.slice(0, MAX_TAGS));

	readonly hiddenTagsCount = computed(() => Math.max(0, this.project().tags.length - MAX_TAGS));
}
