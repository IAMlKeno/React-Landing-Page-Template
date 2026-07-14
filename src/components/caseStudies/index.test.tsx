import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { CaseStudiesPage } from './index';
import JsonData from '../../data/data.json';
import type { LandingPageData } from '../../types';

const firstStudy = (JsonData as LandingPageData).CaseStudies[0];

const renderAt = (initialEntry: string) =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/case-studies/:slug" element={<CaseStudiesPage />} />
      </Routes>
    </MemoryRouter>
  );

describe('CaseStudiesPage', () => {
  it('renders the default hero and card grid with no study selected', () => {
    renderAt('/case-studies');
    expect(screen.getByText('Client Success Stories')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Case Studies', level: 1 })).toBeInTheDocument();
    expect(screen.queryByText('Back to All Case Studies')).not.toBeInTheDocument();
  });

  it('renders the matching study detail directly when loaded at a shared /case-studies/:slug URL', () => {
    renderAt(`/case-studies/${firstStudy.slug}`);
    expect(
      screen.getByRole('heading', { name: firstStudy.title, level: 2 })
    ).toBeInTheDocument();
    expect(document.querySelector('.ai-cs-detail-client')).toHaveTextContent(firstStudy.client);
    expect(screen.getByText('Back to All Case Studies')).toBeInTheDocument();
  });

  it('shows a study detail after clicking its card, and clears it via the back button', async () => {
    vi.useFakeTimers();
    renderAt('/case-studies');

    fireEvent.click(screen.getByRole('button', { name: new RegExp(firstStudy.title) }));
    await vi.advanceTimersByTimeAsync(150);

    expect(
      screen.getByRole('heading', { name: firstStudy.title, level: 2 })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Back to All Case Studies'));
    await vi.advanceTimersByTimeAsync(150);

    expect(
      screen.queryByRole('heading', { name: firstStudy.title, level: 2 })
    ).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
