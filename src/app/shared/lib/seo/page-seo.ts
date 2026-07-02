import { effect, inject } from '@angular/core';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { TranslationKey } from '@shared/config/i18n/en';
import { PageSeoConfig, SeoService } from './seo.service';

export type TranslateFn = (key: TranslationKey) => string;

// Call from an injection context; re-runs on any signal `build` reads (language, content, etc).
// Return null from `build` to skip an update, e.g. while async content hasn't resolved yet.
export function setupPageSeo(build: (t: TranslateFn) => PageSeoConfig | null): void {
	const seo = inject(SeoService);
	const i18n = inject(I18nService);

	effect(() => {
		const config = build(i18n.t());
		if (config) seo.updatePage(config);
	});
}
