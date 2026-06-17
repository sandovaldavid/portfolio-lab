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
      providers: [
        provideRouter([]),
        { provide: I18nService, useValue: mockI18nService },
      ],
    });

    expect(screen.getByText('scroll')).toBeTruthy();
  });
});
