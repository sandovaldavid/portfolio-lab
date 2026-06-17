import { render, screen } from '@testing-library/angular';
import { FooterComponent } from './footer.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { signal } from '@angular/core';

describe('FooterComponent', () => {
  it('should render copyright and stack details', async () => {
    const mockLangSignal = signal<'en' | 'es'>('en');

    await render(FooterComponent, {
      providers: [
        {
          provide: I18nService,
          useValue: {
            lang: mockLangSignal,
            t: () => (key: string) => {
              if (key === 'footer.built-with') return 'Built with Angular + Analog';
              return key;
            },
          },
        },
      ],
    });
    expect(screen.getByText('Built with Angular + Analog')).toBeTruthy();
    expect(screen.getByText(/David Sandoval/)).toBeTruthy();
  });
});
