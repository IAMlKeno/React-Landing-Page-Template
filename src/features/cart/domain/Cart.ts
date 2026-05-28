import { Product } from "./Product";

export class CartItem {
  item: Product;
  costPerItem: number;
  quantity: number;

  constructor(product: Product) {
    this.item = product;
    this.costPerItem = product.price;
    this.quantity = 1;
  }
}
export interface ICart {
  id: string;
  cartItems: CartItem[];
  totalItems: number;
  totalCost: number;
}

export class Cart implements ICart {
  id: string;
  cartItems: CartItem[];
  totalItems: number;
  totalCost: number;

  constructor(cart?: ICart) {
    this.id = cart?.id ?? crypto.randomUUID();
    this.cartItems = cart?.cartItems ?? [];
    this.totalItems = cart?.totalItems ??  0;
    this.totalCost = cart?.totalCost ?? 0.0;
  }

  public addToCart(item: Product): Cart {
    let theCart = this.cartItems;

    if (this.cartItems.find((cartItem) => cartItem.item.id == item.id) ) {
      theCart = this.cartItems.map((cartItem: CartItem) => {
        // if the item's product is present increment
        if (cartItem.item.id == item.id) {
          cartItem.quantity++;
        }
        return cartItem;
      });
    } else {
      // else add a new one
      theCart = [...this.cartItems, new CartItem(item)];
    }
    this.cartItems = theCart;
    this.updateCart();
    return this;
  }

  removeFromCart(item: Product): Cart {
    let theCart = this.cartItems.map((v: CartItem, i: number) => { 
      if (v.item.id == item.id) {
        v.quantity--;
      }
      return v;
     });

    this.cartItems = theCart;
    this.updateCart();
    return this;
  }

  purgeCart(): Cart {
    this.cartItems = this.cartItems.filter((i) => !i);
    this.updateCart();
    return this;
  }

  private updateCart() {
    this.purgeEmptyItems();
    this.updateCost();
    this.updateCount();
  }

  private purgeEmptyItems() {
    this.cartItems = this.cartItems.filter((i) => i.quantity > 0);
  }

  private updateCount() {
    let count = 0;
    this.cartItems.forEach((i: CartItem) => count += i.quantity );
    this.totalItems = count;
  }

  private updateCost() {
    let cost = 0.0;
    this.cartItems.forEach((i: CartItem) => cost += (i.costPerItem * i.quantity) );
    this.totalCost = cost;
  }
}
