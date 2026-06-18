import type { TranslationKey } from '@shared/config/i18n/en';
import type { ExperienceItem } from './experience.model';

export function getExperienceData(t: (key: TranslationKey) => string): ExperienceItem[] {
	return [
		{
			date: t('experience.atena.date'),
			title: t('experience.atena.title'),
			company: t('experience.atena.company'),
			description: t('experience.atena.description').split('|'),
			technologies: t('experience.atena.technologies').split(','),
			current: true,
		},
		{
			date: t('experience.chirasoft.date'),
			title: t('experience.chirasoft.title'),
			company: t('experience.chirasoft.company'),
			description: t('experience.chirasoft.description').split('|'),
			technologies: t('experience.chirasoft.technologies').split(','),
		},
		{
			date: t('experience.programador-ti.date'),
			title: t('experience.programador-ti.title'),
			company: t('experience.programador-ti.company'),
			description: t('experience.programador-ti.description').split('|'),
			technologies: t('experience.programador-ti.technologies').split(','),
		},
	];
}
