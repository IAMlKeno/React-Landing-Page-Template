import { render, screen } from '@testing-library/react';
import { Navigation } from './navigation';

const mockUsePathname = vi.fn(() => '/');
vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

describe('Navigation', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('renders the nav element', () => {
    render(<Navigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the brand logo text', () => {
    render(<Navigation />);
    // Brand text comes from data.json Navigation.logo.value
    expect(screen.getByText('Avanti Insieme')).toBeInTheDocument();
  });

  it('renders all navigation links from data, including Case Studies', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /case studies/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('links "Case Studies" to the /case-studies route', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /case studies/i })).toHaveAttribute(
      'href',
      '/case-studies'
    );
  });

  it('marks "Case Studies" as the active nav item when on /case-studies', () => {
    mockUsePathname.mockReturnValue('/case-studies');
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /case studies/i })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('points anchor links (Services/About/Contact) at "/#..." when not on the homepage', () => {
    mockUsePathname.mockReturnValue('/case-studies');
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '/#services');
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/#about');
    expect(screen.getByRole('link', { name: /^contact$/i })).toHaveAttribute('href', '/#contact');
    expect(screen.getByRole('link', { name: /get a free consult/i })).toHaveAttribute(
      'href',
      '/#contact'
    );
  });

  it('leaves anchor links as plain "#..." hashes when already on the homepage', () => {
    mockUsePathname.mockReturnValue('/');
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '#services');
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: /^contact$/i })).toHaveAttribute('href', '#contact');
  });
});
