import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { ProjectCardComponent } from '@entities/project/ui/project-card/project-card.component';
import { getProjectsData } from '@entities/project/model/project.data';
import { ScrollObserverDirective } from '@shared/lib/animation/scroll-observer.directive';

@Component({
	selector: 'app-projects-grid',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ProjectCardComponent, RouterLink, ScrollObserverDirective],
	templateUrl: './projects-grid.component.html',
	styleUrl: './projects-grid.component.css',
})
export class ProjectsGridComponent {
	readonly i18n = inject(I18nService);
	readonly maxItems = input<number | undefined>(undefined);
	readonly showViewAll = input(false);

	readonly projects = computed(() => {
		const all = getProjectsData(this.i18n.t());
		const limit = this.maxItems();
		return limit != null ? all.slice(0, limit) : all;
	});
}
