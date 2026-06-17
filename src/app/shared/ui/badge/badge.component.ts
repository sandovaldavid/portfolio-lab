import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type BadgeColor = 'default' | 'primary' | 'accent' | 'secondary' | 'muted' | 'success';

@Component({
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  readonly label = input.required<string>();
  readonly icon = input<string>();
  readonly color = input<BadgeColor>('default');

  readonly colorClass = computed(() => {
    const colors: Record<BadgeColor, string> = {
      default:   'border border-[--color-border] text-[--color-text] bg-[--color-surface]',
      primary:   'border border-[--color-primary] text-[--color-primary] bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]',
      accent:    'border border-[--color-accent] text-[--color-accent] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)]',
      secondary: 'border border-[--color-secondary] text-[--color-secondary] bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent)]',
      muted:     'border border-[--color-border] text-[--color-muted] bg-[--color-surface]',
      success:   'border border-[--color-success] text-[--color-success] bg-[color-mix(in_srgb,var(--color-success)_10%,transparent)]',
    };
    return colors[this.color()];
  });
}
