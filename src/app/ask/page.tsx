import type { Metadata } from "next";
import { AskPageClient } from "./AskPageClient";

export const metadata: Metadata = {
  title: "Ask Komodo",
  description:
    "Your personal Komodo Sauces AI expert. Ask about heat levels, flavor pairings, ingredients, shipping, and our anti-trafficking mission.",
  alternates: {
    canonical: "/ask",
  },
  openGraph: {
    title: "Ask Komodo | Komodo Sauces",
    description:
      "Your personal Komodo Sauces AI expert. Ask about heat levels, flavor pairings, ingredients, shipping, and our anti-trafficking mission.",
    url: "/ask",
  },
};

export default function AskPage() {
  return <AskPageClient />;
}
