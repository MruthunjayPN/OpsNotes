export interface QAItem {
  q: string;
  a: string;
}

export interface MentalModelBlockProps {
  items?: QAItem[];
  pairs?: QAItem[];
}

export function MentalModelBlock({ items, pairs }: MentalModelBlockProps) {
  const entries = pairs ?? items ?? [];

  return (
    <div className="my-5 space-y-2">
      {entries.map((item, i) => (
        <div key={i} className="rounded border border-border overflow-hidden">
          <div className="flex items-start gap-2.5 bg-blueBg px-4 py-2.5">
            <span className="text-[10px] font-mono font-semibold text-blue mt-0.5 flex-shrink-0">
              Q
            </span>
            <p className="text-[13px] font-medium text-blue">{item.q}</p>
          </div>
          <div className="flex items-start gap-2.5 bg-bg px-4 py-2.5">
            <span className="text-[10px] font-mono font-semibold text-muted mt-0.5 flex-shrink-0">
              A
            </span>
            <p className="text-[13px] text-text leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
