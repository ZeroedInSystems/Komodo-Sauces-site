"use server";

import { shopifyFetch } from "./client";
import { CART_FIELDS, normalizeCart } from "./queries";
import type { RawShopifyCart, ShopifyCart, ShopifyUserError } from "./types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Shared cart response shape embedded in every cart mutation.
 * Reuses the same CART_FIELDS as GET_CART so shapes are always in sync.
 */
const CART_MUTATION_RETURN = /* GraphQL */ `
  cart {
    ${CART_FIELDS}
  }
  userErrors {
    field
    message
    code
  }
`;

function assertNoUserErrors(
  errors: ShopifyUserError[],
  context: string,
): void {
  if (errors.length === 0) return;
  const detail = errors
    .map((e) => `${e.field.join(".")}: ${e.message}`)
    .join("\n  ");
  throw new Error(`${context}:\n  ${detail}`);
}

// ─── createCart ───────────────────────────────────────────────────────────────

const CREATE_CART_MUTATION = /* GraphQL */ `
  mutation CartCreate {
    cartCreate(input: {}) {
      ${CART_MUTATION_RETURN}
    }
  }
`;

/** Create a new empty cart and return it. */
export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartCreate: {
      cart: RawShopifyCart;
      userErrors: ShopifyUserError[];
    };
  }>({
    query: CREATE_CART_MUTATION,
    cache: "no-store",
  });

  assertNoUserErrors(data.cartCreate.userErrors, "Failed to create cart");
  return normalizeCart(data.cartCreate.cart);
}

// ─── addToCart ────────────────────────────────────────────────────────────────

const ADD_TO_CART_MUTATION = /* GraphQL */ `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      ${CART_MUTATION_RETURN}
    }
  }
`;

/**
 * Add a product variant to the cart.
 * If the variant is already in the cart Shopify merges the quantities.
 */
export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number,
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesAdd: {
      cart: RawShopifyCart;
      userErrors: ShopifyUserError[];
    };
  }>({
    query: ADD_TO_CART_MUTATION,
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    },
    cache: "no-store",
  });

  assertNoUserErrors(data.cartLinesAdd.userErrors, "Failed to add item to cart");
  return normalizeCart(data.cartLinesAdd.cart);
}

// ─── updateCartItem ───────────────────────────────────────────────────────────

const UPDATE_CART_ITEM_MUTATION = /* GraphQL */ `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      ${CART_MUTATION_RETURN}
    }
  }
`;

/**
 * Update the quantity of a cart line.
 * Setting quantity to 0 removes the line.
 */
export async function updateCartItem(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: {
      cart: RawShopifyCart;
      userErrors: ShopifyUserError[];
    };
  }>({
    query: UPDATE_CART_ITEM_MUTATION,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
    cache: "no-store",
  });

  assertNoUserErrors(
    data.cartLinesUpdate.userErrors,
    "Failed to update cart item",
  );
  return normalizeCart(data.cartLinesUpdate.cart);
}

// ─── removeFromCart ───────────────────────────────────────────────────────────

const REMOVE_FROM_CART_MUTATION = /* GraphQL */ `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      ${CART_MUTATION_RETURN}
    }
  }
`;

/** Remove a single line item from the cart by its line ID. */
export async function removeFromCart(
  cartId: string,
  lineId: string,
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesRemove: {
      cart: RawShopifyCart;
      userErrors: ShopifyUserError[];
    };
  }>({
    query: REMOVE_FROM_CART_MUTATION,
    variables: {
      cartId,
      lineIds: [lineId],
    },
    cache: "no-store",
  });

  assertNoUserErrors(
    data.cartLinesRemove.userErrors,
    "Failed to remove item from cart",
  );
  return normalizeCart(data.cartLinesRemove.cart);
}
