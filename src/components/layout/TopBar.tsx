import Link from "next/link";
import { formatSectionLabel } from "@/lib/format";

interface TopBarProps {
  domain: string;
  domainLabel: string;
  topic: string;
  topicTitle: string;
  section: string;
  lastUpdated?: string;
}

export function TopBar({
  domain,
  domainLabel,
  topic,
  topicTitle,
  section,
  lastUpdated,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-7 py-3 bg-bg border-b border-border min-h-[48px]">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[13px]">
        <Link
          href={`/${domain}`}
          className="text-sub hover:text-text transition-colors font-sans"
        >
          {domainLabel}
        </Link>
        <span className="text-muted">/</span>
        <Link
          href={`/${domain}/${topic}/overview`}
          className="text-sub hover:text-text transition-colors font-sans"
        >
          {topicTitle}
        </Link>
        <span className="text-muted">/</span>
        <span className="text-text font-medium font-sans">
          {formatSectionLabel(section)}
        </span>
      </nav>

      {/* Last updated */}
      {lastUpdated && (
        <span className="text-[11px] font-mono text-muted tracking-wide">
          Updated {lastUpdated}
        </span>
      )}
    </header>
  );
}
