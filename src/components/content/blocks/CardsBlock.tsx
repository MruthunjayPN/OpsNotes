export interface CardItem {
  title: string;
  body: string;
  tag?: string;
}

export interface CardsBlockProps {
  cols?: 2 | 3;
  items: CardItem[];
}

export function CardsBlock({ cols = 3, items }: CardsBlockProps) {
  const gridClass =
    cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`my-5 grid ${gridClass} gap-3`}>
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-cardBg border border-border rounded px-4 py-3"
        >
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <p className="text-[13px] font-semibold text-text">{item.title}</p>
            {item.tag && (
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted border border-border rounded px-1.5 py-0.5 flex-shrink-0">
                {item.tag}
              </span>
            )}
          </div>
          <p className="text-[13px] text-sub leading-relaxed">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
