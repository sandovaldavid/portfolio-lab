import { render, screen } from '@testing-library/angular';
import { ProjectCardComponent } from './project-card.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import type { ProjectItem } from '../../model/project.model';

describe('ProjectCardComponent', () => {
	const mockProject: ProjectItem = {
		title: 'My Awesome Project',
		description: 'This is a description of my awesome project.',
		image: 'assets/project.png',
		tags: [{ name: 'Angular' }, { name: 'TypeScript' }],
		github: 'https://github.com/example/project',
		link: 'https://example.com',
	};

	const mockI18nService = {
		lang: signal<'en' | 'es'>('en'),
		t: () => (key: string) => key,
	};

	it('should render project title and description', async () => {
		await render(ProjectCardComponent, {
			inputs: {
				project: mockProject,
			},
			providers: [{ provide: I18nService, useValue: mockI18nService }, provideRouter([])],
		});

		expect(screen.getByText('My Awesome Project')).toBeTruthy();
		expect(screen.getByText('This is a description of my awesome project.')).toBeTruthy();
	});

	it('should render metrics and lighthouse average', async () => {
		const projectWithMetrics: ProjectItem = {
			...mockProject,
			metrics: [
				{ labelKey: 'projects.metric.users', value: '1.2k' },
				{ labelKey: 'projects.metric.stars', value: '42' },
			],
			lighthouse: { performance: 90, accessibility: 100, bestPractices: 100, seo: 95 },
		};

		await render(ProjectCardComponent, {
			inputs: {
				project: projectWithMetrics,
			},
			providers: [{ provide: I18nService, useValue: mockI18nService }, provideRouter([])],
		});

		expect(screen.getByText('1.2k')).toBeTruthy();
		expect(screen.getByText('42')).toBeTruthy();
		expect(screen.getByText('96')).toBeTruthy();
	});
});
