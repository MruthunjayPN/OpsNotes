"use client";

import { useUIStore } from "@/store/ui";

export function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 rounded text-muted hover:text-sub hover:bg-hover transition-colors"
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span className="text-[14px] leading-none select-none">
        {theme === "light" ? "☀" : "◑"}
      </span>
    </button>
  );
}
