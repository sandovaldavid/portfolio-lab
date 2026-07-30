import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ModeStateService } from '@shared/lib/mode/mode-state.service';
import { FontScaleService } from '@shared/lib/font-scale/font-scale';
import { KeyboardShortcutsService } from '@shared/lib/keyboard-shortcuts/keyboard-shortcuts';
import { NavbarComponent } from '@widgets/navbar/navbar.component';
import { FooterComponent } from '@widgets/footer/footer.component';
import { UtilityPanelComponent } from '@features/utility-panel/utility-panel.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NavbarComponent, FooterComponent, UtilityPanelComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<a class="skip-link" href="#main">Skip to content</a>
		<app-navbar />
		<main id="main" class="pt-16">
			<router-outlet />
		</main>
		<app-footer />
		<app-utility-panel />
	`,
	styles: [
		`
			:host {
				display: flex;
				flex-direction: column;
				min-height: 100vh;
				background-color: var(--color-bg);
				color: var(--color-text);
			}
			.skip-link {
				position: absolute;
				left: -9999px;
				z-index: 9999;
				padding: 0.75rem 1.5rem;
				background: var(--color-primary);
				color: var(--color-bg);
				font-family: var(--font-pixel);
				font-size: 0.875rem;
				text-decoration: none;
			}
			.skip-link:focus {
				left: 1rem;
				top: 1rem;
			}
		`,
	],
})
export class App {
	private readonly modeService = inject(ModeStateService);
	private readonly fontScale = inject(FontScaleService);
	private readonly kbd = inject(KeyboardShortcutsService);
	private readonly router = inject(Router);
	private readonly platformId = inject(PLATFORM_ID);
	private readonly document = inject(DOCUMENT);

	/**
	 * Pixels to leave between the top of the viewport and the section title
	 * after scrolling — must be ≥ navbar height to keep titles visible.
	 */
	private static readonly SCROLL_OFFSET = 120;

	constructor() {
		if (isPlatformBrowser(this.platformId)) {
			// Single owner of all fragment scrolling.
			// Angular's anchorScrolling and scrollPositionRestoration are both disabled
			// in app.config.ts to prevent race conditions with this handler.
			this.router.events
				.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
				.subscribe((event) => {
					const fragment = this.router.parseUrl(event.urlAfterRedirects).fragment;

					if (fragment) {
						// Defer one tick so Angular finishes rendering before we measure
						setTimeout(() => {
							const el = this.document.getElementById(fragment);
							if (!el) return;

							const targetY = el.getBoundingClientRect().top + window.scrollY - App.SCROLL_OFFSET;

							if (typeof window.scrollTo === 'function') {
								window.scrollTo({ top: targetY, behavior: 'smooth' });
							}
						}, 50);
					} else {
						// No fragment → scroll to top (replaces scrollPositionRestoration)
						if (typeof window.scrollTo === 'function') {
							window.scrollTo({ top: 0, behavior: 'auto' });
						}
					}
				});

			setTimeout(() => {
				this.modeService.apply();
				this.fontScale.apply();
				this.kbd.register();
			}, 0);
		}
	}
}
