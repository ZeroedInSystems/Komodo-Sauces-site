"use client";

import { useEffect, useRef } from "react";

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let rafId: number;

    function update() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      if (bar) bar.style.width = `${pct}%`;
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // set initial position

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-0.5 w-full bg-gray-800"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full bg-komodo-red"
        style={{ width: "0%", transition: "none" }}
      />
    </div>
  );
}
