import { Cart, CartItem } from './Cart';
import type { Product } from './Product';

const productA: Product = {
  id: '1',
  name: 'Widget',
  sku: 'WGT-001',
  price: 9.99,
  icon: 'fa-box',
  description: 'A widget',
};

const productB: Product = {
  id: '2',
  name: 'Gadget',
  sku: 'GDG-001',
  price: 4.99,
  icon: 'fa-star',
  description: 'A gadget',
};

// ---------------------------------------------------------------------------
// CartItem
// ---------------------------------------------------------------------------

describe('CartItem', () => {
  it('initializes with quantity 1 and the product price', () => {
    const item = new CartItem(productA);
    expect(item.quantity).toBe(1);
    expect(item.costPerItem).toBe(productA.price);
    expect(item.item).toEqual(productA);
  });
});

// ---------------------------------------------------------------------------
// Cart — construction
// ---------------------------------------------------------------------------

describe('Cart — constructor', () => {
  it('creates an empty cart', () => {
    const cart = new Cart();
    expect(cart.cartItems).toHaveLength(0);
    expect(cart.totalItems).toBe(0);
    expect(cart.totalCost).toBe(0);
  });

  it('restores state from an existing ICart snapshot', () => {
    const source = new Cart();
    source.addToCart(productA);
    const restored = new Cart(source);
    expect(restored.cartItems).toHaveLength(1);
    expect(restored.totalItems).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// Cart — addToCart
// ---------------------------------------------------------------------------

describe('Cart — addToCart', () => {
  it('adds a new item', () => {
    const cart = new Cart();
    cart.addToCart(productA);
    expect(cart.cartItems).toHaveLength(1);
    expect(cart.cartItems[0].item).toEqual(productA);
  });

  it('increments quantity when the same item is added again', () => {
    const cart = new Cart();
    cart.addToCart(productA);
    cart.addToCart(productA);
    expect(cart.cartItems).toHaveLength(1);
    expect(cart.cartItems[0].quantity).toBe(2);
  });

  it('keeps different items as separate entries', () => {
    const cart = new Cart();
    cart.addToCart(productA);
    cart.addToCart(productB);
    expect(cart.cartItems).toHaveLength(2);
  });

  it('updates totalItems correctly', () => {
    const cart = new Cart();
    cart.addToCart(productA);
    cart.addToCart(productA);
    cart.addToCart(productB);
    expect(cart.totalItems).toBe(3);
  });

  it('updates totalCost correctly', () => {
    const cart = new Cart();
    cart.addToCart(productA); // 9.99
    cart.addToCart(productB); // 4.99
    expect(cart.totalCost).toBeCloseTo(14.98);
  });
});

// ---------------------------------------------------------------------------
// Cart — removeFromCart
// ---------------------------------------------------------------------------

describe('Cart — removeFromCart', () => {
  it('decrements quantity by 1', () => {
    const cart = new Cart();
    cart.addToCart(productA);
    cart.addToCart(productA);
    cart.removeFromCart(productA);
    expect(cart.cartItems[0].quantity).toBe(1);
  });

  it('removes the item entirely when quantity reaches zero', () => {
    const cart = new Cart();
    cart.addToCart(productA);
    cart.removeFromCart(productA);
    expect(cart.cartItems).toHaveLength(0);
  });

  it('only removes the targeted item', () => {
    const cart = new Cart();
    cart.addToCart(productA);
    cart.addToCart(productB);
    cart.removeFromCart(productA);
    expect(cart.cartItems).toHaveLength(1);
    expect(cart.cartItems[0].item).toEqual(productB);
  });

  it('updates totalItems after removal', () => {
    const cart = new Cart();
    cart.addToCart(productA);
    cart.addToCart(productA);
    cart.removeFromCart(productA);
    expect(cart.totalItems).toBe(1);
  });

  it('updates totalCost after removal', () => {
    const cart = new Cart();
    cart.addToCart(productA);
    cart.addToCart(productA); // 19.98
    cart.removeFromCart(productA); // 9.99
    expect(cart.totalCost).toBeCloseTo(9.99);
  });
});

// ---------------------------------------------------------------------------
// Cart — purgeCart
// ---------------------------------------------------------------------------

describe('Cart — purgeCart', () => {
  it('removes all items', () => {
    const cart = new Cart();
    cart.addToCart(productA);
    cart.addToCart(productB);
    cart.purgeCart();
    expect(cart.cartItems).toHaveLength(0);
  });

  it('resets totalItems to 0', () => {
    const cart = new Cart();
    cart.addToCart(productA);
    cart.purgeCart();
    expect(cart.totalItems).toBe(0);
  });

  it('resets totalCost to 0', () => {
    const cart = new Cart();
    cart.addToCart(productA);
    cart.purgeCart();
    expect(cart.totalCost).toBe(0);
  });
});
