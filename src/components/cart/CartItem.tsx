"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import type { ShopifyCartLine } from "@/lib/shopify/types";
import { useCart } from "@/hooks/useCart";

// Exported so CartDrawer can orchestrate the stagger
export const CART_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.22, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -16,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export function CartItem({ line }: { line: ShopifyCartLine }) {
  const { updateQuantity, removeItem } = useCart();
  const { id, quantity, merchandise, cost } = line;
  const { product, selectedOptions } = merchandise;
  const image = product.images[0] ?? null;

  // Only show options that aren't the default placeholder
  const displayOptions = selectedOptions.filter(
    (o) => o.value !== "Default Title",
  );

  const lineTotal = formatPrice(
    cost.totalAmount.amount,
    cost.totalAmount.currencyCode,
  );

  function handleDecrease() {
    if (quantity <= 1) {
      removeItem(id);
    } else {
      updateQuantity(id, quantity - 1);
    }
  }

  function handleIncrease() {
    updateQuantity(id, quantity + 1);
  }

  return (
    <motion.li
      layout
      variants={CART_ITEM_VARIANTS}
      className="flex gap-4 border-b border-gray-800 py-5 last:border-b-0"
    >
      {/* ── Thumbnail ───────────────────────────────────────────────────── */}
      <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-gray-800">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            width={72}
            height={72}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span
              className="select-none text-[10px] font-black uppercase tracking-widest text-gray-600"
              aria-hidden="true"
            >
              KS
            </span>
          </div>
        )}
      </div>

      {/* ── Info ────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-1.5">
        {/* Title row + remove button */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold leading-tight text-komodo-white">
            {product.title}
          </p>

          <button
            type="button"
            onClick={() => removeItem(id)}
            aria-label={`Remove ${product.title} from cart`}
            className={[
              "shrink-0 text-gray-600",
              "transition-colors duration-200 hover:text-komodo-red",
              "focus-visible:outline-none focus-visible:text-komodo-red",
              // Generous touch target
              "flex h-6 w-6 items-center justify-center",
            ].join(" ")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Variant options */}
        {displayOptions.length > 0 && (
          <p className="text-xs text-gray-500">
            {displayOptions.map((o) => o.value).join(" · ")}
          </p>
        )}

        {/* Line total */}
        <p className="text-sm font-bold text-komodo-gold">{lineTotal}</p>

        {/* ── Quantity controls ──────────────────────────────────────────── */}
        {/* h-11 = 44px ≈ 48px minimum touch target */}
        <div
          className="mt-1.5 flex items-center self-start overflow-hidden rounded-lg border border-gray-700"
          role="group"
          aria-label={`Quantity for ${product.title}`}
        >
          <button
            type="button"
            onClick={handleDecrease}
            aria-label={
              quantity <= 1 ? `Remove ${product.title}` : "Decrease quantity"
            }
            className={[
              "flex h-11 w-11 items-center justify-center",
              "text-base text-komodo-white",
              "transition-colors duration-150 hover:bg-gray-800",
              "focus-visible:outline-none focus-visible:bg-gray-800",
            ].join(" ")}
          >
            −
          </button>

          <span
            className="flex h-11 w-9 items-center justify-center text-xs font-semibold text-komodo-white"
            aria-live="polite"
            aria-atomic="true"
          >
            {quantity}
          </span>

          <button
            type="button"
            onClick={handleIncrease}
            aria-label="Increase quantity"
            className={[
              "flex h-11 w-11 items-center justify-center",
              "text-base text-komodo-white",
              "transition-colors duration-150 hover:bg-gray-800",
              "focus-visible:outline-none focus-visible:bg-gray-800",
            ].join(" ")}
          >
            +
          </button>
        </div>
      </div>
    </motion.li>
  );
}
