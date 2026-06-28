import { render, screen } from '@testing-library/angular';
import { HeroComponent } from './hero.component';
import { provideRouter } from '@angular/router';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { signal } from '@angular/core';

describe('HeroComponent', () => {
	it('should render component details', async () => {
		const mockLangSignal = signal<'en' | 'es'>('en');
		const mockI18nService = {
			lang: mockLangSignal,
			t: () => (key: string) => {
				if (key === 'hero.typewriter.phrases') {
					return 'hello,world';
				}
				return key;
			},
		};

		await render(HeroComponent, {
			providers: [provideRouter([]), { provide: I18nService, useValue: mockI18nService }],
		});

		expect(screen.getByText('scroll')).toBeTruthy();
	});

	it('should render LinkedIn CTA with external link', async () => {
		const mockLangSignal = signal<'en' | 'es'>('en');
		const mockI18nService = {
			lang: mockLangSignal,
			t: () => (key: string) => key,
		};

		await render(HeroComponent, {
			providers: [provideRouter([]), { provide: I18nService, useValue: mockI18nService }],
		});

		const linkedin = screen.getByLabelText('LinkedIn profile — sandovaldavid');
		expect(linkedin).toBeTruthy();
		expect(linkedin.getAttribute('href')).toBe('https://www.linkedin.com/in/sandovaldavid');
		expect(linkedin.getAttribute('target')).toBe('_blank');
	});

	it('should render OSS card with GitHub link', async () => {
		const mockLangSignal = signal<'en' | 'es'>('en');
		const mockI18nService = {
			lang: mockLangSignal,
			t: () => (key: string) => key,
		};

		await render(HeroComponent, {
			providers: [provideRouter([]), { provide: I18nService, useValue: mockI18nService }],
		});

		const ossCard = screen.getByLabelText('Open source profile on GitHub');
		expect(ossCard).toBeTruthy();
		expect(ossCard.getAttribute('href')).toBe('https://github.com/sandovaldavid');
	});
});
