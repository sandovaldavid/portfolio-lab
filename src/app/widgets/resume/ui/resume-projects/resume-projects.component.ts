import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { getProjectsData } from '@entities/project/model/project.data';

@Component({
	selector: 'app-resume-projects',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './resume-projects.component.html',
	styleUrl: './resume-projects.component.css',
})
export class ResumeProjectsComponent {
	readonly i18n = inject(I18nService);
	readonly visible = input(true);
	readonly visibleProjects = input<string[]>([]);
	readonly toggleProject = output<string>();

	readonly projects = () => getProjectsData(this.i18n.t());

	isProjectVisible(title: string): boolean {
		const visible = this.visibleProjects();
		if (visible.length === 0) return true;
		return visible.includes(title);
	}
}
