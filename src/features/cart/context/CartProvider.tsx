import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../domain/Product";

interface CartContextType {
  products: Array<Product>;
  setProducts: (products: Array<Product>) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const MyCartProvider = ({children}: {children: React.ReactNode}) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const persistedCart = localStorage.getItem("shopping_cart");
    return persistedCart ? JSON.parse(persistedCart) : [];
  });

  useEffect(() => localStorage.setItem('shopping_cart', JSON.stringify(products)), [products]);

  return (
    <CartContext.Provider value={{ products, setProducts }}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Contains react functions products and setProducts
 * @returns The context of the cart
 */
export const useMyCart = () => {
  const context = useContext(CartContext);
  return context;
}
