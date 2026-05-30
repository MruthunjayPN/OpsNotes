"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIStore {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  pinnedPages: string[];
  pinPage: (id: string) => void;
  unpinPage: (id: string) => void;

  recentPages: string[];
  addRecent: (id: string) => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

      pinnedPages: [],
      pinPage: (id) =>
        set((s) => ({
          pinnedPages: s.pinnedPages.includes(id)
            ? s.pinnedPages
            : [...s.pinnedPages, id],
        })),
      unpinPage: (id) =>
        set((s) => ({
          pinnedPages: s.pinnedPages.filter((p) => p !== id),
        })),

      recentPages: [],
      addRecent: (id) =>
        set((s) => ({
          recentPages: [id, ...s.recentPages.filter((p) => p !== id)].slice(
            0,
            5
          ),
        })),

      searchQuery: "",
      setSearchQuery: (q) => set({ searchQuery: q }),
    }),
    {
      name: "opsnotes-ui",
      partialize: (state) => ({
        pinnedPages: state.pinnedPages,
        recentPages: state.recentPages,
      }),
    }
  )
);
