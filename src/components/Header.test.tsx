import { render, screen } from '@testing-library/react';
import { Header } from './header';

describe('Header', () => {
  it('renders "Loading" placeholders when no data is provided', () => {
    render(<Header />);
    expect(screen.getAllByText('Loading')).toHaveLength(2);
  });

  it('renders the title', () => {
    render(<Header data={{ title: 'Hello World', paragraph: 'Some text' }} />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders the paragraph', () => {
    render(<Header data={{ title: 'Hello World', paragraph: 'Some text' }} />);
    expect(screen.getByText('Some text')).toBeInTheDocument();
  });

  it('renders the Learn More link pointing to #features', () => {
    render(<Header data={{ title: 'T', paragraph: 'P' }} />);
    const link = screen.getByRole('link', { name: /learn more/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#features');
  });
});
