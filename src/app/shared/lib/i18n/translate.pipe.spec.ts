import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { TranslatePipe } from './translate.pipe';
import type { TranslationKey } from '@shared/config/i18n/en';

describe('TranslatePipe', () => {
	let pipe: TranslatePipe;

	beforeEach(() => {
		localStorage.clear();
		TestBed.configureTestingModule({
			providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
		});
		pipe = TestBed.runInInjectionContext(() => new TranslatePipe());
	});

	it('should translate an existing key', () => {
		const result = pipe.transform('hero.available' as TranslationKey);
		expect(result).toBeTruthy();
		expect(typeof result).toBe('string');
	});

	it('should return the key itself when the translation is missing', () => {
		const result = pipe.transform('nonexistent.key' as TranslationKey);
		expect(result).toBe('nonexistent.key');
	});
});
