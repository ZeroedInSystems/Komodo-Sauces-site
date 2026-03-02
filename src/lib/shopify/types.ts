// ─── Primitive types ──────────────────────────────────────────────────────────

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

// ─── Product ──────────────────────────────────────────────────────────────────

export interface ShopifyVariant {
  id: string;
  title: string;
  price: ShopifyPrice;
  compareAtPrice: ShopifyPrice | null;
  availableForSale: boolean;
  quantityAvailable: number;
  selectedOptions: ShopifySelectedOption[];
  image: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  productType: string;
  vendor: string;
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  seo: {
    title: string;
    description: string;
  };
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface ShopifyCartLineMerchandise {
  id: string;
  title: string;
  price: ShopifyPrice;
  selectedOptions: ShopifySelectedOption[];
  product: {
    id: string;
    title: string;
    handle: string;
    images: ShopifyImage[];
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: ShopifyPrice;
    amountPerQuantity: ShopifyPrice;
  };
  merchandise: ShopifyCartLineMerchandise;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: ShopifyCartLine[];
  cost: {
    subtotalAmount: ShopifyPrice;
    totalAmount: ShopifyPrice;
    totalTaxAmount: ShopifyPrice | null;
  };
}

// ─── Internal raw API types (Shopify Connection pattern) ──────────────────────
// These are used internally for deserialization before normalization and are
// not exposed outside of the shopify lib.

export interface ShopifyConnection<T> {
  edges: Array<{ node: T }>;
}

export interface ShopifyUserError {
  field: string[];
  message: string;
  code?: string;
}

/** Product shape exactly as the Storefront API returns it (nested connections). */
export interface RawShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  productType: string;
  vendor: string;
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  images: ShopifyConnection<ShopifyImage>;
  variants: ShopifyConnection<ShopifyVariant>;
  seo: { title: string; description: string };
}

/** Cart line shape exactly as the Storefront API returns it. */
export interface RawShopifyCartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: ShopifyPrice;
    amountPerQuantity: ShopifyPrice;
  };
  merchandise: {
    __typename: "ProductVariant";
    id: string;
    title: string;
    price: ShopifyPrice;
    selectedOptions: ShopifySelectedOption[];
    product: {
      id: string;
      title: string;
      handle: string;
      images: ShopifyConnection<ShopifyImage>;
    };
  };
}

/** Cart shape exactly as the Storefront API returns it. */
export interface RawShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: ShopifyConnection<RawShopifyCartLine>;
  cost: {
    subtotalAmount: ShopifyPrice;
    totalAmount: ShopifyPrice;
    totalTaxAmount: ShopifyPrice | null;
  };
}
