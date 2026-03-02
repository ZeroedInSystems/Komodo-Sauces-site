"use client";

import { useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface UseChatReturn {
  messages: ChatMessage[];
  streamingContent: string;
  isLoading: boolean;
  error: string | null;
  sessionMessageCount: number;
  sendMessage: (content: string) => Promise<void>;
  clearError: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Manages AI chat state: message history, streaming content, and error state.
 * Tracks per-session message count for soft rate-limiting.
 */
export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamingContent, setStreamingContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionCountRef = useRef(0);

  async function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || isLoading) return;

    // Soft rate-limit — guard before even calling the API
    if (sessionCountRef.current >= 20) {
      setError(
        "You've reached the session limit. Refresh the page to start a new conversation.",
      );
      return;
    }

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setStreamingContent("");
    setError(null);
    setIsLoading(true);
    sessionCountRef.current += 1;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          sessionMessageCount: sessionCountRef.current,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(
          data.error ?? `Request failed with status ${response.status}`,
        );
      }

      if (!response.body) throw new Error("No response body");

      // ── Parse SSE stream ─────────────────────────────────────────────
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Split on newlines, keeping any trailing incomplete line in buffer
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr) as {
              choices?: { delta?: { content?: string } }[];
            };
            const delta = parsed.choices?.[0]?.delta?.content ?? "";
            if (delta) {
              accumulated += delta;
              setStreamingContent(accumulated);
            }
          } catch {
            // Skip malformed SSE lines
          }
        }
      }

      // Flush any remaining buffered line
      if (buffer.startsWith("data: ")) {
        const jsonStr = buffer.slice(6).trim();
        if (jsonStr && jsonStr !== "[DONE]") {
          try {
            const parsed = JSON.parse(jsonStr) as {
              choices?: { delta?: { content?: string } }[];
            };
            const delta = parsed.choices?.[0]?.delta?.content ?? "";
            if (delta) accumulated += delta;
          } catch {
            // Ignore
          }
        }
      }

      // Commit the fully-assembled assistant message
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: accumulated },
      ]);
      setStreamingContent("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function clearError() {
    setError(null);
  }

  return {
    messages,
    streamingContent,
    isLoading,
    error,
    sessionMessageCount: sessionCountRef.current,
    sendMessage,
    clearError,
  };
}
