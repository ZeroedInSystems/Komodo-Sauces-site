"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ─── Animation config ─────────────────────────────────────────────────────────

const FADE_UP = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
} as const;

function fadeTransition(delay: number) {
  return { duration: 0.4, delay, ease: "easeOut" } as const;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ChevronDown() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-komodo-black px-6 py-24"
      style={{ minHeight: "100svh" }}
      aria-labelledby="hero-heading"
    >
      {/* ── Radial red glow from center-bottom ─────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 50% 115%, rgba(196,30,30,0.22) 0%, rgba(196,30,30,0.07) 45%, transparent 68%)",
        }}
      />

      {/* ── Subtle grid texture for depth ──────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,250,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">

        {/* Eyebrow + Headline — animated as one block (delay 0) */}
        <motion.div {...FADE_UP} transition={fadeTransition(0)}>
          {/* Eyebrow */}
          <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.32em] text-komodo-red">
            Small Batch&nbsp;&nbsp;·&nbsp;&nbsp;Artisan Crafted
          </p>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="text-[clamp(2.5rem,9vw,7rem)] font-black uppercase leading-[0.92] tracking-tight text-komodo-white"
          >
            Born From{" "}
            <span className="text-komodo-red">Fire.</span>
            <br />
            Crafted By Heritage.
          </h1>
        </motion.div>

        {/* Subheadline (delay 100ms) */}
        <motion.p
          {...FADE_UP}
          transition={fadeTransition(0.1)}
          className="mt-8 max-w-sm text-lg leading-relaxed text-gray-400 md:max-w-md md:text-xl"
        >
          Premium Indonesian hot sauces.{" "}
          <span className="text-komodo-white/80">
            Four generations of flavor.
          </span>
        </motion.p>

        {/* CTAs (delay 200ms) */}
        <motion.div
          {...FADE_UP}
          transition={fadeTransition(0.2)}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          {/* Primary — solid red */}
          <Link
            href="/shop"
            className={[
              "inline-flex min-w-48 items-center justify-center",
              "px-8 py-4",
              "bg-komodo-red text-komodo-white",
              "text-xs font-bold uppercase tracking-[0.18em]",
              "transition-colors duration-200 hover:bg-komodo-red-dark",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-komodo-black",
            ].join(" ")}
          >
            Shop Now
          </Link>

          {/* Secondary — ghost outline */}
          <Link
            href="/our-story"
            className={[
              "inline-flex min-w-48 items-center justify-center",
              "px-8 py-4",
              "border border-komodo-white/25 text-komodo-white",
              "text-xs font-bold uppercase tracking-[0.18em]",
              "transition-all duration-200",
              "hover:border-komodo-white/60 hover:bg-komodo-white/[0.04]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-white/50",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-komodo-black",
            ].join(" ")}
          >
            Our Story
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────────────────── */}
      {/* Fades in after all content has appeared (delay 800ms) */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
        aria-hidden="true"
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.25em]">
          Scroll
        </span>
        {/* Bouncing chevron — loops indefinitely */}
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.25,
          }}
        >
          <ChevronDown />
        </motion.div>
      </motion.div>
    </section>
  );
}
