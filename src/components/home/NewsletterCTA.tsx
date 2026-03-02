"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      // Placeholder — wire to Klaviyo / Mailchimp in a later prompt
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      className="relative overflow-hidden px-6 py-16 md:py-24"
      style={{
        background:
          "linear-gradient(150deg, #0A0A0A 0%, #180808 35%, #1C0808 55%, #0A0A0A 100%)",
      }}
      aria-labelledby="newsletter-heading"
    >
      {/* ── Top fade-in from MissionSection's gray-900 ─────────────────────── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-gray-900 to-transparent"
        aria-hidden="true"
      />

      {/* ── Central radial glow ────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 90% at 50% 50%, rgba(196,30,30,0.09) 0%, transparent 68%)",
        }}
      />

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <motion.div
        className="relative mx-auto flex max-w-2xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Eyebrow */}
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-komodo-red">
          Stay Connected
        </p>

        {/* Headline */}
        <h2
          id="newsletter-heading"
          className="text-3xl font-black uppercase tracking-[0.2em] text-komodo-white md:text-4xl lg:text-5xl"
        >
          Join the Fire
        </h2>

        {/* Subtext */}
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400 md:text-base">
          Get early access to new flavors, recipes, and exclusive drops.
        </p>

        {/* ── Form / success ─────────────────────────────────────────────── */}
        {status === "success" ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-10 text-base font-semibold text-komodo-gold"
            role="status"
            aria-live="polite"
          >
            Welcome to the family! 🔥
          </motion.p>
        ) : (
          <div className="mt-10 w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              aria-label="Newsletter signup form"
              noValidate
            >
              {/* Input + button row */}
              <div
                className={[
                  "flex flex-col overflow-hidden rounded-lg sm:flex-row",
                  "border transition-colors duration-200",
                  status === "error"
                    ? "border-komodo-red/60"
                    : "border-gray-700 focus-within:border-komodo-gold/50",
                ].join(" ")}
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  disabled={status === "loading"}
                  className={[
                    "min-w-0 flex-1 bg-gray-900/80 px-5 py-3.5",
                    "text-sm text-komodo-white placeholder:text-gray-600",
                    "focus:outline-none",
                    "disabled:opacity-60",
                  ].join(" ")}
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={[
                    "bg-komodo-gold px-7 py-3.5",
                    "text-xs font-black uppercase tracking-[0.2em] text-komodo-black",
                    "transition-all duration-200",
                    "hover:brightness-90 active:brightness-75",
                    "disabled:cursor-not-allowed disabled:opacity-60",
                    // Focus ring visible when navigating by keyboard
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-komodo-gold focus-visible:ring-inset",
                  ].join(" ")}
                >
                  {status === "loading" ? "Joining\u2026" : "Subscribe"}
                </button>
              </div>

              {/* Error message */}
              {status === "error" && (
                <p
                  className="mt-2 text-left text-xs text-komodo-red"
                  role="alert"
                >
                  Something went wrong. Please try again.
                </p>
              )}
            </form>

            {/* Reassurance */}
            <p className="mt-3 text-xs text-gray-600">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
