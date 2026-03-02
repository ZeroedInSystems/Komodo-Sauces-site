"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function StoryTeaser() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 md:py-32"
      style={{
        background:
          "linear-gradient(150deg, #0A0A0A 0%, #140606 50%, #0A0A0A 100%)",
      }}
      aria-labelledby="story-teaser-quote"
    >
      {/* ── Decorative oversized opening quote ─────────────────────────────── */}
      {/* Very low opacity — gives depth without competing with content */}
      <span
        className="pointer-events-none absolute -top-12 left-0 select-none font-black leading-none text-komodo-red/[0.04] md:-top-6"
        style={{ fontSize: "clamp(12rem, 30vw, 22rem)" }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 md:grid-cols-2 md:gap-24 lg:gap-32">

        {/* ── Left: Pull quote ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <blockquote aria-label="Brand story quote">
            {/* Red accent bar on the left */}
            <div
              className="mb-6 h-0.5 w-10 bg-komodo-red md:hidden"
              aria-hidden="true"
            />
            <div className="border-l-2 border-komodo-red pl-6 md:pl-8">
              <p
                id="story-teaser-quote"
                className="text-2xl font-bold italic leading-snug text-komodo-gold md:text-3xl lg:text-[2.15rem]"
              >
                &ldquo;From Java, Indonesia to Atlanta, Georgia. Four
                generations of flavor.&rdquo;
              </p>
            </div>
          </blockquote>
        </motion.div>

        {/* ── Right: Story paragraph + CTA ──────────────────────────────────── */}
        <motion.div
          className="flex flex-col justify-center gap-6"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
        >
          <p className="text-base leading-relaxed text-gray-400 md:text-lg">
            What started in a small kitchen in Central Java has traveled across
            oceans to reach your table. Our recipes carry the soul of four
            generations — the same chili blends, fermentation traditions, and
            hand-ground spices that defined our family&rsquo;s heritage.
          </p>
          <p className="text-base leading-relaxed text-gray-400 md:text-lg">
            Komodo Sauces isn&rsquo;t just heat. It&rsquo;s memory, identity,
            and purpose — bottled with intention for those who taste deeply.
          </p>

          {/* Ghost text CTA */}
          <Link
            href="/our-story"
            className={[
              "group mt-2 inline-flex w-fit items-center gap-2.5",
              "text-xs font-bold uppercase tracking-[0.22em]",
              "text-komodo-white/60 transition-colors duration-200",
              "hover:text-komodo-red",
              "focus-visible:outline-none focus-visible:text-komodo-red",
            ].join(" ")}
          >
            Read Our Story
            <span
              className="transition-transform duration-200 group-hover:translate-x-1.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>

      {/* ── Bottom fade-out into next section ─────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-900 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
