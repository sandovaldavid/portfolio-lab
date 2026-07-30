import type { Technology } from '@entities/technology/model/technology.model';
import { TAGS } from '@entities/technology/model/technology.model';

export type ResumeStyle = 'ats' | 'harvard' | 'modern';
export type ResumeSection = 'summary' | 'experience' | 'education' | 'projects' | 'skills';

export const SKILL_CATEGORIES: { label: string; techs: Technology[] }[] = [
	{
		label: 'Frontend',
		techs: [TAGS.ANGULAR, TAGS.TYPESCRIPT, TAGS.REACT, TAGS.NEXTJS, TAGS.TAILWIND, TAGS.RXJS],
	},
	{
		label: 'Backend',
		techs: [
			TAGS.DOTNET,
			TAGS.CSHARP,
			TAGS.PYTHON,
			TAGS.DJANGO,
			TAGS.JAVA,
			TAGS.SPRING,
			TAGS.EXPRESS,
		],
	},
	{
		label: 'Databases',
		techs: [TAGS.POSTGRESQL, TAGS.SQLSERVER, TAGS.MYSQL, TAGS.SQLITE],
	},
	{
		label: 'Tools & DevOps',
		techs: [TAGS.AZURE, TAGS.ASTRO, TAGS.WORDPRESS, TAGS.CLOUDINARY],
	},
];

export const ALL_SECTIONS: ResumeSection[] = [
	'summary',
	'experience',
	'education',
	'projects',
	'skills',
];

export interface ResumeState {
	style: ResumeStyle;
	visibleSections: ResumeSection[];
	visibleBullets: Record<string, number[]>;
	visibleProjects: string[];
	visibleSkills: string[];
}
