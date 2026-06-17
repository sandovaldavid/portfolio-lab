import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ModeStateService } from '@shared/lib/mode/mode-state.service';
import { I18nService } from '@shared/lib/i18n/i18n.service';

@Component({
  selector: 'app-terminal-switcher',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './terminal-switcher.html',
  styles: `
    .switcher-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .switcher-btn {
      font-family: var(--font-code);
      font-size: 0.8rem;
      padding: 5px 10px;
      background: transparent;
      border: 1px solid var(--color-border);
      color: var(--color-muted);
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s, background 0.15s;
      white-space: nowrap;
    }
    .switcher-btn:hover {
      border-color: var(--color-primary);
      color: var(--color-text);
    }
    .switcher-btn.active {
      border-color: var(--color-primary);
      color: var(--color-primary);
      background: color-mix(in srgb, var(--color-primary) 8%, transparent);
    }
    .divider {
      color: var(--color-muted);
      font-family: var(--font-code);
      font-size: 0.8rem;
      user-select: none;
    }
  `,
})
export class TerminalSwitcherComponent {
  readonly mode = inject(ModeStateService);
  readonly i18n = inject(I18nService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

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
}
