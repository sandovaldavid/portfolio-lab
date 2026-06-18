import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FontScaleService } from '../font-scale/font-scale';

const PAGE_ROUTES: Record<string, string> = {
	'1': '/',
	'2': '/projects',
	'3': '/experience',
	'4': '/skills',
	'5': '/about',
};

@Injectable({ providedIn: 'root' })
export class KeyboardShortcutsService {
	private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
	private readonly router = inject(Router);
	private readonly fontScale = inject(FontScaleService);

	readonly shortcutsVisible = signal(false);

	private _lastKey = '';
	private _lastKeyTime = 0;

	register(): void {
		if (!this.isBrowser) return;
		document.addEventListener('keydown', (e) => this._handle(e));
		this._registerDiagnostics();
	}

	private _registerDiagnostics(): void {
		if (!this.isBrowser) return;
		(window as unknown as Window & { runDiagnostics: () => void }).runDiagnostics = () => {
			const perf = window.performance;
			const timing = perf ? perf.timing : null;
			const loadTime = timing ? timing.loadEventEnd - timing.navigationStart + 'ms' : 'unknown';

			const report = {
				status: 'SYSTEM_OK',
				davidSandovalKernel: 'active',
				clientMetrics: {
					url: window.location.href,
					userAgent: navigator.userAgent,
					estimatedBundleSize: '45.8 KB',
					apiResponseTime: '14ms',
					browserLoadTime: loadTime,
					activeMode: document.documentElement.classList.contains('mode-research')
						? 'RESEARCH_FELLOW'
						: 'SYSTEM_ARCHITECT',
					activeLanguage: document.documentElement.lang || 'es',
				},
				systemHealth: {
					angularVersion: '19.0.0',
					analogEngine: 'Nitro + Vite',
					hydration: 'enabled',
					eventReplay: 'active',
				},
			};

			console.log(
				`%c[SYSTEM_OK] David Sandoval Kernel Active`,
				'color: #34d399; font-weight: bold; font-size: 12px;'
			);
			console.log(`%cDiagnostics report completed. Result printed below.`, 'color: #3b9eff;');
			console.log(report);
			return report;
		};

		console.log(`%c[SYSTEM_OK] David Sandoval Kernel Active`, 'color: #34d399; font-weight: bold;');
		console.log(`%cType 'runDiagnostics()' to query the memory space.`, 'color: #3b9eff;');
	}

	toggle(): void {
		this.shortcutsVisible.update((v) => !v);
	}

	close(): void {
		this.shortcutsVisible.set(false);
	}

	private _handle(e: KeyboardEvent): void {
		const target = e.target as HTMLElement;
		if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
			return;

		const key = e.key;
		const now = Date.now();

		if (key === 'Escape') {
			this.shortcutsVisible.set(false);
			return;
		}

		if (key === '?') {
			e.preventDefault();
			this.shortcutsVisible.update((v) => !v);
			return;
		}

		if (this.shortcutsVisible()) return;

		if (key === '/') {
			const searchBox = document.querySelector('input.search-input') as HTMLInputElement | null;
			if (searchBox) {
				e.preventDefault();
				searchBox.focus();
				searchBox.select();
			}
			return;
		}

		if ((key === '+' || key === '=') && !e.ctrlKey && !e.metaKey) {
			e.preventDefault();
			this.fontScale.increase();
			return;
		}
		if (key === '-' && !e.ctrlKey && !e.metaKey) {
			e.preventDefault();
			this.fontScale.decrease();
			return;
		}
		if (key === '0' && !e.ctrlKey && !e.metaKey && !e.altKey) {
			e.preventDefault();
			this.fontScale.reset();
			return;
		}

		if (e.ctrlKey && key === 'd') {
			e.preventDefault();
			if (typeof window.scrollBy === 'function') {
				window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' });
			}
			return;
		}
		if (e.ctrlKey && key === 'u') {
			e.preventDefault();
			if (typeof window.scrollBy === 'function') {
				window.scrollBy({ top: -window.innerHeight / 2, behavior: 'smooth' });
			}
			return;
		}

		if (key === 'G') {
			e.preventDefault();
			if (typeof window.scrollTo === 'function') {
				window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
			}
			return;
		}
		if (key === 'j' || key === 's') {
			e.preventDefault();
			if (typeof window.scrollBy === 'function') {
				window.scrollBy({ top: 80, behavior: 'smooth' });
			}
			return;
		}
		if (key === 'k' || key === 'w') {
			e.preventDefault();
			if (typeof window.scrollBy === 'function') {
				window.scrollBy({ top: -80, behavior: 'smooth' });
			}
			return;
		}

		if (key === 'g') {
			if (this._lastKey === 'g' && now - this._lastKeyTime < 500) {
				e.preventDefault();
				if (typeof window.scrollTo === 'function') {
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}
				this._lastKey = '';
				return;
			}
			this._lastKey = 'g';
			this._lastKeyTime = now;
			return;
		}

		const routes = ['/', '/projects', '/experience', '/skills', '/about', '/notes'];
		const current = this.router.url;
		const currentIndex = routes.indexOf(current);

		if (key === 'h' || key === 'a') {
			if (currentIndex > 0) {
				e.preventDefault();
				this.router.navigate([routes[currentIndex - 1]]);
			}
			return;
		}
		if (key === 'l' || key === 'd') {
			if (currentIndex >= 0 && currentIndex < routes.length - 1) {
				e.preventDefault();
				this.router.navigate([routes[currentIndex + 1]]);
			}
			return;
		}

		if (PAGE_ROUTES[key] && !e.ctrlKey && !e.metaKey && !e.altKey) {
			e.preventDefault();
			this.router.navigate([PAGE_ROUTES[key]]);
			return;
		}

		this._lastKey = key;
		this._lastKeyTime = now;
	}
}
