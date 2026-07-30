import { render, screen, fireEvent } from '@testing-library/angular';
import { UtilityPanelComponent } from './utility-panel.component';
import { FontScaleService } from '@shared/lib/font-scale/font-scale';
import { KeyboardShortcutsService } from '@shared/lib/keyboard-shortcuts/keyboard-shortcuts';
import { ModeStateService } from '@shared/lib/mode/mode-state.service';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { signal } from '@angular/core';

describe('UtilityPanelComponent', () => {
	const mockFontScaleService = {
		canDecrease: signal(true),
		canIncrease: signal(true),
		decrease: vi.fn(),
		increase: vi.fn(),
		reset: vi.fn(),
	};

	const mockKeyboardShortcutsService = {
		shortcutsVisible: signal(false),
		toggle: vi.fn(),
	};

	const mockModeStateService = {
		currentMode: signal('SYSTEM_ARCHITECT'),
		isArchitect: signal(true),
		isAcademic: signal(false),
		setMode: vi.fn(),
	};

	const mockI18nService = {
		lang: signal('en'),
		setLang: vi.fn(),
	};

	it('should render FAB button by default and toggle panel on click', async () => {
		await render(UtilityPanelComponent, {
			providers: [
				{ provide: FontScaleService, useValue: mockFontScaleService },
				{ provide: KeyboardShortcutsService, useValue: mockKeyboardShortcutsService },
				{ provide: ModeStateService, useValue: mockModeStateService },
				{ provide: I18nService, useValue: mockI18nService },
			],
		});

		const toggleButton = screen.getByRole('button', { name: /toggle control panel/i });
		expect(toggleButton).toBeTruthy();

		// Panel should be closed initially
		expect(screen.queryByLabelText('Control panel')).toBeNull();

		// Click to open panel
		fireEvent.click(toggleButton);

		expect(screen.getByLabelText('Control panel')).toBeTruthy();
	});

	it('should call fontScale methods on click', async () => {
		await render(UtilityPanelComponent, {
			providers: [
				{ provide: FontScaleService, useValue: mockFontScaleService },
				{ provide: KeyboardShortcutsService, useValue: mockKeyboardShortcutsService },
				{ provide: ModeStateService, useValue: mockModeStateService },
				{ provide: I18nService, useValue: mockI18nService },
			],
		});

		const toggleButton = screen.getByRole('button', { name: /toggle control panel/i });
		fireEvent.click(toggleButton);

		const decreaseBtn = screen.getByRole('button', { name: /decrease font size/i });
		const increaseBtn = screen.getByRole('button', { name: /increase font size/i });

		fireEvent.click(decreaseBtn);
		expect(mockFontScaleService.decrease).toHaveBeenCalled();

		fireEvent.click(increaseBtn);
		expect(mockFontScaleService.increase).toHaveBeenCalled();
	});
});
