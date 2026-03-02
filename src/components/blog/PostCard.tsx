"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blog/posts";

function HeatPips({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`Heat level ${level} of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < level ? "#C41E1E" : "none"}
          stroke={i < level ? "#C41E1E" : "#3a3a3a"}
          strokeWidth="1.5"
          className="h-3 w-3"
          aria-hidden="true"
        >
          <path d="M10 2C10 2 5.5 7.5 5.5 11a4.5 4.5 0 009 0C14.5 7.5 10 2 10 2z" />
        </svg>
      ))}
    </span>
  );
}

export function PostCard({ post }: { post: BlogPost }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(196,30,30,0.18)]"
    >
      {/* Kind badge */}
      <div className="absolute left-4 top-4 z-10">
        <span className="rounded bg-komodo-black/80 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-komodo-red backdrop-blur-sm">
          {post.kind}
        </span>
      </div>

      {/* Image placeholder */}
      <div className="flex h-48 items-center justify-center bg-gray-800">
        <span
          className="select-none text-5xl transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          🔥
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="mb-2 text-lg font-black uppercase leading-snug tracking-[0.06em] text-komodo-white transition-colors duration-200 group-hover:text-komodo-red">
          {/* Stretched link covers entire card */}
          <Link
            href={`/blog/${post.slug}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red after:absolute after:inset-0"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-400">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HeatPips level={post.heatLevel} />
            <span className="text-xs text-gray-600">{post.readingTime} min read</span>
          </div>
          <time dateTime={post.publishedAt} className="text-xs text-gray-600">
            {date}
          </time>
        </div>
      </div>
    </motion.article>
  );
}
