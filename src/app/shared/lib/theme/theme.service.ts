import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type Theme = 'neon-dark' | 'navy-blue';

const THEME_STORAGE_KEY = 'portfolio_theme';
const DEFAULT_THEME: Theme = 'neon-dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<Theme>(this._getInitialTheme());

  apply(): void {
    this.setTheme(this.theme());
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    if (this.isBrowser) {
      this.doc.documentElement.className = `theme-${theme}`;
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }

  toggle(): void {
    this.setTheme(this.theme() === 'neon-dark' ? 'navy-blue' : 'neon-dark');
  }

  private _getInitialTheme(): Theme {
    if (this.isBrowser) {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (stored === 'neon-dark' || stored === 'navy-blue') return stored;
    }
    return DEFAULT_THEME;
  }
}
