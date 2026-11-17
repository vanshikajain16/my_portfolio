import type { Config } from "tailwindcss";

const config: Config = {
  // Class-based dark mode so our toggle (and the pre-paint script) controls it
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Colors come from CSS variables so light/dark swap in one place
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)", // the single accent color
        "accent-hover": "rgb(var(--accent-hover) / <alpha-value>)",
        // Subtle tint for chip fills, borders and glows (alpha differs per theme)
        "accent-muted": "rgb(var(--accent) / var(--accent-muted-a))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
