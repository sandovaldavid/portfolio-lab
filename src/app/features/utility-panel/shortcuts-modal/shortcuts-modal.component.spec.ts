import { render, screen, fireEvent } from '@testing-library/angular';
import { ShortcutsModalComponent } from './shortcuts-modal.component';
import { KeyboardShortcutsService } from '@shared/lib/keyboard-shortcuts/keyboard-shortcuts';
import { signal } from '@angular/core';

describe('ShortcutsModalComponent', () => {
	it('should render shortcuts modal when visible', async () => {
		const mockVisibleSignal = signal<boolean>(true);
		const mockKeyboardShortcutsService = {
			shortcutsVisible: mockVisibleSignal,
			close: vi.fn(),
		};

		await render(ShortcutsModalComponent, {
			providers: [{ provide: KeyboardShortcutsService, useValue: mockKeyboardShortcutsService }],
		});

		expect(screen.getByText('Keyboard Shortcuts')).toBeTruthy();
		expect(screen.getByText('Scroll down')).toBeTruthy();
		expect(screen.getByText('gg')).toBeTruthy();

		const closeButton = screen.getByRole('button', { name: /close shortcuts panel/i });
		fireEvent.click(closeButton);

		expect(mockKeyboardShortcutsService.close).toHaveBeenCalled();
	});

	it('should hide modal when shortcutsVisible is false', async () => {
		const mockVisibleSignal = signal<boolean>(false);
		const mockKeyboardShortcutsService = {
			shortcutsVisible: mockVisibleSignal,
			close: vi.fn(),
		};

		await render(ShortcutsModalComponent, {
			providers: [{ provide: KeyboardShortcutsService, useValue: mockKeyboardShortcutsService }],
		});

		expect(screen.queryByText('Keyboard Shortcuts')).toBeNull();
	});
});
