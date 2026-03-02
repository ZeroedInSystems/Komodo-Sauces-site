/**
 * JSON-LD structured data helpers.
 * Import these in page components and render via <script type="application/ld+json">.
 */

import type { ShopifyProduct } from "@/lib/shopify/types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://komodosauces.com";
const SITE_NAME = "Komodo Sauces";

// ─── Organization ─────────────────────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    foundingDate: "2024",
    founder: { "@type": "Person", name: "Gabe Fung-A-Wing" },
    description:
      "Small-batch, chef-crafted Indonesian hot sauces donating a portion of every purchase to fight human trafficking.",
    slogan: "Every bottle fights trafficking.",
    sameAs: [
      "https://www.instagram.com/komodosauces",
      "https://www.facebook.com/komodosauces",
      "https://www.tiktok.com/@komodosauces",
    ],
  };
}

// ─── WebSite ──────────────────────────────────────────────────────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── Product ──────────────────────────────────────────────────────────────────

export function productSchema(product: ShopifyProduct) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((img) => img.url),
    brand: { "@type": "Brand", name: product.vendor },
    offers: {
      "@type": "Offer",
      price: product.priceRange.minVariantPrice.amount,
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/products/${product.handle}`,
    },
  };
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────

export function breadcrumbSchema(
  items: ReadonlyArray<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ─── FAQPage ──────────────────────────────────────────────────────────────────

export function faqSchema(
  items: ReadonlyArray<{ readonly question: string; readonly answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

// ─── Article ──────────────────────────────────────────────────────────────────

export function articleSchema({
  headline,
  description,
  url,
  author = "Gabe Fung-A-Wing",
}: {
  headline: string;
  description: string;
  url: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${SITE_URL}${url}`,
    author: { "@type": "Person", name: author },
    publisher: organizationSchema(),
  };
}
