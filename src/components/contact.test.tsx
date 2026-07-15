import { render, screen } from '@testing-library/react';
import { Contact } from './contact';
import JsonData from '../data/data.json';
import type { LandingPageData } from '../types';

const firstStudy = (JsonData as LandingPageData).CaseStudies[0];

const mockUseSearchParams = vi.fn(() => new URLSearchParams());
vi.mock('next/navigation', () => ({
  useSearchParams: () => mockUseSearchParams(),
}));

describe('Contact form autopopulation from a case study', () => {
  beforeEach(() => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  it('leaves the message blank when no project query param is present', () => {
    render(<Contact />);
    expect(screen.getByLabelText(/message/i)).toHaveValue('');
  });

  it('prefills the message referencing the case study title and tag when ?project=<slug> is present', () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams(`project=${firstStudy.slug}`));
    render(<Contact />);
    const message = screen.getByLabelText(/message/i) as HTMLTextAreaElement;
    expect(message.value).toContain(firstStudy.title);
    expect(message.value).toContain(firstStudy.tag);
  });

  it('leaves the message blank when the project slug does not match any case study', () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams('project=not-a-real-slug'));
    render(<Contact />);
    expect(screen.getByLabelText(/message/i)).toHaveValue('');
  });
});
