import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { en, type TranslationKey } from '@shared/config/i18n/en';
import { es } from '@shared/config/i18n/es';

export type Language = 'en' | 'es';

const STORAGE_KEY = 'portfolio_lang';
const DEFAULT_LANG: Language = 'es';

@Injectable({ providedIn: 'root' })
export class I18nService {
	private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

	readonly lang = signal<Language>(this._getInitialLang());

	readonly t = computed(() => {
		const dict = this.lang() === 'en' ? en : es;
		return (key: TranslationKey): string => dict[key] ?? key;
	});

	setLang(lang: Language): void {
		this.lang.set(lang);
		if (this.isBrowser) {
			localStorage.setItem(STORAGE_KEY, lang);
			document.documentElement.lang = lang;
		}
	}

	toggleLang(): void {
		this.setLang(this.lang() === 'en' ? 'es' : 'en');
	}

	private _getInitialLang(): Language {
		if (this.isBrowser) {
			const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
			if (stored === 'en' || stored === 'es') return stored;
		}
		return DEFAULT_LANG;
	}
}
