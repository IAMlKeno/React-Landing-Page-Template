import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Contact } from './contact';
import JsonData from '../data/data.json';
import type { LandingPageData } from '../types';

const firstStudy = (JsonData as LandingPageData).CaseStudies[0];

describe('Contact form autopopulation from a case study', () => {
  it('leaves the message blank when no project query param is present', () => {
    render(
      <MemoryRouter initialEntries={['/#contact']}>
        <Contact />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/message/i)).toHaveValue('');
  });

  it('prefills the message referencing the case study title and tag when ?project=<slug> is present', () => {
    render(
      <MemoryRouter initialEntries={[`/?project=${firstStudy.slug}#contact`]}>
        <Contact />
      </MemoryRouter>
    );
    const message = screen.getByLabelText(/message/i) as HTMLTextAreaElement;
    expect(message.value).toContain(firstStudy.title);
    expect(message.value).toContain(firstStudy.tag);
  });

  it('leaves the message blank when the project slug does not match any case study', () => {
    render(
      <MemoryRouter initialEntries={['/?project=not-a-real-slug']}>
        <Contact />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/message/i)).toHaveValue('');
  });
});
