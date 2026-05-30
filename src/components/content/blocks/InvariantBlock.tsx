export interface InvariantBlockProps {
  title?: string;
  children: React.ReactNode;
}

export function InvariantBlock({ title, children }: InvariantBlockProps) {
  return (
    <div className="my-5 border-l-2 border-accent bg-accentBg rounded-r px-4 py-3">
      {title && (
        <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-1.5">
          {title}
        </p>
      )}
      <div className="text-[13px] text-text leading-relaxed [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}
