export interface FlowStep {
  label: string;
  desc?: string;
}

export interface FlowBlockProps {
  steps: FlowStep[];
}

export function FlowBlock({ steps }: FlowBlockProps) {
  return (
    <div className="my-5 overflow-x-auto">
      <div className="flex items-start gap-0 min-w-max">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-0">
            <div className="flex flex-col items-center">
              <div className="px-3 py-2 bg-accentBg border border-accent/30 rounded text-[12px] font-medium text-accent whitespace-nowrap">
                {step.label}
              </div>
              {step.desc && (
                <p className="mt-1.5 text-[11px] text-muted text-center max-w-[90px] leading-tight">
                  {step.desc}
                </p>
              )}
            </div>
            {i < steps.length - 1 && (
              <span className="mt-2 mx-1.5 text-muted text-[14px] select-none">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
