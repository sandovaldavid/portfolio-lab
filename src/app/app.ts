import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  constructor() {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.modeService.apply();
        this.fontScale.apply();
        this.kbd.register();
      }, 0);
    }
  }
}
