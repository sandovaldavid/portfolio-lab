import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ModeStateService } from './mode-state.service';

describe('ModeStateService', () => {
	let service: ModeStateService;

	beforeEach(() => {
		localStorage.clear();
		document.documentElement.classList.remove('mode-architect', 'mode-research');
		TestBed.configureTestingModule({
			providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
		});
		service = TestBed.inject(ModeStateService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should default to SYSTEM_ARCHITECT', () => {
		expect(service.currentMode()).toBe('SYSTEM_ARCHITECT');
		expect(service.isArchitect()).toBe(true);
		expect(service.isAcademic()).toBe(false);
	});

	it('should switch to RESEARCH_FELLOW mode', () => {
		service.setMode('RESEARCH_FELLOW');
		expect(service.currentMode()).toBe('RESEARCH_FELLOW');
		expect(service.isAcademic()).toBe(true);
		expect(service.isArchitect()).toBe(false);
	});

	it('should toggle between modes', () => {
		expect(service.currentMode()).toBe('SYSTEM_ARCHITECT');
		service.toggleMode();
		expect(service.currentMode()).toBe('RESEARCH_FELLOW');
		service.toggleMode();
		expect(service.currentMode()).toBe('SYSTEM_ARCHITECT');
	});

	it('should persist mode to localStorage', () => {
		service.setMode('RESEARCH_FELLOW');
		expect(localStorage.getItem('portfolio_mode')).toBe('RESEARCH_FELLOW');
	});

	it('should sync DOM classes correctly', () => {
		service.setMode('SYSTEM_ARCHITECT');
		expect(document.documentElement.classList.contains('mode-architect')).toBe(true);
		expect(document.documentElement.classList.contains('mode-research')).toBe(false);

		service.setMode('RESEARCH_FELLOW');
		expect(document.documentElement.classList.contains('mode-research')).toBe(true);
		expect(document.documentElement.classList.contains('mode-architect')).toBe(false);
	});

	it('should load initial mode from localStorage', () => {
		localStorage.setItem('portfolio_mode', 'RESEARCH_FELLOW');
		TestBed.resetTestingModule();
		TestBed.configureTestingModule({
			providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
		});
		const newService = TestBed.inject(ModeStateService);
		newService.apply();
		expect(newService.currentMode()).toBe('RESEARCH_FELLOW');
	});
});
