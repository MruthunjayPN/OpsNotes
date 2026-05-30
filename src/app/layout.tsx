import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { getNavigation } from "@/lib/navigation";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "OpsNotes",
  description: "Engineering knowledge platform — MLOps, DevOps, architecture",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navGroups = getNavigation();

  return (
    <html lang="en">
      <body className="bg-bg text-text font-sans antialiased">
        <div className="flex h-screen overflow-hidden">
          <Sidebar navGroups={navGroups} />
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
