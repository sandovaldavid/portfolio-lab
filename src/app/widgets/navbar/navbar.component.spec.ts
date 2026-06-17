import { render, screen } from '@testing-library/angular';
import { NavbarComponent } from './navbar.component';
import { provideRouter } from '@angular/router';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { ThemeService } from '@shared/lib/theme/theme.service';
import { signal } from '@angular/core';

describe('NavbarComponent', () => {
  it('should render brand logo and links', async () => {
    const mockThemeSignal = signal<'neon-dark' | 'navy-blue'>('neon-dark');
    const mockLangSignal = signal<'en' | 'es'>('en');

    await render(NavbarComponent, {
      providers: [
        provideRouter([]),
        {
          provide: ThemeService,
          useValue: { theme: mockThemeSignal, toggle: vi.fn() },
        },
        {
          provide: I18nService,
          useValue: {
            lang: mockLangSignal,
            toggleLang: vi.fn(),
            t: () => (key: string) => key,
          },
        },
      ],
    });

    expect(screen.getByText(/david_sandoval/)).toBeTruthy();
  });
});
