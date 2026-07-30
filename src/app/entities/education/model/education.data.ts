import type { TranslationKey } from '@shared/config/i18n/en';
import type { EducationItem } from './education.model';

export function getEducationData(t: (key: TranslationKey) => string): EducationItem[] {
	return [
		{
			degree: t('education.unp.degree'),
			institution: t('education.unp.institution'),
			date: t('education.unp.date'),
			location: t('education.unp.location'),
			description: t('education.unp.description').split('|'),
		},
	];
}
