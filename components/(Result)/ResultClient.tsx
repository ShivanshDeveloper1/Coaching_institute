"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  TrendingUp, 
  RotateCcw, 
  ArrowLeft,
  BookOpen,
  AlertCircle
} from "lucide-react";
import LatexText from "@/components/(testseries)/LatexText";

interface QuestionReviewItem {
  questionId: string;
  questionIndex: number;
  questionText: string;
  imageUrl?: string | null;
  options: string[];
  selectedAnswer: number | string | null;
  correctAnswer: number | string;
  isCorrect: boolean;
  isAttempted?: boolean;
  explanation?: string;
  subject?: string;
}

interface TestResultData {
  attemptId?: string;
  quizId: string;
  quizTitle?: string;
  score: number;
  maxScore: number;
  percentage: number;
  accuracy: number;
  summary: {
    totalQuestions: number;
    attempted: number;
    correct: number;
    incorrect: number;
    unattempted: number;
  };
  timeTakenSeconds?: number;
  questionReview?: QuestionReviewItem[];
  userAnswers?: Record<string | number, any>;
}

export default function ResultClient({ testId }: { testId: string }) {
  const router = useRouter();
  const [result, setResult] = useState<TestResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "correct" | "incorrect" | "unattempted">("all");

  useEffect(() => {
    async function loadResult() {
      if (typeof window === "undefined") return;

      // 1. Check if specific attemptId is in URL query parameters
      const urlParams = new URLSearchParams(window.location.search);
      const attemptId = urlParams.get("attemptId");

      if (attemptId && attemptId.startsWith("attempt_")) {
        try {
          const res = await fetch(`/api/user/attempts?attemptId=${encodeURIComponent(attemptId)}`);
          if (res.ok) {
            const data = await res.json();
            if (data?.attempt) {
              setResult(data.attempt);
              setLoading(false);
              return;
            }
          }
        } catch (err) {
          console.warn("Failed to fetch attempt from database, checking sessionStorage:", err);
        }
      }

      // 2. Check sessionStorage fallback
      const stored = sessionStorage.getItem(`testResult-${testId}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setResult(parsed);
        } catch (e) {
          console.error("Error parsing test result from sessionStorage:", e);
        }
      }
      setLoading(false);
    }

    loadResult();
  }, [testId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-slate-600 font-semibold text-sm">Loading Performance Report...</p>
        </div>
      </div>
    );
  }

  // Fallback if user navigated directly without attempting the test
  if (!result) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-600">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">No Test Session Found</h2>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            We couldn't find a recorded attempt for this test in your current session. Please start the test to view your scorecard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/test-series/${testId}`}
              className="px-6 py-2.5 bg-[#0c3d3d] hover:bg-[#0d4f4f] text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
            >
              Go to Test Details
            </Link>
            <Link
              href="/test-series"
              className="px-6 py-2.5 bg-[var(--surface-soft)] hover:bg-[var(--bg-strong)] text-[var(--ink)] font-bold rounded-xl text-sm border border-[var(--line)] transition-colors"
            >
              Browse Test Series
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { score, maxScore, percentage, accuracy, summary, questionReview = [], quizTitle, timeTakenSeconds } = result;

  const formatTime = (secs?: number) => {
    if (!secs || secs <= 0) return "< 1 min";
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return mins > 0 ? `${mins}m ${remainder}s` : `${remainder}s`;
  };

  const filteredQuestions = questionReview.filter((q) => {
    if (activeTab === "correct") return q.isCorrect;
    if (activeTab === "incorrect") return !q.isCorrect && q.selectedAnswer !== null && q.selectedAnswer !== undefined;
    if (activeTab === "unattempted") return q.selectedAnswer === null || q.selectedAnswer === undefined;
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[var(--surface)] p-6 rounded-[var(--radius)] border border-[var(--line)] shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--green-300)] text-[var(--green-900)] rounded-md text-xs font-bold uppercase tracking-wider mb-2 border border-[var(--line)]">
              <CheckCircle2 size={13} className="text-[var(--green-800)]" /> Test Completed
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--ink)] tracking-tight">
              {quizTitle || "Test Performance Report"}
            </h1>
            <p className="text-[var(--ink-soft)] text-xs sm:text-sm mt-1">
              Detailed assessment, score analysis, and question explanations.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              href={`/test-series/${testId}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] hover:bg-[var(--bg-strong)] text-[var(--ink)] font-bold text-xs sm:text-sm transition-all shadow-xs"
            >
              <RotateCcw size={15} /> Retake Test
            </Link>
            <Link
              href="/test-series"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0c3d3d] hover:bg-[#0d4f4f] text-white font-bold text-xs sm:text-sm transition-all shadow-sm"
            >
              <ArrowLeft size={15} /> All Tests
            </Link>
          </div>
        </div>

        {/* Score Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--line)] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">Score</span>
              <Award className="text-[var(--green-700)]" size={18} />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-[var(--ink)]">
              {score} <span className="text-sm font-semibold text-[var(--ink-soft)]">/ {maxScore}</span>
            </p>
            <span className="text-[11px] font-bold text-[var(--green-900)] bg-[var(--green-300)] px-2 py-0.5 rounded-md inline-block mt-2">
              {percentage}% Marks
            </span>
          </div>

          <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--line)] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">Accuracy</span>
              <TrendingUp className="text-[var(--green-700)]" size={18} />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-[var(--green-800)]">
              {accuracy}%
            </p>
            <span className="text-[11px] font-bold text-[var(--green-800)] bg-[var(--surface-soft)] border border-[var(--line)] px-2 py-0.5 rounded-md inline-block mt-2">
              {summary.correct} of {summary.attempted} Attempted
            </span>
          </div>

          <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--line)] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">Attempted</span>
              <BookOpen className="text-[var(--green-700)]" size={18} />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-[var(--ink)]">
              {summary.attempted} <span className="text-sm font-semibold text-[var(--ink-soft)]">/ {summary.totalQuestions}</span>
            </p>
            <span className="text-[11px] font-bold text-[var(--ink-soft)] bg-[var(--surface-soft)] border border-[var(--line)] px-2 py-0.5 rounded-md inline-block mt-2">
              {summary.unattempted} Unattempted
            </span>
          </div>

          <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--line)] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">Time Taken</span>
              <Clock className="text-[var(--green-700)]" size={18} />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-[var(--ink)]">
              {formatTime(timeTakenSeconds)}
            </p>
            <span className="text-[11px] font-bold text-[var(--green-800)] bg-[var(--surface-soft)] border border-[var(--line)] px-2 py-0.5 rounded-md inline-block mt-2">
              Completed
            </span>
          </div>
        </div>

        {/* Detailed Solutions & Question Review */}
        <div className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)] shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--line)]">
            <div>
              <h2 className="text-xl font-bold text-[var(--ink)]">Question Solutions & Explanations</h2>
              <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-0.5">
                Review each question with correct answers and step-by-step solutions.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-[var(--surface-soft)] border border-[var(--line)] p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "all" ? "bg-[#0c3d3d] text-white shadow-xs" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                All ({questionReview.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("correct")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "correct" ? "bg-[#0c3d3d] text-white shadow-xs" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                Correct ({summary.correct})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("incorrect")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "incorrect" ? "bg-[#0c3d3d] text-white shadow-xs" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                Incorrect ({summary.incorrect})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("unattempted")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "unattempted" ? "bg-[#0c3d3d] text-white shadow-xs" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                Skipped ({summary.unattempted})
              </button>
            </div>
          </div>

          {/* Question List */}
          <div className="divide-y divide-slate-100 mt-6 space-y-6">
            {filteredQuestions.map((q, idx) => {
              const isUnattempted = q.selectedAnswer === null || q.selectedAnswer === undefined;
              const isCorrect = q.isCorrect;

              return (
                <div key={q.questionId || idx} className="pt-6 first:pt-0">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[var(--green-900)] bg-[var(--green-300)] border border-[var(--line)] px-2.5 py-1 rounded-md">
                        Question {q.questionIndex + 1}
                      </span>
                      {q.subject && (
                        <span className="text-[11px] font-bold text-[var(--ink-soft)] bg-[var(--surface-soft)] border border-[var(--line)] px-2.5 py-1 rounded-md">
                          {q.subject}
                        </span>
                      )}
                    </div>

                    <div>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--green-900)] bg-[var(--green-300)] border border-[var(--line)] px-2.5 py-1 rounded-full">
                          <CheckCircle2 size={13} className="text-[var(--green-800)]" /> Correct (+4)
                        </span>
                      ) : isUnattempted ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--ink-soft)] bg-[var(--surface-soft)] border border-[var(--line)] px-2.5 py-1 rounded-full">
                          Unattempted (0)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full">
                          <XCircle size={13} /> Incorrect (0)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Text with KaTeX */}
                  <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] mb-4 leading-relaxed">
                    <LatexText text={q.questionText} />
                  </h3>

                  {q.imageUrl && (
                    <div className="mb-4">
                      <img
                        src={q.imageUrl}
                        alt={`Question ${q.questionIndex + 1} illustration`}
                        className="max-h-56 rounded-xl border border-[var(--line)] object-contain"
                      />
                    </div>
                  )}

                  {/* Options List */}
                  <div className="grid grid-cols-1 gap-2.5 mb-4">
                    {q.options.map((opt: string, optIdx: number) => {
                      const isStudentChoice =
                        q.selectedAnswer === optIdx ||
                        String(q.selectedAnswer) === String(optIdx) ||
                        String(q.selectedAnswer) === String.fromCharCode(65 + optIdx);
                      const isCorrectChoice =
                        q.correctAnswer === optIdx ||
                        String(q.correctAnswer) === String(optIdx) ||
                        String(q.correctAnswer) === String.fromCharCode(65 + optIdx);

                      let borderClass = "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]";
                      let badgeClass = "bg-[var(--surface-soft)] text-[var(--ink-soft)] border-[var(--line)]";

                      if (isCorrectChoice) {
                        borderClass = "border-[var(--green-600)] bg-[var(--surface-soft)] text-[var(--green-900)] font-semibold";
                        badgeClass = "bg-[#0c3d3d] text-white border-[#0c3d3d]";
                      } else if (isStudentChoice && !isCorrectChoice) {
                        borderClass = "border-rose-400 bg-rose-50/60 text-rose-950 font-semibold";
                        badgeClass = "bg-rose-500 text-white border-rose-500";
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`flex items-center p-3 rounded-xl border-2 text-sm transition-all ${borderClass}`}
                        >
                          <span
                            className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center font-bold mr-3 border text-xs ${badgeClass}`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1">
                            <LatexText text={opt} />
                          </span>
                          {isCorrectChoice && (
                            <span className="text-xs font-bold text-[var(--green-800)] ml-2">Correct Answer</span>
                          )}
                          {isStudentChoice && !isCorrectChoice && (
                            <span className="text-xs font-bold text-rose-600 ml-2">Your Answer</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Solution / Explanation Box */}
                  {q.explanation && (
                    <div className="bg-[var(--surface-soft)] rounded-xl p-4 border border-[var(--line)] text-xs sm:text-sm mt-3">
                      <span className="font-extrabold text-[var(--green-800)] uppercase tracking-wider block mb-1 text-[11px]">
                        Solution & Explanation:
                      </span>
                      <p className="text-[var(--ink)] leading-relaxed">
                        <LatexText text={q.explanation} />
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
