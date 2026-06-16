import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartModal from './CartModal';
import { Cart } from '../domain/Cart';
import type { Product } from '../domain/Product';

const testProduct: Product = {
  id: '1',
  name: 'Test Widget',
  sku: 'TST-001',
  price: 12.50,
  icon: 'fa-box',
  description: 'A test product',
};

describe('CartModal — empty cart', () => {
  it('renders the close button', () => {
    render(<CartModal isOpen={true} onClose={vi.fn()} children={new Cart()} />);
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('shows the empty cart message', () => {
    render(<CartModal isOpen={true} onClose={vi.fn()} children={new Cart()} />);
    expect(screen.getByText(/the cart is empty/i)).toBeInTheDocument();
  });

  it('calls onClose when Close is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<CartModal isOpen={true} onClose={onClose} children={new Cart()} />);
    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});

describe('CartModal — cart with items', () => {
  let cartWithItem: Cart;

  beforeEach(() => {
    cartWithItem = new Cart();
    cartWithItem.addToCart(testProduct);
  });

  it('renders the item name', () => {
    render(<CartModal isOpen={true} onClose={vi.fn()} children={cartWithItem} />);
    expect(screen.getByText(/test widget/i)).toBeInTheDocument();
  });

  it('renders the total cost', () => {
    render(<CartModal isOpen={true} onClose={vi.fn()} children={cartWithItem} />);
    expect(screen.getByText('$12.50')).toBeInTheDocument();
  });

  it('renders the Empty Cart button', () => {
    render(<CartModal isOpen={true} onClose={vi.fn()} children={cartWithItem} />);
    expect(screen.getByRole('button', { name: /empty cart/i })).toBeInTheDocument();
  });

  it('calls onEmptyCart when Empty Cart is clicked', async () => {
    const user = userEvent.setup();
    const onEmptyCart = vi.fn();
    render(
      <CartModal isOpen={true} onClose={vi.fn()} onEmptyCart={onEmptyCart} children={cartWithItem} />
    );
    await user.click(screen.getByRole('button', { name: /empty cart/i }));
    expect(onEmptyCart).toHaveBeenCalledOnce();
  });
});
