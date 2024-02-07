"use client";

import { ReactNode, createContext, useContext } from "react";

import { useCart } from "../hooks/useCart";
import { ICartItem } from "../types/Cart";
import { IProduct } from "../types/Product";

interface ICartContextValues {
  cart: ICartItem[];
  itemsCount: number;
  price: number;
  addToCart: (item: IProduct) => void;
  removeFromCart: (id: number) => void;
  increaseItemCount: (id: number) => void;
  decreaseItemCount: (id: number) => void;
  setItemCount: (id: number, newCount: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<ICartContextValues | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartProviderValue = useCart();

  return (
    <CartContext.Provider value={cartProviderValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return context;
}
