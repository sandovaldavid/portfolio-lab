import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { setupPageSeo } from './page-seo';
import { SeoService } from './seo.service';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import type { TranslationKey } from '@shared/config/i18n/en';

describe('setupPageSeo', () => {
	it('calls updatePage on setup', () => {
		const lang = signal<'en' | 'es'>('en');
		const updatePage = vi.fn();

		TestBed.configureTestingModule({
			providers: [
				{ provide: SeoService, useValue: { updatePage } },
				{
					provide: I18nService,
					useValue: {
						lang,
						t: () => (key: TranslationKey) => `${lang()}:${key}`,
					},
				},
			],
		});

		TestBed.runInInjectionContext(() => {
			setupPageSeo((t) => ({
				title: t('seo.about.title'),
				description: 'a description',
			}));
		});
		TestBed.tick();

		expect(updatePage).toHaveBeenCalledWith({
			title: 'en:seo.about.title',
			description: 'a description',
		});
	});

	it('re-runs updatePage when the language signal changes', () => {
		const lang = signal<'en' | 'es'>('en');
		const updatePage = vi.fn();

		TestBed.configureTestingModule({
			providers: [
				{ provide: SeoService, useValue: { updatePage } },
				{
					provide: I18nService,
					useValue: {
						lang,
						t: () => (key: TranslationKey) => `${lang()}:${key}`,
					},
				},
			],
		});

		TestBed.runInInjectionContext(() => {
			setupPageSeo((t) => ({
				title: t('seo.about.title'),
				description: 'a description',
			}));
		});
		TestBed.tick();
		updatePage.mockClear();

		lang.set('es');
		TestBed.tick();

		expect(updatePage).toHaveBeenCalledWith({
			title: 'es:seo.about.title',
			description: 'a description',
		});
	});

	it('skips updatePage when build returns null', () => {
		const lang = signal<'en' | 'es'>('en');
		const updatePage = vi.fn();

		TestBed.configureTestingModule({
			providers: [
				{ provide: SeoService, useValue: { updatePage } },
				{
					provide: I18nService,
					useValue: {
						lang,
						t: () => (key: TranslationKey) => `${lang()}:${key}`,
					},
				},
			],
		});

		TestBed.runInInjectionContext(() => {
			setupPageSeo(() => null);
		});
		TestBed.tick();

		expect(updatePage).not.toHaveBeenCalled();
	});
});
