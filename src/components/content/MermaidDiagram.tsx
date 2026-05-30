"use client";

import { useEffect, useRef, useState } from "react";

export interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            primaryColor: "#FFF7ED",
            primaryBorderColor: "#C2410C",
            primaryTextColor: "#1C1C1A",
            lineColor: "#9A9A90",
            secondaryColor: "#F3F3EF",
            tertiaryColor: "#FAFAF9",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "13px",
          },
        });
        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (e) {
        if (!cancelled) setError(String(e));
      }
    }

    void render();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <div className="my-4 rounded border border-redBg bg-redBg px-4 py-3 text-[12px] font-mono text-red">
        Diagram error: {error}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="my-5 flex justify-center overflow-x-auto rounded border border-border bg-bg py-4"
    >
      <span className="text-[12px] font-mono text-muted">Loading diagram…</span>
    </div>
  );
}
