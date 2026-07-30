import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { getExperienceData } from '@entities/experience/model/experience.data';

@Component({
	selector: 'app-resume-experience',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './resume-experience.component.html',
	styleUrl: './resume-experience.component.css',
})
export class ResumeExperienceComponent {
	readonly i18n = inject(I18nService);
	readonly visible = input(true);
	readonly visibleBullets = input<Record<string, number[]>>({});
	readonly toggleBullet = output<{ company: string; index: number }>();

	readonly experiences = () => getExperienceData(this.i18n.t());

	isBulletVisible(company: string, index: number): boolean {
		const bullets = this.visibleBullets();
		if (!bullets[company]) return true;
		return bullets[company].includes(index);
	}
}
