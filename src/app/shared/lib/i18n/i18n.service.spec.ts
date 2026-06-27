import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
	let service: I18nService;

	beforeEach(() => {
		localStorage.clear();
		TestBed.configureTestingModule({
			providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
		});
		service = TestBed.inject(I18nService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should default to Spanish', () => {
		expect(service.lang()).toBe('es');
	});

	it('should switch language to English', () => {
		service.setLang('en');
		expect(service.lang()).toBe('en');
	});

	it('should persist language to localStorage', () => {
		service.setLang('en');
		expect(localStorage.getItem('portfolio_lang')).toBe('en');
	});

	it('should toggle between languages', () => {
		expect(service.lang()).toBe('es');
		service.toggleLang();
		expect(service.lang()).toBe('en');
		service.toggleLang();
		expect(service.lang()).toBe('es');
	});

	it('should translate keys correctly', () => {
		const t = service.t();
		const translation = t('hero.available');
		expect(translation).toBeTruthy();
		expect(typeof translation).toBe('string');
	});

	it('should return key if translation not found', () => {
		const t = service.t();
		const result = t(
			'nonexistent.key' as keyof typeof service.t extends () => (key: infer K) => string ? K : never
		);
		expect(result).toBe('nonexistent.key');
	});

	it('should load initial language from localStorage', () => {
		localStorage.setItem('portfolio_lang', 'en');
		TestBed.resetTestingModule();
		TestBed.configureTestingModule({
			providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
		});
		const newService = TestBed.inject(I18nService);
		expect(newService.lang()).toBe('en');
	});
});
