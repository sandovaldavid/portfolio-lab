import { TAGS } from '@entities/technology/model/technology.model';
import type { ProjectItem } from './project.model';

export function getProjectsData(t: (key: string) => string): ProjectItem[] {
	return [
		{
			title: t('projects.campus-map.title'),
			description: t('projects.campus-map.description'),
			link: 'https://mapa-unp.devsandoval.me',
			github: 'https://github.com/dev-sandoval/unp-campus-map',
			image: '/projects/project-08-campus-map.png',
			tags: [TAGS.NEXTJS, TAGS.JAVASCRIPT, TAGS.TAILWIND, TAGS.CLOUDINARY, TAGS.MYSQL],
			featured: true,
			category: t('projects.category.fullstack'),
		},
		{
			title: t('projects.madai.title'),
			description: t('projects.madai.description'),
			github: 'https://github.com/dev-sandoval/MAD-AI',
			image: '/projects/project-10-MAD-AI.webp',
			tags: [TAGS.ANGULAR, TAGS.TYPESCRIPT, TAGS.TAILWIND, TAGS.RXJS, TAGS.DJANGO, TAGS.PYTHON],
			featured: true,
			category: t('projects.category.fullstack'),
		},
		{
			title: t('projects.fluentreads.title'),
			description: t('projects.fluentreads.description'),
			link: 'https://fluentreads.vercel.app',
			github: 'https://github.com/dev-sandoval/fluentreads',
			image: '/projects/project-09-fluentreads.webp',
			tags: [TAGS.ASTRO, TAGS.REACT, TAGS.TAILWIND, TAGS.TYPESCRIPT],
			category: t('projects.category.frontend'),
		},
		{
			title: t('projects.auctions.title'),
			description: t('projects.auctions.description'),
			link: 'https://auctions.devsandoval.me',
			github: 'https://github.com/sandovaldavid/project-02-auctions',
			image: '/projects/project-02-auctions.webp',
			tags: [TAGS.DJANGO, TAGS.PYTHON, TAGS.BOOTSTRAP, TAGS.JAVASCRIPT, TAGS.POSTGRESQL],
			category: t('projects.category.fullstack'),
		},
	];
}
