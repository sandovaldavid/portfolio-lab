import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from './i18n.service';
import type { TranslationKey } from '@shared/config/i18n/en';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly i18n = inject(I18nService);

  transform(key: TranslationKey): string {
    return this.i18n.t()(key);
  }
}
