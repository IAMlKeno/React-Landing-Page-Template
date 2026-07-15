import { render, screen } from '@testing-library/react';
import { CaseStudiesView } from './CaseStudiesView';
import JsonData from '../../data/data.json';
import type { LandingPageData } from '../../types';

const firstStudy = (JsonData as LandingPageData).CaseStudies[0];

describe('CaseStudiesView', () => {
  it('renders the default hero and card grid with no study selected', () => {
    render(<CaseStudiesView />);
    expect(screen.getByText('Client Success Stories')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Case Studies', level: 1 })).toBeInTheDocument();
    expect(screen.queryByText('Back to All Case Studies')).not.toBeInTheDocument();
  });

  it('renders the matching study detail directly when given a slug (shared/direct-link case)', () => {
    render(<CaseStudiesView slug={firstStudy.slug} />);
    expect(
      screen.getByRole('heading', { name: firstStudy.title, level: 2 })
    ).toBeInTheDocument();
    expect(document.querySelector('.ai-cs-detail-client')).toHaveTextContent(firstStudy.client);
    expect(screen.getByText('Back to All Case Studies')).toBeInTheDocument();
  });

  it('renders the generic hero and no detail section when the slug matches nothing', () => {
    render(<CaseStudiesView slug="not-a-real-slug" />);
    expect(screen.getByText('Client Success Stories')).toBeInTheDocument();
    expect(document.querySelector('.ai-cs-detail-client')).not.toBeInTheDocument();
  });

  it('links a card to its own case-study slug and the "Back" link to the list', () => {
    render(<CaseStudiesView slug={firstStudy.slug} />);
    expect(screen.getByRole('link', { name: /back to all case studies/i })).toHaveAttribute(
      'href',
      '/case-studies'
    );
  });
});
