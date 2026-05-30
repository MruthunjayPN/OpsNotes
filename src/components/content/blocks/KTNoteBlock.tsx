export interface KTNoteBlockProps {
  session: string;
  date: string;
  coverage: number;
  understood: string[];
  unclear: string[];
}

export function KTNoteBlock({
  session,
  date,
  coverage,
  understood,
  unclear,
}: KTNoteBlockProps) {
  return (
    <div className="my-5 rounded border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-accentBg border-b border-border">
        <div>
          <p className="text-[13px] font-semibold text-text">{session}</p>
          <p className="text-[11px] font-mono text-sub mt-0.5">{date}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-muted">
              Coverage
            </p>
            <p className="text-[16px] font-semibold text-accent">{coverage}%</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-accent/30 flex items-center justify-center">
            <div
              className="w-6 h-6 rounded-full bg-accent/20"
              style={{
                background: `conic-gradient(rgb(var(--accent)) ${coverage * 3.6}deg, transparent 0deg)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
        <div className="px-4 py-3">
          <p className="text-[10px] font-mono uppercase tracking-widest text-green mb-2">
            Understood
          </p>
          <ul className="space-y-1.5">
            {understood.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-text">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-4 py-3">
          <p className="text-[10px] font-mono uppercase tracking-widest text-amber mb-2">
            Unclear / Follow-up
          </p>
          <ul className="space-y-1.5">
            {unclear.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-text">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
