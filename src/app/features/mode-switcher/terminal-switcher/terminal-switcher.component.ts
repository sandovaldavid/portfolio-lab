import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ModeStateService } from '@shared/lib/mode/mode-state.service';

@Component({
	selector: 'app-terminal-switcher',
	imports: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './terminal-switcher.component.html',
	styleUrl: './terminal-switcher.component.css',
})
export class TerminalSwitcherComponent {
	readonly mode = inject(ModeStateService);
	private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

	switchMode(target: 'SYSTEM_ARCHITECT' | 'RESEARCH_FELLOW'): void {
		if (this.mode.currentMode() === target) return;
		if (this.isBrowser) {
			document.documentElement.classList.add('mode-transitioning');
			setTimeout(() => {
				this.mode.setMode(target);
			}, 200);
			setTimeout(() => {
				document.documentElement.classList.remove('mode-transitioning');
			}, 400);
		} else {
			this.mode.setMode(target);
		}
	}
}
