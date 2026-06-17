import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export interface PageSeoConfig {
	title: string;
	description: string;
	ogImage?: string;
	canonical?: string;
	jsonLd?: Record<string, unknown>;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
	private readonly meta = inject(Meta);
	private readonly titleSvc = inject(Title);
	private readonly doc = inject(DOCUMENT);
	private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

	updatePage(config: PageSeoConfig): void {
		const fullTitle = config.title.includes('David Sandoval')
			? config.title
			: `${config.title} | David Sandoval`;

		this.titleSvc.setTitle(fullTitle);
		this.meta.updateTag({ name: 'description', content: config.description });
		this.meta.updateTag({ property: 'og:title', content: fullTitle });
		this.meta.updateTag({ property: 'og:description', content: config.description });
		this.meta.updateTag({
			property: 'og:image',
			content: config.ogImage ?? 'https://devsandoval.me/portfolio_meta-data.webp',
		});
		this.meta.updateTag({
			property: 'og:url',
			content: config.canonical ?? 'https://devsandoval.me',
		});
		this.meta.updateTag({ property: 'og:type', content: 'website' });
		this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
		this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
		this.meta.updateTag({ name: 'twitter:description', content: config.description });

		this._upsertHreflang('en', 'https://devsandoval.me');
		this._upsertHreflang('es', 'https://devsandoval.me');

		if (config.jsonLd) {
			this._injectJsonLd(config.jsonLd);
		}
	}

	private _upsertHreflang(lang: string, href: string): void {
		const existing = this.doc.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
		const el = (existing as HTMLLinkElement) ?? this.doc.createElement('link');
		el.setAttribute('rel', 'alternate');
		el.setAttribute('hreflang', lang);
		el.setAttribute('href', href);
		if (!existing) this.doc.head.appendChild(el);
	}

	private _injectJsonLd(data: Record<string, unknown>): void {
		const id = 'portfolio-json-ld';
		const existing = this.doc.getElementById(id);
		const script = (existing as HTMLScriptElement | null) ?? this.doc.createElement('script');
		script.setAttribute('type', 'application/ld+json');
		script.id = id;
		script.textContent = JSON.stringify(data);
		if (!existing) this.doc.head.appendChild(script);
	}
}
