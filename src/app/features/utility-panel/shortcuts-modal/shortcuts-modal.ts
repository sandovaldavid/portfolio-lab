import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KeyboardShortcutsService } from '@shared/lib/keyboard-shortcuts/keyboard-shortcuts';

interface ShortcutGroup {
	title: string;
	prefix: string;
	items: { keys: string[]; desc: string }[];
}

const SHORTCUT_GROUPS: ShortcutGroup[] = [
	{
		title: 'Scroll',
		prefix: '01',
		items: [
			{ keys: ['j'], desc: 'Scroll down' },
			{ keys: ['k'], desc: 'Scroll up' },
			{ keys: ['Ctrl+d'], desc: 'Half page down' },
			{ keys: ['Ctrl+u'], desc: 'Half page up' },
			{ keys: ['gg'], desc: 'Jump to top' },
			{ keys: ['G'], desc: 'Jump to bottom' },
		],
	},
	{
		title: 'Navigate',
		prefix: '02',
		items: [
			{ keys: ['1'], desc: '→ Home' },
			{ keys: ['2'], desc: '→ Projects' },
			{ keys: ['3'], desc: '→ Experience' },
			{ keys: ['4'], desc: '→ Skills' },
			{ keys: ['5'], desc: '→ About' },
		],
	},
	{
		title: 'Text Size',
		prefix: '03',
		items: [
			{ keys: ['+'], desc: 'Increase font' },
			{ keys: ['-'], desc: 'Decrease font' },
			{ keys: ['0'], desc: 'Reset font' },
		],
	},
	{
		title: 'General',
		prefix: '04',
		items: [
			{ keys: ['?'], desc: 'Toggle shortcuts' },
			{ keys: ['Esc'], desc: 'Close' },
		],
	},
];

@Component({
	selector: 'app-shortcuts-modal',
	imports: [],
	templateUrl: './shortcuts-modal.html',
	styleUrl: './shortcuts-modal.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShortcutsModal {
	readonly shortcuts = inject(KeyboardShortcutsService);
	readonly groups = SHORTCUT_GROUPS;

	closeOnBackdrop(e: MouseEvent): void {
		if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
			this.shortcuts.close();
		}
	}
}
