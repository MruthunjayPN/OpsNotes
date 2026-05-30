import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        sideBg: "rgb(var(--side-bg) / <alpha-value>)",
        cardBg: "rgb(var(--card-bg) / <alpha-value>)",
        codeBg: "rgb(var(--code-bg) / <alpha-value>)",
        hover: "rgb(var(--hover) / <alpha-value>)",
        active: "rgb(var(--active) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        sub: "rgb(var(--sub) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        accentBg: "rgb(var(--accent-bg) / <alpha-value>)",
        blue: "rgb(var(--blue) / <alpha-value>)",
        blueBg: "rgb(var(--blue-bg) / <alpha-value>)",
        green: "rgb(var(--green) / <alpha-value>)",
        greenBg: "rgb(var(--green-bg) / <alpha-value>)",
        amber: "rgb(var(--amber) / <alpha-value>)",
        amberBg: "rgb(var(--amber-bg) / <alpha-value>)",
        red: "rgb(var(--red) / <alpha-value>)",
        redBg: "rgb(var(--red-bg) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "monospace"],
      },
      fontSize: {
        "11": ["11px", { lineHeight: "1.5" }],
        "13": ["13px", { lineHeight: "1.6" }],
        "14": ["14px", { lineHeight: "1.7" }],
        "16": ["16px", { lineHeight: "1.6" }],
        "21": ["21px", { lineHeight: "1.3" }],
      },
      maxWidth: {
        content: "840px",
      },
    },
  },
  plugins: [],
};

export default config;
