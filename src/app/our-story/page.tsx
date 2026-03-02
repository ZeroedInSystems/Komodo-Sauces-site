import type { Metadata } from "next";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { articleSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "From Java, Indonesia to Atlanta, Georgia — four generations of flavor, heritage, and purpose. The origin story behind Komodo Sauces.",
  alternates: {
    canonical: "/our-story",
  },
  openGraph: {
    title: "Our Story | Komodo Sauces",
    description:
      "From Java, Indonesia to Atlanta, Georgia — four generations of flavor, heritage, and purpose. The origin story behind Komodo Sauces.",
    url: "/our-story",
  },
};

// ─── Timeline ─────────────────────────────────────────────────────────────────

const TIMELINE = [
  {
    era: "1918",
    heading: "It began with a journey no one chose",
    body: "Our story begins in Indonesia, in 1918, when my great grandmother was lured onto a Dutch merchant vessel as a victim of human trafficking. She didn\u2019t have much recollection of exactly what happened throughout her journey on that boat\u2026 but she ended up in Suriname, a small country in South America.",
  },
  {
    era: "Suriname",
    heading: "Freedom, and a recipe preserved",
    body: "After she spent a decent amount of time as an indentured servant, she eventually earned her freedom. With that, a portion of our heritage was preserved and handed down \u2014 from one generation to the next. In Suriname and in Indonesia there were these 3 unbelievably amazing sauces used on many dishes. Two were sweet and spicy, and the other was straight heat. Our great grandmother used to make them by hand.",
  },
  {
    era: "Generations",
    heading: "Passed from hand to hand",
    body: "Some of our favorite things passed down through generations were the recipes for these sweet and savory hot sauces. In the past, the only way we could get our hands on the sauces would be if Grandma brought some in her carry-on from Suriname. But as time went on and as the family started to grow, we started to learn how to make it ourselves! We would make it for almost every family gathering.",
  },
  {
    era: "Atlanta, Georgia",
    heading: "A new chapter",
    body: "From Java, Indonesia to Atlanta, Georgia. From indentured servant to immigrant to US citizen. Our heritage traveled across oceans and generations to land here.",
  },
  {
    era: "Komodo Sauces",
    heading: "Sharing our fire with the world",
    body: "YEARS LATER, me and my family decided that we wanted to share this hot sauce with the world. It was the best! Why wouldn\u2019t we?! I named this company Komodo Sauces because the word Komodo comes from Komodo Island in Indonesia which is home to the Komodo Dragon. Our sauces are hot and fiery. Our sauces are also from Indonesia\u2026so are Komodo Dragons.",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OurStoryPage() {
  const jsonLd = articleSchema({
    headline: "Our Story \u2014 Komodo Sauces",
    description:
      "From Java, Indonesia to Atlanta, Georgia. Four generations of flavor, heritage, and purpose.",
    url: "/our-story",
  });

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 1 ── Story Hero                                                   */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden px-6 pb-24 pt-32 text-center md:pb-32 md:pt-44"
        style={{
          background:
            "linear-gradient(160deg, #0A0A0A 0%, #140505 55%, #0A0A0A 100%)",
        }}
        aria-labelledby="story-hero-heading"
      >
        {/* Subtle radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 85%, rgba(196,30,30,0.08) 0%, transparent 68%)",
          }}
        />

        {/* Oversized background word — very faint depth element */}
        <span
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-black uppercase leading-none text-komodo-white/[0.018]"
          style={{ fontSize: "clamp(8rem, 28vw, 20rem)" }}
          aria-hidden="true"
        >
          HERITAGE
        </span>

        <AnimateOnScroll className="relative">
          {/* Eyebrow */}
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-komodo-red">
            Heritage &amp; Purpose
          </p>

          {/* H1 */}
          <h1
            id="story-hero-heading"
            className="font-black uppercase leading-[0.9] tracking-[0.12em] text-komodo-white"
            style={{ fontSize: "clamp(3rem, 10vw, 7.5rem)" }}
          >
            Our Story
          </h1>

          {/* Gold subheadline */}
          <p className="mt-6 text-xl font-bold italic text-komodo-gold md:text-2xl lg:text-3xl">
            From Java, Indonesia to Atlanta, Georgia
          </p>

          {/* Red rule */}
          <div
            className="mx-auto mt-8 h-0.5 w-[60px] bg-komodo-red"
            aria-hidden="true"
          />
        </AnimateOnScroll>

        {/* Bottom fade into timeline */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-komodo-black to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 2 ── Timeline                                                     */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        className="bg-komodo-black px-6 py-16 md:py-20"
        aria-label="Brand origin story"
      >
        <div className="relative mx-auto max-w-6xl">
          {/* Vertical spine — desktop only */}
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-komodo-red/25 to-transparent lg:block"
            aria-hidden="true"
          />

          {TIMELINE.map((section, i) => {
            const isRight = i % 2 !== 0;
            return (
              <AnimateOnScroll
                key={section.era}
                className={[
                  "relative py-14 md:py-18",
                  i < TIMELINE.length - 1
                    ? "border-b border-komodo-red/10"
                    : "",
                ].join(" ")}
              >
                {/* Spine dot — desktop only */}
                <div
                  className="absolute left-1/2 top-14 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-komodo-red ring-4 ring-komodo-black lg:block"
                  aria-hidden="true"
                />

                {/* Content block — alternates left / right */}
                <div
                  className={[
                    "max-w-xl",
                    isRight ? "lg:ml-auto lg:pl-12" : "lg:pr-12",
                  ].join(" ")}
                >
                  {/* Era label */}
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-komodo-red">
                    {section.era}
                  </p>

                  {/* Red accent rule */}
                  <div
                    className="mb-5 h-0.5 w-10 bg-komodo-red"
                    aria-hidden="true"
                  />

                  {/* Pull-quote heading */}
                  <h3 className="mb-5 text-2xl font-bold italic leading-snug text-komodo-gold md:text-3xl">
                    &ldquo;{section.heading}&rdquo;
                  </h3>

                  {/* Narrative body */}
                  <p className="text-base leading-relaxed text-gray-400 md:text-lg">
                    {section.body}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 3 ── Founder Section                                              */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        className="bg-gray-900 px-6 py-24 md:py-32"
        aria-label="Founder statement"
      >
        <div className="mx-auto max-w-5xl">
          <AnimateOnScroll>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

              {/* ── Image placeholder ─────────────────────────────────────── */}
              <div
                className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl bg-gray-800 lg:mx-0 lg:max-w-none"
                aria-label="Photo of Gabe Fung-A-Wing, founder of Komodo Sauces"
              >
                <div className="flex aspect-square items-center justify-center">
                  <span
                    className="select-none font-black uppercase text-gray-700"
                    style={{ fontSize: "clamp(3.5rem, 12vw, 7rem)" }}
                    aria-hidden="true"
                  >
                    GF
                  </span>
                </div>
              </div>

              {/* ── Quote ─────────────────────────────────────────────────── */}
              <div>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-komodo-red">
                  Founder
                </p>

                <blockquote>
                  <p className="text-lg font-bold italic leading-relaxed text-komodo-gold md:text-xl lg:text-[1.35rem]">
                    &ldquo;Not only does our company provide great products, but
                    our business is also committed to fighting modern day slavery
                    and human trafficking. It&rsquo;s part of our story. With
                    each bottle purchased, you help raise awareness and
                    financially support anti-human trafficking
                    organizations.&rdquo;
                  </p>

                  <footer className="mt-8 border-t border-gray-800 pt-6">
                    <p className="font-black uppercase tracking-[0.15em] text-komodo-white">
                      Gabe Fung-A-Wing
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Founder, Komodo Sauces
                    </p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 4 ── CTA                                                          */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden px-6 py-24 text-center md:py-32"
        style={{
          background:
            "linear-gradient(160deg, #0A0A0A 0%, #150606 50%, #0A0A0A 100%)",
        }}
        aria-labelledby="story-cta-heading"
      >
        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 65% 75% at 50% 50%, rgba(196,30,30,0.08) 0%, transparent 68%)",
          }}
        />

        <AnimateOnScroll className="relative">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-komodo-red">
            Experience It
          </p>
          <h2
            id="story-cta-heading"
            className="mb-10 text-3xl font-black uppercase tracking-[0.2em] text-komodo-white md:text-4xl lg:text-5xl"
          >
            Taste the Heritage
          </h2>

          <Link
            href="/products"
            className={[
              "inline-flex items-center justify-center px-12 py-4",
              "bg-komodo-red",
              "text-xs font-black uppercase tracking-[0.2em] text-komodo-white",
              "transition-all duration-200",
              "hover:brightness-110 active:brightness-75",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-komodo-red focus-visible:ring-offset-2 focus-visible:ring-offset-komodo-black",
            ].join(" ")}
          >
            Shop Our Sauces
          </Link>
        </AnimateOnScroll>
      </section>
    </>
  );
}
