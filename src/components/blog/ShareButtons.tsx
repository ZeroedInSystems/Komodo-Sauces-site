"use client";

import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${slug}`
      : `/blog/${slug}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  }

  function handleTwitter() {
    const href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  function handleFacebook() {
    const href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  const btnClass = [
    "flex h-9 w-9 items-center justify-center rounded-lg border border-gray-800 text-gray-400",
    "transition-colors hover:border-komodo-red hover:text-komodo-red",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red",
  ].join(" ");

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-600">
        Share
      </span>

      {/* Copy link */}
      <button onClick={handleCopy} aria-label="Copy link" className={btnClass}>
        {copied ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-komodo-red"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          </svg>
        )}
      </button>

      {/* Twitter / X */}
      <button
        onClick={handleTwitter}
        aria-label="Share on X (Twitter)"
        className={btnClass}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      {/* Facebook */}
      <button
        onClick={handleFacebook}
        aria-label="Share on Facebook"
        className={btnClass}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>
    </div>
  );
}
