import { render, screen } from '@testing-library/angular';
import { ExperienceItemComponent } from './experience-item.component';
import type { ExperienceItem } from '../model/experience.model';

describe('ExperienceItemComponent', () => {
	const mockExperience: ExperienceItem = {
		title: 'Senior Software Engineer',
		company: 'Tech Corp',
		date: '2023 - Present',
		description: ['Developed new features', 'Mentored junior devs'],
		technologies: ['Angular', 'TypeScript'],
		current: true,
	};

	it('should render experience details', async () => {
		await render(ExperienceItemComponent, {
			inputs: {
				item: mockExperience,
			},
		});

		expect(screen.getByText('Senior Software Engineer')).toBeTruthy();
		expect(screen.getByText('Tech Corp')).toBeTruthy();
		expect(screen.getByText('CURRENT')).toBeTruthy();
		expect(screen.getByText('Developed new features')).toBeTruthy();
	});
});
