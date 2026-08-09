import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CaseStudiesListClient } from './CaseStudiesListClient';
import type { CaseStudy } from '@/types';

const makeStudies = (count: number): CaseStudy[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `study-${i + 1}`,
    slug: `study-${i + 1}`,
    tag: 'Squat with Confidence',
    client: `Client ${i + 1}`,
    title: `Case Study ${i + 1}`,
    body: `Body text for case study ${i + 1}.`,
    results: [{ stat: '10', label: 'Sessions' }],
  }));

describe('CaseStudiesListClient', () => {
  it('shows 6 cards per page and the correct range label', () => {
    render(<CaseStudiesListClient studies={makeStudies(8)} />);
    expect(screen.getByText('Showing 1–6 of 8')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /read case study/i })).toHaveLength(6);
  });

  it('renders each card as a real link to its slug, not a button', () => {
    render(<CaseStudiesListClient studies={makeStudies(2)} />);
    expect(screen.getByRole('link', { name: /case study 1/i })).toHaveAttribute(
      'href',
      '/case-studies/study-1'
    );
  });

  it('disables Previous on the first page and enables Next', () => {
    render(<CaseStudiesListClient studies={makeStudies(8)} />);
    expect(screen.getByRole('button', { name: /previous page/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /next page/i })).not.toBeDisabled();
  });

  it('marks the active page button with aria-current, and paginates on click', async () => {
    const user = userEvent.setup();
    render(<CaseStudiesListClient studies={makeStudies(8)} />);

    const pageOneBtn = screen.getByRole('button', { name: '1' });
    expect(pageOneBtn).toHaveAttribute('aria-current', 'page');

    await user.click(screen.getByRole('button', { name: /next page/i }));

    expect(screen.getByText('Showing 7–8 of 8')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: /next page/i })).toBeDisabled();
  });

  it('renders no pagination controls when everything fits on one page', () => {
    render(<CaseStudiesListClient studies={makeStudies(3)} />);
    expect(screen.queryByRole('navigation', { name: /case studies pages/i })).not.toBeInTheDocument();
  });
});
