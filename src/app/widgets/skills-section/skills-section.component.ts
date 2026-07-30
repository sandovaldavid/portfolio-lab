import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TechPillComponent } from '@shared/ui/tech-pill/tech-pill.component';
import { FEATURED_TECHS } from '@entities/technology/model/technology.model';
import { ScrollObserverDirective } from '@shared/lib/animation/scroll-observer.directive';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import type { TranslationKey } from '@shared/config/i18n/en';

interface SkillItem {
	name: string;
	suffix?: string;
}

interface DomainCategory {
	key: string;
	titleKey: TranslationKey;
	descKey: TranslationKey;
	icon: 'server' | 'brain' | 'monitor' | 'box';
	pills: SkillItem[];
}

const DOMAIN_CATEGORIES: DomainCategory[] = [
	{
		key: 'enterprise',
		titleKey: 'skills.category.enterprise',
		descKey: 'skills.category.enterprise.desc',
		icon: 'server',
		pills: [
			{ name: '.NET 9', suffix: 'Core' },
			{ name: 'Clean Architecture', suffix: 'Pattern' },
			{ name: 'CQRS', suffix: 'Pattern' },
			{ name: 'Entity Framework', suffix: 'ORM' },
			{ name: 'REST / gRPC', suffix: 'API' },
			{ name: 'Unit Testing', suffix: 'Quality' },
		],
	},
	{
		key: 'ai',
		titleKey: 'skills.category.ai',
		descKey: 'skills.category.ai.desc',
		icon: 'brain',
		pills: [
			{ name: 'Python', suffix: 'Lang' },
			{ name: 'TensorFlow', suffix: 'Framework' },
			{ name: 'Bi-LSTM', suffix: 'Model' },
			{ name: 'Keras', suffix: 'API' },
			{ name: 'NumPy / Pandas', suffix: 'Data' },
			{ name: 'Scikit-learn', suffix: 'ML' },
		],
	},
	{
		key: 'frontend',
		titleKey: 'skills.category.frontend-arch',
		descKey: 'skills.category.frontend-arch.desc',
		icon: 'monitor',
		pills: [
			{ name: 'Angular 21', suffix: 'Framework' },
			{ name: 'Signals', suffix: 'Reactivity' },
			{ name: 'Zoneless', suffix: 'Change Detection' },
			{ name: 'RxJS', suffix: 'Streams' },
			{ name: 'TypeScript', suffix: 'Lang' },
			{ name: 'Tailwind CSS', suffix: 'Styling' },
		],
	},
	{
		key: 'devops',
		titleKey: 'skills.category.devops',
		descKey: 'skills.category.devops.desc',
		icon: 'box',
		pills: [
			{ name: 'Docker', suffix: 'Container' },
			{ name: 'CI/CD', suffix: 'Pipeline' },
			{ name: 'PostgreSQL', suffix: 'Database' },
			{ name: 'Redis', suffix: 'Cache' },
			{ name: 'Nginx', suffix: 'Server' },
			{ name: 'Linux', suffix: 'OS' },
		],
	},
];

@Component({
	selector: 'app-skills-section',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TechPillComponent, ScrollObserverDirective],
	templateUrl: './skills-section.component.html',
	styleUrl: './skills-section.component.css',
})
export class SkillsSectionComponent {
	readonly compact = input(true);
	readonly i18n = inject(I18nService);
	readonly domainCategories = DOMAIN_CATEGORIES;

	readonly carouselTechs = computed(() => [...FEATURED_TECHS, ...FEATURED_TECHS]);
}
