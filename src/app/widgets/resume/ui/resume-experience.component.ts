import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { getExperienceData } from '@entities/experience/model/experience.data';

@Component({
	selector: 'app-resume-experience',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		@if (visible()) {
			<section class="resume-section">
				<h2 class="resume-section-title">{{ i18n.t()('resume.section.experience') }}</h2>
				<hr class="section-rule" />
				@for (item of experiences(); track item.company) {
					<div class="experience-item">
						<div class="exp-header">
							<div>
								<span class="exp-title">{{ item.title }}</span>
								<span class="exp-company"> · {{ item.company }}</span>
							</div>
							<span class="exp-date">{{ item.date }}</span>
						</div>
						<ul class="exp-bullets">
							@for (bullet of item.description; track $index) {
								@if (isBulletVisible(item.company, $index)) {
									<li
										class="exp-bullet"
										role="button"
										tabindex="0"
										(click)="toggleBullet.emit({ company: item.company, index: $index })"
										(keyup.enter)="toggleBullet.emit({ company: item.company, index: $index })"
										title="Click to hide"
									>
										{{ bullet }}
									</li>
								} @else {
									<li
										class="exp-bullet bullet-hidden"
										role="button"
										tabindex="0"
										(click)="toggleBullet.emit({ company: item.company, index: $index })"
										(keyup.enter)="toggleBullet.emit({ company: item.company, index: $index })"
										title="Click to show"
									>
										<span class="bullet-restore">+ show hidden bullet</span>
									</li>
								}
							}
						</ul>
						<div class="exp-tech">
							@for (tech of item.technologies; track tech) {
								<span class="tech-tag">{{ tech }}</span>
							}
						</div>
					</div>
				}
			</section>
		}
	`,
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
