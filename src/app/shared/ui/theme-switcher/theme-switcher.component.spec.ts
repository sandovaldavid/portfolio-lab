import { render, screen, fireEvent } from '@testing-library/angular';
import { ThemeSwitcherComponent } from './theme-switcher.component';
import { ThemeService } from '@shared/lib/theme/theme.service';
import { signal } from '@angular/core';

describe('ThemeSwitcherComponent', () => {
  it('should toggle theme when clicked', async () => {
    const mockThemeSignal = signal<'neon-dark' | 'navy-blue'>('neon-dark');
    const mockThemeService = {
      theme: mockThemeSignal,
      toggle: vi.fn(() => {
        mockThemeSignal.set(mockThemeSignal() === 'neon-dark' ? 'navy-blue' : 'neon-dark');
      }),
    };

    await render(ThemeSwitcherComponent, {
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
      ],
    });

    const button = screen.getByRole('button');
    expect(button.textContent).toContain('[◈ CYAN]');

    fireEvent.click(button);
    expect(mockThemeService.toggle).toHaveBeenCalled();
    expect(button.textContent).toContain('[◈ NAVY]');
  });
});
