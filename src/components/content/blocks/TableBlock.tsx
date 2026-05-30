export interface TableBlockProps {
  headers?: string[];
  columns?: string[];
  rows: string[][];
}

export function TableBlock({ headers, columns, rows }: TableBlockProps) {
  const headerCells = columns ?? headers ?? [];

  return (
    <div className="my-5 rounded border border-border overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-codeBg">
            {headerCells.map((h, i) => (
              <th
                key={i}
                className="px-4 py-2.5 text-left text-[11px] font-mono uppercase tracking-wider text-muted border-b border-border"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`${ri % 2 === 0 ? "bg-bg" : "bg-codeBg/40"} hover:bg-hover transition-colors`}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-4 py-2.5 text-[13px] text-text border-b border-border/50 ${
                    ci === 0 ? "font-medium" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
