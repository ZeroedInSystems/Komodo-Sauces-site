export const SHOPIFY_API_VERSION = "2025-01";

// ─── Cache tag helpers for Next.js on-demand ISR revalidation ─────────────────
export const CACHE_TAGS = {
  products: "shopify-products",
  product: (handle: string) => `shopify-product-${handle}`,
  collections: "shopify-collections",
  cart: (id: string) => `shopify-cart-${id}`,
} as const;

// ─── Fetch options ────────────────────────────────────────────────────────────

interface ShopifyFetchOptions<TVariables> {
  query: string;
  variables?: TVariables;
  /**
   * Standard fetch cache directive.
   * `'no-store'` bypasses the cache (use for mutations and cart reads).
   * Only effective when `tags` / `revalidate` are not set.
   */
  cache?: RequestCache;
  /**
   * Next.js ISR cache tags for on-demand revalidation (server-side only).
   * Setting this implies `force-cache`.
   */
  tags?: string[];
  /**
   * Next.js ISR revalidation interval in seconds, or `false` to opt out.
   * Server-side only.
   */
  revalidate?: number | false;
}

// ─── Core fetch ───────────────────────────────────────────────────────────────

export async function shopifyFetch<
  TData,
  TVariables = Record<string, unknown>,
>({
  query,
  variables,
  cache,
  tags,
  revalidate,
}: ShopifyFetchOptions<TVariables>): Promise<TData> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    throw new Error(
      "Shopify is not configured. " +
        "Add NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and " +
        "NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN to .env.local.",
    );
  }

  const endpoint = `https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`;

  // Build Next.js-specific options (server-side ISR).
  const nextOpts: { tags?: string[]; revalidate?: number | false } = {};
  if (tags?.length) nextOpts.tags = tags;
  if (revalidate !== undefined) nextOpts.revalidate = revalidate;
  const hasNextOpts = Object.keys(nextOpts).length > 0;

  const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    // `next` and `cache` are mutually exclusive in Next.js fetch.
    ...(hasNextOpts ? { next: nextOpts } : cache ? { cache } : {}),
  };

  let response: Response;
  try {
    response = await fetch(endpoint, init);
  } catch (err) {
    throw new Error(
      `Network error reaching Shopify: ${err instanceof Error ? err.message : "Unknown error"}`,
    );
  }

  if (!response.ok) {
    throw new Error(
      `Shopify Storefront API responded with ${response.status}: ${response.statusText}`,
    );
  }

  const json = (await response.json()) as {
    data?: TData;
    errors?: Array<{ message: string; locations?: unknown; path?: unknown }>;
  };

  if (json.errors?.length) {
    const detail = json.errors.map((e) => e.message).join("\n  ");
    throw new Error(`Shopify GraphQL error:\n  ${detail}`);
  }

  if (!json.data) {
    throw new Error(
      "Shopify returned an empty response with no data or errors.",
    );
  }

  return json.data;
}
