import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { I18nService } from '@shared/lib/i18n/i18n.service';

@Component({
	selector: 'app-resume-summary',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './resume-summary.component.html',
	styleUrl: './resume-summary.component.css',
})
export class ResumeSummaryComponent {
	readonly i18n = inject(I18nService);
	readonly visible = input(true);
}
