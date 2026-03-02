"use client";

import { useCartContext } from "@/context/CartContext";
import type { CartContextValue } from "@/context/CartContext";

/**
 * Hook for accessing the Shopify cart state and actions.
 *
 * Must be used inside a component tree wrapped by <CartProvider>.
 *
 * @example
 * const { cart, addToCart, cartCount, isLoading } = useCart();
 */
export function useCart(): CartContextValue {
  return useCartContext();
}
