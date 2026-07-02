import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { FontScaleService } from './font-scale';

describe('FontScaleService', () => {
	let service: FontScaleService;

	beforeEach(() => {
		localStorage.clear();
		document.documentElement.style.fontSize = '';
		TestBed.configureTestingModule({
			providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
		});
		service = TestBed.inject(FontScaleService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should default to the base scale (15px)', () => {
		expect(service.scaleIndex()).toBe(1);
	});

	it('should increase the font scale up to the maximum (19px)', () => {
		service.increase();
		service.increase();
		expect(service.scaleIndex()).toBe(3);
		expect(document.documentElement.style.fontSize).toBe('19px');
		expect(service.canIncrease()).toBe(false);

		service.increase();
		expect(service.scaleIndex()).toBe(3);
	});

	it('should decrease the font scale down to the minimum (13px)', () => {
		service.decrease();
		expect(service.scaleIndex()).toBe(0);
		expect(document.documentElement.style.fontSize).toBe('13px');
		expect(service.canDecrease()).toBe(false);

		service.decrease();
		expect(service.scaleIndex()).toBe(0);
	});

	it('should reset to the base scale', () => {
		service.increase();
		service.increase();
		service.reset();
		expect(service.scaleIndex()).toBe(1);
		expect(document.documentElement.style.fontSize).toBe('15px');
	});

	it('should persist scale to localStorage', () => {
		service.increase();
		expect(localStorage.getItem('portfolio_font_scale')).toBe('2');
	});

	it('should load initial scale from localStorage', () => {
		localStorage.setItem('portfolio_font_scale', '3');
		TestBed.resetTestingModule();
		TestBed.configureTestingModule({
			providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
		});
		const newService = TestBed.inject(FontScaleService);
		expect(newService.scaleIndex()).toBe(3);
	});
});
