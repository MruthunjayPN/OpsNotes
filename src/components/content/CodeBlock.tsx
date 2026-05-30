"use client";

import { useRef, useState } from "react";

export function CodeBlock({
  children,
  ...props
}: React.ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const text = preRef.current?.textContent ?? "";
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="relative group my-5">
      <button
        onClick={handleCopy}
        className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded text-[11px] font-mono bg-hover border border-border text-muted hover:text-sub"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre
        ref={preRef}
        {...props}
        style={undefined}
        className="overflow-x-auto rounded bg-codeBg px-4 py-4 text-[12.5px] leading-relaxed font-mono border border-border"
      >
        {children}
      </pre>
    </div>
  );
}
