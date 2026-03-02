"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useOptimistic,
  useState,
  startTransition,
} from "react";
import type { ShopifyCart } from "@/lib/shopify/types";
import { getCart } from "@/lib/shopify/queries";
import {
  createCart,
  addToCart as addToCartMutation,
  updateCartItem as updateCartItemMutation,
  removeFromCart as removeFromCartMutation,
} from "@/lib/shopify/mutations";

// ─── Constants ────────────────────────────────────────────────────────────────

const CART_ID_KEY = "komodo-cart-id";

// ─── Optimistic state reducer ─────────────────────────────────────────────────

type CartOptimisticAction =
  | { type: "update"; lineId: string; quantity: number }
  | { type: "remove"; lineId: string };

function applyOptimisticUpdate(
  cart: ShopifyCart | null,
  action: CartOptimisticAction,
): ShopifyCart | null {
  if (!cart) return cart;

  switch (action.type) {
    case "update": {
      const lines = cart.lines.map((l) =>
        l.id === action.lineId ? { ...l, quantity: action.quantity } : l,
      );
      const totalQuantity = lines.reduce((s, l) => s + l.quantity, 0);
      // Recompute optimistic line cost
      const updatedLines = lines.map((l) =>
        l.id === action.lineId
          ? {
              ...l,
              cost: {
                ...l.cost,
                totalAmount: {
                  ...l.cost.amountPerQuantity,
                  amount: (
                    parseFloat(l.cost.amountPerQuantity.amount) * action.quantity
                  ).toFixed(2),
                },
              },
            }
          : l,
      );
      const total = updatedLines
        .reduce((s, l) => s + parseFloat(l.cost.totalAmount.amount), 0)
        .toFixed(2);
      return {
        ...cart,
        lines: updatedLines,
        totalQuantity,
        cost: {
          ...cart.cost,
          subtotalAmount: { ...cart.cost.subtotalAmount, amount: total },
          totalAmount: { ...cart.cost.totalAmount, amount: total },
        },
      };
    }

    case "remove": {
      const removed = cart.lines.find((l) => l.id === action.lineId);
      const lines = cart.lines.filter((l) => l.id !== action.lineId);
      const totalQuantity = lines.reduce((s, l) => s + l.quantity, 0);
      const removedAmount = removed
        ? parseFloat(removed.cost.totalAmount.amount)
        : 0;
      const total = Math.max(
        0,
        parseFloat(cart.cost.totalAmount.amount) - removedAmount,
      ).toFixed(2);
      return {
        ...cart,
        lines,
        totalQuantity,
        cost: {
          ...cart.cost,
          subtotalAmount: { ...cart.cost.subtotalAmount, amount: total },
          totalAmount: { ...cart.cost.totalAmount, amount: total },
        },
      };
    }
  }
}

// ─── Context types ────────────────────────────────────────────────────────────

export interface CartContextValue {
  /** The current cart (may reflect optimistic state during pending operations). */
  cart: ShopifyCart | null;
  /** Add a variant to the cart. Creates a cart if one doesn't exist yet. */
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  /** Update a line item's quantity. Optimistically applied. */
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  /** Remove a line item. Optimistically applied. */
  removeItem: (lineId: string) => Promise<void>;
  /** Total number of items across all lines. */
  cartCount: number;
  /** Formatted total price string (e.g. "$24.99"). */
  cartTotal: string;
  /** Whether the cart drawer/modal is open. */
  isCartOpen: boolean;
  /** Toggle cart drawer open/closed. */
  toggleCart: () => void;
  /** True while an addToCart network request is in-flight. */
  isLoading: boolean;
  /** Last error message, or null if no error. */
  error: string | null;
  /** Clear the current error. */
  clearError: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useOptimistic keeps the UI responsive for update/remove operations.
  // During a startTransition, `optimisticCart` shows the predicted state.
  // It automatically reverts to `cart` when the transition settles.
  const [optimisticCart, dispatchOptimistic] = useOptimistic(
    cart,
    applyOptimisticUpdate,
  );

  // ── Hydrate cart from localStorage on mount ──────────────────────────────
  useEffect(() => {
    const storedId =
      typeof window !== "undefined"
        ? localStorage.getItem(CART_ID_KEY)
        : null;
    if (!storedId) return;

    setCartId(storedId);
    getCart(storedId)
      .then((loaded) => {
        if (loaded) {
          setCart(loaded);
        } else {
          // Cart has expired or the stored ID is stale — reset
          localStorage.removeItem(CART_ID_KEY);
          setCartId(null);
        }
      })
      .catch(() => {
        localStorage.removeItem(CART_ID_KEY);
        setCartId(null);
      });
  }, []);

  // ── Ensure a cart exists and return its ID ───────────────────────────────
  const ensureCart = useCallback(async (): Promise<string> => {
    if (cartId) return cartId;
    const newCart = await createCart();
    localStorage.setItem(CART_ID_KEY, newCart.id);
    setCartId(newCart.id);
    setCart(newCart);
    return newCart.id;
  }, [cartId]);

  // ── addToCart ────────────────────────────────────────────────────────────
  // Does NOT use optimistic updates — we need the server to resolve the new
  // line ID and merged quantities before we can display the correct state.
  const addToCart = useCallback(
    async (variantId: string, quantity = 1) => {
      setIsLoading(true);
      setError(null);
      try {
        const id = await ensureCart();
        const updated = await addToCartMutation(id, variantId, quantity);
        setCart(updated);
        setIsCartOpen(true);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to add item to cart.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [ensureCart],
  );

  // ── updateQuantity ───────────────────────────────────────────────────────
  // Uses optimistic update: the UI updates immediately; rolls back on error.
  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cartId) return;
      setError(null);

      startTransition(async () => {
        dispatchOptimistic({ type: "update", lineId, quantity });
        try {
          const updated = await updateCartItemMutation(cartId, lineId, quantity);
          setCart(updated);
        } catch (err) {
          // Optimistic state auto-reverts when the transition ends without
          // setCart being called with the expected new state.
          setError(
            err instanceof Error ? err.message : "Failed to update cart.",
          );
        }
      });
    },
    [cartId, dispatchOptimistic],
  );

  // ── removeItem ───────────────────────────────────────────────────────────
  // Uses optimistic update: item disappears immediately; reappears on error.
  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cartId) return;
      setError(null);

      startTransition(async () => {
        dispatchOptimistic({ type: "remove", lineId });
        try {
          const updated = await removeFromCartMutation(cartId, lineId);
          setCart(updated);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to remove item.",
          );
        }
      });
    },
    [cartId, dispatchOptimistic],
  );

  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);
  const clearError = useCallback(() => setError(null), []);

  // ── Derived values (computed from optimistic cart) ───────────────────────
  const cartCount = optimisticCart?.totalQuantity ?? 0;
  const cartTotal = optimisticCart?.cost.totalAmount
    ? formatPrice(
        optimisticCart.cost.totalAmount.amount,
        optimisticCart.cost.totalAmount.currencyCode,
      )
    : "$0.00";

  return (
    <CartContext.Provider
      value={{
        cart: optimisticCart,
        addToCart,
        updateQuantity,
        removeItem,
        cartCount,
        cartTotal,
        isCartOpen,
        toggleCart,
        isLoading,
        error,
        clearError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Internal context accessor (used by useCart hook) ─────────────────────────

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error(
      "useCartContext must be used inside <CartProvider>. " +
        "Wrap your app (or the relevant subtree) in <CartProvider>.",
    );
  }
  return ctx;
}
