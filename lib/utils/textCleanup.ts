export interface ToolbarSymbol {
  label: string;
  value: string;
}

/** Symbols shown in the admin RichTextEditor "Symbols" panel. */
export const SYMBOL_TOOLBAR: Record<"greek" | "arrows" | "chemistry", ToolbarSymbol[]> = {
  greek: [
    { label: "α", value: "α" },
    { label: "β", value: "β" },
    { label: "γ", value: "γ" },
    { label: "δ", value: "δ" },
    { label: "Δ", value: "Δ" },
    { label: "ε", value: "ε" },
    { label: "θ", value: "θ" },
    { label: "λ", value: "λ" },
    { label: "μ", value: "μ" },
    { label: "π", value: "π" },
    { label: "ρ", value: "ρ" },
    { label: "σ", value: "σ" },
    { label: "τ", value: "τ" },
    { label: "φ", value: "φ" },
    { label: "ω", value: "ω" },
    { label: "Ω", value: "Ω" },
  ],
  arrows: [
    { label: "→", value: "→" },
    { label: "←", value: "←" },
    { label: "↔", value: "↔" },
    { label: "⇌", value: "⇌" },
    { label: "⇒", value: "⇒" },
    { label: "↑", value: "↑" },
    { label: "↓", value: "↓" },
  ],
  chemistry: [
    { label: "H₂O", value: "\\(H_2O\\)" },
    { label: "CO₂", value: "\\(CO_2\\)" },
    { label: "x²", value: "\\(x^2\\)" },
    { label: "x₂", value: "\\(x_2\\)" },
    { label: "°", value: "°" },
    { label: "±", value: "±" },
    { label: "≈", value: "≈" },
    { label: "≤", value: "≤" },
    { label: "≥", value: "≥" },
    { label: "×", value: "×" },
    { label: "÷", value: "÷" },
    { label: "√", value: "\\(\\sqrt{x}\\)" },
  ],
};

/** Basic cleanup for text pasted from PDFs/Word. */
export function cleanupText(text: string): string {
  return (text || "")
    .replace(/\u00a0/g, " ")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}
