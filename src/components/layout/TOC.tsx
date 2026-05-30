"use client";

export interface TOCHeading {
  id: string;
  text: string;
  depth: 2 | 3;
}

export function TOC({ headings }: { headings: TOCHeading[] }) {
  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block w-48 flex-shrink-0 sticky top-[97px] self-start max-h-[calc(100vh-97px)] overflow-y-auto pl-6 pr-4 py-6">
      <p className="text-[10px] font-mono uppercase tracking-widest text-muted mb-3">
        On this page
      </p>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block text-[12px] text-sub hover:text-text transition-colors py-0.5 font-sans ${
                h.depth === 3 ? "pl-3" : ""
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
