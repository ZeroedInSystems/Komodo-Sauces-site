"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { CartItem, CART_ITEM_VARIANTS } from "./CartItem";

// ─── Animation constants ───────────────────────────────────────────────────────

const BACKDROP_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const DRAWER_VARIANTS: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", damping: 30, stiffness: 300 },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

// Stagger container — children use CART_ITEM_VARIANTS
const LIST_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

// ─── EmptyState ────────────────────────────────────────────────────────────────

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-5 text-center">
      {/* Bag icon */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-16 w-16 text-gray-700"
        aria-hidden="true"
      >
        <path d="M14 18V14a10 10 0 0 1 20 0v4" />
        <rect x="8" y="18" width="32" height="26" rx="3" />
      </svg>

      <div className="space-y-1">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-500">
          Your cart is empty
        </p>
        <p className="text-xs text-gray-600">
          Add something delicious to get started.
        </p>
      </div>

      <Link
        href="/products"
        onClick={onClose}
        className="border border-gray-700 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-komodo-white transition-colors hover:border-komodo-red hover:text-komodo-red focus-visible:outline-none focus-visible:border-komodo-red focus-visible:text-komodo-red"
      >
        Shop Now
      </Link>
    </div>
  );
}

// ─── CartDrawer ────────────────────────────────────────────────────────────────

// Silence the unused-import warning — CART_ITEM_VARIANTS is consumed at
// runtime by CartItem but TypeScript can't see that through the re-export.
void CART_ITEM_VARIANTS;

export function CartDrawer() {
  const { isCartOpen, toggleCart, cart, cartTotal, error, clearError } =
    useCart();

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock while drawer is open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  // Move focus to close button when drawer opens
  useEffect(() => {
    if (isCartOpen) closeButtonRef.current?.focus();
  }, [isCartOpen]);

  const lines = cart?.lines ?? [];

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* ── Backdrop ───────────────────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            variants={BACKDROP_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={toggleCart}
            aria-hidden="true"
          />

          {/* ── Drawer panel ───────────────────────────────────────────────── */}
          <motion.div
            key="drawer"
            variants={DRAWER_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.4 }}
            onDragEnd={(_, { offset, velocity }) => {
              if (offset.x > 80 || velocity.x > 400) toggleCart();
            }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-komodo-black shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* ── Header ─────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between border-b border-gray-800 px-5 py-4">
              <h2 className="text-sm font-black uppercase tracking-[0.18em] text-komodo-white">
                Your Cart
                {lines.length > 0 && (
                  <span className="ml-2 font-normal text-gray-500">
                    ({lines.length})
                  </span>
                )}
              </h2>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={toggleCart}
                aria-label="Close cart"
                className="flex h-8 w-8 items-center justify-center text-gray-600 transition-colors hover:text-komodo-white focus-visible:outline-none focus-visible:text-komodo-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ── Error banner ────────────────────────────────────────────── */}
            {error && (
              <div className="flex items-start justify-between gap-3 border-b border-komodo-red/30 bg-komodo-red/10 px-5 py-3">
                <p className="text-xs text-komodo-red">{error}</p>
                <button
                  type="button"
                  onClick={clearError}
                  aria-label="Dismiss error"
                  className="shrink-0 text-komodo-red/60 transition-colors hover:text-komodo-red focus-visible:outline-none focus-visible:text-komodo-red"
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
            )}

            {/* ── Content ─────────────────────────────────────────────────── */}
            {lines.length === 0 ? (
              <EmptyState onClose={toggleCart} />
            ) : (
              <>
                {/* Scrollable line items */}
                <div className="flex-1 overflow-y-auto overscroll-contain px-5">
                  <motion.ul
                    variants={LIST_VARIANTS}
                    initial="hidden"
                    animate="visible"
                    className="py-2"
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      {lines.map((line) => (
                        <CartItem key={line.id} line={line} />
                      ))}
                    </AnimatePresence>
                  </motion.ul>
                </div>

                {/* ── Footer ─────────────────────────────────────────────── */}
                <div className="shrink-0 border-t border-gray-800 px-5 py-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-gray-500">
                      Subtotal
                    </span>
                    <span className="text-base font-bold text-komodo-white">
                      {cartTotal}
                    </span>
                  </div>

                  <a
                    href={cart?.checkoutUrl ?? "#"}
                    className="block w-full bg-komodo-red py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-komodo-white transition-colors hover:bg-komodo-red-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red focus-visible:ring-offset-2 focus-visible:ring-offset-komodo-black"
                  >
                    Checkout
                  </a>

                  <button
                    type="button"
                    onClick={toggleCart}
                    className="mt-3 w-full text-center text-xs text-gray-600 transition-colors hover:text-komodo-white focus-visible:outline-none focus-visible:text-komodo-white"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
