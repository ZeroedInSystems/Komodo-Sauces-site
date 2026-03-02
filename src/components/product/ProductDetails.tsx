"use client";

import { useState } from "react";
import Link from "next/link";
import type { ShopifyProduct } from "@/lib/shopify/types";
import { HeatMeter } from "./HeatMeter";
import { FlavorProfile } from "./FlavorProfile";
import { useCart } from "@/hooks/useCart";

interface ProductDetailsProps {
  product: ShopifyProduct;
  heatLevel: number;
  flavorTags: string[];
}

export function ProductDetails({
  product,
  heatLevel,
  flavorTags,
}: ProductDetailsProps) {
  const [qty, setQty] = useState(1);
  const { addToCart, isLoading } = useCart();

  const variant = product.variants[0];
  const price = variant?.price;
  const compareAtPrice = variant?.compareAtPrice;
  const maxQty = variant?.quantityAvailable ?? 99;

  function decrement() {
    setQty((prev) => Math.max(1, prev - 1));
  }

  function increment() {
    setQty((prev) => Math.min(maxQty, prev + 1));
  }

  async function handleAddToCart() {
    if (!variant) return;
    await addToCart(variant.id, qty);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs text-gray-500">
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-komodo-white"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link
              href="/products"
              className="transition-colors hover:text-komodo-white"
            >
              Products
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-gray-300" aria-current="page">
            {product.title}
          </li>
        </ol>
      </nav>

      {/* ── Title ──────────────────────────────────────────────────────────── */}
      <h1 className="text-3xl font-black uppercase tracking-[0.18em] text-komodo-white md:text-4xl">
        {product.title}
      </h1>

      {/* ── Price ──────────────────────────────────────────────────────────── */}
      {price && (
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-black text-komodo-gold">
            ${parseFloat(price.amount).toFixed(2)}
          </span>
          {compareAtPrice &&
            parseFloat(compareAtPrice.amount) > parseFloat(price.amount) && (
              <span className="text-sm text-gray-500 line-through">
                ${parseFloat(compareAtPrice.amount).toFixed(2)}
              </span>
            )}
        </div>
      )}

      {/* ── Heat Meter ─────────────────────────────────────────────────────── */}
      <HeatMeter level={heatLevel} />

      {/* ── Flavor Profile ─────────────────────────────────────────────────── */}
      <FlavorProfile tags={flavorTags} />

      {/* ── Description ────────────────────────────────────────────────────── */}
      {product.descriptionHtml && (
        <div
          className="prose prose-sm prose-invert max-w-none text-gray-400"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      )}

      {/* ── Quantity + Add to Cart ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        {/* Quantity selector */}
        <div className="flex items-center self-start overflow-hidden rounded-lg border border-gray-700">
          <button
            type="button"
            onClick={decrement}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
            className={[
              "flex h-11 w-11 items-center justify-center",
              "text-lg text-komodo-white transition-colors",
              "hover:bg-gray-800",
              "disabled:cursor-not-allowed disabled:opacity-40",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-komodo-gold",
            ].join(" ")}
          >
            −
          </button>

          <span
            className="flex h-11 w-12 items-center justify-center text-sm font-semibold text-komodo-white"
            aria-live="polite"
            aria-atomic="true"
          >
            {qty}
          </span>

          <button
            type="button"
            onClick={increment}
            disabled={qty >= maxQty}
            aria-label="Increase quantity"
            className={[
              "flex h-11 w-11 items-center justify-center",
              "text-lg text-komodo-white transition-colors",
              "hover:bg-gray-800",
              "disabled:cursor-not-allowed disabled:opacity-40",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-komodo-gold",
            ].join(" ")}
          >
            +
          </button>
        </div>

        {/* Add to Cart button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isLoading || !product.availableForSale}
          className={[
            "flex w-full items-center justify-center px-10 py-4",
            "bg-komodo-red",
            "text-xs font-black uppercase tracking-[0.2em] text-komodo-white",
            "transition-all duration-200",
            "hover:brightness-110 active:brightness-75",
            "disabled:cursor-not-allowed disabled:opacity-60",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-komodo-red focus-visible:ring-offset-2 focus-visible:ring-offset-komodo-black",
          ].join(" ")}
        >
          {isLoading
            ? "Adding\u2026"
            : !product.availableForSale
              ? "Sold Out"
              : "Add to Cart"}
        </button>
      </div>

      {/* ── Reassurance ────────────────────────────────────────────────────── */}
      <p className="text-xs text-gray-600">
        Free shipping on orders over $35 · 30-day returns
      </p>
    </div>
  );
}
