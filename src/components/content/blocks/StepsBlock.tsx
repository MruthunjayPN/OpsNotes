export interface StepItem {
  title: string;
  body: string;
  code?: string;
}

export interface StepsBlockProps {
  items: StepItem[];
}

export function StepsBlock({ items }: StepsBlockProps) {
  return (
    <div className="my-5 space-y-3">
      {items.map((step, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-[11px] font-mono flex items-center justify-center mt-0.5">
            {i + 1}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-text">{step.title}</p>
            <p className="text-[13px] text-sub leading-relaxed mt-0.5">{step.body}</p>
            {step.code && (
              <code className="mt-1.5 block text-[12px] font-mono bg-codeBg border border-border rounded px-3 py-1.5 text-text">
                {step.code}
              </code>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
