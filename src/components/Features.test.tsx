import { render, screen } from '@testing-library/react';
import { Features } from './features';
import type { FeatureItem } from '../types';

const mockFeatures: FeatureItem[] = [
  { icon: 'fa fa-star', title: 'Feature One', text: 'First feature description' },
  { icon: 'fa fa-heart', title: 'Feature Two', text: 'Second feature description' },
];

describe('Features', () => {
  it('renders "Loading..." when no data is provided', () => {
    render(<Features />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the section heading', () => {
    render(<Features data={mockFeatures} />);
    expect(screen.getByRole('heading', { name: /features/i, level: 2 })).toBeInTheDocument();
  });

  it('renders a card for each feature item', () => {
    render(<Features data={mockFeatures} />);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(mockFeatures.length);
  });

  it('renders each feature title and description text', () => {
    render(<Features data={mockFeatures} />);
    expect(screen.getByText('Feature One')).toBeInTheDocument();
    expect(screen.getByText('First feature description')).toBeInTheDocument();
    expect(screen.getByText('Feature Two')).toBeInTheDocument();
    expect(screen.getByText('Second feature description')).toBeInTheDocument();
  });

  it('renders with an empty array without crashing', () => {
    render(<Features data={[]} />);
    expect(screen.getByRole('heading', { name: /features/i })).toBeInTheDocument();
  });
});
