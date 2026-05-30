import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAF9",
        sideBg: "#F3F3EF",
        cardBg: "#FFFFFF",
        codeBg: "#F5F5F1",
        hover: "#EAEAE5",
        active: "#E4E4DE",
        border: "#E2E2DA",
        text: "#1C1C1A",
        sub: "#565650",
        muted: "#9A9A90",
        accent: "#C2410C",
        accentBg: "#FFF7ED",
        blue: "#1D4ED8",
        blueBg: "#EFF6FF",
        green: "#166534",
        greenBg: "#F0FDF4",
        amber: "#92400E",
        amberBg: "#FFFBEB",
        red: "#991B1B",
        redBg: "#FEF2F2",
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
