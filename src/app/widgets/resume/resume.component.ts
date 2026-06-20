import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	effect,
	inject,
	signal,
} from '@angular/core';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import type { ResumeSection, ResumeState, ResumeStyle } from './resume.types';
import { ALL_SECTIONS } from './resume.types';
import { ResumeHeaderComponent } from './ui/resume-header.component';
import { ResumeSummaryComponent } from './ui/resume-summary.component';
import { ResumeExperienceComponent } from './ui/resume-experience.component';
import { ResumeEducationComponent } from './ui/resume-education.component';
import { ResumeProjectsComponent } from './ui/resume-projects.component';
import { ResumeSkillsComponent } from './ui/resume-skills.component';
import { ResumeControlsComponent } from './ui/resume-controls.component';

const STORAGE_KEY = 'resume-builder-state';

@Component({
	selector: 'app-resume',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ResumeHeaderComponent,
		ResumeSummaryComponent,
		ResumeExperienceComponent,
		ResumeEducationComponent,
		ResumeProjectsComponent,
		ResumeSkillsComponent,
		ResumeControlsComponent,
	],
	template: `
		<div class="resume-layout" [attr.data-style]="activeStyle()">
			<app-resume-controls
				[activeStyle]="activeStyle()"
				[visibleSections]="visibleSections()"
				(styleChange)="onStyleChange($event)"
				(sectionToggle)="onSectionToggle($event)"
				(resetClick)="resetState()"
			/>

			<div class="resume-document" [class]="'resume-document--' + activeStyle()">
				<app-resume-header />

				<app-resume-summary [visible]="isSectionVisible('summary')" />

				<app-resume-experience
					[visible]="isSectionVisible('experience')"
					[visibleBullets]="visibleBullets()"
					(toggleBullet)="onToggleBullet($event)"
				/>

				<app-resume-education [visible]="isSectionVisible('education')" />

				<app-resume-projects
					[visible]="isSectionVisible('projects')"
					[visibleProjects]="visibleProjects()"
					(toggleProject)="onToggleProject($event)"
				/>

				<app-resume-skills
					[visible]="isSectionVisible('skills')"
					[visibleSkills]="visibleSkills()"
					(toggleSkill)="onToggleSkill($event)"
				/>
			</div>
		</div>
	`,
	styleUrl: './resume.component.css',
})
export class ResumeComponent implements OnInit {
	readonly i18n = inject(I18nService);

	readonly activeStyle = signal<ResumeStyle>('modern');
	readonly visibleSections = signal<ResumeSection[]>([...ALL_SECTIONS]);
	readonly visibleBullets = signal<Record<string, number[]>>({});
	readonly visibleProjects = signal<string[]>([]);
	readonly visibleSkills = signal<string[]>([]);

	constructor() {
		effect(() => {
			const state: ResumeState = {
				style: this.activeStyle(),
				visibleSections: this.visibleSections(),
				visibleBullets: this.visibleBullets(),
				visibleProjects: this.visibleProjects(),
				visibleSkills: this.visibleSkills(),
			};
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
			} catch {
				// localStorage not available (SSR)
			}
		});
	}

	ngOnInit(): void {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const state: ResumeState = JSON.parse(raw);
				this.activeStyle.set(state.style ?? 'modern');
				this.visibleSections.set(state.visibleSections ?? [...ALL_SECTIONS]);
				this.visibleBullets.set(state.visibleBullets ?? {});
				this.visibleProjects.set(state.visibleProjects ?? []);
				this.visibleSkills.set(state.visibleSkills ?? []);
			}
		} catch {
			// ignore parse errors
		}
	}

	isSectionVisible(section: ResumeSection): boolean {
		return this.visibleSections().includes(section);
	}

	onStyleChange(style: ResumeStyle): void {
		this.activeStyle.set(style);
	}

	onSectionToggle(section: ResumeSection): void {
		this.visibleSections.update((sections) => {
			if (sections.includes(section)) {
				return sections.filter((s) => s !== section);
			}
			return [...sections, section];
		});
	}

	onToggleBullet(event: { company: string; index: number }): void {
		this.visibleBullets.update((bullets) => {
			const current = bullets[event.company] ?? [];
			const updated = current.includes(event.index)
				? current.filter((i) => i !== event.index)
				: [...current, event.index];
			return { ...bullets, [event.company]: updated };
		});
	}

	onToggleProject(title: string): void {
		const allProjects = ['UNP Campus Map', 'MAD AI', 'FluentReads', 'Auctions'];
		this.visibleProjects.update((projects) => {
			if (projects.length === 0) {
				return allProjects.filter((p) => p !== title);
			}
			if (projects.includes(title)) {
				return projects.filter((p) => p !== title);
			}
			return [...projects, title];
		});
	}

	onToggleSkill(name: string): void {
		const allSkills = [
			'Angular',
			'TypeScript',
			'React',
			'Next.js',
			'Tailwind',
			'RxJS',
			'.NET 8',
			'C#',
			'Python',
			'Django',
			'Java',
			'Spring Boot',
			'Express',
			'PostgreSQL',
			'SQL Server',
			'MySQL',
			'SQLite',
			'Azure DevOps',
			'Astro',
			'WordPress',
			'Cloudinary',
		];
		this.visibleSkills.update((skills) => {
			if (skills.length === 0) {
				return allSkills.filter((s) => s !== name);
			}
			if (skills.includes(name)) {
				return skills.filter((s) => s !== name);
			}
			return [...skills, name];
		});
	}

	resetState(): void {
		this.activeStyle.set('modern');
		this.visibleSections.set([...ALL_SECTIONS]);
		this.visibleBullets.set({});
		this.visibleProjects.set([]);
		this.visibleSkills.set([]);
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {
			// ignore
		}
	}
}
