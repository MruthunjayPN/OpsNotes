"use client";

import Link from "next/link";
import { formatSectionLabel } from "@/lib/format";

interface SectionTabsProps {
  sections: string[];
  currentSection: string;
  domain: string;
  topic: string;
}

export function SectionTabs({
  sections,
  currentSection,
  domain,
  topic,
}: SectionTabsProps) {
  return (
    <div className="flex items-center border-b border-border bg-bg overflow-x-auto px-7 gap-0">
      {sections.map((sec) => {
        const active = sec === currentSection;
        return (
          <Link
            key={sec}
            href={`/${domain}/${topic}/${sec}`}
            className={`px-3 py-2.5 text-[13px] whitespace-nowrap border-b-2 transition-colors font-sans ${
              active
                ? "text-accent border-accent font-medium"
                : "text-sub border-transparent hover:text-text"
            }`}
          >
            {formatSectionLabel(sec)}
          </Link>
        );
      })}
    </div>
  );
}
