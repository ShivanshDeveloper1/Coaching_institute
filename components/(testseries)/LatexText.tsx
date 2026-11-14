"use client";

import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface LatexTextProps {
  text?: string | null;
  className?: string;
}

export default function LatexText({ text, className }: LatexTextProps) {
  if (!text) return null;

  const MATH_REGEX = /(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\$[^$\n]+?\$)/g;
  const parts = text.split(MATH_REGEX).filter((part) => part !== undefined && part !== "");

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        let math: string | null = null;
        let displayMode = false;

        if (part.startsWith("$$") && part.endsWith("$$") && part.length >= 4) {
          math = part.slice(2, -2);
          displayMode = true;
        } else if (part.startsWith("\\[") && part.endsWith("\\]")) {
          math = part.slice(2, -2);
          displayMode = true;
        } else if (part.startsWith("\\(") && part.endsWith("\\)")) {
          math = part.slice(2, -2);
        } else if (part.startsWith("$") && part.endsWith("$") && part.length >= 2) {
          math = part.slice(1, -1);
        }

        if (math !== null) {
          let html = "";
          try {
            html = katex.renderToString(math, {
              throwOnError: false,
              displayMode,
              strict: false,
            });
          } catch {
            return (
              <span key={idx} className="text-red-500 font-mono text-xs">
                {part}
              </span>
            );
          }
          return displayMode ? (
            <span
              key={idx}
              className="block my-2 overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <span key={idx} dangerouslySetInnerHTML={{ __html: html }} />
          );
        }

        return (
          <span key={idx} style={{ whiteSpace: "pre-wrap" }}>
            {part}
          </span>
        );
      })}
    </span>
  );
}

export { LatexText };
