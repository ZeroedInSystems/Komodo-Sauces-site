/**
 * Mock Shopify product data used when the Storefront API is not yet configured.
 * Replace with real Shopify data by adding env vars to .env.local.
 */
import type { ShopifyProduct, ShopifyVariant } from "./types";

// Explicit return type prevents `as const` from making arrays readonly
function mockVariant(id: string, price: string): ShopifyVariant {
  return {
    id: `gid://shopify/ProductVariant/${id}`,
    title: "Default Title",
    price: { amount: price, currencyCode: "USD" },
    compareAtPrice: null,
    availableForSale: true,
    quantityAvailable: 99,
    selectedOptions: [{ name: "Title", value: "Default Title" }],
    image: null,
  };
}

export const MOCK_PRODUCTS: ShopifyProduct[] = [
  {
    id: "gid://shopify/Product/1",
    title: "Komodo Black",
    handle: "komodo-black",
    description: "Bold. Smoky. Relentless.",
    descriptionHtml: "<p>Bold. Smoky. Relentless.</p>",
    availableForSale: true,
    tags: ["smoky", "bold", "dark"],
    productType: "Hot Sauce",
    vendor: "Komodo Sauces",
    priceRange: {
      minVariantPrice: { amount: "12.99", currencyCode: "USD" },
      maxVariantPrice: { amount: "12.99", currencyCode: "USD" },
    },
    images: [],
    variants: [mockVariant("101", "12.99")],
    seo: {
      title: "Komodo Black Hot Sauce",
      description: "Bold. Smoky. Relentless.",
    },
  },
  {
    id: "gid://shopify/Product/2",
    title: "Komodo Red",
    handle: "komodo-red",
    description: "Sweet heat. Indonesian soul.",
    descriptionHtml: "<p>Sweet heat. Indonesian soul.</p>",
    availableForSale: true,
    tags: ["sweet", "heat", "traditional"],
    productType: "Hot Sauce",
    vendor: "Komodo Sauces",
    priceRange: {
      minVariantPrice: { amount: "12.99", currencyCode: "USD" },
      maxVariantPrice: { amount: "12.99", currencyCode: "USD" },
    },
    images: [],
    variants: [mockVariant("102", "12.99")],
    seo: {
      title: "Komodo Red Hot Sauce",
      description: "Sweet heat. Indonesian soul.",
    },
  },
  {
    id: "gid://shopify/Product/3",
    title: "Komodo Gold",
    handle: "komodo-gold",
    description: "Fiery sunshine. Pure gold.",
    descriptionHtml: "<p>Fiery sunshine. Pure gold.</p>",
    availableForSale: true,
    tags: ["citrus", "bright", "fruity"],
    productType: "Hot Sauce",
    vendor: "Komodo Sauces",
    priceRange: {
      minVariantPrice: { amount: "12.99", currencyCode: "USD" },
      maxVariantPrice: { amount: "12.99", currencyCode: "USD" },
    },
    images: [],
    variants: [mockVariant("103", "12.99")],
    seo: {
      title: "Komodo Gold Hot Sauce",
      description: "Fiery sunshine. Pure gold.",
    },
  },
];

/**
 * Per-product metadata that lives outside Shopify (heat levels, flavor tags).
 * Keyed by product handle.
 */
export const PRODUCT_METADATA: Record<
  string,
  { heatLevel: number; flavorTags: string[] }
> = {
  "komodo-black": {
    heatLevel: 5,
    flavorTags: ["Smoky", "Earthy", "Umami", "Dark Chili"],
  },
  "komodo-red": {
    heatLevel: 6,
    flavorTags: ["Sweet Heat", "Garlic", "Traditional", "Balanced"],
  },
  "komodo-gold": {
    heatLevel: 8,
    flavorTags: ["Citrus", "Fruity", "Bright", "Tropical Heat"],
  },
};
