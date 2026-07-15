import { render, screen, fireEvent } from '@testing-library/react';
import { CaseStudiesListClient } from './CaseStudiesListClient';
import type { CaseStudy } from '../../types';

const makeStudies = (count: number): CaseStudy[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `cs${i + 1}`,
    slug: `study-${i + 1}`,
    tag: 'Web Development',
    client: `Client ${i + 1}`,
    title: `Study ${i + 1}`,
    body: `Body for study ${i + 1}`,
    results: [{ stat: '10%', label: 'improvement' }],
  }));

describe('CaseStudiesListClient', () => {
  it('shows 6 items and the correct range label on the first page', () => {
    render(<CaseStudiesListClient studies={makeStudies(9)} />);
    expect(screen.getByText('Showing 1–6 of 9')).toBeInTheDocument();
    expect(document.querySelectorAll('.ai-cs-card')).toHaveLength(6);
  });

  it('renders each card as a link to its case-study slug', () => {
    render(<CaseStudiesListClient studies={makeStudies(2)} />);
    expect(screen.getByRole('link', { name: /Study 1/ })).toHaveAttribute(
      'href',
      '/case-studies/study-1'
    );
    expect(screen.getByRole('link', { name: /Study 2/ })).toHaveAttribute(
      'href',
      '/case-studies/study-2'
    );
  });

  it('marks the card matching selectedSlug as active', () => {
    render(<CaseStudiesListClient studies={makeStudies(2)} selectedSlug="study-2" />);
    expect(screen.getByRole('link', { name: /Study 1/ })).not.toHaveClass('is-active');
    expect(screen.getByRole('link', { name: /Study 2/ })).toHaveClass('is-active');
  });

  it('paginates to the remaining items and updates the range label', () => {
    render(<CaseStudiesListClient studies={makeStudies(9)} />);
    fireEvent.click(screen.getByLabelText('Page 2'));
    expect(screen.getByText('Showing 7–9 of 9')).toBeInTheDocument();
    expect(document.querySelectorAll('.ai-cs-card')).toHaveLength(3);
  });

  it('disables Previous on the first page and Next on the last page', () => {
    render(<CaseStudiesListClient studies={makeStudies(9)} />);
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    expect(screen.getByLabelText('Next page')).not.toBeDisabled();

    fireEvent.click(screen.getByLabelText('Page 2'));
    expect(screen.getByLabelText('Previous page')).not.toBeDisabled();
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('does not render pagination controls when everything fits on one page', () => {
    render(<CaseStudiesListClient studies={makeStudies(4)} />);
    expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument();
  });
});
