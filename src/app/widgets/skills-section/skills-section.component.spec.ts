import { render, screen } from '@testing-library/angular';
import { SkillsSectionComponent } from './skills-section.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';

describe('SkillsSectionComponent', () => {
	it('should render compact marquee', async () => {
		const mockI18nService = {
			t: () => (key: string) => key,
		};
		await render(SkillsSectionComponent, {
			inputs: {
				compact: true,
			},
			providers: [{ provide: I18nService, useValue: mockI18nService }],
		});

		// Check one of the featured techs
		expect(screen.getAllByText('Angular')).toBeTruthy();
	});

	it('should render full categories when compact is false', async () => {
		const mockI18nService = {
			t: () => (key: string) => key,
		};
		await render(SkillsSectionComponent, {
			inputs: {
				compact: false,
			},
			providers: [{ provide: I18nService, useValue: mockI18nService }],
		});

		// Check keys are rendered as card headings
		expect(screen.getByText('skills.category.enterprise')).toBeTruthy();
		expect(screen.getByText('skills.category.ai')).toBeTruthy();
		expect(screen.getByText('skills.category.frontend-arch')).toBeTruthy();
		expect(screen.getByText('skills.category.devops')).toBeTruthy();
	});
});
