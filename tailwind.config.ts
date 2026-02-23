import type { Config } from "tailwindcss";

// NOTE: Tailwind v4 uses CSS-first configuration via `@theme` in globals.css.
// This file is loaded via `@config "./tailwind.config.ts"` in CSS and serves
// as a compatibility layer for editor tooling and any legacy plugin support.

const config: Config = {
  // v4 auto-detects content — no `content` array required.
  theme: {
    extend: {
      colors: {
        "komodo-black":    "#0A0A0A",
        "komodo-red":      "#C41E1E",
        "komodo-white":    "#FAFAFA",
        "komodo-gold":     "#D4A853",
        "komodo-red-dark": "#8B1515",
        "komodo-red-glow": "#FF3333",
        "gray-900":        "#1A1A1A",
        "gray-800":        "#2A2A2A",
        "gray-600":        "#6B6B6B",
        "gray-400":        "#9B9B9B",
        "gray-100":        "#F0F0F0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      // Full type scale (mirrors Tailwind defaults — extended for IntelliSense)
      fontSize: {
        xs:   ["0.75rem",   { lineHeight: "1rem" }],
        sm:   ["0.875rem",  { lineHeight: "1.25rem" }],
        base: ["1rem",      { lineHeight: "1.5rem" }],
        lg:   ["1.125rem",  { lineHeight: "1.75rem" }],
        xl:   ["1.25rem",   { lineHeight: "1.75rem" }],
        "2xl":["1.5rem",    { lineHeight: "2rem" }],
        "3xl":["1.875rem",  { lineHeight: "2.25rem" }],
        "4xl":["2.25rem",   { lineHeight: "2.5rem" }],
        "5xl":["3rem",      { lineHeight: "1" }],
        "6xl":["3.75rem",   { lineHeight: "1" }],
        "7xl":["4.5rem",    { lineHeight: "1" }],
        "8xl":["6rem",      { lineHeight: "1" }],
        "9xl":["8rem",      { lineHeight: "1" }],
      },
      // 8px grid — fills the gaps in Tailwind's default spacing scale.
      // Standard scale: 1=4px, 2=8px, 4=16px, 6=24px, 8=32px, 10=40px, 12=48px…
      // Custom additions (odd multiples of 8px not covered by defaults):
      spacing: {
        "18": "4.5rem",  // 72px
        "22": "5.5rem",  // 88px
        "26": "6.5rem",  // 104px
        "30": "7.5rem",  // 120px
        "34": "8.5rem",  // 136px
        "38": "9.5rem",  // 152px
        "42": "10.5rem", // 168px
        "46": "11.5rem", // 184px
        "50": "12.5rem", // 200px
        "54": "13.5rem", // 216px
        "58": "14.5rem", // 232px
        "62": "15.5rem", // 248px
        "66": "16.5rem", // 264px
        "70": "17.5rem", // 280px
        "78": "19.5rem", // 312px
        "82": "20.5rem", // 328px
        "86": "21.5rem", // 344px
        "90": "22.5rem", // 360px
        "94": "23.5rem", // 376px
        "98": "24.5rem", // 392px
        "100":"25rem",   // 400px
        "104":"26rem",   // 416px
        "108":"27rem",   // 432px
        "112":"28rem",   // 448px
        "120":"30rem",   // 480px
        "128":"32rem",   // 512px
        "144":"36rem",   // 576px
        "160":"40rem",   // 640px
        "176":"44rem",   // 704px
        "192":"48rem",   // 768px
      },
    },
  },
  plugins: [],
};

export default config;
