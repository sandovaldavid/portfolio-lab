import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-pixel-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pixel-card.component.html',
  styleUrl: './pixel-card.component.css',
  host: {
    '[class]': '"block"',
  },
})
export class PixelCardComponent {
  readonly scanlines = input(false);
  readonly variant = input<'default' | 'elevated' | 'flush'>('default');
  readonly hover = input(false);

  readonly cardClasses = (): string => {
    const base = 'bg-[--color-surface] border border-[--color-border]';

    const paddings: Record<string, string> = {
      default: 'p-6',
      elevated: 'p-6 bg-[--color-surface-2]',
      flush: 'p-0 overflow-hidden',
    };

    const hoverClass = this.hover()
      ? 'transition-all duration-200 hover:border-[--color-primary] hover:-translate-y-1'
      : '';

    return [base, paddings[this.variant()], hoverClass].filter(Boolean).join(' ');
  };
}
