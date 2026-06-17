import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { OWNER } from '@shared/config/contact.config';

import { TerminalSwitcherComponent } from '@features/mode-switcher/terminal-switcher/terminal-switcher.component';

interface NavItem {
  labelKey: 'nav.projects' | 'nav.experience' | 'nav.skills' | 'nav.about';
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: 'nav.projects', path: '/projects' },
  { labelKey: 'nav.experience', path: '/experience' },
  { labelKey: 'nav.skills', path: '/skills' },
  { labelKey: 'nav.about', path: '/about' },
];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TerminalSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly i18n = inject(I18nService);
  readonly navItems = NAV_ITEMS;
  readonly resumeFile = OWNER.resumeFile;
  readonly mobileOpen = signal(false);
  readonly isScrolled = signal(false);

  readonly headerClass = computed(() =>
    this.isScrolled() ? 'scrolled-header' : ''
  );

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 60);
  }
}
