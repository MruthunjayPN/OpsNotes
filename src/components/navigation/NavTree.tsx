"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { formatSectionLabel } from "@/lib/format";
import type { NavGroup, NavItem } from "@/types/navigation";

const STATUS_DOT: Record<string, string> = {
  stable: "bg-green",
  wip: "bg-amber",
  draft: "bg-muted",
};

function TopicRow({
  item,
  domain,
  isActive,
  currentSection,
}: {
  item: NavItem;
  domain: string;
  isActive: boolean;
  currentSection: string;
}) {
  return (
    <div>
      <Link
        href={item.href}
        className={`flex items-center gap-2 px-3 py-1.5 mx-1 rounded text-[13px] transition-colors ${
          isActive
            ? "bg-accentBg text-text"
            : "text-text hover:bg-hover"
        }`}
      >
        <span className="text-[14px] w-4 flex-shrink-0 text-center leading-none">
          {item.icon}
        </span>
        <span className="flex-1 truncate font-sans">{item.title}</span>
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            STATUS_DOT[item.status] ?? "bg-muted"
          }`}
          title={item.status}
        />
      </Link>

      {isActive && (
        <div className="mt-0.5 mb-1">
          {item.sections.map((sec) => {
            const href = `/${domain}/${item.id}/${sec}`;
            const active = sec === currentSection;
            return (
              <Link
                key={sec}
                href={href}
                className={`block pl-9 pr-3 py-[5px] mx-1 rounded text-[12px] transition-colors ${
                  active
                    ? "text-accent font-medium"
                    : "text-sub hover:text-text hover:bg-hover"
                }`}
              >
                {formatSectionLabel(sec)}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DomainGroup({
  group,
  activeDomain,
  activeTopic,
  activeSection,
}: {
  group: NavGroup;
  activeDomain: string;
  activeTopic: string;
  activeSection: string;
}) {
  const isThisDomain = group.id === activeDomain;
  const [open, setOpen] = useState(isThisDomain);

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-1.5 hover:bg-hover transition-colors"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted font-medium">
          {group.label}
        </span>
        <span className={`text-muted text-[10px] transition-transform ${open ? "" : "-rotate-90"}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className="py-0.5">
          {group.items.map((item) => (
            <TopicRow
              key={item.id}
              item={item}
              domain={group.id}
              isActive={isThisDomain && item.id === activeTopic}
              currentSection={activeSection}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function NavTree({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const activeDomain = segments[0] ?? "";
  const activeTopic = segments[1] ?? "";
  const activeSection = segments[2] ?? "";

  return (
    <nav className="py-2">
      {groups.map((group) => (
        <DomainGroup
          key={group.id}
          group={group}
          activeDomain={activeDomain}
          activeTopic={activeTopic}
          activeSection={activeSection}
        />
      ))}
    </nav>
  );
}
