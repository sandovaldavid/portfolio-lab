import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SKILL_CATEGORIES } from '../../resume.types';

@Component({
	selector: 'app-resume-skills',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './resume-skills.component.html',
	styleUrl: './resume-skills.component.css',
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
