import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { getEducationData } from '@entities/education/model/education.data';

@Component({
	selector: 'app-resume-education',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		@if (visible()) {
			<section class="resume-section">
				<h2 class="resume-section-title">{{ i18n.t()('resume.section.education') }}</h2>
				<hr class="section-rule" />
				@for (item of education(); track item.institution) {
					<div class="education-item">
						<div class="edu-header">
							<div>
								<span class="edu-degree">{{ item.degree }}</span>
								<span class="edu-institution"> · {{ item.institution }}</span>
							</div>
							<span class="edu-date">{{ item.date }}</span>
						</div>
						<p class="edu-location">{{ item.location }}</p>
						@if (item.description) {
							<ul class="edu-bullets">
								@for (line of item.description; track $index) {
									<li>{{ line }}</li>
								}
							</ul>
						}
					</div>
				}
			</section>
		}
	`,
})
export class ResumeEducationComponent {
	readonly i18n = inject(I18nService);
	readonly visible = input(true);

	readonly education = () => getEducationData(this.i18n.t());
}
