"use client";

import React from "react";
import type { ReactNode } from "react";

export interface StepItem {
  title: string;
  body: string;
  code?: string;
}

export interface StepProps {
  title: string;
  children?: ReactNode;
  _index?: number;
}

export interface StepsBlockProps {
  items?: StepItem[];
  children?: ReactNode;
}

export function Step({ title, children, _index = 0 }: StepProps) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-[11px] font-mono flex items-center justify-center mt-0.5">
        {_index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-text">{title}</p>
        <div className="text-[13px] text-sub leading-relaxed mt-1 space-y-1.5 [&_strong]:text-text [&_strong]:font-semibold [&_code]:font-mono [&_code]:text-[12px] [&_code]:bg-codeBg [&_code]:px-1 [&_code]:rounded [&_code]:border [&_code]:border-border">
          {children}
        </div>
      </div>
    </div>
  );
}

export function StepsBlock({ items, children }: StepsBlockProps) {
  if (items) {
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

  let stepIndex = 0;
  const numberedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Step) {
      return React.cloneElement(child as React.ReactElement<StepProps>, {
        _index: stepIndex++,
      });
    }
    return null;
  });

  return <div className="my-5 space-y-3">{numberedChildren}</div>;
}
