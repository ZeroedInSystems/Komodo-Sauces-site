"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "2,400+", label: "Bottles Sold" },
  { value: "4", label: "Partner Organizations" },
  { value: "Since 2024", label: "Fighting Trafficking" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export function MissionSection() {
  return (
    <section
      className="bg-gray-900 px-6 py-24 md:py-32"
      aria-labelledby="mission-heading"
    >
      <div className="mx-auto max-w-4xl">

        {/* ── Heading ─────────────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-komodo-red">
            Our Purpose
          </p>

          <h2
            id="mission-heading"
            className="text-2xl font-black uppercase leading-tight tracking-[0.18em] text-komodo-white md:text-3xl lg:text-4xl"
          >
            Every Bottle
            <br />
            Fights Trafficking
          </h2>

          {/* Red decorative rule — matches ProductShowcase */}
          <div
            className="mt-5 h-0.5 w-[60px] bg-komodo-red"
            aria-hidden="true"
          />

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
            A portion of every Komodo Sauces purchase goes directly to
            vetted organizations on the front lines of fighting human
            trafficking. We believe great food can be a force for profound
            change — one bottle at a time.
          </p>
        </motion.div>

        {/* ── Impact stats ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          <dl
            className="my-14 grid grid-cols-3 divide-x divide-gray-800 border-y border-gray-800 py-10"
            aria-label="Mission impact statistics"
          >
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 px-4 text-center"
              >
                <dt className="order-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500 md:text-xs">
                  {label}
                </dt>
                <dd className="order-1 text-xl font-black text-komodo-red md:text-3xl lg:text-4xl">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        >
          <Link
            href="/mission"
            className={[
              "inline-flex items-center justify-center px-10 py-4",
              "border border-komodo-red/40 text-komodo-white",
              "text-xs font-bold uppercase tracking-[0.18em]",
              "transition-all duration-200",
              "hover:border-komodo-red hover:bg-komodo-red/[0.08]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
            ].join(" ")}
          >
            Learn More
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
