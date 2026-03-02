import { type NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/groq/system-prompt";

const MAX_SESSION_MESSAGES = 20;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

// ─── SSE helper ───────────────────────────────────────────────────────────────

const SSE_HEADERS = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache, no-transform",
  Connection: "keep-alive",
  "X-Accel-Buffering": "no",
};

/** Wraps plain text as a single-event SSE stream and closes. */
function makeFallbackStream(text: string): ReadableStream {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`,
        ),
      );
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const { messages, sessionMessageCount } = (await request.json()) as {
      messages: { role: string; content: string }[];
      sessionMessageCount: number;
    };

    // ── Rate limit ────────────────────────────────────────────────────────
    if (sessionMessageCount > MAX_SESSION_MESSAGES) {
      return NextResponse.json(
        {
          error:
            "You've reached the session limit. Refresh the page to start a new conversation.",
        },
        { status: 429 },
      );
    }

    // ── No API key — friendly placeholder response ─────────────────────
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(
        makeFallbackStream(
          "Hey there! 🐉 I'm Komodo, your hot sauce guide. The AI assistant isn't fully connected yet — but check out our sauces at /products to find your perfect heat level!",
        ),
        { headers: SSE_HEADERS },
      );
    }

    // ── Call Groq ─────────────────────────────────────────────────────────
    const groqResponse = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
        max_tokens: 256,
        temperature: 0.75,
      }),
    });

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      console.error("Groq API error:", errText);
      throw new Error("Groq API request failed");
    }

    // Pipe Groq's SSE stream directly to the client
    return new Response(groqResponse.body, { headers: SSE_HEADERS });
  } catch (err) {
    console.error("Chat route error:", err);
    return new Response(
      makeFallbackStream(
        "Sorry, I'm having a little trouble right now 🐉 Please try again in a moment — I promise I'm usually more helpful!",
      ),
      { headers: SSE_HEADERS },
    );
  }
}
