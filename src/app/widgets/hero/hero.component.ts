import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	computed,
	effect,
	inject,
	signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { OWNER } from '@shared/config/contact.config';

@Component({
	selector: 'app-hero',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink],
	templateUrl: './hero.component.html',
	styleUrl: './hero.component.css',
})
export class HeroComponent {
	readonly i18n = inject(I18nService);
	readonly displayedText = signal('');
	readonly emailHref = `mailto:${OWNER.email}`;
	readonly resumeFile = OWNER.resumeFile;
	readonly linkedinHref = OWNER.linkedin;
	readonly githubHref = OWNER.github;

	private readonly phrases = computed(() => this.i18n.t()('hero.typewriter.phrases').split(','));
	private phraseIdx = 0;
	private charIdx = 0;
	private deleting = false;
	private timer?: ReturnType<typeof setTimeout>;

	constructor() {
		effect(() => {
			this.phrases();
			this.phraseIdx = 0;
			this.charIdx = 0;
			this.deleting = false;
			clearTimeout(this.timer);
			this._tick();
		});

		inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
	}

	private _tick(): void {
		const phrases = this.phrases();
		const phrase = phrases[this.phraseIdx % phrases.length];

		if (!this.deleting) {
			this.charIdx++;
			this.displayedText.set(phrase.slice(0, this.charIdx));
			if (this.charIdx === phrase.length) {
				this.deleting = true;
				this.timer = setTimeout(() => this._tick(), 2200);
				return;
			}
		} else {
			this.charIdx--;
			this.displayedText.set(phrase.slice(0, this.charIdx));
			if (this.charIdx === 0) {
				this.deleting = false;
				this.phraseIdx++;
			}
		}

		this.timer = setTimeout(() => this._tick(), this.deleting ? 55 : 110);
	}
}
