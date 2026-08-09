import { render, screen } from '@testing-library/react';
import { CaseStudiesView } from './CaseStudiesView';
import { getAllCaseStudies } from '@/lib/case-studies';

const [firstStudy] = getAllCaseStudies();

describe('CaseStudiesView', () => {
  it('shows generic hero copy and no detail section when no slug is selected', () => {
    render(<CaseStudiesView />);
    expect(screen.getByRole('heading', { level: 1, name: /client success stories/i })).toBeInTheDocument();
    expect(screen.queryByText(/back to all case studies/i)).not.toBeInTheDocument();
  });

  it('shows the selected study hero and detail section for a real slug', () => {
    render(<CaseStudiesView slug={firstStudy.slug} />);
    expect(screen.getByRole('heading', { level: 1, name: firstStudy.title })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to all case studies/i })).toHaveAttribute(
      'href',
      '/case-studies'
    );
    // Detail body text appears in the rendered output
    expect(screen.getAllByText(firstStudy.client).length).toBeGreaterThan(0);
  });

  it('falls back to generic hero and no detail section for an unknown slug', () => {
    render(<CaseStudiesView slug="not-a-real-slug" />);
    expect(screen.getByRole('heading', { level: 1, name: /client success stories/i })).toBeInTheDocument();
    expect(screen.queryByText(/back to all case studies/i)).not.toBeInTheDocument();
  });
});
