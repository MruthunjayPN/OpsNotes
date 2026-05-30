import type { ReactNode } from "react";
import { codeToHtml } from "shiki";

export interface CodeSnippetBlockProps {
  title: string;
  language: string;
  file?: string;
  code?: string;
  children?: ReactNode;
}

export async function CodeSnippetBlock({
  title,
  language,
  file,
  code,
  children,
}: CodeSnippetBlockProps) {
  let highlighted: string | undefined;
  if (code) {
    highlighted = await codeToHtml(code.trim(), {
      lang: language,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: "light",
      transformers: [
        {
          pre(node) {
            node.properties.style =
              "font-size: 12.5px; line-height: 1.65; padding: 1rem; overflow-x: auto; margin: 0;";
          },
        },
      ],
    });
  }

  return (
    <div className="my-5 rounded border border-border overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-codeBg border-b border-border gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[13px] font-medium text-text truncate">
            {title}
          </span>
          {file && (
            <span className="text-[11px] font-mono text-muted truncate">
              {file}
            </span>
          )}
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted border border-border rounded px-1.5 py-0.5 flex-shrink-0 bg-bg">
          {language}
        </span>
      </div>
      {/* Code area — either shiki-highlighted string or MDX child pre block */}
      {highlighted ? (
        <div
          className="font-mono bg-codeBg"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      ) : (
        <div className="bg-codeBg [&>div]:!my-0 [&_pre]:!rounded-none [&_pre]:!border-0">
          {children}
        </div>
      )}
    </div>
  );
}
