import { render, screen } from '@testing-library/angular';
import { AboutSectionComponent } from './about-section.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { signal } from '@angular/core';

describe('AboutSectionComponent', () => {
	it('should render details', async () => {
		const mockLangSignal = signal<'en' | 'es'>('en');
		const mockI18nService = {
			lang: mockLangSignal,
			t: () => (key: string) => key,
		};

		await render(AboutSectionComponent, {
			providers: [{ provide: I18nService, useValue: mockI18nService }],
		});

		expect(screen.getByText('about-me.currently-focused')).toBeTruthy();
	});
});
