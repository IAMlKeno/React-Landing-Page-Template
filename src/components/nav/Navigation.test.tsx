import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import { Navigation } from './navigation';

// Navigation reads data.json directly and renders CartIcon (needs CartClassContext),
// so we use renderWithProviders from src/test/utils.

describe('Navigation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the nav element', () => {
    renderWithProviders(<Navigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the brand logo text', () => {
    renderWithProviders(<Navigation />);
    // Brand text comes from data.json Navigation.logo.value
    expect(screen.getByText('Simple Cart')).toBeInTheDocument();
  });

  it('renders all navigation links from data', () => {
    renderWithProviders(<Navigation />);
    expect(screen.getByRole('link', { name: /features/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /gallery/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /testimonials/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /team/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders the cart icon button', () => {
    renderWithProviders(<Navigation />);
    // Two CartIcon instances exist: one in navbar-header (mobile), one in collapse (desktop)
    const cartButtons = screen.getAllByRole('button');
    expect(cartButtons.length).toBeGreaterThanOrEqual(2);
  });
});
