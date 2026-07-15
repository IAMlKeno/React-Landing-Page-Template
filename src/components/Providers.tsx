"use client";

import { CartClassProvider } from "@/features/cart/context/CartClassProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <CartClassProvider>{children}</CartClassProvider>
);
