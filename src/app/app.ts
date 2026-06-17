import { DOCUMENT, ViewportScroller, isPlatformBrowser } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	PLATFORM_ID,
	inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ModeStateService } from '@shared/lib/mode/mode-state.service';
import { FontScaleService } from '@shared/lib/font-scale/font-scale';
import { KeyboardShortcutsService } from '@shared/lib/keyboard-shortcuts/keyboard-shortcuts';
import { NavbarComponent } from '@widgets/navbar/navbar.component';
import { FooterComponent } from '@widgets/footer/footer.component';
import { UtilityPanel } from '@features/utility-panel/utility-panel';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NavbarComponent, FooterComponent, UtilityPanel],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<app-navbar />
		<main class="pt-16">
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
		`,
	],
})
export class App {
	private readonly modeService = inject(ModeStateService);
	private readonly fontScale = inject(FontScaleService);
	private readonly kbd = inject(KeyboardShortcutsService);
	private readonly router = inject(Router);
	private readonly viewportScroller = inject(ViewportScroller);
	private readonly platformId = inject(PLATFORM_ID);
	private readonly document = inject(DOCUMENT);

	/** Height in px to offset from top when scrolling to anchors — keeps
	 *  section titles fully visible below the fixed navbar. */
	private static readonly SCROLL_OFFSET = 120; // 120px offset below fixed navbar

	constructor() {
		if (isPlatformBrowser(this.platformId)) {
			// Tell Angular's ViewportScroller to always leave room for the fixed header
			this.viewportScroller.setOffset([0, App.SCROLL_OFFSET]);

			// Handle fragment scrolling ourselves so we can apply the SCROLL_OFFSET.
			// anchorScrolling: 'enabled' is intentionally disabled in app.config.ts
			// to avoid a race condition that causes a jump on repeated clicks.
			this.router.events
				.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
				.subscribe((event) => {
					const fragment = this.router.parseUrl(event.urlAfterRedirects).fragment;
					if (fragment) {
						// Defer to next tick so Angular has time to render the target section
						setTimeout(() => {
							const el = this.document.getElementById(fragment);
							if (el) {
								const distanceFromTarget =
									el.getBoundingClientRect().top - App.SCROLL_OFFSET;
								// Skip if the element is already within 20px of the desired position
								// to prevent the upward jump when clicking the same nav link twice
								if (Math.abs(distanceFromTarget) > 20) {
									const top =
										el.getBoundingClientRect().top +
										window.scrollY -
										App.SCROLL_OFFSET;
									window.scrollTo({ top, behavior: 'smooth' });
								}
							}
						}, 50);
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
