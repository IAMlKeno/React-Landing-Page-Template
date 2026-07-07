import { render, screen } from '@testing-library/react';
import { Navigation } from './navigation';

describe('Navigation', () => {
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
    expect(screen.getByRole('link', { name: /faq/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders the free consultation CTA', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: /get a free consult/i })).toBeInTheDocument();
  });
});
