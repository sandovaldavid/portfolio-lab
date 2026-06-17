import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '@shared/lib/i18n/i18n.service';

@Component({
  selector: 'app-mext-thesis-pitch',
  standalone: true,
  templateUrl: './mext-thesis-pitch.component.html',
  styleUrl: './mext-thesis-pitch.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MextThesisPitchComponent {
  readonly i18n = inject(I18nService);
}
