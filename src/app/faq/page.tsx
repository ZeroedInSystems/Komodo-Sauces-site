import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Komodo Sauces — heat levels, ingredients, shipping, and how your purchase fights human trafficking.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ | Komodo Sauces",
    description:
      "Answers to common questions about Komodo Sauces — heat levels, ingredients, shipping, and how your purchase fights human trafficking.",
    url: "/faq",
  },
};

// ─── FAQ content ──────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: "What makes Komodo Sauces different?",
    answer:
      "Komodo Sauces carries four generations of Indonesian heritage in every bottle. Our recipes trace back to our founder's great grandmother, who hand-ground these sauces in Central Java. We're small-batch, chef-crafted, and mission-driven — donating a portion of every sale to anti-human trafficking organizations. You won't find flavor like this anywhere else.",
  },
  {
    question: "How hot are your sauces?",
    answer:
      "We rate heat on a scale of 1–10. Komodo Gold is our hottest at 8/10, with a bright citrus-forward heat and tropical fruit notes. Komodo Red sits at 6/10 — a balanced sweet heat with garlic and traditional Indonesian spice. Komodo Black is our most approachable at 5/10, with a deep, smoky, earthy profile. All three are flavorful first, fiery second.",
  },
  {
    question: "What ingredients do you use?",
    answer:
      "Our sauces are built on traditional Indonesian chili blends, hand-ground spices, and fermentation techniques passed down through our family for over 100 years. We use no artificial preservatives, no artificial colors, and no flavor shortcuts. Exact recipes are proprietary, but you'll find the full ingredient list on each product page and label.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, we ship within the United States only. International shipping is something we're actively working toward — sign up for our newsletter to be the first to know when we expand. We want Komodo Sauces on every table on earth.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "All orders ship from Atlanta, Georgia. Standard shipping takes 5–7 business days. Expedited shipping (2–3 business days) is available at checkout. You'll receive a tracking confirmation email as soon as your order leaves our facility.",
  },
  {
    question: "Are your sauces gluten-free and vegan?",
    answer:
      "Yes — all three Komodo Sauces are gluten-free and vegan. We use no animal-derived ingredients and no gluten-containing grains. If you have a specific allergy concern, please review the ingredient list on the product page or reach out to us directly before ordering.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order ships, you'll receive an email with a tracking number and a direct link to follow your package. If you haven't received a tracking email within 2 business days of placing your order, check your spam folder first — then contact us and we'll sort it out.",
  },
  {
    question: "How does my purchase support anti-trafficking efforts?",
    answer:
      "A portion of every Komodo Sauces purchase is donated directly to vetted organizations on the front lines of fighting human trafficking. This commitment is deeply personal — our founder's great grandmother was a trafficking survivor. Every bottle is both a piece of heritage and a stand against modern-day slavery. Read the full story on our Mission page.",
  },
  {
    question: "Can I buy Komodo Sauces in stores?",
    answer:
      "Right now we're exclusively online at komodosauces.com. We're working on retail partnerships and hope to announce store locations soon. The best way to stay informed is to follow us on social or subscribe to our newsletter.",
  },
  {
    question: "Do you offer wholesale or bulk pricing?",
    answer:
      "Yes — we love working with restaurants, specialty food shops, and gift retailers. If you're interested in wholesale or bulk pricing, email us at wholesale@komodosauces.com and we'll respond within 2 business days with pricing and availability.",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FaqPage() {
  const jsonLd = faqSchema(FAQ_ITEMS);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 1 ── Hero                                                         */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        className="bg-komodo-black px-6 pb-16 pt-32 text-center md:pb-20 md:pt-40"
        aria-labelledby="faq-hero-heading"
      >
        <AnimateOnScroll>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-komodo-red">
            Help Center
          </p>
          <h1
            id="faq-hero-heading"
            className="text-3xl font-black uppercase tracking-[0.15em] text-komodo-white md:text-4xl lg:text-5xl"
          >
            Frequently Asked
            <br />
            <span className="text-komodo-gold">Questions</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-gray-500 md:text-base">
            Can&rsquo;t find what you&rsquo;re looking for? Our AI assistant
            can help — just ask below.
          </p>
        </AnimateOnScroll>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 2 ── Accordion                                                    */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        className="bg-komodo-black px-6 pb-24 md:pb-32"
        aria-label="FAQ accordion"
      >
        <AnimateOnScroll className="mx-auto max-w-3xl">
          <Accordion
            items={[...FAQ_ITEMS]}
            className="border-t border-gray-800"
          />
        </AnimateOnScroll>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 3 ── Still Have Questions?                                        */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        className="bg-gray-900 px-6 py-20 md:py-28"
        aria-labelledby="faq-cta-heading"
      >
        <AnimateOnScroll className="mx-auto max-w-2xl text-center">
          {/* Decorative dragon glyph */}
          <p
            className="mb-4 select-none text-5xl"
            aria-hidden="true"
          >
            🐉
          </p>

          <h2
            id="faq-cta-heading"
            className="mb-3 text-2xl font-black uppercase tracking-[0.18em] text-komodo-white md:text-3xl"
          >
            Still Have Questions?
          </h2>

          <p className="mb-8 text-sm leading-relaxed text-gray-400 md:text-base">
            Can&rsquo;t find your answer? Ask Komodo — our AI assistant knows
            the sauces, the story, and the mission.
          </p>

          <Link
            href="/ask"
            className={[
              "inline-flex items-center gap-2.5 px-10 py-4",
              "border border-komodo-red/40 text-komodo-white",
              "text-xs font-black uppercase tracking-[0.18em]",
              "transition-all duration-200",
              "hover:border-komodo-red hover:bg-komodo-red/[0.08]",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-komodo-red focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
            ].join(" ")}
          >
            Ask Komodo
            <span aria-hidden="true">🐉</span>
          </Link>

          <p className="mt-5 text-xs text-gray-600">
            Or email us at{" "}
            <a
              href="mailto:hello@komodosauces.com"
              className="text-gray-500 underline underline-offset-2 transition-colors hover:text-komodo-white"
            >
              hello@komodosauces.com
            </a>
          </p>
        </AnimateOnScroll>
      </section>
    </>
  );
}
