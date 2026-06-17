import { render, screen } from '@testing-library/angular';
import { ExperienceTimelineComponent } from './experience-timeline.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { signal } from '@angular/core';

describe('ExperienceTimelineComponent', () => {
  it('should render tab list and content panel', async () => {
    const mockLangSignal = signal<'en' | 'es'>('en');
    const mockI18nService = {
      lang: mockLangSignal,
      t: () => (key: string) => key,
    };

    await render(ExperienceTimelineComponent, {
      providers: [
        { provide: I18nService, useValue: mockI18nService },
      ],
    });

    // Check that company tabs exist
    expect(screen.getAllByText('experience.atena.company').length).toBeGreaterThan(0);
  });
});
