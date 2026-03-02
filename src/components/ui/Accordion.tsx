"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

// ─── +/− icon ─────────────────────────────────────────────────────────────────

function PlusMinusIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className="relative block h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      {/* Horizontal bar — always visible */}
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-current" />
      {/* Vertical bar — rotates to 0° and fades out when open, creating +→− effect */}
      <span
        className={[
          "absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-current",
          "transition-all duration-300",
          isOpen ? "rotate-0 opacity-0" : "rotate-90 opacity-100",
        ].join(" ")}
      />
    </span>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────

/**
 * Accessible expand/collapse accordion. Only one item open at a time.
 * Uses Framer Motion for smooth height animation.
 */
export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <div className={className}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const questionId = `faq-q-${i}`;
        const answerId = `faq-a-${i}`;

        return (
          <div key={item.question} className="border-b border-gray-800">
            {/* ── Trigger button ────────────────────────────────────────────── */}
            <button
              type="button"
              id={questionId}
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={answerId}
              className={[
                "flex w-full items-center justify-between gap-6 py-5 text-left",
                "text-sm font-semibold uppercase tracking-[0.1em]",
                "transition-colors duration-200",
                isOpen ? "text-komodo-gold" : "text-komodo-white",
                "hover:text-komodo-gold",
                "focus-visible:outline-none focus-visible:text-komodo-gold",
              ].join(" ")}
            >
              <span>{item.question}</span>
              <span className="text-komodo-red">
                <PlusMinusIcon isOpen={isOpen} />
              </span>
            </button>

            {/* ── Collapsible answer ────────────────────────────────────────── */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="pb-6 pr-10 text-sm leading-relaxed text-gray-400 md:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
