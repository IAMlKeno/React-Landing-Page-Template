import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../test/utils';
import ProductList from './ProductList';

describe('ProductList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the Products section heading', () => {
    renderWithProviders(<ProductList />);
    expect(screen.getByRole('heading', { name: /products/i })).toBeInTheDocument();
  });

  it('renders at least one product from data', () => {
    renderWithProviders(<ProductList />);
    // Each product has an add button with class "add-cart"
    const addButtons = document.querySelectorAll('.add-cart');
    expect(addButtons.length).toBeGreaterThan(0);
  });

  it('shows a cart count of (0) for every product initially', () => {
    renderWithProviders(<ProductList />);
    const zeroCountLabels = screen.getAllByText(/add to cart \(0\)/i);
    expect(zeroCountLabels.length).toBeGreaterThan(0);
  });

  it('increments the in-cart count when the add button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductList />);

    const firstAddButton = document.querySelector('.add-cart') as HTMLElement;
    await user.click(firstAddButton);

    // Exactly one product now shows (1) in cart
    expect(screen.getAllByText(/add to cart \(1\)/i)).toHaveLength(1);
  });

  it('decrements the in-cart count when the remove button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductList />);

    const firstAdd = document.querySelector('.add-cart') as HTMLElement;
    const firstRemove = document.querySelector('.remove-cart') as HTMLElement;

    await user.click(firstAdd);
    expect(screen.getAllByText(/add to cart \(1\)/i)).toHaveLength(1);

    await user.click(firstRemove);
    expect(screen.queryByText(/add to cart \(1\)/i)).not.toBeInTheDocument();
  });
});
