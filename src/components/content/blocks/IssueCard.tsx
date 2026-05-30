export interface IssueCardProps {
  severity?: "high" | "medium" | "low";
  type?: "bug" | "perf";
  title?: string;
  symptom: string;
  cause: string;
  fix: string;
}

const SEVERITY_CONFIG = {
  high: {
    label: "HIGH",
    headerBg: "bg-redBg",
    badgeColor: "text-red border-red/30",
  },
  medium: {
    label: "MEDIUM",
    headerBg: "bg-amberBg",
    badgeColor: "text-amber border-amber/30",
  },
  low: {
    label: "LOW",
    headerBg: "bg-codeBg",
    badgeColor: "text-muted border-border",
  },
} as const;

const TYPE_CONFIG = {
  bug: {
    label: "BUG",
    headerBg: "bg-redBg",
    badgeColor: "text-red border-red/30",
  },
  perf: {
    label: "PERF",
    headerBg: "bg-amberBg",
    badgeColor: "text-amber border-amber/30",
  },
} as const;

export function IssueCard({ severity, type, title, symptom, cause, fix }: IssueCardProps) {
  const cfg = severity
    ? SEVERITY_CONFIG[severity]
    : type
    ? TYPE_CONFIG[type]
    : SEVERITY_CONFIG.medium;

  return (
    <div className="my-5 rounded border border-border overflow-hidden">
      <div className={`flex items-center gap-2.5 px-4 py-2.5 ${cfg.headerBg} border-b border-border`}>
        <span
          className={`text-[10px] font-mono uppercase tracking-wider border rounded px-1.5 py-0.5 ${cfg.badgeColor}`}
        >
          {cfg.label}
        </span>
        {title && (
          <span className="text-[13px] font-semibold text-text">{title}</span>
        )}
      </div>
      {(
        [
          { label: "Symptom", value: symptom },
          { label: "Cause", value: cause },
          { label: "Fix", value: fix },
        ] as const
      ).map(({ label, value }, i) => (
        <div
          key={label}
          className={`flex items-start gap-4 px-4 py-2.5 ${
            i % 2 === 0 ? "bg-bg" : "bg-codeBg/40"
          } ${i !== 0 ? "border-t border-border/50" : ""}`}
        >
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted w-16 flex-shrink-0 pt-0.5">
            {label}
          </span>
          <span className="text-[13px] text-text">{value}</span>
        </div>
      ))}
    </div>
  );
}
