import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	computed,
	inject,
	signal,
} from '@angular/core';
import { SeoService } from '@shared/lib/seo/seo.service';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SectionTitleComponent } from '@shared/ui/section-title/section-title.component';
import { ProjectCardComponent } from '@entities/project/ui/project-card.component';
import { getProjectsData } from '@entities/project/model/project.data';

@Component({
	selector: 'app-projects-page',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SectionTitleComponent, ProjectCardComponent],
	template: `
		<div class="max-w-7xl mx-auto px-4 sm:px-6 py-20">
			<app-section-title>{{ i18n.t()('title.projects.all') }}</app-section-title>

			<!-- Category filter -->
			<div
				class="flex flex-wrap gap-3 mb-10"
				role="group"
				[attr.aria-label]="i18n.t()('projects.filter-label')"
			>
				<button
					(click)="activeFilter.set('all')"
					class="font-mono text-sm px-4 py-2 cursor-pointer transition-all duration-150 border"
					[class]="
						activeFilter() === 'all'
							? 'border-[--color-primary] bg-[--color-primary] text-[--color-bg] font-bold'
							: 'border-[--color-border] text-[--color-muted] hover:border-[--color-primary] hover:text-[--color-text]'
					"
					[attr.aria-pressed]="activeFilter() === 'all'"
				>
					All
				</button>
				@for (cat of categories(); track cat) {
					<button
						(click)="activeFilter.set(cat)"
						class="font-mono text-sm px-4 py-2 cursor-pointer transition-all duration-150 border"
						[class]="
							activeFilter() === cat
								? 'border-[--color-primary] bg-[--color-primary] text-[--color-bg] font-bold'
								: 'border-[--color-border] text-[--color-muted] hover:border-[--color-primary] hover:text-[--color-text]'
						"
						[attr.aria-pressed]="activeFilter() === cat"
					>
						{{ cat }}
					</button>
				}
			</div>

			<!-- Projects grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
				@for (project of filteredProjects(); track project.title; let i = $index) {
					<app-project-card [project]="project" [cardIndex]="i" />
				}
			</div>

			@if (filteredProjects().length === 0) {
				<div class="text-center py-16">
					<p class="text-sm font-mono text-[--color-muted]">// no projects found</p>
				</div>
			}
		</div>
	`,
})
export default class ProjectsPage implements OnInit {
	readonly i18n = inject(I18nService);
	private readonly seo = inject(SeoService);

	readonly activeFilter = signal<string>('all');

	readonly allProjects = computed(() => getProjectsData(this.i18n.t()));

	readonly categories = computed(() => [
		...new Set(
			this.allProjects()
				.map((p) => p.category)
				.filter((c): c is string => !!c)
		),
	]);

	readonly filteredProjects = computed(() => {
		const filter = this.activeFilter();
		return filter === 'all'
			? this.allProjects()
			: this.allProjects().filter((p) => p.category === filter);
	});

	ngOnInit(): void {
		this.seo.updatePage({
			title: this.i18n.t()('seo.projects.title'),
			description: this.i18n.t()('seo.projects.description'),
			canonical: 'https://devsandoval.me/projects',
		});
	}
}
