import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostListener,
	PLATFORM_ID,
	inject,
	signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FontScaleService } from '@shared/lib/font-scale/font-scale';
import { KeyboardShortcutsService } from '@shared/lib/keyboard-shortcuts/keyboard-shortcuts';
import { ModeStateService } from '@shared/lib/mode/mode-state.service';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { OWNER } from '@shared/config/contact.config';
import { ShortcutsModal } from './shortcuts-modal/shortcuts-modal';

@Component({
	selector: 'app-utility-panel',
	imports: [ShortcutsModal],
	templateUrl: './utility-panel.html',
	styleUrl: './utility-panel.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilityPanel {
	readonly fontScale = inject(FontScaleService);
	readonly mode = inject(ModeStateService);
	readonly i18n = inject(I18nService);
	private readonly kbd = inject(KeyboardShortcutsService);
	private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
	private readonly elRef = inject(ElementRef<HTMLElement>);

	readonly open = signal(false);
	readonly emailCopied = signal(false);
	readonly resumeFile = OWNER.resumeFile;

	@HostListener('document:click', ['$event'])
	onDocumentClick(event: MouseEvent): void {
		if (!this.open()) return;
		if (!this.elRef.nativeElement.contains(event.target as Node)) {
			this.open.set(false);
		}
	}

	toggleOpen(): void {
		this.open.update((v) => !v);
	}

	scrollToTop(): void {
		if (this.isBrowser) window.scrollTo({ top: 0, behavior: 'smooth' });
		this.open.set(false);
	}

	switchMode(target: 'SYSTEM_ARCHITECT' | 'RESEARCH_FELLOW'): void {
		if (this.mode.currentMode() === target) return;
		if (this.isBrowser) {
			document.documentElement.classList.add('mode-transitioning');
			setTimeout(() => {
				this.mode.setMode(target);
				document.documentElement.classList.remove('mode-transitioning');
			}, 200);
		} else {
			this.mode.setMode(target);
		}
	}

	async copyEmail(): Promise<void> {
		if (!this.isBrowser) return;
		try {
			await navigator.clipboard.writeText(OWNER.email);
		} catch {
			const el = document.createElement('input');
			el.value = 'contact@devsandoval.me';
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
		}
		this.emailCopied.set(true);
		setTimeout(() => this.emailCopied.set(false), 2000);
	}

	openShortcuts(): void {
		this.kbd.toggle();
		this.open.set(false);
	}
}
