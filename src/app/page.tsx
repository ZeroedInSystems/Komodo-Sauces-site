import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { MissionSection } from "@/components/home/MissionSection";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";
import { getProducts } from "@/lib/shopify/queries";
import { MOCK_PRODUCTS } from "@/lib/shopify/mock";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Komodo Sauces — Premium Hot Sauces",
  description:
    "Small-batch, chef-crafted Indonesian hot sauces. Four generations of flavor, made with purpose.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Komodo Sauces — Premium Hot Sauces",
    description:
      "Small-batch, chef-crafted Indonesian hot sauces. Four generations of flavor, made with purpose.",
    url: "/",
  },
};

export default async function HomePage() {
  // Fetch live products; falls back to mock data when Shopify isn't configured.
  const products = await getProducts(3).catch(() => MOCK_PRODUCTS);
  const orgLd = organizationSchema();
  const siteLd = websiteSchema();

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
      />

      {/* 1 ── Full-viewport hero */}
      <Hero />

      {/* 2 ── Product grid — py-16 md:py-24 (handled inside component) */}
      <ProductShowcase products={products} />

      {/* 3 ── Brand story pull quote */}
      <StoryTeaser />

      {/* 4 ── Mission / anti-trafficking statement + stats */}
      <MissionSection />

      {/* 5 ── Ask Komodo CTA */}
      <div className="bg-komodo-black py-8 text-center">
        <Link
          href="/ask"
          className={[
            "inline-flex items-center gap-2 text-sm font-semibold",
            "text-gray-500 transition-colors duration-200",
            "hover:text-komodo-white",
            "focus-visible:outline-none focus-visible:text-komodo-white",
          ].join(" ")}
        >
          Have a question? Ask Komodo
          <span aria-hidden="true">🐉</span>
          <span
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>

      {/* 6 ── Newsletter signup */}
      <NewsletterCTA />
    </>
  );
}
