import { render, screen } from '@testing-library/angular';
import { ProjectsGridComponent } from './projects-grid.component';
import { provideRouter } from '@angular/router';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { signal } from '@angular/core';

describe('ProjectsGridComponent', () => {
	it('should render projects list', async () => {
		const mockLangSignal = signal<'en' | 'es'>('en');
		const mockI18nService = {
			lang: mockLangSignal,
			t: () => (key: string) => key,
		};

		await render(ProjectsGridComponent, {
			providers: [provideRouter([]), { provide: I18nService, useValue: mockI18nService }],
		});

		// It should render projects based on mock keys returned by the translate spy
		expect(screen.getByText('projects.campus-map.title')).toBeTruthy();
	});
});
