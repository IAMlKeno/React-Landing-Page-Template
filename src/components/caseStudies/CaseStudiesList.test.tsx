import { render, screen, fireEvent } from '@testing-library/react';
import { CaseStudiesList } from './CaseStudiesList';
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

describe('CaseStudiesList pagination', () => {
  it('shows 6 items and the correct range label on the first page', () => {
    render(
      <CaseStudiesList
        studies={makeStudies(9)}
        page={0}
        onPageChange={() => {}}
        selectedId={null}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText('Showing 1–6 of 9')).toBeInTheDocument();
    expect(document.querySelectorAll('.ai-cs-card')).toHaveLength(6);
  });

  it('shows the remaining 3 items and correct range label on the last page', () => {
    render(
      <CaseStudiesList
        studies={makeStudies(9)}
        page={1}
        onPageChange={() => {}}
        selectedId={null}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText('Showing 7–9 of 9')).toBeInTheDocument();
    expect(document.querySelectorAll('.ai-cs-card')).toHaveLength(3);
  });

  it('disables Previous on the first page and Next on the last page', () => {
    const { rerender } = render(
      <CaseStudiesList
        studies={makeStudies(9)}
        page={0}
        onPageChange={() => {}}
        selectedId={null}
        onSelect={() => {}}
      />
    );
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    expect(screen.getByLabelText('Next page')).not.toBeDisabled();

    rerender(
      <CaseStudiesList
        studies={makeStudies(9)}
        page={1}
        onPageChange={() => {}}
        selectedId={null}
        onSelect={() => {}}
      />
    );
    expect(screen.getByLabelText('Previous page')).not.toBeDisabled();
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('calls onPageChange with the target page when a page button is clicked', () => {
    const onPageChange = vi.fn();
    render(
      <CaseStudiesList
        studies={makeStudies(9)}
        page={0}
        onPageChange={onPageChange}
        selectedId={null}
        onSelect={() => {}}
      />
    );
    fireEvent.click(screen.getByLabelText('Page 2'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('does not render pagination controls when everything fits on one page', () => {
    render(
      <CaseStudiesList
        studies={makeStudies(4)}
        page={0}
        onPageChange={() => {}}
        selectedId={null}
        onSelect={() => {}}
      />
    );
    expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument();
  });
});
