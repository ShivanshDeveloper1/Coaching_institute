import katex from "katex";

const MATH_REGEX = /(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\$[^$\n]+?\$)/g;

/** Split a string into plain-text and LaTeX parts. */
export function splitLatexAndText(text: string): string[] {
  if (!text) return [];
  return text.split(MATH_REGEX).filter((part) => part !== undefined && part !== "");
}

/** If `part` is a LaTeX block, return the inner math and display mode; otherwise math is null. */
export function isLatexBlock(part: string): { math: string | null; displayMode: boolean } {
  if (part.startsWith("$$") && part.endsWith("$$") && part.length >= 4) {
    return { math: part.slice(2, -2), displayMode: true };
  }
  if (part.startsWith("\\[") && part.endsWith("\\]")) {
    return { math: part.slice(2, -2), displayMode: true };
  }
  if (part.startsWith("\\(") && part.endsWith("\\)")) {
    return { math: part.slice(2, -2), displayMode: false };
  }
  if (part.startsWith("$") && part.endsWith("$") && part.length >= 2) {
    return { math: part.slice(1, -1), displayMode: false };
  }
  return { math: null, displayMode: false };
}

/** Render LaTeX to an HTML string (never throws). */
export function renderLatex(math: string, displayMode = false): string {
  try {
    return katex.renderToString(math, { throwOnError: false, displayMode, strict: false });
  } catch {
    return math;
  }
}
