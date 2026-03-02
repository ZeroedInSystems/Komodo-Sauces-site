"use client";

import { motion, type Variants } from "framer-motion";
import type { ShopifyProduct } from "@/lib/shopify/types";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  products: ShopifyProduct[];
}

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
  }),
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section
      className="bg-komodo-black px-6 py-16 md:py-24"
      aria-labelledby="related-heading"
    >
      <div className="mx-auto max-w-6xl">
        {/* ── Heading ───────────────────────────────────────────────────── */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-komodo-red">
            You May Also Like
          </p>
          <h2
            id="related-heading"
            className="text-2xl font-black uppercase tracking-[0.18em] text-komodo-white"
          >
            More Sauces
          </h2>
          <div
            className="mx-auto mt-4 h-0.5 w-[60px] bg-komodo-red"
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Product grid ──────────────────────────────────────────────── */}
        <motion.ul
          className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {products.map((product, i) => (
            <motion.li key={product.id} variants={ITEM_VARIANTS} custom={i}>
              <ProductCard product={product} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
