"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { SAUCE_META, type QuizQuestion, type SauceId } from "@/lib/blog/posts";

const STEP_VARIANTS: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.28, ease: "easeOut" } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.18, ease: "easeIn" } },
};

function getResult(answers: SauceId[]): SauceId {
  const counts: Record<SauceId, number> = { black: 0, red: 0, gold: 0 };
  answers.forEach((a) => counts[a]++);
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as SauceId;
}

function ResultDisplay({
  sauceId,
  onReset,
}: {
  sauceId: SauceId;
  onReset: () => void;
}) {
  const meta = SAUCE_META[sauceId];
  return (
    <div className="flex flex-col items-center text-center">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-600">
        Your sauce is
      </p>
      <h3 className="mb-2 text-2xl font-black uppercase tracking-[0.12em] text-komodo-white">
        {meta.name}
      </h3>
      <div className="mb-4 h-0.5 w-12 bg-komodo-red" aria-hidden="true" />
      <p className="mb-6 max-w-xs text-sm leading-relaxed text-gray-400">
        {meta.tagline}
      </p>
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Link
          href={`/products/${meta.handle}`}
          className="block w-full bg-komodo-red py-3 text-center text-xs font-black uppercase tracking-[0.2em] text-komodo-white transition-colors hover:bg-komodo-red-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
        >
          Shop {meta.name}
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-gray-600 transition-colors hover:text-komodo-white focus-visible:outline-none focus-visible:text-komodo-white"
        >
          Retake quiz
        </button>
      </div>
    </div>
  );
}

export function SauceQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<SauceId[]>([]);
  const [step, setStep] = useState(0);

  const isDone = step >= questions.length;
  const currentQ = questions[step];

  function handleAnswer(value: SauceId) {
    setAnswers((prev) => [...prev, value]);
    setStep((s) => s + 1);
  }

  function reset() {
    setAnswers([]);
    setStep(0);
  }

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-komodo-red/20 bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-800 px-5 py-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-komodo-red">
            Sauce Quiz
          </span>
          {!isDone && (
            <span className="text-xs text-gray-600">
              {step + 1} / {questions.length}
            </span>
          )}
        </div>

        {/* Progress bar segments */}
        <div className="mt-3 flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={[
                "h-1 flex-1 rounded-full transition-colors duration-300",
                i < step
                  ? "bg-komodo-red"
                  : i === step && !isDone
                    ? "bg-komodo-red/40"
                    : "bg-gray-800",
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="relative min-h-[220px] px-5 py-6">
        <AnimatePresence mode="wait" initial={false}>
          {!isDone ? (
            <motion.div
              key={`q-${step}`}
              variants={STEP_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <p className="mb-5 text-base font-bold leading-snug text-komodo-white md:text-lg">
                {currentQ.question}
              </p>
              <div className="flex flex-col gap-2">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleAnswer(opt.value)}
                    className={[
                      "w-full rounded-lg border border-gray-700 px-4 py-3 text-left text-sm text-gray-300",
                      "transition-all duration-150",
                      "hover:border-komodo-red hover:bg-komodo-red/5 hover:text-komodo-white",
                      "focus-visible:outline-none focus-visible:border-komodo-red focus-visible:bg-komodo-red/5",
                    ].join(" ")}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              variants={STEP_VARIANTS}
              initial="hidden"
              animate="visible"
            >
              <ResultDisplay sauceId={getResult(answers)} onReset={reset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
