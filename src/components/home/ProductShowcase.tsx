"use client";

import { motion, type Variants } from "framer-motion";
import type { ShopifyProduct } from "@/lib/shopify/types";
import { ProductCard } from "@/components/product/ProductCard";

// ─── Animation config ─────────────────────────────────────────────────────────
// Typed as Variants so Framer Motion's Easing union is inferred correctly
// (avoids `ease: string` widening that happens with `as const` + function body).

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 36 },
  // `custom` prop (card index) drives the stagger delay
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.05, // 50ms stagger per card
      ease: "easeOut",
    },
  }),
};

const HEADING_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

interface ProductShowcaseProps {
  products: ShopifyProduct[];
}

export function ProductShowcase({ products }: ProductShowcaseProps) {
  return (
    <section
      className="bg-komodo-black px-6 py-24 md:py-32"
      aria-labelledby="collection-heading"
    >
      <div className="mx-auto max-w-7xl">

        {/* ── Section heading ─────────────────────────────────────────────── */}
        <motion.div
          className="mb-16 flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={HEADING_VARIANTS}
        >
          <h2
            id="collection-heading"
            className="text-sm font-black uppercase tracking-[0.35em] text-komodo-white md:text-base"
          >
            The Collection
          </h2>

          {/* Red decorative rule — 2px × 60px */}
          <div
            className="mt-4 h-0.5 w-[60px] bg-komodo-red"
            aria-hidden="true"
          />

          <p className="mt-6 max-w-xs text-sm leading-relaxed text-gray-400 md:max-w-sm">
            Every bottle is crafted in small batches from recipes passed down
            across four generations.
          </p>
        </motion.div>

        {/* ── Product grid ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={CARD_VARIANTS}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* ── View all link ────────────────────────────────────────────────── */}
        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        >
          <a
            href="/shop"
            className={[
              "inline-flex items-center gap-2.5",
              "text-xs font-semibold uppercase tracking-[0.2em] text-gray-400",
              "transition-colors duration-200 hover:text-komodo-red",
              "focus-visible:outline-none focus-visible:text-komodo-red",
              // Red underline slide-in
              "relative pb-0.5",
              "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-komodo-red",
              "after:transition-[width] after:duration-200",
              "hover:after:w-full",
            ].join(" ")}
          >
            View Full Collection
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
