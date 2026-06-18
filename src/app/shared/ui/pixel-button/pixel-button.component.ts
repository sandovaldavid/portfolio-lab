import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type PixelButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
export type PixelButtonSize = 'sm' | 'md' | 'lg';

@Component({
	selector: 'app-pixel-button',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './pixel-button.component.html',
	styleUrl: './pixel-button.component.css',
	host: {
		'[class]': 'hostClasses()',
	},
})
export class PixelButtonComponent {
	readonly variant = input<PixelButtonVariant>('primary');
	readonly size = input<PixelButtonSize>('md');
	readonly disabled = input(false);

	readonly hostClasses = computed(() => {
		const base =
			'inline-flex items-center justify-center gap-2 font-pixel cursor-pointer transition-all duration-150 select-none leading-none';

		const sizes: Record<PixelButtonSize, string> = {
			sm: 'text-xs px-3 py-2',
			md: 'text-sm px-5 py-3',
			lg: 'text-base px-7 py-4',
		};

		const variants: Record<PixelButtonVariant, string> = {
			primary:
				'bg-[--color-primary] text-[--color-bg] font-bold border border-[--color-primary] hover:brightness-110 active:translate-y-[1px]',
			secondary:
				'bg-transparent text-[--color-primary] border border-[--color-primary] hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]',
			ghost:
				'bg-transparent text-[--color-muted] border border-[--color-border] hover:text-[--color-text] hover:border-[--color-primary]',
			accent:
				'bg-[--color-secondary] text-[--color-bg] font-bold border border-[--color-secondary] hover:brightness-110 active:translate-y-[1px]',
		};

		const disabledClass = this.disabled() ? 'opacity-50 pointer-events-none' : '';

		return [base, sizes[this.size()], variants[this.variant()], disabledClass]
			.filter(Boolean)
			.join(' ');
	});
}
