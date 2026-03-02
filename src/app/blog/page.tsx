import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog/posts";
import { PostCard } from "@/components/blog/PostCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export const metadata: Metadata = {
  title: "From the Fire — Blog",
  description:
    "Hot sauce pairing tips, recipes, brand stories, and sauce guides from the Komodo kitchen.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "From the Fire — Komodo Sauces Blog",
    description:
      "Hot sauce pairing tips, recipes, brand stories, and sauce guides from the Komodo kitchen.",
    url: "/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 1 ── Hero                                                         */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden px-6 pb-20 pt-32 text-center md:pb-28 md:pt-44"
        style={{
          background:
            "linear-gradient(160deg, #0A0A0A 0%, #140505 55%, #0A0A0A 100%)",
        }}
        aria-labelledby="blog-hero-heading"
      >
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 85%, rgba(196,30,30,0.08) 0%, transparent 68%)",
          }}
        />

        {/* Oversized background word */}
        <span
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-black uppercase leading-none text-komodo-white/[0.018]"
          style={{ fontSize: "clamp(8rem, 28vw, 20rem)" }}
          aria-hidden="true"
        >
          FIRE
        </span>

        <AnimateOnScroll className="relative">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-komodo-red">
            Stories, Recipes &amp; Tips
          </p>
          <h1
            id="blog-hero-heading"
            className="font-black uppercase leading-[0.9] tracking-[0.12em] text-komodo-white"
            style={{ fontSize: "clamp(3rem, 10vw, 7.5rem)" }}
          >
            From the Fire
          </h1>
          <p className="mt-6 text-lg text-gray-400">
            Everything we know about heat, flavor, and heritage.
          </p>
          <div
            className="mx-auto mt-8 h-0.5 w-[60px] bg-komodo-red"
            aria-hidden="true"
          />
        </AnimateOnScroll>

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-komodo-black to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 2 ── Posts grid                                                   */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        className="bg-komodo-black px-6 pb-24 pt-10 md:pb-32"
        aria-label="Blog posts"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {BLOG_POSTS.map((post, i) => (
              <AnimateOnScroll key={post.slug} delay={i * 0.08}>
                <PostCard post={post} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
