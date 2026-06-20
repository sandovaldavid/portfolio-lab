import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SKILL_CATEGORIES } from '../resume.types';

@Component({
	selector: 'app-resume-skills',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		@if (visible()) {
			<section class="resume-section">
				<h2 class="resume-section-title">{{ i18n.t()('resume.section.skills') }}</h2>
				<hr class="section-rule" />
				<div class="skills-grid">
					@for (category of categories; track category.label) {
						<div class="skill-category">
							<span class="skill-cat-label">{{ category.label }}:</span>
							<span class="skill-items">
								@for (tech of category.techs; track tech.name) {
									<span
										class="skill-chip"
										role="button"
										tabindex="0"
										[class.skill-chip-hidden]="!isSkillVisible(tech.name)"
										[attr.aria-pressed]="isSkillVisible(tech.name)"
										(click)="toggleSkill.emit(tech.name)"
										(keyup.enter)="toggleSkill.emit(tech.name)"
										(keyup.space)="toggleSkill.emit(tech.name)"
										[title]="isSkillVisible(tech.name) ? 'Click to hide' : 'Click to show'"
									>
										@if (tech.iconPath) {
											<img
												[src]="tech.iconPath"
												[alt]="tech.name"
												class="skill-icon"
												width="14"
												height="14"
											/>
										}
										{{ tech.name }}
									</span>
								}
							</span>
						</div>
					}
				</div>
			</section>
		}
	`,
})
export class ResumeSkillsComponent {
	readonly i18n = inject(I18nService);
	readonly visible = input(true);
	readonly visibleSkills = input<string[]>([]);
	readonly toggleSkill = output<string>();

	readonly categories = SKILL_CATEGORIES;

	isSkillVisible(name: string): boolean {
		const visible = this.visibleSkills();
		if (visible.length === 0) return true;
		return visible.includes(name);
	}
}
