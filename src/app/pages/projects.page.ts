import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { setupPageSeo } from '@shared/lib/seo/page-seo';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { ogImageUrl } from '@shared/config/contact.config';
import { SectionTitleComponent } from '@shared/ui/section-title/section-title.component';
import { ProjectCardComponent } from '@entities/project/ui/project-card/project-card.component';
import { getProjectsData } from '@entities/project/model/project.data';

@Component({
	selector: 'app-projects-page',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SectionTitleComponent, ProjectCardComponent],
	templateUrl: './projects.page.html',
})
export default class ProjectsPage {
	readonly i18n = inject(I18nService);

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

	constructor() {
		setupPageSeo((t) => ({
			title: t('seo.projects.title'),
			description: t('seo.projects.description'),
			ogImage: ogImageUrl(t('seo.projects.title'), t('seo.projects.description'), 'projects'),
			canonical: 'https://devsandoval.me/projects',
		}));
	}
}
