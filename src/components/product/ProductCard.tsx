"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ShopifyProduct } from "@/lib/shopify/types";
import { useCart } from "@/hooks/useCart";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

// ─── Placeholder shown when the product has no images ─────────────────────────

function ImagePlaceholder({ title }: { title: string }) {
  // Derive a subtle accent colour from the product name for visual variety
  const isGold = title.toLowerCase().includes("gold");
  const isBlack = title.toLowerCase().includes("black");

  const accentClass = isGold
    ? "border-komodo-gold/20"
    : isBlack
      ? "border-gray-600/30"
      : "border-komodo-red/20";

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-komodo-black">
      {/* Concentric ring */}
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-full border ${accentClass} bg-gray-900/60`}
      >
        <span className="select-none text-xs font-black uppercase tracking-[0.2em] text-gray-600">
          KS
        </span>
      </div>
    </div>
  );
}

// ─── ProductCard ──────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const firstVariant = product.variants[0];
  const firstImage = product.images[0];
  const price =
    firstVariant?.price ?? product.priceRange.minVariantPrice;

  const isOutOfStock =
    !firstVariant || !firstVariant.availableForSale || !product.availableForSale;
  const isDisabled = isOutOfStock || isAdding;

  async function handleAddToCart() {
    if (isDisabled || !firstVariant) return;
    setIsAdding(true);
    try {
      await addToCart(firstVariant.id, 1);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <article
      className={[
        // Base
        "group relative flex flex-col rounded-xl",
        "border border-gray-800 bg-gray-900",
        // Hover lift, border glow, shadow
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1",
        "hover:border-komodo-red/60",
        "shadow-[0_4px_24px_rgba(196,30,30,0)] hover:shadow-[0_8px_40px_rgba(196,30,30,0.16)]",
      ].join(" ")}
    >
      {/* ── Image area ─────────────────────────────────────────────────────── */}
      <Link
        href={`/products/${product.handle}`}
        className="relative aspect-square overflow-hidden rounded-t-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red focus-visible:ring-inset"
        tabIndex={0}
        aria-label={`View ${product.title}`}
      >
        {firstImage ? (
          <Image
            src={firstImage.url}
            alt={firstImage.altText ?? product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 420px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            priority={false}
          />
        ) : (
          <ImagePlaceholder title={product.title} />
        )}

        {/* Out-of-stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-komodo-black/60 backdrop-blur-[2px]">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Sold Out
            </span>
          </div>
        )}
      </Link>

      {/* ── Card body ──────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Product name */}
        <h3 className="text-base font-bold uppercase tracking-wide text-komodo-white">
          <Link
            href={`/products/${product.handle}`}
            className="hover:text-gray-100 focus-visible:outline-none focus-visible:underline"
          >
            {product.title}
          </Link>
        </h3>

        {/* Flavor tagline — first sentence of description */}
        <p className="line-clamp-1 text-sm leading-relaxed text-gray-400">
          {product.description}
        </p>

        {/* Price */}
        <p
          className="text-sm font-semibold text-komodo-gold"
          aria-label={`Price: ${formatPrice(price.amount, price.currencyCode)}`}
        >
          {formatPrice(price.amount, price.currencyCode)}
        </p>

        {/* Spacer — pushes button to bottom of card */}
        <div className="flex-1" />

        {/* ADD TO CART button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isDisabled}
          aria-label={
            isOutOfStock
              ? `${product.title} is sold out`
              : `Add ${product.title} to cart`
          }
          className={[
            "w-full py-3 text-xs font-bold uppercase tracking-[0.18em]",
            "transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red",
            isDisabled
              ? "cursor-not-allowed bg-gray-800 text-gray-600"
              : [
                  "bg-komodo-red text-komodo-white",
                  "hover:bg-komodo-red-dark",
                  "active:scale-[0.98]",
                ].join(" "),
          ].join(" ")}
        >
          {isAdding
            ? "Adding\u2026"
            : isOutOfStock
              ? "Sold Out"
              : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
