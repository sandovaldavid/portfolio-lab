import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { ScrollObserverDirective } from '@shared/lib/animation/scroll-observer.directive';
import { OWNER, SOCIAL_LINKS } from '@shared/config/contact.config';

@Component({
	selector: 'app-footer',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink, ScrollObserverDirective],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.css',
})
export class FooterComponent {
	readonly i18n = inject(I18nService);
	readonly owner = OWNER;
	readonly socialLinks = SOCIAL_LINKS;
	readonly currentYear = new Date().getFullYear();
	readonly emailHref = `mailto:${OWNER.email}`;
	readonly mobileContactOpen = signal(false);

	toggleMobileContact(): void {
		this.mobileContactOpen.set(!this.mobileContactOpen());
	}
}
