import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Navigation } from './navigation';

const { usePathname } = vi.hoisted(() => ({ usePathname: vi.fn(() => '/') }));

vi.mock('next/navigation', () => ({
  usePathname: () => usePathname(),
}));

describe('Navigation', () => {
  beforeEach(() => {
    usePathname.mockReturnValue('/');
  });

  it('renders the nav element', () => {
    render(<Navigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the brand logo text', () => {
    render(<Navigation />);
    // Brand text comes from data.json Navigation.logo.value
    expect(screen.getByText('Squat with Confidence')).toBeInTheDocument();
  });

  it('renders all navigation links from data', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /programs/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /process/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /testimonials/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /case studies/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /faq/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders the free consultation CTA', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /start your strength journey/i })).toBeInTheDocument();
  });

  it('renders anchor links unprefixed when on the home route', () => {
    usePathname.mockReturnValue('/');
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /faq/i })).toHaveAttribute('href', '#faq');
    expect(screen.getByRole('link', { name: /start your strength journey/i })).toHaveAttribute(
      'href',
      '#contact'
    );
  });

  it('prefixes anchor links with "/" when on a non-home route', () => {
    usePathname.mockReturnValue('/case-studies');
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /faq/i })).toHaveAttribute('href', '/#faq');
    expect(screen.getByRole('link', { name: /start your strength journey/i })).toHaveAttribute(
      'href',
      '/#contact'
    );
    // Real routes stay untouched
    expect(screen.getByRole('link', { name: /case studies/i })).toHaveAttribute(
      'href',
      '/case-studies'
    );
  });
});
