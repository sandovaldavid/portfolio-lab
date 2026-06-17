import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '@shared/lib/theme/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.css',
})
export class ThemeSwitcherComponent {
  readonly theme = inject(ThemeService);
}
