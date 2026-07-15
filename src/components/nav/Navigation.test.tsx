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
});
