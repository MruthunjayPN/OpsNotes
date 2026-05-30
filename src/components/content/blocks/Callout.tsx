export interface CalloutProps {
  type?: "note" | "tip" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
}

const CALLOUT_CONFIG = {
  note: {
    borderColor: "border-blue",
    bg: "bg-blueBg",
    labelColor: "text-blue",
    label: "Note",
  },
  tip: {
    borderColor: "border-green",
    bg: "bg-greenBg",
    labelColor: "text-green",
    label: "Tip",
  },
  warning: {
    borderColor: "border-amber",
    bg: "bg-amberBg",
    labelColor: "text-amber",
    label: "Warning",
  },
  error: {
    borderColor: "border-red",
    bg: "bg-redBg",
    labelColor: "text-red",
    label: "Error",
  },
} as const;

export function Callout({ type = "note", title, children }: CalloutProps) {
  const cfg = CALLOUT_CONFIG[type];

  return (
    <div
      className={`my-5 border-l-2 ${cfg.borderColor} ${cfg.bg} rounded-r px-4 py-3`}
    >
      <p className={`text-[10px] font-mono uppercase tracking-widest mb-1.5 ${cfg.labelColor}`}>
        {title ?? cfg.label}
      </p>
      <div className="text-[13px] text-text leading-relaxed [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}
