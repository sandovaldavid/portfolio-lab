import { render, screen } from '@testing-library/angular';
import { SkillsSectionComponent } from './skills-section.component';

describe('SkillsSectionComponent', () => {
	it('should render compact marquee', async () => {
		await render(SkillsSectionComponent, {
			inputs: {
				compact: true,
			},
		});

		// Check one of the featured techs
		expect(screen.getAllByText('Angular')).toBeTruthy();
	});

	it('should render full categories when compact is false', async () => {
		await render(SkillsSectionComponent, {
			inputs: {
				compact: false,
			},
		});

		// Check headings
		expect(screen.getByText('// Frontend')).toBeTruthy();
		expect(screen.getByText('// Backend')).toBeTruthy();
		expect(screen.getByText('// Databases')).toBeTruthy();
		expect(screen.getByText('// Tools')).toBeTruthy();
	});
});
