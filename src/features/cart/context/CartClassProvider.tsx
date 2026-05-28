
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { Cart, ICart } from "../domain/Cart";
import { Product } from "../domain/Product";

interface CartClassContextType {
  cart: Cart;
  dispatch: (action: ICartActions) => void;
}

interface ICartActions {
  type: string;
  item: Product;
}

export const CartClassContext = createContext<CartClassContextType | undefined>(undefined);

const cartReducer = (state: Cart, action: ICartActions) => {
  const newCart = new Cart(state);
  let returnValue: any;
  switch (action.type) {
    case 'ADD_TO_CART':
      newCart.addToCart(action.item);
      returnValue = { ...newCart };
      break;
    case 'REMOVE_FROM_CART':
      newCart.removeFromCart(action.item);
      returnValue = { ...newCart };
      break;
    default:
      returnValue = state;
  }
  updateLocalStorage(returnValue);
  return returnValue
}
const updateLocalStorage = (data: any) => localStorage.setItem('shopping_cart', JSON.stringify(data));

export const CartClassProvider = ({children}: {children: React.ReactNode}) => {
  const initialValue = localStorage.getItem("shopping_cart")
    ? new Cart(JSON.parse(localStorage.getItem("shopping_cart")))
    : new Cart();

  const [state, dispatch] = useReducer(cartReducer, initialValue);

  return (
    <CartClassContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartClassContext.Provider>
  );
}

/**
 * Contains react functions products and setProducts
 * @returns The context of the cart
 */
export const useClassCart = () => {
  const context = useContext(CartClassContext);
  return context;
}
