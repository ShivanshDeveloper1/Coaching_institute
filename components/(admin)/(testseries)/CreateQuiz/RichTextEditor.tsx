// components/admin/CreateQuiz/RichTextEditor.tsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LatexText } from "./LatexText";
import { 
  Bold, Italic, Underline, 
  Superscript, Subscript, 
  ArrowRight, Calculator,
  FlaskConical, Compass, Dna,
  Sparkles, Type, ChevronDown, ChevronUp, Eye
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
  showPreview?: boolean;
  compact?: boolean;
  label?: string;
}

type EditorMode = "normal" | "formula";
type ScienceCategory = "chemistry" | "mathematics" | "physics" | "biology";

interface FormulaItem {
  label: string;
  latex: string;
  description?: string;
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder, 
  className = "", 
  rows = 3, 
  showPreview = true,
  compact = false,
  label
}: RichTextEditorProps) {
  const [mode, setMode] = useState<EditorMode>("normal");
  const [activeCategory, setActiveCategory] = useState<ScienceCategory>("chemistry");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Insert raw text at cursor
  const insertText = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? value.length;
    const end = textarea.selectionEnd ?? value.length;
    const newValue = value.substring(0, start) + text + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + text.length;
    }, 0);
  };

  // Insert formula wrapped in LaTeX delimiters
  const insertLatex = (latex: string) => {
    insertText(`\\(${latex}\\)`);
  };

  // Wrap selected text or insert markers
  const wrapText = (prefix: string, suffix: string = prefix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const selected = value.substring(start, end);
    const newValue = value.substring(0, start) + prefix + selected + suffix + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + prefix.length;
      textarea.selectionEnd = end + prefix.length;
    }, 0);
  };

  // Pre-configured Science Templates
  const scienceData: Record<ScienceCategory, { title: string; icon: any; items: { group: string; items: FormulaItem[] }[] }> = {
    chemistry: {
      title: "Chemistry & Equations",
      icon: FlaskConical,
      items: [
        {
          group: "Common Compounds",
          items: [
            { label: "H₂O", latex: "H_2O", description: "Water" },
            { label: "CO₂", latex: "CO_2", description: "Carbon dioxide" },
            { label: "H₂SO₄", latex: "H_2SO_4", description: "Sulfuric acid" },
            { label: "HCl", latex: "HCl", description: "Hydrochloric acid" },
            { label: "HNO₃", latex: "HNO_3", description: "Nitric acid" },
            { label: "NH₃", latex: "NH_3", description: "Ammonia" },
            { label: "CaCO₃", latex: "CaCO_3", description: "Calcium carbonate" },
            { label: "NaCl", latex: "NaCl", description: "Sodium chloride" },
            { label: "NaOH", latex: "NaOH", description: "Sodium hydroxide" },
            { label: "CH₄", latex: "CH_4", description: "Methane" },
          ]
        },
        {
          group: "Reaction Arrows & Conditions",
          items: [
            { label: "→", latex: "\\rightarrow", description: "Reaction arrow" },
            { label: "⇌", latex: "\\rightleftharpoons", description: "Reversible equilibrium" },
            { label: "←", latex: "\\leftarrow", description: "Reverse arrow" },
            { label: "↔", latex: "\\leftrightarrow", description: "Resonance" },
            { label: "↑ (gas)", latex: "\\uparrow", description: "Gas evolved" },
            { label: "↓ (ppt)", latex: "\\downarrow", description: "Precipitate formed" },
            { label: "—[Δ]→ (Heat)", latex: "\\xrightarrow{\\Delta}", description: "Heat condition" },
            { label: "—[cat]→ (Catalyst)", latex: "\\xrightarrow{\\text{cat}}", description: "Catalyst" },
            { label: "—[hν]→ (Light)", latex: "\\xrightarrow{h\\nu}", description: "Photochemical" },
            { label: "—[H⁺]→ (Acid)", latex: "\\xrightarrow{H^+}", description: "Acidic medium" },
            { label: "—[OH⁻]→ (Base)", latex: "\\xrightarrow{OH^-}", description: "Basic medium" },
          ]
        },
        {
          group: "Full Reaction Templates",
          items: [
            { label: "2H₂ + O₂ → 2H₂O", latex: "2H_2 + O_2 \\xrightarrow{\\Delta} 2H_2O", description: "Water synthesis" },
            { label: "N₂ + 3H₂ ⇌ 2NH₃", latex: "N_2 + 3H_2 \\rightleftharpoons 2NH_3", description: "Haber process" },
            { label: "CaCO₃ → CaO + CO₂", latex: "CaCO_3 \\xrightarrow{\\Delta} CaO + CO_2\\uparrow", description: "Thermal decomposition" },
          ]
        },
        {
          group: "Ions & Bonds",
          items: [
            { label: "Fe³⁺", latex: "Fe^{3+}" },
            { label: "Cu²⁺", latex: "Cu^{2+}" },
            { label: "Na⁺", latex: "Na^+" },
            { label: "SO₄²⁻", latex: "SO_4^{2-}" },
            { label: "OH⁻", latex: "OH^-" },
            { label: "Cl⁻", latex: "Cl^-" },
            { label: "Single Bond (-)", latex: "-" },
            { label: "Double Bond (=)", latex: "=" },
            { label: "Triple Bond (≡)", latex: "\\equiv" },
          ]
        }
      ]
    },
    mathematics: {
      title: "Mathematics & Calculus",
      icon: Calculator,
      items: [
        {
          group: "Fractions, Roots & Powers",
          items: [
            { label: "a/b (Fraction)", latex: "\\frac{a}{b}" },
            { label: "√x (Square root)", latex: "\\sqrt{x}" },
            { label: "ⁿ√x (Nth root)", latex: "\\sqrt[n]{x}" },
            { label: "x² (Square)", latex: "x^2" },
            { label: "xⁿ (Power)", latex: "x^n" },
            { label: "10⁻³ (Negative power)", latex: "10^{-3}" },
            { label: "x₁ (Subscript)", latex: "x_1" },
            { label: "xₙ (Nth subscript)", latex: "x_n" },
          ]
        },
        {
          group: "Calculus & Limits",
          items: [
            { label: "∫ f(x) dx", latex: "\\int f(x) dx" },
            { label: "∫ₐᵇ f(x) dx", latex: "\\int_{a}^{b} f(x) dx" },
            { label: "∑ xᵢ", latex: "\\sum_{i=1}^{n} x_i" },
            { label: "lim (x→0)", latex: "\\lim_{x \\to 0}" },
            { label: "dy/dx", latex: "\\frac{dy}{dx}" },
            { label: "d²y/dx²", latex: "\\frac{d^2y}{dx^2}" },
            { label: "∞ (Infinity)", latex: "\\infty" },
          ]
        },
        {
          group: "Operators & Relations",
          items: [
            { label: "±", latex: "\\pm" },
            { label: "×", latex: "\\times" },
            { label: "÷", latex: "\\div" },
            { label: "≤", latex: "\\le" },
            { label: "≥", latex: "\\ge" },
            { label: "≠", latex: "\\neq" },
            { label: "≈", latex: "\\approx" },
            { label: "∝", latex: "\\propto" },
            { label: "∈", latex: "\\in" },
          ]
        },
        {
          group: "Greek Symbols",
          items: [
            { label: "α (alpha)", latex: "\\alpha" },
            { label: "β (beta)", latex: "\\beta" },
            { label: "γ (gamma)", latex: "\\gamma" },
            { label: "δ (delta)", latex: "\\delta" },
            { label: "Δ (Delta)", latex: "\\Delta" },
            { label: "θ (theta)", latex: "\\theta" },
            { label: "λ (lambda)", latex: "\\lambda" },
            { label: "μ (mu)", latex: "\\mu" },
            { label: "π (pi)", latex: "\\pi" },
            { label: "σ (sigma)", latex: "\\sigma" },
            { label: "ω (omega)", latex: "\\omega" },
            { label: "Ω (Omega)", latex: "\\Omega" },
          ]
        }
      ]
    },
    physics: {
      title: "Physics & Mechanics",
      icon: Compass,
      items: [
        {
          group: "Vectors & Kinematics",
          items: [
            { label: "v⃗ (Velocity)", latex: "\\vec{v}" },
            { label: "F⃗ (Force)", latex: "\\vec{F}" },
            { label: "a⃗ (Acceleration)", latex: "\\vec{a}" },
            { label: "p⃗ (Momentum)", latex: "\\vec{p}" },
            { label: "E⃗ (Electric field)", latex: "\\vec{E}" },
            { label: "B⃗ (Magnetic field)", latex: "\\vec{B}" },
            { label: "î", latex: "\\hat{i}" },
            { label: "ĵ", latex: "\\hat{j}" },
            { label: "k̂", latex: "\\hat{k}" },
          ]
        },
        {
          group: "Physical Units",
          items: [
            { label: "m/s", latex: "\\text{m/s}" },
            { label: "m/s²", latex: "\\text{m/s}^2" },
            { label: "kg·m/s²", latex: "\\text{kg}\\cdot\\text{m/s}^2" },
            { label: "N (Newton)", latex: "\\text{N}" },
            { label: "J (Joule)", latex: "\\text{J}" },
            { label: "W (Watt)", latex: "\\text{W}" },
            { label: "Ω (Ohm)", latex: "\\Omega" },
            { label: "μC (Micro-Coulomb)", latex: "\\mu\\text{C}" },
            { label: "Hz (Hertz)", latex: "\\text{Hz}" },
            { label: "Pa (Pascal)", latex: "\\text{Pa}" },
            { label: "T (Tesla)", latex: "\\text{T}" },
          ]
        },
        {
          group: "Formulas & Constants",
          items: [
            { label: "F⃗ = ma⃗", latex: "\\vec{F} = m\\vec{a}" },
            { label: "E = mc²", latex: "E = mc^2" },
            { label: "Δt", latex: "\\Delta t" },
            { label: "h (Planck)", latex: "h" },
            { label: "c (Light)", latex: "c" },
            { label: "G (Gravitation)", latex: "G" },
            { label: "ε₀ (Permittivity)", latex: "\\epsilon_0" },
            { label: "μ₀ (Permeability)", latex: "\\mu_0" },
          ]
        }
      ]
    },
    biology: {
      title: "Biology & Genetics",
      icon: Dna,
      items: [
        {
          group: "Genetics & Crosses",
          items: [
            { label: "F₁ generation", latex: "F_1\\text{ generation}" },
            { label: "F₂ generation", latex: "F_2\\text{ generation}" },
            { label: "Aa × aa", latex: "\\text{Aa} \\times \\text{aa}" },
            { label: "AA : Aa : aa", latex: "\\text{AA} : \\text{Aa} : \\text{aa}" },
            { label: "Iᴬ (Blood allele)", latex: "I^A" },
            { label: "Iᴮ (Blood allele)", latex: "I^B" },
            { label: "i (Recessive allele)", latex: "i" },
          ]
        },
        {
          group: "Biological Notations & Units",
          items: [
            { label: "♂ (Male)", latex: "\\male" },
            { label: "♀ (Female)", latex: "\\female" },
            { label: "μm (Micrometer)", latex: "\\mu\\text{m}" },
            { label: "°C (Celsius)", latex: "^\\circ\\text{C}" },
            { label: "Homo sapiens (Taxon)", latex: "\\textit{Homo sapiens}" },
            { label: "E. coli (Bacteria)", latex: "\\textit{Escherichia coli}" },
          ]
        }
      ]
    }
  };

  const hasFormulaContent = value.includes("\\(") || value.includes("\\[") || value.includes("$") || value.includes("_") || value.includes("^");

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">{label}</span>
          <span className="text-[10px] text-muted-foreground">
            {mode === "formula" ? "Formula Mode Active" : "Normal Text Mode"}
          </span>
        </div>
      )}

      {/* Main Mode Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-muted/30 rounded-xl border border-border/50">
        
        {/* Left Side: Mode Toggle Pills */}
        <div className="flex items-center bg-background/80 p-0.5 rounded-lg border border-border/60 shadow-xs">
          <button
            type="button"
            onClick={() => setMode("normal")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              mode === "normal"
                ? "bg-primary text-primary-foreground shadow-xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            Normal Text
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("formula");
              if (!compact) setDrawerOpen(true);
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              mode === "formula"
                ? "bg-[#0c3d3d] text-white shadow-xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#88d89d]" />
            Formula Mode
          </button>
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center gap-1">
          {mode === "normal" ? (
            /* Normal Text Formatting */
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => wrapText("**", "**")}
                title="Bold (**text**)"
              >
                <Bold className="w-3.5 h-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => wrapText("*", "*")}
                title="Italic (*text*)"
              >
                <Italic className="w-3.5 h-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => wrapText("__", "__")}
                title="Underline (__text__)"
              >
                <Underline className="w-3.5 h-3.5" />
              </Button>
            </div>
          ) : (
            /* Formula Mode Quick Chips & Drawer Toggle */
            <div className="flex items-center gap-1 flex-wrap">
              <button
                type="button"
                onClick={() => insertLatex("x^2")}
                className="px-2 py-1 text-xs font-mono font-bold bg-background hover:bg-muted border border-border/60 rounded-md text-foreground transition-colors"
                title="Superscript / Power (x²)"
              >
                x²
              </button>
              <button
                type="button"
                onClick={() => insertLatex("x_2")}
                className="px-2 py-1 text-xs font-mono font-bold bg-background hover:bg-muted border border-border/60 rounded-md text-foreground transition-colors"
                title="Subscript (x₂)"
              >
                x₂
              </button>
              <button
                type="button"
                onClick={() => insertLatex("\\frac{a}{b}")}
                className="px-2 py-1 text-xs font-mono font-bold bg-background hover:bg-muted border border-border/60 rounded-md text-foreground transition-colors"
                title="Fraction (a/b)"
              >
                a/b
              </button>
              <button
                type="button"
                onClick={() => insertLatex("\\sqrt{x}")}
                className="px-2 py-1 text-xs font-mono font-bold bg-background hover:bg-muted border border-border/60 rounded-md text-foreground transition-colors"
                title="Square root (√x)"
              >
                √x
              </button>
              <button
                type="button"
                onClick={() => insertLatex("\\rightarrow")}
                className="px-2 py-1 text-xs font-bold bg-background hover:bg-muted border border-border/60 rounded-md text-foreground transition-colors"
                title="Reaction arrow (→)"
              >
                →
              </button>
              <button
                type="button"
                onClick={() => insertLatex("\\rightleftharpoons")}
                className="px-2 py-1 text-xs font-bold bg-background hover:bg-muted border border-border/60 rounded-md text-foreground transition-colors"
                title="Reversible equilibrium (⇌)"
              >
                ⇌
              </button>

              <button
                type="button"
                onClick={() => setDrawerOpen(!drawerOpen)}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md border transition-all ${
                  drawerOpen 
                    ? "bg-[#0c3d3d] text-white border-[#0c3d3d]" 
                    : "bg-background hover:bg-muted border-border/60 text-foreground"
                }`}
              >
                <span>Templates</span>
                {drawerOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Expandable Science Formula Drawer */}
      <AnimatePresence>
        {mode === "formula" && drawerOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border border-[var(--line)] bg-[var(--surface-soft)] rounded-xl p-3 shadow-xs space-y-3"
          >
            {/* Category Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-[var(--line)] pb-2">
              {(["chemistry", "mathematics", "physics", "biology"] as ScienceCategory[]).map((cat) => {
                const IconComponent = scienceData[cat].icon;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                      isActive 
                        ? "bg-[#0c3d3d] text-white shadow-xs" 
                        : "bg-[var(--surface)] text-[var(--ink-soft)] hover:text-[var(--ink)] border border-[var(--line)]"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    {scienceData[cat].title.split(" ")[0]}
                  </button>
                );
              })}
            </div>

            {/* Template Items for Active Category */}
            <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
              {scienceData[activeCategory].items.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <span className="text-[11px] font-bold text-[var(--ink-soft)] uppercase tracking-wider block">
                    {group.group}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => insertLatex(item.latex)}
                        title={item.description || item.latex}
                        className="px-2 py-1 text-xs font-mono bg-[var(--surface)] hover:bg-[#d8f7d4] text-[var(--ink)] hover:text-[var(--green-900)] border border-[var(--line)] rounded-md transition-colors shadow-xs"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editor Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || (mode === "formula" ? "Type or click formula templates above..." : "Type text here...")}
          rows={rows}
          className={`w-full bg-background resize-y rounded-xl border border-border/70 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c3d3d]/20 focus:border-[#0c3d3d] transition-all font-sans leading-relaxed ${
            compact ? "min-h-[50px] py-2" : "min-h-[80px]"
          }`}
        />
      </div>

      {/* Live KaTeX Split Preview */}
      {showPreview && (hasFormulaContent || mode === "formula") && value.trim() && (
        <div className="p-3 bg-[var(--surface-soft)] rounded-xl border border-[var(--line)] space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[var(--green-800)] flex items-center gap-1 uppercase tracking-wide">
              <Eye className="w-3 h-3 text-[var(--green-700)]" />
              Live Science Formula Preview
            </span>
            <span className="text-[10px] text-[var(--ink-soft)] font-medium">
              Student CBT View
            </span>
          </div>
          <div className="p-2.5 bg-[var(--surface)] rounded-lg border border-[var(--line)] text-sm text-[var(--ink)] overflow-x-auto min-h-[36px] flex items-center">
            <LatexText text={value} />
          </div>
        </div>
      )}
    </div>
  );
}
