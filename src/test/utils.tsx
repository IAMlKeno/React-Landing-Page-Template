import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartClassProvider } from '../features/cart/context/CartClassProvider';

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <CartClassProvider>{children}</CartClassProvider>
  </MemoryRouter>
);

/**
 * Use instead of @testing-library/react `render` for components that
 * depend on CartClassContext (CartIcon, CartModal, ProductList, Navigation).
 */
const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { renderWithProviders };
