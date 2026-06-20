import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BadgeComponent } from '@shared/ui/badge/badge.component';
import type { ExperienceItem } from '../../model/experience.model';

@Component({
	selector: 'app-experience-item',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [BadgeComponent],
	templateUrl: './experience-item.component.html',
	styleUrl: './experience-item.component.css',
})
export class ExperienceItemComponent {
	readonly item = input.required<ExperienceItem>();
}
