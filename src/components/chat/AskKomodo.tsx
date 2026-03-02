"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import { useChat, type ChatMessage } from "@/hooks/useChat";

// ─── Constants ────────────────────────────────────────────────────────────────

const SUGGESTED_QUESTIONS = [
  "Which sauce is the hottest?",
  "What goes well with Komodo Gold?",
  "Tell me about your mission",
  "Do you ship internationally?",
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function KomodoAvatar() {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-komodo-red/20 text-xs font-black text-komodo-red ring-1 ring-komodo-red/30"
      aria-hidden="true"
    >
      KS
    </div>
  );
}

function ThinkingDots() {
  return (
    <div className="flex items-start gap-3">
      <KomodoAvatar />
      <div className="rounded-2xl rounded-tl-sm bg-gray-800 px-4 py-3">
        <div className="flex gap-1.5 py-0.5" aria-label="Komodo is thinking">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  isStreaming = false,
}: {
  message: ChatMessage;
  isStreaming?: boolean;
}) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm border border-komodo-red/20 bg-komodo-red/10 px-4 py-3 md:max-w-[75%]">
          <p className="text-base leading-relaxed text-komodo-white">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <KomodoAvatar />
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-gray-800 px-4 py-3 md:max-w-[75%]">
        <p className="text-base leading-relaxed text-gray-200">
          {message.content}
          {isStreaming && (
            <span
              className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-komodo-gold align-middle"
              aria-hidden="true"
            />
          )}
        </p>
      </div>
    </div>
  );
}

function EmptyState({
  onSuggest,
}: {
  onSuggest: (q: string) => void;
}) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-16 text-center">
      <p className="mb-4 select-none text-6xl" aria-hidden="true">
        🐉
      </p>
      <h1
        className="mb-3 font-black uppercase leading-tight tracking-[0.1em] text-komodo-white"
        style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)" }}
      >
        Ask Komodo
      </h1>
      <p className="text-lg text-gray-400 md:text-xl">
        Your personal hot sauce expert. Ask anything.
      </p>

      {/* Suggested questions — scrollable row on mobile */}
      <div
        className="mt-10 flex w-full max-w-xl gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="list"
        aria-label="Suggested questions"
      >
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            role="listitem"
            onClick={() => onSuggest(q)}
            className={[
              "shrink-0 rounded-full border border-gray-700 px-4 py-2.5",
              "text-sm text-gray-300 transition-colors duration-200",
              "hover:border-komodo-red/50 hover:text-komodo-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red",
              "active:scale-95",
            ].join(" ")}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AskKomodo() {
  const { messages, streamingContent, isLoading, error, sendMessage } =
    useChat();

  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isEmpty = messages.length === 0 && !isLoading;

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, streamingContent]);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input]);

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;
    setInput("");
    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    await sendMessage(content);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
  }

  const canSend = input.trim().length > 0 && !isLoading;

  return (
    /* Full-viewport flex column — dvh shrinks when keyboard appears on mobile */
    <div className="flex flex-col bg-komodo-black" style={{ height: "100dvh" }}>
      {/* ── Navbar spacer ──────────────────────────────────────────────── */}
      <div className="h-16 shrink-0" aria-hidden="true" />

      {/* ── Scrollable messages area ────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto overscroll-contain"
        role="log"
        aria-label="Conversation"
        aria-live="polite"
      >
        {isEmpty ? (
          <EmptyState onSuggest={(q) => void handleSend(q)} />
        ) : (
          <div className="mx-auto max-w-2xl space-y-5 px-4 py-8">
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}

            {/* Streaming response */}
            {isLoading && streamingContent && (
              <MessageBubble
                message={{ role: "assistant", content: streamingContent }}
                isStreaming
              />
            )}

            {/* Thinking dots — while waiting for first token */}
            {isLoading && !streamingContent && <ThinkingDots />}

            {/* Error */}
            {error && (
              <div
                className="rounded-xl border border-komodo-red/30 bg-komodo-red/10 px-4 py-3 text-sm text-komodo-red"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* ── Input bar ───────────────────────────────────────────────────── */}
      <div
        className="shrink-0 border-t border-gray-800 bg-komodo-black/95 px-4 py-3 backdrop-blur-md"
        style={{
          paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div className="mx-auto max-w-2xl space-y-2.5">
          {/* Suggested chips — only when conversation is empty */}
          {isEmpty && (
            <div
              className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-hidden="true"
            >
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => void handleSend(q)}
                  className={[
                    "shrink-0 rounded-full border border-gray-700 px-3.5 py-2",
                    "text-xs text-gray-400 transition-colors duration-200",
                    "hover:border-komodo-red/50 hover:text-gray-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red",
                  ].join(" ")}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input row */}
          <div className="flex items-end gap-2 rounded-2xl border border-gray-700 bg-gray-800/80 px-4 py-3 focus-within:border-gray-600 transition-colors duration-200">
            <label htmlFor="chat-input" className="sr-only">
              Ask Komodo a question
            </label>
            <textarea
              id="chat-input"
              ref={textareaRef}
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="What sauce goes best with tacos?"
              disabled={isLoading}
              className={[
                "min-w-0 flex-1 resize-none bg-transparent",
                "text-base text-komodo-white placeholder:text-gray-600",
                "focus:outline-none",
                "disabled:opacity-60",
                "max-h-[120px] overflow-y-auto",
                // Momentum scrolling on iOS
                "[-webkit-overflow-scrolling:touch]",
              ].join(" ")}
              style={{ lineHeight: "1.5" }}
              aria-label="Message input"
            />

            {/* Send button */}
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={!canSend}
              aria-label="Send message"
              className={[
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                "transition-all duration-200",
                canSend
                  ? "bg-komodo-red text-komodo-white hover:brightness-110 active:brightness-75"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-komodo-red focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800",
              ].join(" ")}
            >
              {/* Arrow-up icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>

          {/* Hint */}
          <p className="text-center text-xs text-gray-700">
            Komodo AI · Powered by Groq · Press ⏎ to send
          </p>
        </div>
      </div>
    </div>
  );
}
