"use client";

import { useState } from "react";
import type { RecipeData } from "@/lib/blog/posts";

const FRACTIONS: Record<number, string> = {
  0.25: "¼",
  0.5: "½",
  0.75: "¾",
  0.33: "⅓",
  0.67: "⅔",
};

function formatAmount(amount: number): string {
  const whole = Math.floor(amount);
  const decimal = parseFloat((amount % 1).toFixed(2));
  const frac = FRACTIONS[decimal] ?? (decimal > 0 ? decimal.toString() : "");
  if (whole > 0) return frac ? `${whole} ${frac}` : `${whole}`;
  return frac || amount.toString();
}

export function RecipeCard({ data }: { data: RecipeData }) {
  const [servings, setServings] = useState(data.servings);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const ratio = servings / data.servings;

  function toggleIngredient(i: number) {
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));
  }

  async function copyRecipe() {
    const text = [
      `Komodo Gold Marinade — ${servings} ${servings === 1 ? "serving" : "servings"}`,
      "",
      "INGREDIENTS",
      ...data.ingredients.map(
        (ing) =>
          `• ${formatAmount(ing.amount * ratio)} ${ing.unit} ${ing.item}`,
      ),
      "",
      "STEPS",
      ...data.steps.map((s, i) => `${i + 1}. ${s}`),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-komodo-red/20 bg-gray-900">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 px-5 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-komodo-red">
            Recipe
          </span>
          <span className="text-xs text-gray-500">Prep: {data.prepTime}</span>
          <span className="text-xs text-gray-500">Cook: {data.cookTime}</span>
        </div>

        {/* Serving adjuster */}
        <div className="flex items-center overflow-hidden rounded-lg border border-gray-700">
          <button
            type="button"
            onClick={() => setServings((s) => Math.max(1, s - 1))}
            aria-label="Decrease servings"
            className="flex h-9 w-9 items-center justify-center text-gray-400 transition-colors hover:bg-gray-800 hover:text-komodo-white focus-visible:outline-none focus-visible:bg-gray-800"
          >
            −
          </button>
          <span className="min-w-[5.5rem] text-center text-xs font-semibold text-komodo-white">
            {servings} {servings === 1 ? "serving" : "servings"}
          </span>
          <button
            type="button"
            onClick={() => setServings((s) => Math.min(20, s + 1))}
            aria-label="Increase servings"
            className="flex h-9 w-9 items-center justify-center text-gray-400 transition-colors hover:bg-gray-800 hover:text-komodo-white focus-visible:outline-none focus-visible:bg-gray-800"
          >
            +
          </button>
        </div>
      </div>

      {/* ── Ingredients ─────────────────────────────────────────────────────── */}
      <div className="px-5 pt-5">
        <h3 className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-komodo-white">
          Ingredients
        </h3>
        <ul className="space-y-2.5">
          {data.ingredients.map((ing, i) => (
            <li key={i}>
              <label className="flex cursor-pointer select-none items-baseline gap-3">
                <input
                  type="checkbox"
                  checked={!!checked[i]}
                  onChange={() => toggleIngredient(i)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-komodo-red"
                />
                <span
                  className={[
                    "text-sm",
                    checked[i] ? "text-gray-600 line-through" : "text-gray-300",
                  ].join(" ")}
                >
                  <span className="font-semibold text-komodo-gold">
                    {formatAmount(ing.amount * ratio)} {ing.unit}
                  </span>{" "}
                  {ing.item}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Steps ───────────────────────────────────────────────────────────── */}
      <div className="px-5 pt-5">
        <h3 className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-komodo-white">
          Steps
        </h3>
        <ol className="space-y-3">
          {data.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-komodo-red text-[10px] font-black text-komodo-white">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-gray-400">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <div className="mt-5 border-t border-gray-800 px-5 py-4">
        <button
          type="button"
          onClick={copyRecipe}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 transition-colors hover:text-komodo-white focus-visible:outline-none focus-visible:text-komodo-white"
        >
          {copied ? (
            <>
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
              Copied!
            </>
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copy Recipe
            </>
          )}
        </button>
      </div>
    </div>
  );
}
