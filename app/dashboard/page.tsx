"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/AuthContext";
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  AlertCircle, 
  RotateCcw,
  Sparkles,
  Target,
  BarChart3
} from "lucide-react";

interface AttemptItem {
  id: string;
  attemptId: string;
  quizId: string;
  quizTitle: string;
  examType?: string;
  score: number;
  maxScore: number;
  percentage: number;
  accuracy: number;
  timeTakenSeconds: number;
  submittedAt: string;
  summary?: {
    totalQuestions: number;
    attempted: number;
    correct: number;
    incorrect: number;
    unattempted: number;
  };
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [attempts, setAttempts] = useState<AttemptItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAttempts() {
      if (!isLoaded) return;
      
      const targetUserId = user?.uid || "student-demo-user";
      try {
        const res = await fetch(`/api/user/attempts?userId=${encodeURIComponent(targetUserId)}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.attempts)) {
            setAttempts(data.attempts);
          }
        }
      } catch (err) {
        console.error("Failed to load user attempts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAttempts();
  }, [user, isLoaded]);

  // Compute stats from real attempts
  const totalAttempts = attempts.length;
  const avgScore = totalAttempts > 0 
    ? Math.round(attempts.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / totalAttempts) 
    : 0;
  const avgAccuracy = totalAttempts > 0 
    ? Math.round(attempts.reduce((acc, curr) => acc + (curr.accuracy || 0), 0) / totalAttempts) 
    : 0;
  const highestScore = totalAttempts > 0
    ? Math.max(...attempts.map(a => a.score || 0))
    : 0;

  const firstName = user?.displayName ? user.displayName.split(" ")[0] : "Student";

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div className="container section-space dashboard-shell">
      {/* Header */}
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">Welcome back, {firstName}</p>
          <h1>Student dashboard</h1>
        </div>
        <Link href="/test-series" className="btn btn-primary">
          Explore Test Series
        </Link>
      </section>

      {/* Real Performance Stats Row */}
      <section className="stats-row">
        <div className="stat-card">
          <span>{totalAttempts}</span>
          <small>Tests Attempted</small>
        </div>
        <div className="stat-card">
          <span>{avgScore}%</span>
          <small>Average Score</small>
        </div>
        <div className="stat-card">
          <span>{avgAccuracy}%</span>
          <small>Average Accuracy</small>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="dashboard-grid">
        <div className="panel col-span-full">
          <div className="panel-header">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <h3>My Test Series Performance</h3>
            </div>
            {totalAttempts > 0 && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {totalAttempts} Attempt{totalAttempts !== 1 ? "s" : ""} Recorded
              </span>
            )}
          </div>

          {loading ? (
            <div className="py-16 text-center text-slate-500">
              <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm font-medium">Loading your test history...</p>
            </div>
          ) : totalAttempts === 0 ? (
            /* New User Encouraging Empty State */
            <div className="p-8 sm:p-12 text-center rounded-2xl bg-gradient-to-b from-slate-50/80 to-white border border-slate-200/80 my-2">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center mx-auto mb-5 shadow-sm">
                <Target className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                Start Your Test Series Journey
              </h4>
              <p className="text-base text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
                Start attempting tests to track your progress and get your performance report.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8 text-left">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-1">
                    <Clock size={16} /> Real CBT Engine
                  </div>
                  <p className="text-xs text-slate-500">Timed exam environment matching official NEET & JEE test patterns.</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-1">
                    <CheckCircle2 size={16} /> Fair Marking
                  </div>
                  <p className="text-xs text-slate-500">+4 marks for correct answers with zero negative mark deductions.</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-1">
                    <BookOpen size={16} /> Instant Solutions
                  </div>
                  <p className="text-xs text-slate-500">Step-by-step NCERT formula explanations immediately after submission.</p>
                </div>
              </div>

              <Link
                href="/test-series"
                className="inline-flex items-center gap-2 btn btn-primary px-8 py-3.5 text-base shadow-md hover:shadow-lg transition"
              >
                <span>Browse Test Series</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            /* Returning User Results List */
            <div className="space-y-4 pt-2">
              {attempts.map((attempt, index) => {
                const isPassed = attempt.percentage >= 50;
                return (
                  <div
                    key={attempt.attemptId || attempt.id || index}
                    className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {attempt.examType && (
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                            {attempt.examType}
                          </span>
                        )}
                        <h4 className="text-base font-bold text-slate-900">
                          {attempt.quizTitle || "Mock Test"}
                        </h4>
                      </div>

                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-slate-400" />
                          {formatDate(attempt.submittedAt)}
                        </span>
                        <span>•</span>
                        <span>Time Spent: {formatTime(attempt.timeTakenSeconds || 0)}</span>
                        {attempt.summary && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-700 font-medium">
                              {attempt.summary.correct} Correct
                            </span>
                            <span>•</span>
                            <span className="text-red-600 font-medium">
                              {attempt.summary.incorrect} Incorrect
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Score and Action buttons */}
                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                      <div className="text-right">
                        <div className="text-lg font-black text-slate-900">
                          {attempt.score} <span className="text-xs font-semibold text-slate-400">/ {attempt.maxScore}</span>
                        </div>
                        <div className="text-xs font-bold text-emerald-600">
                          {attempt.accuracy}% Accuracy ({attempt.percentage}%)
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/test-series/${attempt.quizId}/result?attemptId=${encodeURIComponent(attempt.attemptId)}`}
                          className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition flex items-center gap-1.5 border border-emerald-200"
                        >
                          <BookOpen size={14} />
                          <span>Review</span>
                        </Link>
                        <Link
                          href={`/test-series/${attempt.quizId}`}
                          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                          title="Retake Test"
                        >
                          <RotateCcw size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
