import type { Metadata } from "next";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { organizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "Every bottle of Komodo Sauces is a stand against modern-day slavery. Learn how we donate a portion of every purchase to fight human trafficking.",
  alternates: {
    canonical: "/mission",
  },
  openGraph: {
    title: "Our Mission | Komodo Sauces",
    description:
      "Every bottle of Komodo Sauces is a stand against modern-day slavery. Learn how we donate a portion of every purchase to fight human trafficking.",
    url: "/mission",
  },
};

// ─── How It Works ─────────────────────────────────────────────────────────────

const STEPS = [
  {
    step: "01",
    icon: (
      // Shopping bag
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    heading: "You Buy a Bottle",
    body: "Every Komodo Sauces purchase is a deliberate act. Great flavor and profound impact, in the same bottle.",
  },
  {
    step: "02",
    icon: (
      // Heart
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    heading: "We Donate a Portion",
    body: "A meaningful percentage of every sale goes directly to vetted, front-line anti-trafficking organizations doing real work in the field.",
  },
  {
    step: "03",
    icon: (
      // Shield
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    heading: "Organizations Fight Trafficking",
    body: "Your purchase funds the rescue, rehabilitation, and advocacy work of partners dedicated to restoring freedom and dignity to survivors.",
  },
] as const;

// ─── Impact Stats ─────────────────────────────────────────────────────────────

const IMPACT_STATS = [
  {
    value: "10%",
    label: "Of profits donated",
    note: "to anti-trafficking organizations",
  },
  {
    value: "4",
    label: "Partner organizations",
    note: "vetted and front-line",
  },
  {
    value: "Every Bottle",
    label: "Raises awareness",
    note: "of modern-day slavery",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MissionPage() {
  const jsonLd = organizationSchema();

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 1 ── Mission Hero                                                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden px-6 pb-28 pt-36 text-center md:pb-36 md:pt-48"
        style={{
          background:
            "linear-gradient(160deg, #0A0A0A 0%, #180404 60%, #0A0A0A 100%)",
        }}
        aria-labelledby="mission-hero-heading"
      >
        {/* Deep red radial glow from below */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 90%, rgba(196,30,30,0.12) 0%, transparent 65%)",
          }}
        />

        {/* Background word — ultra-low opacity */}
        <span
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-black uppercase leading-none text-komodo-red/[0.03]"
          style={{ fontSize: "clamp(6rem, 24vw, 18rem)" }}
          aria-hidden="true"
        >
          FREEDOM
        </span>

        <AnimateOnScroll className="relative">
          {/* Eyebrow */}
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-komodo-red">
            Our Commitment
          </p>

          {/* H1 */}
          <h1
            id="mission-hero-heading"
            className="font-black uppercase leading-[0.88] tracking-[0.1em] text-komodo-white"
            style={{ fontSize: "clamp(2.8rem, 10vw, 7.5rem)" }}
          >
            We Fight
            <br />
            <span className="text-komodo-red">for Freedom</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
            Every bottle purchased helps combat modern-day slavery and human
            trafficking. This isn&rsquo;t just a sauce. It&rsquo;s a statement.
          </p>

          {/* Red rule */}
          <div
            className="mx-auto mt-10 h-0.5 w-[60px] bg-komodo-red"
            aria-hidden="true"
          />
        </AnimateOnScroll>

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-komodo-black to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 2 ── The Connection                                               */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden px-6 py-24 md:py-32"
        style={{
          background:
            "linear-gradient(150deg, #0A0A0A 0%, #160606 45%, #0A0A0A 100%)",
        }}
        aria-labelledby="connection-heading"
      >
        <div className="mx-auto max-w-4xl">
          <AnimateOnScroll>
            {/* Eyebrow */}
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-komodo-red">
              The Root of It All
            </p>

            <h2
              id="connection-heading"
              className="mb-8 text-2xl font-black uppercase leading-tight tracking-[0.15em] text-komodo-white md:text-3xl lg:text-4xl"
            >
              Our Mission Is Personal
            </h2>

            {/* Red rule */}
            <div
              className="mb-10 h-0.5 w-10 bg-komodo-red"
              aria-hidden="true"
            />
          </AnimateOnScroll>

          {/* Pull quote */}
          <AnimateOnScroll delay={0.08}>
            <blockquote className="mb-12 border-l-2 border-komodo-red pl-6 md:pl-8">
              <p className="text-xl font-bold italic leading-snug text-komodo-gold md:text-2xl lg:text-[1.75rem]">
                &ldquo;Our story begins with pain — and it continues with
                purpose.&rdquo;
              </p>
            </blockquote>
          </AnimateOnScroll>

          {/* Narrative */}
          <AnimateOnScroll delay={0.14}>
            <div className="space-y-6 text-base leading-relaxed text-gray-400 md:text-lg">
              <p>
                In 1918, our founder&rsquo;s great grandmother was lured onto a
                Dutch merchant vessel as a victim of human trafficking. She was
                taken from her home in Indonesia and brought to Suriname, a
                small country in South America, where she lived as an
                indentured servant.
              </p>
              <p>
                She survived. She earned her freedom. And she carried something
                precious with her — the recipes, the traditions, and the
                flavors of her homeland. Those recipes were passed down through
                four generations, making their way from Indonesia to Suriname
                to Atlanta, Georgia.
              </p>
              <p>
                When Gabe Fung-A-Wing founded Komodo Sauces, he made a
                decision: the company would not just share its heritage through
                flavor — it would honor that heritage by standing against the
                same injustice that touched his family over a century ago.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Closing statement — larger, more impactful */}
          <AnimateOnScroll delay={0.2}>
            <p className="mt-12 text-lg font-semibold leading-relaxed text-komodo-white md:text-xl">
              Modern-day slavery affects millions of people worldwide. With
              every bottle of Komodo Sauces, we refuse to look away.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Bottom fade into How It Works */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-900 to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 3 ── How It Works                                                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        className="bg-gray-900 px-6 py-24 md:py-32"
        aria-labelledby="how-it-works-heading"
      >
        <div className="mx-auto max-w-6xl">
          {/* Section heading */}
          <AnimateOnScroll className="mb-16 text-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-komodo-red">
              How Your Purchase Helps
            </p>
            <h2
              id="how-it-works-heading"
              className="text-2xl font-black uppercase tracking-[0.18em] text-komodo-white md:text-3xl"
            >
              Every Bottle. Real Impact.
            </h2>
            <div
              className="mx-auto mt-5 h-0.5 w-[60px] bg-komodo-red"
              aria-hidden="true"
            />
          </AnimateOnScroll>

          {/* Step cards */}
          <ol className="grid grid-cols-1 gap-6 md:grid-cols-3" role="list">
            {STEPS.map((step, i) => (
              <AnimateOnScroll key={step.step} delay={i * 0.1}>
                <li className="relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900/60 p-8 transition-colors duration-300 hover:border-komodo-red/30">
                  {/* Faded step number — background depth */}
                  <span
                    className="pointer-events-none absolute right-6 top-4 select-none font-black leading-none text-gray-800"
                    style={{ fontSize: "5rem" }}
                    aria-hidden="true"
                  >
                    {step.step}
                  </span>

                  {/* Red top accent */}
                  <div
                    className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-komodo-red/60 via-komodo-red to-komodo-red/60"
                    aria-hidden="true"
                  />

                  {/* Icon */}
                  <div
                    className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-komodo-red/10 text-komodo-red"
                    aria-hidden="true"
                  >
                    {step.icon}
                  </div>

                  {/* Heading */}
                  <h3 className="relative mb-3 text-base font-black uppercase tracking-[0.15em] text-komodo-white">
                    {step.heading}
                  </h3>

                  {/* Body */}
                  <p className="relative text-sm leading-relaxed text-gray-400">
                    {step.body}
                  </p>
                </li>
              </AnimateOnScroll>
            ))}
          </ol>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 4 ── Impact Stats                                                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden px-6 py-24 md:py-32"
        style={{
          background:
            "linear-gradient(160deg, #0A0A0A 0%, #120404 50%, #0A0A0A 100%)",
        }}
        aria-labelledby="impact-heading"
      >
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(196,30,30,0.07) 0%, transparent 68%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl">
          <AnimateOnScroll className="mb-16 text-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-komodo-red">
              The Numbers
            </p>
            <h2
              id="impact-heading"
              className="text-2xl font-black uppercase tracking-[0.18em] text-komodo-white md:text-3xl"
            >
              Impact at a Glance
            </h2>
            <div
              className="mx-auto mt-5 h-0.5 w-[60px] bg-komodo-red"
              aria-hidden="true"
            />
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            <dl
              className="grid grid-cols-1 divide-y divide-gray-800 border border-gray-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
              aria-label="Impact statistics"
            >
              {IMPACT_STATS.map(({ value, label, note }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 px-8 py-10 text-center"
                >
                  <dd className="text-4xl font-black text-komodo-gold md:text-5xl">
                    {value}
                  </dd>
                  <dt className="text-xs font-black uppercase tracking-widest text-komodo-white">
                    {label}
                  </dt>
                  <p className="text-xs text-gray-600">{note}</p>
                </div>
              ))}
            </dl>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 5 ── CTA                                                          */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-komodo-black px-6 py-24 text-center md:py-36"
        aria-labelledby="mission-cta-heading"
      >
        {/* Grid texture — same depth trick as Hero */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.018]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(250,250,250,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,250,0.8) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Strong upward glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 100%, rgba(196,30,30,0.14) 0%, transparent 60%)",
          }}
        />

        <AnimateOnScroll className="relative">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-komodo-red">
            Make a Difference
          </p>

          {/* Stacked bold headline */}
          <h2
            id="mission-cta-heading"
            className="font-black uppercase leading-[0.9] tracking-[0.12em] text-komodo-white"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            Join the Fight.
          </h2>
          <p
            className="mt-1 font-black uppercase leading-[0.9] tracking-[0.12em] text-komodo-red"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            aria-hidden="true"
          >
            Buy a Bottle.
          </p>

          <p className="mx-auto mt-8 max-w-sm text-sm leading-relaxed text-gray-500">
            Every purchase is a vote for freedom. Every flavor is a piece of
            history worth fighting for.
          </p>

          <Link
            href="/products"
            className={[
              "mt-10 inline-flex items-center justify-center px-12 py-4",
              "bg-komodo-red",
              "text-xs font-black uppercase tracking-[0.22em] text-komodo-white",
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
