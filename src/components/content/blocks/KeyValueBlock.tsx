export interface KeyValueItem {
  key: string;
  value: string;
}

export interface KeyValueBlockProps {
  items: KeyValueItem[];
}

export function KeyValueBlock({ items }: KeyValueBlockProps) {
  return (
    <div className="my-5 rounded border border-border overflow-hidden">
      {items.map((item, i) => (
        <div
          key={i}
          className={`flex items-start px-4 py-2.5 gap-4 ${
            i % 2 === 0 ? "bg-codeBg" : "bg-bg"
          } ${i !== 0 ? "border-t border-border" : ""}`}
        >
          <span className="text-[12px] font-mono text-sub w-40 flex-shrink-0 pt-0.5">
            {item.key}
          </span>
          <span className="text-[13px] text-text">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
