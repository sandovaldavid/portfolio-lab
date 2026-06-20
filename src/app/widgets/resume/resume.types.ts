export type ResumeStyle = 'ats' | 'harvard' | 'modern';
export type ResumeSection = 'summary' | 'experience' | 'education' | 'projects' | 'skills';

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
