"use client";

import dynamic from "next/dynamic";

const AskKomodo = dynamic(
  () =>
    import("@/components/chat/AskKomodo").then((m) => ({
      default: m.AskKomodo,
    })),
  { ssr: false },
);

export function AskPageClient() {
  return <AskKomodo />;
}
