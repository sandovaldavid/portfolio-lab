import { Injectable, PLATFORM_ID, inject, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const SCALE_KEY = 'portfolio_font_scale';
const SCALES = [13, 15, 17, 19] as const;
type ScaleLevel = 0 | 1 | 2 | 3;

@Injectable({ providedIn: 'root' })
export class FontScaleService {
	private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

	readonly scaleIndex = signal<ScaleLevel>(this._getInitialScale());
	readonly canDecrease = computed(() => this.scaleIndex() > 0);
	readonly canIncrease = computed(() => this.scaleIndex() < SCALES.length - 1);

	apply(): void {
		this._syncDom(this.scaleIndex());
	}

	increase(): void {
		if (this.canIncrease()) this._set((this.scaleIndex() + 1) as ScaleLevel);
	}

	decrease(): void {
		if (this.canDecrease()) this._set((this.scaleIndex() - 1) as ScaleLevel);
	}

	reset(): void {
		this._set(1);
	}

	private _set(level: ScaleLevel): void {
		this.scaleIndex.set(level);
		if (this.isBrowser) localStorage.setItem(SCALE_KEY, String(level));
		this._syncDom(level);
	}

	private _syncDom(level: ScaleLevel): void {
		if (!this.isBrowser) return;
		document.documentElement.style.fontSize = `${SCALES[level]}px`;
	}

	private _getInitialScale(): ScaleLevel {
		if (this.isBrowser) {
			const stored = localStorage.getItem(SCALE_KEY);
			const parsed = stored ? parseInt(stored, 10) : NaN;
			if (!isNaN(parsed) && parsed >= 0 && parsed <= 3) return parsed as ScaleLevel;
		}
		return 1;
	}
}
