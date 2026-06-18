import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type PortfolioMode = 'SYSTEM_ARCHITECT' | 'RESEARCH_FELLOW';

const MODE_STORAGE_KEY = 'portfolio_mode';
const DEFAULT_MODE: PortfolioMode = 'SYSTEM_ARCHITECT';

@Injectable({ providedIn: 'root' })
export class ModeStateService {
	private readonly doc = inject(DOCUMENT);
	private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

	readonly currentMode = signal<PortfolioMode>('SYSTEM_ARCHITECT');
	readonly isAcademic = computed(() => this.currentMode() === 'RESEARCH_FELLOW');
	readonly isArchitect = computed(() => this.currentMode() === 'SYSTEM_ARCHITECT');

	apply(): void {
		if (this.isBrowser) {
			const stored = localStorage.getItem(MODE_STORAGE_KEY);
			if (stored === 'SYSTEM_ARCHITECT' || stored === 'RESEARCH_FELLOW') {
				this.setMode(stored);
				return;
			}
		}
		this._syncDom(this.currentMode());
	}

	setMode(mode: PortfolioMode): void {
		this.currentMode.set(mode);
		if (this.isBrowser) {
			localStorage.setItem(MODE_STORAGE_KEY, mode);
			this._syncDom(mode);
		}
	}

	toggleMode(): void {
		this.setMode(
			this.currentMode() === 'SYSTEM_ARCHITECT' ? 'RESEARCH_FELLOW' : 'SYSTEM_ARCHITECT'
		);
	}

	private _syncDom(mode: PortfolioMode): void {
		if (!this.isBrowser) return;
		const root = this.doc.documentElement;
		root.classList.remove('mode-architect', 'mode-research');
		root.classList.add(mode === 'SYSTEM_ARCHITECT' ? 'mode-architect' : 'mode-research');
	}
}
