"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Loader2, 
  Code2, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  FileText, 
  Sparkles, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowRight
} from "lucide-react";
import { LatexText } from "@/components/(admin)/(testseries)/CreateQuiz/LatexText";

const sampleTemplateData = [
  {
    title: "NEET & JEE Diagnostic Science Mock",
    examType: "NEET",
    classLevel: "Class 12",
    duration: 60,
    difficulty: "moderate",
    overview: "Comprehensive diagnostic covering Chemistry, Physics, and Mathematics.",
    instructions: [
      "All questions carry 4 marks each.",
      "Zero negative marking for incorrect responses.",
      "LaTeX scientific notation is fully supported using \\(...\\) delimiters."
    ],
    questions: [
      {
        subject: "Chemistry",
        question_text: "Consider the thermal decomposition of calcium carbonate: \\(\\text{CaCO}_3(s) \\xrightarrow{\\Delta} \\text{CaO}(s) + \\text{CO}_2(g)\\uparrow\\). What is the equilibrium expression for \\(K_p\\)?",
        options: [
          "\\(K_p = P_{\\text{CO}_2}\\)",
          "\\(K_p = \\frac{P_{\\text{CaO}} \\cdot P_{\\text{CO}_2}}{P_{\\text{CaCO}_3}}\\)",
          "\\(K_p = \\frac{1}{P_{\\text{CO}_2}}\\)",
          "\\(K_p = [\\text{CO}_2]^2\\)"
        ],
        correct_answer: 0,
        explanation: "Pure solids (CaCO3 and CaO) have thermodynamic activity equal to 1, hence \\(K_p = P_{\\text{CO}_2}\\)."
      },
      {
        subject: "Physics",
        question_text: "A body of mass \\(m = 2\\text{ kg}\\) moves under a net force \\(\\vec{F} = (6t\\hat{i} + 4\\hat{j})\\text{ N}\\). Determine its acceleration vector \\(\\vec{a}\\) at time \\(t = 2\\text{ s}\\).",
        options: [
          "\\(\\vec{a} = (6\\hat{i} + 2\\hat{j})\\text{ m/s}^2\\)",
          "\\(\\vec{a} = (12\\hat{i} + 4\\hat{j})\\text{ m/s}^2\\)",
          "\\(\\vec{a} = (3\\hat{i} + 2\\hat{j})\\text{ m/s}^2\\)",
          "\\(\\vec{a} = (8\\hat{i} + 6\\hat{j})\\text{ m/s}^2\\)"
        ],
        correct_answer: 0,
        explanation: "By Newton's second law, \\(\\vec{a} = \\frac{\\vec{F}}{m} = (3t\\hat{i} + 2\\hat{j})\\text{ m/s}^2\\). Substituting \\(t = 2\\text{ s}\\) yields \\((6\\hat{i} + 2\\hat{j})\\text{ m/s}^2\\)."
      },
      {
        subject: "Mathematics",
        question_text: "Evaluate the definite integral: \\(\\int_{0}^{1} \\frac{x}{\\sqrt{1 - x^2}} dx\\).",
        options: [
          "\\(1\\)",
          "\\(\\frac{1}{2}\\)",
          "\\(\\sqrt{2}\\)",
          "\\(0\\)"
        ],
        correct_answer: 0,
        explanation: "Using substitution \\(u = 1 - x^2\\) with \\(du = -2x dx\\), the anti-derivative is \\(-\\sqrt{1 - x^2}\\). Evaluating between 0 and 1 yields \\(0 - (-1) = 1\\)."
      }
    ]
  }
];

export default function BulkUploadPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: string; message: string; details?: string }>({ type: "", message: "" });
  const [showGuide, setShowGuide] = useState(false);
  const [previewTab, setPreviewTab] = useState<"chemistry" | "physics" | "mathematics">("chemistry");

  // Live validation and parse inspection
  const parseAnalysis = useMemo(() => {
    if (!jsonInput.trim()) return null;
    try {
      const parsed = JSON.parse(jsonInput);
      const list = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.quizzes) ? parsed.quizzes : [parsed];
      let totalQuestions = 0;
      const subjectsSet = new Set<string>();

      list.forEach((q: any) => {
        if (Array.isArray(q?.questions)) {
          totalQuestions += q.questions.length;
          q.questions.forEach((qu: any) => {
            if (qu?.subject) subjectsSet.add(qu.subject);
          });
        }
      });

      return {
        isValid: true,
        quizzesCount: list.length,
        questionsCount: totalQuestions,
        subjects: Array.from(subjectsSet),
      };
    } catch (err: any) {
      return {
        isValid: false,
        error: err.message,
      };
    }
  }, [jsonInput]);

  const handleInsertSample = () => {
    setJsonInput(JSON.stringify(sampleTemplateData, null, 2));
    setStatus({ type: "info", message: "Sample template loaded into editor. Inspect below or execute upload." });
  };

  const handleDownloadTemplate = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(sampleTemplateData, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "sample-test-series-template.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFormatJson = () => {
    if (!jsonInput.trim()) return;
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
    } catch {
      alert("Cannot format: Invalid JSON formatting. Check for missing quotes or commas.");
    }
  };

  const handleBulkSubmit = async () => {
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      let parsedData;
      try {
        parsedData = JSON.parse(jsonInput);
      } catch {
        throw new Error("Invalid JSON formatting. Please check commas, braces, and double quotes.");
      }

      const res = await fetch("/api/admin/bulk-upload-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const serverData = await res.json();

      if (!res.ok) {
        throw new Error(serverData.error || serverData.details || "Server rejected data payload.");
      }

      setStatus({
        type: "success",
        message: serverData.message || `Successfully created ${serverData.count || 1} test(s)!`,
      });
      setJsonInput(""); // Clear on success
    } catch (error: any) {
      setStatus({ type: "error", message: error?.message || String(error) });
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestionForPreview = useMemo(() => {
    const qIndex = previewTab === "chemistry" ? 0 : previewTab === "physics" ? 1 : 2;
    return sampleTemplateData[0].questions[qIndex];
  }, [previewTab]);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)] p-4 sm:p-6 md:p-8 flex flex-col items-center antialiased">
      <div className="w-full max-w-5xl space-y-6">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--green-800)] mb-1">
              <span>Admin Tools</span>
              <span>•</span>
              <span>Batch Ingestion</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--ink)] tracking-tight flex items-center gap-2.5">
              <Code2 className="text-[var(--green-800)] w-7 h-7" /> Bulk Test Series Uploader
            </h1>
            <p className="text-sm text-[var(--ink-soft)] mt-1">
              Upload multiple complete test series at once using structured JSON. Scientific LaTeX formulas in questions and options are supported.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--surface-soft)] transition-colors shadow-2xs"
              title="Download sample template file (.json)"
            >
              <Download size={15} />
              <span>Download JSON Template</span>
            </button>

            <button
              type="button"
              onClick={() => setShowGuide(!showGuide)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0c3d3d] text-white hover:bg-[#0d4f4f] transition-colors shadow-2xs"
            >
              <HelpCircle size={15} />
              <span>{showGuide ? "Hide Guide" : "Format Guide"}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Status Notifications */}
        {status.message && (
          <div className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-semibold transition-all ${
            status.type === "success" 
              ? "bg-[var(--green-300)] border-[var(--green-600)] text-[var(--green-900)]" 
              : status.type === "info"
              ? "bg-[var(--surface-soft)] border-[var(--green-700)] text-[var(--green-900)]"
              : "bg-red-50 border-red-300 text-red-800"
          }`}>
            {status.type === "success" ? <CheckCircle2 size={20} className="text-[var(--green-800)] shrink-0" /> : <AlertTriangle size={20} className="shrink-0" />}
            <span className="flex-1">{status.message}</span>
            {status.type === "success" && (
              <Link 
                href="/admin/edittestSeries"
                className="text-xs font-bold underline hover:opacity-80 ml-auto shrink-0"
              >
                View in Editor →
              </Link>
            )}
          </div>
        )}

        {/* Collapsible Format Guide & Sample Preview */}
        {showGuide && (
          <div className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)] shadow-xs p-5 sm:p-7 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <div>
                <h3 className="font-extrabold text-base text-[var(--ink)] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--green-700)]" />
                  JSON Structure & Science Notation Guide
                </h3>
                <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                  See how Chemistry, Physics, and Mathematics questions are structured with KaTeX notation.
                </p>
              </div>

              {/* Tabs for Preview */}
              <div className="flex items-center bg-[var(--surface-soft)] p-1 rounded-xl border border-[var(--line)] text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setPreviewTab("chemistry")}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    previewTab === "chemistry" ? "bg-[#0c3d3d] text-white shadow-2xs" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  1. Chemistry
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab("physics")}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    previewTab === "physics" ? "bg-[#0c3d3d] text-white shadow-2xs" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  2. Physics
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab("mathematics")}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    previewTab === "mathematics" ? "bg-[#0c3d3d] text-white shadow-2xs" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  3. Mathematics
                </button>
              </div>
            </div>

            {/* Live KaTeX Render Preview of the chosen sample question */}
            <div className="bg-[var(--surface-soft)] p-4 rounded-xl border border-[var(--line)] space-y-2">
              <span className="text-[11px] font-bold text-[var(--green-800)] uppercase tracking-wider block">
                How this will render to students ({sampleQuestionForPreview.subject}):
              </span>
              <div className="p-3 bg-[var(--surface)] rounded-lg border border-[var(--line)] font-medium text-sm text-[var(--ink)]">
                <LatexText text={sampleQuestionForPreview.question_text} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {sampleQuestionForPreview.options.map((opt, i) => (
                  <div key={i} className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--line)] text-xs flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[var(--surface-soft)] font-bold flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="truncate">
                      <LatexText text={opt} />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Field Requirements Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)]">
                <strong className="text-[var(--ink)] block font-bold mb-1">`subject`</strong>
                <span className="text-[var(--ink-soft)]">e.g. &quot;Chemistry&quot;, &quot;Physics&quot;, &quot;Mathematics&quot;.</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)]">
                <strong className="text-[var(--ink)] block font-bold mb-1">`question_text`</strong>
                <span className="text-[var(--ink-soft)]">Text prompt. Wrap formulas in `\\(...\\)`.</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)]">
                <strong className="text-[var(--ink)] block font-bold mb-1">`options`</strong>
                <span className="text-[var(--ink-soft)]">Array of exactly 4 strings for A, B, C, D.</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)]">
                <strong className="text-[var(--ink)] block font-bold mb-1">`correct_answer`</strong>
                <span className="text-[var(--ink-soft)]">Zero-based index: 0 for A, 1 for B, 2 for C, 3 for D.</span>
              </div>
            </div>
          </div>
        )}

        {/* JSON Editor Box */}
        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[var(--ink)]">JSON Input Editor</span>
              {parseAnalysis && (
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                  parseAnalysis.isValid
                    ? "bg-[var(--green-300)] text-[var(--green-900)] border-[var(--green-600)]"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}>
                  {parseAnalysis.isValid ? "✓ Valid JSON Syntax" : "✕ Syntax Error"}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleFormatJson}
                disabled={!jsonInput.trim()}
                className="text-xs font-bold text-[var(--ink-soft)] hover:text-[var(--ink)] bg-[var(--surface-soft)] px-2.5 py-1 rounded-lg border border-[var(--line)] transition-colors disabled:opacity-40"
              >
                Prettify JSON
              </button>

              <button
                type="button"
                onClick={handleInsertSample}
                className="text-xs font-bold text-[var(--green-900)] hover:text-[#0c3d3d] bg-[var(--green-300)]/70 px-3 py-1 rounded-lg border border-[var(--green-600)] transition-colors"
              >
                Insert 3-Question Sample (Chem, Phys, Math)
              </button>
            </div>
          </div>

          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={`Paste your JSON test series array here or click "Insert 3-Question Sample" above...`}
            className="w-full h-96 bg-[var(--surface-soft)]/50 text-xs sm:text-sm font-mono text-[var(--ink)] p-4 rounded-xl border border-[var(--line)] focus:outline-none focus:ring-2 focus:ring-[#0c3d3d]/20 focus:border-[#0c3d3d] resize-y leading-relaxed placeholder:text-gray-400"
            disabled={loading}
          />

          {/* Real-time Payload Analysis Footer */}
          {parseAnalysis && parseAnalysis.isValid && (
            <div className="flex flex-wrap items-center justify-between text-xs text-[var(--ink-soft)] bg-[var(--surface-soft)] p-2.5 rounded-lg border border-[var(--line)]">
              <div className="flex items-center gap-3">
                <span>Quizzes: <strong className="text-[var(--ink)]">{parseAnalysis.quizzesCount}</strong></span>
                <span>•</span>
                <span>Total Questions: <strong className="text-[var(--ink)]">{parseAnalysis.questionsCount}</strong></span>
                <span>•</span>
                <span>Subjects: <strong className="text-[var(--ink)]">{parseAnalysis.subjects?.join(", ") || "General"}</strong></span>
              </div>
              <span className="text-[var(--green-800)] font-bold">Ready for Database Upload</span>
            </div>
          )}

          {parseAnalysis && !parseAnalysis.isValid && (
            <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
              <strong>Syntax Warning:</strong> {parseAnalysis.error}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/admin/edittestSeries"
            className="text-xs font-bold text-[var(--ink-soft)] hover:text-[var(--ink)] flex items-center gap-1"
          >
            ← Open Quiz Editor
          </Link>

          <button
            type="button"
            onClick={handleBulkSubmit}
            disabled={loading || !jsonInput.trim() || (parseAnalysis !== null && !parseAnalysis.isValid)}
            className="flex items-center gap-2 bg-[#0c3d3d] hover:bg-[#0d4f4f] disabled:opacity-40 text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-md active:scale-95 text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Uploading Tests to Database...</span>
              </>
            ) : (
              <>
                <span>Publish Tests to Database</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>

      </div>
    </main>
  );
}
