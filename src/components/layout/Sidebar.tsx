"use client";

import { useUIStore } from "@/store/ui";
import { NavTree } from "@/components/navigation/NavTree";
import type { NavGroup } from "@/types/navigation";

export function Sidebar({ navGroups }: { navGroups: NavGroup[] }) {
  const { sidebarCollapsed, toggleSidebar, searchQuery, setSearchQuery } =
    useUIStore();

  return (
    <aside
      className={`flex-shrink-0 flex flex-col h-screen bg-sideBg border-r border-border transition-all duration-200 overflow-hidden ${
        sidebarCollapsed ? "w-11" : "w-60"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-border min-h-[48px]">
        {!sidebarCollapsed && (
          <span className="text-[13px] font-semibold text-text tracking-tight font-sans">
            OpsNotes
          </span>
        )}
        <button
          onClick={toggleSidebar}
          className="ml-auto p-1 rounded hover:bg-hover text-muted hover:text-sub transition-colors"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            {sidebarCollapsed ? (
              <>
                <path d="M3 7h8M7 3l4 4-4 4" />
              </>
            ) : (
              <>
                <path d="M11 7H3M7 3L3 7l4 4" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Expanded content */}
      {!sidebarCollapsed && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search */}
          <div className="px-3 py-2 border-b border-border">
            <div className="relative">
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted"
                width="11"
                height="11"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="6.5" cy="6.5" r="5" />
                <path d="M10.5 10.5L14 14" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search… (⌘K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-[12px] bg-hover rounded pl-7 pr-3 py-1.5 text-text placeholder:text-muted outline-none focus:ring-1 focus:ring-accent/30 font-sans"
              />
            </div>
          </div>

          {/* Nav tree */}
          <div className="flex-1 overflow-y-auto">
            <NavTree groups={navGroups} />
          </div>
        </div>
      )}

      {/* Collapsed: icon-only stubs */}
      {sidebarCollapsed && (
        <div className="flex-1 overflow-y-auto py-2">
          {navGroups.flatMap((g) =>
            g.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-center py-1.5"
                title={item.title}
              >
                <span className="text-[14px] text-sub">{item.icon}</span>
              </div>
            ))
          )}
        </div>
      )}
    </aside>
  );
}
