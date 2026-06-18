import { render, screen } from '@testing-library/angular';
import { MextThesisPitchComponent } from './mext-thesis-pitch.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { signal } from '@angular/core';

describe('MextThesisPitchComponent', () => {
	it('should render academic abstract and information details', async () => {
		const mockLangSignal = signal<'en' | 'es'>('en');

		await render(MextThesisPitchComponent, {
			providers: [
				{
					provide: I18nService,
					useValue: {
						lang: mockLangSignal,
						t: () => (key: string) => {
							if (key === 'mext.headline') return 'Recurrent Sequence Modeling';
							if (key === 'mext.abstract.title') return 'Abstract (IEEE-Style)';
							if (key === 'mext.abstract.body') return 'Abstract body proposal';
							return key;
						},
					},
				},
			],
		});

		// Check headings
		expect(screen.getByText('Recurrent Sequence Modeling')).toBeTruthy();
		expect(screen.getByText('Abstract (IEEE-Style)')).toBeTruthy();
		expect(screen.getByText(/Abstract body proposal/)).toBeTruthy();

		// Check author details
		expect(screen.getByText(/Juan David Sandoval Salvador/i)).toBeTruthy();
	});
});
