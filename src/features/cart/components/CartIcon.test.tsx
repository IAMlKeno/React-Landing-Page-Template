import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../test/utils';
import CartIcon from './CartIcon';

describe('CartIcon', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the cart button', () => {
    renderWithProviders(<CartIcon />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows a count of 0 when the cart is empty', () => {
    renderWithProviders(<CartIcon />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('opens the cart modal when clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartIcon />);
    await user.click(screen.getByRole('button'));
    expect(document.querySelector('dialog')).toBeInTheDocument();
  });
});
