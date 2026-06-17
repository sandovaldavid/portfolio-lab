import { render, screen } from '@testing-library/angular';
import { ProjectCardComponent } from './project-card.component';
import type { ProjectItem } from '../model/project.model';

describe('ProjectCardComponent', () => {
  const mockProject: ProjectItem = {
    title: 'My Awesome Project',
    description: 'This is a description of my awesome project.',
    image: 'assets/project.png',
    tags: [{ name: 'Angular' }, { name: 'TypeScript' }],
    github: 'https://github.com/example/project',
    link: 'https://example.com',
  };

  it('should render project title and description', async () => {
    await render(ProjectCardComponent, {
      inputs: {
        project: mockProject,
      },
    });

    expect(screen.getByText('My Awesome Project')).toBeTruthy();
    expect(screen.getByText('This is a description of my awesome project.')).toBeTruthy();
  });
});
