import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BLOG_POSTS,
  getPostBySlug,
  getRelatedPosts,
  type Block,
} from "@/lib/blog/posts";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { HeatRating } from "@/components/blog/HeatRating";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { RecipeCard } from "@/components/blog/RecipeCard";
import { SauceQuiz } from "@/components/blog/SauceQuiz";
import { PostCard } from "@/components/blog/PostCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

// Next.js 15: params is a Promise
interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// ─── Block renderer ───────────────────────────────────────────────────────────

function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case "paragraph":
      return (
        <p className="mb-6 text-base leading-relaxed text-gray-400 md:text-lg">
          {block.text}
        </p>
      );

    case "heading":
      return block.level === 2 ? (
        <h2 className="mb-4 mt-10 text-xl font-black uppercase tracking-[0.1em] text-komodo-white md:text-2xl">
          {block.text}
        </h2>
      ) : (
        <h3 className="mb-3 mt-8 text-lg font-black uppercase tracking-[0.08em] text-komodo-white">
          {block.text}
        </h3>
      );

    case "listicle":
      return (
        <ol className="mb-6 space-y-8">
          {block.items.map((item) => (
            <li key={item.number} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-komodo-red text-sm font-black text-komodo-white">
                {item.number}
              </div>
              <div>
                <div className="mb-1 flex flex-wrap items-baseline gap-2">
                  <h3 className="text-base font-black uppercase tracking-wide text-komodo-white">
                    {item.food}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-komodo-gold">
                    + {item.sauce}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-400">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "recipe":
      return <RecipeCard data={block.data} />;

    case "quiz":
      return <SauceQuiz questions={block.questions} />;

    case "timeline":
      return (
        <div className="mb-6 space-y-0">
          {block.entries.map((entry, i) => (
            <div key={entry.era} className="flex gap-4">
              {/* Spine */}
              <div className="flex flex-col items-center">
                <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-komodo-red ring-4 ring-komodo-black" />
                {i < block.entries.length - 1 && (
                  <div className="w-px flex-1 bg-gradient-to-b from-komodo-red/30 to-transparent" />
                )}
              </div>
              {/* Content */}
              <div className="pb-8">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-komodo-red">
                  {entry.era}
                </p>
                <p className="text-sm leading-relaxed text-gray-400">
                  {entry.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 2);
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <ReadingProgress />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 1 ── Post hero                                                    */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden px-6 pb-16 pt-32 md:pb-20 md:pt-44"
        style={{
          background:
            "linear-gradient(160deg, #0A0A0A 0%, #140505 55%, #0A0A0A 100%)",
        }}
        aria-labelledby="post-heading"
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 85%, rgba(196,30,30,0.07) 0%, transparent 68%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs text-gray-600">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-gray-400 focus-visible:outline-none focus-visible:text-gray-400"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-gray-400 focus-visible:outline-none focus-visible:text-gray-400"
                >
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="max-w-[200px] truncate text-gray-500">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-gray-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            id="post-heading"
            className="mb-4 font-black uppercase leading-tight tracking-[0.08em] text-komodo-white"
            style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
          >
            {post.title}
          </h1>

          <p className="mb-6 text-lg italic text-gray-400">{post.excerpt}</p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5">
            <HeatRating level={post.heatLevel} />
            <span className="text-xs text-gray-600">
              {post.readingTime} min read
            </span>
            <time dateTime={post.publishedAt} className="text-xs text-gray-600">
              {date}
            </time>
          </div>

          <div className="mt-8 h-px bg-gray-800" aria-hidden="true" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 2 ── Content                                                      */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <article
        className="bg-komodo-black px-6 py-12 md:py-16"
        aria-label={post.title}
      >
        <div className="mx-auto max-w-3xl">
          {post.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}

          {/* Share row */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-gray-800 pt-8">
            <ShareButtons title={post.title} slug={post.slug} />
            <Link
              href="/blog"
              className="text-xs font-semibold uppercase tracking-wider text-gray-600 transition-colors hover:text-komodo-white focus-visible:outline-none focus-visible:text-komodo-white"
            >
              ← All posts
            </Link>
          </div>
        </div>
      </article>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 3 ── Related posts                                                */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {related.length > 0 && (
        <section
          className="bg-gray-900 px-6 pb-24 pt-16 md:pb-32"
          aria-label="Related posts"
        >
          <div className="mx-auto max-w-6xl">
            <AnimateOnScroll>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-komodo-red">
                Keep Reading
              </p>
              <h2 className="mb-10 text-2xl font-black uppercase tracking-[0.12em] text-komodo-white md:text-3xl">
                More From the Fire
              </h2>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {related.map((rPost, i) => (
                <AnimateOnScroll key={rPost.slug} delay={i * 0.08}>
                  <PostCard post={rPost} />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
