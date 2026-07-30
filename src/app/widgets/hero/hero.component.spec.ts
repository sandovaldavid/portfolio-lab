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

	it('should restart the typewriter with the new language phrases when language changes', async () => {
		vi.useFakeTimers();
		try {
			const mockLangSignal = signal<'en' | 'es'>('en');
			const mockI18nService = {
				lang: mockLangSignal,
				t: () => (key: string) => {
					if (key === 'hero.typewriter.phrases') {
						return mockLangSignal() === 'en' ? 'alpha' : 'beta';
					}
					return key;
				},
			};

			const { fixture } = await render(HeroComponent, {
				providers: [provideRouter([]), { provide: I18nService, useValue: mockI18nService }],
			});

			// the initial effect run types the first char of 'alpha' synchronously
			expect(fixture.componentInstance.displayedText()).toBe('a');

			vi.advanceTimersByTime(110);
			fixture.detectChanges();
			expect(fixture.componentInstance.displayedText()).toBe('al');

			mockLangSignal.set('es');
			fixture.detectChanges();

			// switching language resets and retypes the first char of 'beta'
			expect(fixture.componentInstance.displayedText()).toBe('b');
		} finally {
			vi.useRealTimers();
		}
	});
});
