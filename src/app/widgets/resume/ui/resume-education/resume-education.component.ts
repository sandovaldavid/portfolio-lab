import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { getEducationData } from '@entities/education/model/education.data';

@Component({
	selector: 'app-resume-education',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './resume-education.component.html',
	styleUrl: './resume-education.component.css',
})
export class ResumeEducationComponent {
	readonly i18n = inject(I18nService);
	readonly visible = input(true);

	readonly education = () => getEducationData(this.i18n.t());
}
