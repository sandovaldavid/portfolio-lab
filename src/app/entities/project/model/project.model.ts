import type { TranslationKey } from '@shared/config/i18n/en';
import type { Technology } from '@entities/technology/model/technology.model';

export interface ProjectMetric {
	labelKey: TranslationKey;
	value: string;
}

export interface LighthouseScores {
	performance: number;
	accessibility: number;
	bestPractices: number;
	seo: number;
}

export interface ProjectItem {
	title: string;
	description: string;
	link?: string;
	github?: string;
	image: string;
	tags: Technology[];
	featured?: boolean;
	category?: string;
	caseStudy?: string;
	metrics?: ProjectMetric[];
	lighthouse?: LighthouseScores;
}
