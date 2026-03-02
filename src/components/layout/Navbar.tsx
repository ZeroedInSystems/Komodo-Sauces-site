"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/our-story", label: "Our Story" },
  { href: "/mission", label: "Mission" },
] as const;

// ─── Icons ────────────────────────────────────────────────────────────────────

function CartIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const { cartCount, toggleCart } = useCart();

  // Scroll detection — switches navbar from transparent to solid
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    // Set initial state (handles page reload at scroll position)
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Move focus to first menu link when overlay opens
  useEffect(() => {
    if (isMenuOpen) firstMenuLinkRef.current?.focus();
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      {/* ── Header bar ───────────────────────────────────────────────────── */}
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-200",
          scrolled
            ? "bg-komodo-black shadow-xl shadow-black/40"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center px-6"
          aria-label="Main navigation"
        >
          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <div className="flex-1">
            <Link
              href="/"
              className="inline-flex items-baseline gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red focus-visible:ring-offset-2 focus-visible:ring-offset-komodo-black"
              onClick={closeMenu}
              aria-label="Komodo Sauces — home"
            >
              <span className="text-lg font-black uppercase tracking-[0.12em] text-komodo-white">
                Komodo
              </span>
              <span className="text-sm font-black uppercase tracking-[0.18em] text-komodo-red">
                Sauces
              </span>
            </Link>
          </div>

          {/* ── Desktop nav links (centered) ─────────────────────────────── */}
          <ul
            className="hidden flex-1 items-center justify-center gap-10 md:flex"
            role="list"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    "relative pb-0.5 text-sm font-medium uppercase tracking-widest",
                    "text-komodo-white transition-colors duration-200",
                    // Red underline slides in from left on hover
                    "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0",
                    "after:bg-komodo-red after:transition-[width] after:duration-200 after:ease-in-out",
                    "hover:after:w-full",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red",
                  ].join(" ")}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Right actions ─────────────────────────────────────────────── */}
          <div className="flex flex-1 items-center justify-end gap-5">
            {/* AI chat — links to full-page /ask experience */}
            <Link
              href="/ask"
              className="flex items-center justify-center text-komodo-white transition-colors duration-200 hover:text-komodo-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red"
              aria-label="Ask Komodo AI assistant"
            >
              <ChatIcon />
            </Link>

            {/* Cart ── visible on all breakpoints */}
            <button
              className="relative flex items-center justify-center text-komodo-white transition-colors duration-200 hover:text-komodo-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red"
              onClick={toggleCart}
              aria-label={`Open cart${cartCount > 0 ? `, ${cartCount} item${cartCount !== 1 ? "s" : ""}` : ""}`}
            >
              <CartIcon />
              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-komodo-red text-[10px] font-bold leading-none text-komodo-white"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            {/* Hamburger / X — mobile only */}
            <button
              className="relative h-5 w-5 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red md:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {/* Bar 1 */}
              <span
                className={[
                  "absolute left-0 block h-px w-5 bg-komodo-white",
                  "transition-all duration-200 origin-center",
                  isMenuOpen ? "top-[10px] rotate-45" : "top-[4px]",
                ].join(" ")}
              />
              {/* Bar 2 */}
              <span
                className={[
                  "absolute left-0 top-[10px] block h-px w-5 bg-komodo-white",
                  "transition-all duration-200",
                  isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100",
                ].join(" ")}
              />
              {/* Bar 3 */}
              <span
                className={[
                  "absolute left-0 block h-px w-5 bg-komodo-white",
                  "transition-all duration-200 origin-center",
                  isMenuOpen ? "top-[10px] -rotate-45" : "top-[16px]",
                ].join(" ")}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile full-screen overlay ────────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={[
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-komodo-black",
          "transition-opacity duration-200 md:hidden",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        {/* Subtle grid texture for depth */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--komodo-white) 1px, transparent 1px), linear-gradient(90deg, var(--komodo-white) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />

        <nav className="relative flex flex-col items-center gap-10">
          {NAV_LINKS.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              ref={i === 0 ? firstMenuLinkRef : undefined}
              className={[
                "text-4xl font-black uppercase tracking-[0.15em] text-komodo-white",
                "transition-colors duration-200 hover:text-komodo-red",
                "focus-visible:outline-none focus-visible:text-komodo-red",
              ].join(" ")}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}

          {/* Divider */}
          <div className="h-px w-12 bg-gray-800" aria-hidden="true" />

          {/* Secondary links in overlay */}
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/ask"
              className="text-sm font-medium uppercase tracking-widest text-gray-400 transition-colors duration-200 hover:text-komodo-red focus-visible:outline-none focus-visible:text-komodo-red"
              onClick={closeMenu}
            >
              Ask Komodo 🐉
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
