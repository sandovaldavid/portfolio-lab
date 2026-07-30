import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
	let service: ThemeService;

	beforeEach(() => {
		localStorage.clear();
		document.documentElement.className = '';
		TestBed.configureTestingModule({
			providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
		});
		service = TestBed.inject(ThemeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should default to neon-dark theme', () => {
		expect(service.theme()).toBe('neon-dark');
	});

	it('should switch to navy-blue theme', () => {
		service.setTheme('navy-blue');
		expect(service.theme()).toBe('navy-blue');
	});

	it('should persist theme to localStorage', () => {
		service.setTheme('navy-blue');
		expect(localStorage.getItem('portfolio_theme')).toBe('navy-blue');
	});

	it('should toggle between themes', () => {
		expect(service.theme()).toBe('neon-dark');
		service.toggle();
		expect(service.theme()).toBe('navy-blue');
		service.toggle();
		expect(service.theme()).toBe('neon-dark');
	});

	it('should apply theme class to document element', () => {
		service.setTheme('navy-blue');
		expect(document.documentElement.className).toBe('theme-navy-blue');
	});

	it('should load initial theme from localStorage', () => {
		localStorage.setItem('portfolio_theme', 'navy-blue');
		TestBed.resetTestingModule();
		TestBed.configureTestingModule({
			providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
		});
		const newService = TestBed.inject(ThemeService);
		expect(newService.theme()).toBe('navy-blue');
	});
});
