import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SeoService } from '@shared/lib/seo/seo.service';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SectionTitleComponent } from '@shared/ui/section-title/section-title.component';
import { SkillsSectionComponent } from '@widgets/skills-section/skills-section.component';

@Component({
	selector: 'app-skills-page',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SectionTitleComponent, SkillsSectionComponent],
	template: `
		<div class="max-w-7xl mx-auto px-4 sm:px-6 py-20">
			<app-section-title>{{ i18n.t()('title.skills') }}</app-section-title>
			<app-skills-section [compact]="false" />
		</div>
	`,
})
export default class SkillsPage implements OnInit {
	readonly i18n = inject(I18nService);
	private readonly seo = inject(SeoService);

	ngOnInit(): void {
		this.seo.updatePage({
			title: this.i18n.t()('seo.skills.title'),
			description: this.i18n.t()('seo.skills.description'),
			canonical: 'https://devsandoval.me/skills',
		});
	}
}
