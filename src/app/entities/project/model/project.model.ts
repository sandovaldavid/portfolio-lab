import type { Technology } from '@entities/technology/model/technology.model';

export interface ProjectItem {
	title: string;
	description: string;
	link?: string;
	github?: string;
	image: string;
	tags: Technology[];
	featured?: boolean;
	category?: string;
}
