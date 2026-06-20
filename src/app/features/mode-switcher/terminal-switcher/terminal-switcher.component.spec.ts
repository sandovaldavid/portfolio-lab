import { render, screen, fireEvent } from '@testing-library/angular';
import { TerminalSwitcherComponent } from './terminal-switcher.component';
import { ModeStateService } from '@shared/lib/mode/mode-state.service';
import { signal } from '@angular/core';

describe('TerminalSwitcherComponent', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should render mode switch buttons and toggle mode on click', async () => {
		const mockModeSignal = signal<'SYSTEM_ARCHITECT' | 'RESEARCH_FELLOW'>('SYSTEM_ARCHITECT');
		const mockIsArchitectSignal = signal<boolean>(true);
		const mockIsAcademicSignal = signal<boolean>(false);

		const mockModeStateService = {
			currentMode: mockModeSignal,
			isArchitect: mockIsArchitectSignal,
			isAcademic: mockIsAcademicSignal,
			setMode: vi.fn((target: 'SYSTEM_ARCHITECT' | 'RESEARCH_FELLOW') => {
				mockModeSignal.set(target);
				mockIsArchitectSignal.set(target === 'SYSTEM_ARCHITECT');
				mockIsAcademicSignal.set(target === 'RESEARCH_FELLOW');
			}),
		};

		await render(TerminalSwitcherComponent, {
			providers: [{ provide: ModeStateService, useValue: mockModeStateService }],
		});

		const sysButton = screen.getByText('[SYS]');
		const phdButton = screen.getByText('[PHD]');

		expect(sysButton).toBeTruthy();
		expect(phdButton).toBeTruthy();
		expect(sysButton.className).toContain('active');
		expect(phdButton.className).not.toContain('active');

		fireEvent.click(phdButton);
		vi.advanceTimersByTime(200);

		expect(mockModeStateService.setMode).toHaveBeenCalledWith('RESEARCH_FELLOW');
	});
});
