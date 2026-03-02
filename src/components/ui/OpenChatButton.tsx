"use client";

import type { ReactNode } from "react";

interface OpenChatButtonProps {
  children: ReactNode;
  className?: string;
}

/**
 * Dispatches the `komodo:open-chat` custom event when clicked.
 * The AI chat widget listens for this event to open itself.
 */
export function OpenChatButton({ children, className }: OpenChatButtonProps) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent("komodo:open-chat"));
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
