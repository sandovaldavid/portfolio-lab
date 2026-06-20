import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { I18nService } from '@shared/lib/i18n/i18n.service';

@Component({
	selector: 'app-resume-summary',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		@if (visible()) {
			<section class="resume-section">
				<h2 class="resume-section-title">{{ i18n.t()('resume.section.summary') }}</h2>
				<hr class="section-rule" />
				<p class="summary-text">{{ i18n.t()('resume.summary') }}</p>
			</section>
		}
	`,
})
export class ResumeSummaryComponent {
	readonly i18n = inject(I18nService);
	readonly visible = input(true);
}
