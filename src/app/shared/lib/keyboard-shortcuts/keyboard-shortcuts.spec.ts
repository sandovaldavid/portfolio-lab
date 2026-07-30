import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { KeyboardShortcutsService } from './keyboard-shortcuts';

describe('KeyboardShortcutsService', () => {
	function configure(platform: 'browser' | 'server') {
		TestBed.configureTestingModule({
			providers: [provideRouter([]), { provide: PLATFORM_ID, useValue: platform }],
		});
		return TestBed.inject(KeyboardShortcutsService);
	}

	afterEach(() => {
		TestBed.resetTestingModule();
	});

	it('should be created', () => {
		const service = configure('browser');
		expect(service).toBeTruthy();
	});

	it('should not attach a keydown listener when not running in the browser', () => {
		const addSpy = vi.spyOn(document, 'addEventListener');
		const service = configure('server');
		service.register();
		expect(addSpy).not.toHaveBeenCalledWith('keydown', expect.any(Function));
	});

	it('should attach a keydown listener when running in the browser', () => {
		const addSpy = vi.spyOn(document, 'addEventListener');
		const service = configure('browser');
		service.register();
		expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
	});

	it('should toggle shortcutsVisible when "?" is pressed', () => {
		const service = configure('browser');
		service.register();
		expect(service.shortcutsVisible()).toBe(false);

		document.dispatchEvent(new KeyboardEvent('keydown', { key: '?' }));
		expect(service.shortcutsVisible()).toBe(true);

		document.dispatchEvent(new KeyboardEvent('keydown', { key: '?' }));
		expect(service.shortcutsVisible()).toBe(false);
	});

	it('should navigate to the mapped route on a number key press', () => {
		const service = configure('browser');
		const router = TestBed.inject(Router);
		const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

		service.register();
		document.dispatchEvent(new KeyboardEvent('keydown', { key: '2' }));

		expect(navigateSpy).toHaveBeenCalledWith(['/projects']);
	});

	it('should remove the keydown listener when the service is destroyed', () => {
		const service = configure('browser');
		service.register();
		const removeSpy = vi.spyOn(document, 'removeEventListener');

		TestBed.resetTestingModule();

		expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
	});
});
