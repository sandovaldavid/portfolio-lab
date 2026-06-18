import {
	Directive,
	ElementRef,
	OnDestroy,
	OnInit,
	PLATFORM_ID,
	inject,
	signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
	selector: '[appScrollObserver]',
	standalone: true,
	host: {
		'[class.will-animate]': 'true',
		'[class.is-visible]': 'visible()',
	},
})
export class ScrollObserverDirective implements OnInit, OnDestroy {
	private readonly el = inject(ElementRef);
	private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
	readonly visible = signal(false);
	private observer?: IntersectionObserver;

	ngOnInit(): void {
		if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
			this.visible.set(true);
			return;
		}
		this.observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					this.visible.set(true);
					this.observer?.disconnect();
				}
			},
			{ threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
		);
		this.observer.observe(this.el.nativeElement);
	}

	ngOnDestroy(): void {
		this.observer?.disconnect();
	}
}
