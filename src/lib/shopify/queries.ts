import { shopifyFetch, CACHE_TAGS } from "./client";
import type {
  ShopifyProduct,
  ShopifyCart,
  ShopifyConnection,
  RawShopifyProduct,
  RawShopifyCart,
  RawShopifyCartLine,
} from "./types";

// ─── Shared GraphQL Fragments ─────────────────────────────────────────────────

const IMAGE_FRAGMENT = `
  fragment ImageFields on Image {
    url
    altText
    width
    height
  }
`;

const PRICE_FRAGMENT = `
  fragment PriceFields on MoneyV2 {
    amount
    currencyCode
  }
`;

const VARIANT_FRAGMENT = `
  fragment VariantFields on ProductVariant {
    id
    title
    availableForSale
    quantityAvailable
    selectedOptions { name value }
    price            { ...PriceFields }
    compareAtPrice   { ...PriceFields }
    image            { ...ImageFields }
  }
`;

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    tags
    productType
    vendor
    priceRange {
      minVariantPrice { ...PriceFields }
      maxVariantPrice { ...PriceFields }
    }
    images(first: 10) { edges { node { ...ImageFields } } }
    variants(first: 20) { edges { node { ...VariantFields } } }
    seo { title description }
  }
`;

/**
 * Cart fields used by both queries and mutations.
 * Exported so mutations.ts can embed the same shape without duplication.
 */
export const CART_FIELDS = /* GraphQL */ `
  id
  checkoutUrl
  totalQuantity
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        cost {
          totalAmount      { amount currencyCode }
          amountPerQuantity { amount currencyCode }
        }
        merchandise {
          ... on ProductVariant {
            __typename
            id
            title
            price { amount currencyCode }
            selectedOptions { name value }
            product {
              id
              title
              handle
              images(first: 1) {
                edges { node { url altText width height } }
              }
            }
          }
        }
      }
    }
  }
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount    { amount currencyCode }
    totalTaxAmount { amount currencyCode }
  }
`;

// ─── Normalization helpers ────────────────────────────────────────────────────

function flattenEdges<T>(connection: ShopifyConnection<T>): T[] {
  return connection.edges.map((e) => e.node);
}

function normalizeProduct(raw: RawShopifyProduct): ShopifyProduct {
  return {
    ...raw,
    images: flattenEdges(raw.images),
    variants: flattenEdges(raw.variants),
  };
}

function normalizeCartLine(raw: RawShopifyCartLine): ShopifyCart["lines"][0] {
  return {
    ...raw,
    merchandise: {
      ...raw.merchandise,
      product: {
        ...raw.merchandise.product,
        images: flattenEdges(raw.merchandise.product.images),
      },
    },
  };
}

export function normalizeCart(raw: RawShopifyCart): ShopifyCart {
  return {
    ...raw,
    lines: flattenEdges(raw.lines).map(normalizeCartLine),
  };
}

// ─── getProducts ──────────────────────────────────────────────────────────────

const GET_PRODUCTS_QUERY = /* GraphQL */ `
  ${IMAGE_FRAGMENT}
  ${PRICE_FRAGMENT}
  ${VARIANT_FRAGMENT}
  ${PRODUCT_FRAGMENT}

  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node { ...ProductFields }
      }
    }
  }
`;

/**
 * Fetch all products. Cached for 1 hour; invalidated by the `shopify-products`
 * cache tag (set via Shopify webhook → Next.js revalidateTag).
 */
export async function getProducts(first = 12): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: ShopifyConnection<RawShopifyProduct>;
  }>({
    query: GET_PRODUCTS_QUERY,
    variables: { first },
    tags: [CACHE_TAGS.products],
    revalidate: 3600,
  });

  return flattenEdges(data.products).map(normalizeProduct);
}

// ─── getProductByHandle ───────────────────────────────────────────────────────

const GET_PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  ${IMAGE_FRAGMENT}
  ${PRICE_FRAGMENT}
  ${VARIANT_FRAGMENT}
  ${PRODUCT_FRAGMENT}

  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
    }
  }
`;

/**
 * Fetch a single product by its URL handle.
 * Returns null when the handle is not found.
 */
export async function getProductByHandle(
  handle: string,
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: RawShopifyProduct | null }>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    tags: [CACHE_TAGS.products, CACHE_TAGS.product(handle)],
    revalidate: 3600,
  });

  return data.product ? normalizeProduct(data.product) : null;
}

// ─── getCart ──────────────────────────────────────────────────────────────────

const GET_CART_QUERY = /* GraphQL */ `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ${CART_FIELDS}
    }
  }
`;

/**
 * Fetch the current cart by ID.
 * Always fetches fresh data (`no-store`) — carts must never be stale.
 * Returns null when the cart has expired or the ID is invalid.
 */
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: RawShopifyCart | null }>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: "no-store",
  });

  return data.cart ? normalizeCart(data.cart) : null;
}
