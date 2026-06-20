import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { getProjectsData } from '@entities/project/model/project.data';

@Component({
	selector: 'app-resume-projects',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		@if (visible()) {
			<section class="resume-section">
				<h2 class="resume-section-title">{{ i18n.t()('resume.section.projects') }}</h2>
				<hr class="section-rule" />
				@for (project of projects(); track project.title) {
					@if (isProjectVisible(project.title)) {
						<div
						class="project-item"
						role="button"
						tabindex="0"
						(click)="toggleProject.emit(project.title)"
						(keyup.enter)="toggleProject.emit(project.title)"
					>
							<div class="project-header">
								<span class="project-title">{{ project.title }}</span>
								@if (project.link) {
									<a
										[href]="project.link"
										target="_blank"
										rel="noopener"
										class="project-link"
										(click)="$event.stopPropagation()"
										>↗ Live</a
									>
								}
								@if (project.github) {
									<a
										[href]="project.github"
										target="_blank"
										rel="noopener"
										class="project-link"
										(click)="$event.stopPropagation()"
										>GitHub</a
									>
								}
							</div>
							<p class="project-desc">{{ project.description }}</p>
							<div class="project-tech">
								@for (tag of project.tags; track tag.name) {
									<span class="tech-tag">{{ tag.name }}</span>
								}
							</div>
						</div>
					} @else {
						<div
						class="project-item project-hidden"
						role="button"
						tabindex="0"
						(click)="toggleProject.emit(project.title)"
						(keyup.enter)="toggleProject.emit(project.title)"
					>
							<span class="bullet-restore">+ {{ project.title }} (hidden — click to show)</span>
						</div>
					}
				}
			</section>
		}
	`,
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
