import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../test/utils';
import { Navigation } from './navigation';

describe('Navigation', () => {
  it('renders the nav element', () => {
    renderWithProviders(<Navigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the brand logo text', () => {
    renderWithProviders(<Navigation />);
    // Brand text comes from data.json Navigation.logo.value
    expect(screen.getByText('Avanti Insieme')).toBeInTheDocument();
  });

  it('renders all navigation links from data, including Case Studies', () => {
    renderWithProviders(<Navigation />);
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /case studies/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('links "Case Studies" to the /case-studies route', () => {
    renderWithProviders(<Navigation />);
    expect(screen.getByRole('link', { name: /case studies/i })).toHaveAttribute(
      'href',
      '/case-studies'
    );
  });

  it('marks "Case Studies" as the active nav item when on /case-studies', () => {
    render(
      <MemoryRouter initialEntries={['/case-studies']}>
        <Navigation />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /case studies/i })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });
});
