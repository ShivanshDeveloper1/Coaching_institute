"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Award, 
  Clock, 
  Search, 
  ChevronDown, 
  ExternalLink, 
  CheckCircle2, 
  BookOpen, 
  Mail, 
  Filter, 
  RotateCcw,
  Sparkles
} from "lucide-react";
import { StudentSubmission } from "@/lib/actions/(admin)/Students";

interface StudentsViewProps {
  initialStudents: StudentSubmission[];
}

export function StudentsView({ initialStudents }: StudentsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "high" | "needs_attention" | "multiple">("all");
  const [sortBy, setSortBy] = useState<"recent" | "score" | "attempts">("recent");
  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>(() => {
    // Expand the first student by default for immediate preview
    if (initialStudents.length > 0) {
      return { [initialStudents[0].userId]: true };
    }
    return {};
  });

  const toggleExpand = (userId: string) => {
    setExpandedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    initialStudents.forEach((s) => {
      all[s.userId] = true;
    });
    setExpandedUsers(all);
  };

  const collapseAll = () => {
    setExpandedUsers({});
  };

  // High-level aggregate metrics
  const totalStudents = initialStudents.length;
  const totalSubmissions = useMemo(() => {
    return initialStudents.reduce((acc, s) => acc + s.quizzes.length, 0);
  }, [initialStudents]);

  const overallAverage = useMemo(() => {
    if (initialStudents.length === 0) return 0;
    const sum = initialStudents.reduce((acc, s) => acc + s.averagePercentage, 0);
    return Math.round(sum / initialStudents.length);
  }, [initialStudents]);

  // Filtered and sorted students
  const filteredStudents = useMemo(() => {
    return initialStudents
      .filter((student) => {
        // Search filter
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          student.userName.toLowerCase().includes(query) ||
          student.userEmail.toLowerCase().includes(query) ||
          student.quizzes.some((q) => q.quizTitle.toLowerCase().includes(query));

        if (!matchesSearch) return false;

        // Category filter
        if (filterType === "high") {
          return student.averagePercentage >= 75;
        }
        if (filterType === "needs_attention") {
          return student.averagePercentage < 50;
        }
        if (filterType === "multiple") {
          return student.quizzes.length > 1;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "recent") {
          return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
        }
        if (sortBy === "score") {
          return b.averagePercentage - a.averagePercentage;
        }
        if (sortBy === "attempts") {
          return b.quizzes.length - a.quizzes.length;
        }
        return 0;
      });
  }, [initialStudents, searchQuery, filterType, sortBy]);

  // Format time taken in minutes and seconds
  const formatTimeTaken = (seconds?: number) => {
    if (!seconds || seconds <= 0) return "N/A";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-7xl 2xl:max-w-[1500px] mx-auto space-y-8 bg-[var(--bg)] min-h-screen text-[var(--ink)]">
      
      {/* Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-6 pt-3 sm:pt-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--green-800)] mb-1">
            <span>Admin Portal</span>
            <span>•</span>
            <span>Test Series Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--ink)] tracking-tight">
            Student Submissions & Scorecards
          </h1>
          <p className="text-sm text-[var(--ink-soft)] mt-1 max-w-2xl">
            Monitor student CBT test series attempts, inspect individual scores, and review detailed question-by-question solution sheets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="px-3 py-1.5 text-xs font-bold bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] rounded-xl hover:bg-[var(--surface-soft)] transition-colors"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-3 py-1.5 text-xs font-bold bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] rounded-xl hover:bg-[var(--surface-soft)] transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Summary KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[var(--surface)] p-5 rounded-[var(--radius)] border border-[var(--line)] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--surface-soft)] text-[var(--green-900)] flex items-center justify-center font-bold shrink-0 border border-[var(--line)]">
            <Users className="w-6 h-6 text-[var(--green-800)]" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] block">
              Registered Students
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[var(--ink)]">
              {totalStudents}
            </span>
            <span className="text-[11px] text-[var(--ink-soft)] block mt-0.5">
              Unique learners with submissions
            </span>
          </div>
        </div>

        <div className="bg-[var(--surface)] p-5 rounded-[var(--radius)] border border-[var(--line)] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--surface-soft)] text-[var(--green-900)] flex items-center justify-center font-bold shrink-0 border border-[var(--line)]">
            <BookOpen className="w-6 h-6 text-[var(--green-800)]" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] block">
              Total Submissions
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[var(--ink)]">
              {totalSubmissions}
            </span>
            <span className="text-[11px] text-[var(--ink-soft)] block mt-0.5">
              Completed CBT test attempts
            </span>
          </div>
        </div>

        <div className="bg-[var(--surface)] p-5 rounded-[var(--radius)] border border-[var(--line)] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--surface-soft)] text-[var(--green-900)] flex items-center justify-center font-bold shrink-0 border border-[var(--line)]">
            <Award className="w-6 h-6 text-[var(--green-800)]" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] block">
              Institute Average
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[var(--green-900)]">
              {overallAverage}%
            </span>
            <span className="text-[11px] text-[var(--green-800)] font-semibold block mt-0.5">
              Across all recorded tests
            </span>
          </div>
        </div>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="bg-[var(--surface)] p-4 sm:p-5 rounded-[var(--radius)] border border-[var(--line)] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--ink-soft)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, email, or test title..."
              className="w-full bg-[var(--surface-soft)] pl-10 pr-4 py-2.5 rounded-xl border border-[var(--line)] text-sm focus:outline-none focus:ring-2 focus:ring-[#0c3d3d]/20 focus:border-[#0c3d3d] text-[var(--ink)]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--ink-soft)] hover:text-[var(--ink)]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <label className="text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
              Sort By:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[var(--surface-soft)] border border-[var(--line)] text-xs font-bold rounded-xl px-3 py-2 text-[var(--ink)] focus:outline-none"
            >
              <option value="recent">Most Recent Submission</option>
              <option value="score">Highest Average Score</option>
              <option value="attempts">Most Tests Completed</option>
            </select>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--line)]">
          <span className="text-xs font-bold text-[var(--ink-soft)] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          <button
            type="button"
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === "all"
                ? "bg-[#0c3d3d] text-white shadow-xs"
                : "bg-[var(--surface-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)] border border-[var(--line)]"
            }`}
          >
            All Students ({initialStudents.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType("high")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === "high"
                ? "bg-[#0c3d3d] text-white shadow-xs"
                : "bg-[var(--surface-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)] border border-[var(--line)]"
            }`}
          >
            High Performers (≥ 75%)
          </button>
          <button
            type="button"
            onClick={() => setFilterType("needs_attention")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === "needs_attention"
                ? "bg-[#0c3d3d] text-white shadow-xs"
                : "bg-[var(--surface-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)] border border-[var(--line)]"
            }`}
          >
            Needs Attention (&lt; 50%)
          </button>
          <button
            type="button"
            onClick={() => setFilterType("multiple")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === "multiple"
                ? "bg-[#0c3d3d] text-white shadow-xs"
                : "bg-[var(--surface-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)] border border-[var(--line)]"
            }`}
          >
            Multiple Tests Taken
          </button>
        </div>
      </div>

      {/* Main Students List */}
      {filteredStudents.length === 0 ? (
        <div className="bg-[var(--surface)] p-12 rounded-[var(--radius)] border border-[var(--line)] text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[var(--surface-soft)] text-[var(--ink-soft)] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[var(--ink)]">No matching student submissions</h3>
          <p className="text-sm text-[var(--ink-soft)] max-w-md mx-auto">
            {searchQuery
              ? `No student record matches "${searchQuery}". Try searching with a different name, email, or clear your filters.`
              : "No student records match the active filter criteria."}
          </p>
          {(searchQuery || filterType !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setFilterType("all");
              }}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#0c3d3d] text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredStudents.map((student, index) => {
            const isExpanded = !!expandedUsers[student.userId];
            const studentInitial = (student.userName || "S").charAt(0).toUpperCase();

            return (
              <div
                key={student.userId}
                className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)] shadow-xs overflow-hidden transition-all duration-200 hover:border-[var(--green-600)]"
              >
                {/* Header Summary Row */}
                <div
                  onClick={() => toggleExpand(student.userId)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-[var(--surface-soft)]/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Index Number */}
                    <span className="w-6 text-xs font-black text-[var(--ink-soft)]/60 text-center shrink-0">
                      #{index + 1}
                    </span>

                    {/* Student Avatar */}
                    {student.userImage ? (
                      <img
                        src={student.userImage}
                        alt={student.userName}
                        className="w-12 h-12 rounded-2xl object-cover border border-[var(--line)] shadow-2xs shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-[#0c3d3d] text-white flex items-center justify-center font-black text-lg shrink-0 shadow-2xs">
                        {studentInitial}
                      </div>
                    )}

                    {/* Student Identity */}
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-[var(--ink)] tracking-tight flex items-center gap-2">
                        {student.userName}
                        {student.averagePercentage >= 75 && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[var(--green-900)] bg-[var(--green-300)] border border-[var(--line)] px-2 py-0.5 rounded-full">
                            <Sparkles className="w-2.5 h-2.5" /> Top Performer
                          </span>
                        )}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--ink-soft)] mt-0.5 font-medium">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-[var(--ink-soft)]" />
                          {student.userEmail}
                        </span>
                        <span className="hidden sm:inline text-[var(--line)]">•</span>
                        <span className="hidden sm:inline">
                          UID: <span className="font-mono text-[11px]">{student.userId.slice(0, 8)}...</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Badges & Expand Indicator */}
                  <div className="flex items-center gap-3 sm:gap-4 ml-auto sm:ml-0">
                    <div className="text-right">
                      <span className="text-xs font-bold text-[var(--ink)] block">
                        {student.quizzes.length} {student.quizzes.length === 1 ? "Test Attempt" : "Test Attempts"}
                      </span>
                      <span className="text-[11px] font-semibold text-[var(--ink-soft)] block">
                        Last Active: {new Date(student.lastActive).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="text-right px-3 py-1.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)]">
                      <span className="text-[10px] font-bold text-[var(--ink-soft)] uppercase tracking-wider block">
                        Average
                      </span>
                      <span className="text-base font-black text-[var(--green-900)]">
                        {student.averagePercentage}%
                      </span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full bg-[var(--surface-soft)] border border-[var(--line)] flex items-center justify-center text-[var(--ink-soft)] transition-transform duration-200 ${
                        isExpanded ? "rotate-180 bg-[#0c3d3d] text-white border-[#0c3d3d]" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Expanded Individual Test History */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="border-t border-[var(--line)] bg-[var(--surface-soft)]/40 p-4 sm:p-6"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-[var(--line)] pb-2 mb-3">
                          <h4 className="text-xs font-bold text-[var(--green-800)] uppercase tracking-wider flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            Completed Test History ({student.quizzes.length})
                          </h4>
                          <span className="text-[11px] text-[var(--ink-soft)] font-medium">
                            Total Marks Earned: <strong className="text-[var(--ink)]">{student.totalScore}</strong> / {student.totalPossibleMarks}
                          </span>
                        </div>

                        <div className="grid gap-3">
                          {student.quizzes.map((quiz, qIdx) => {
                            const resultReviewUrl = quiz.quizId 
                              ? `/test-series/${quiz.quizId}/result?attemptId=${quiz.attemptId}`
                              : null;

                            return (
                              <div
                                key={quiz.attemptId || qIdx}
                                className="bg-[var(--surface)] p-4 rounded-xl border border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-[var(--green-600)] transition-colors"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-md bg-[var(--surface-soft)] text-[var(--green-900)] flex items-center justify-center font-bold text-[10px] shrink-0 border border-[var(--line)]">
                                      {qIdx + 1}
                                    </span>
                                    <h5 className="font-bold text-sm text-[var(--ink)]">
                                      {quiz.quizTitle}
                                    </h5>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--ink-soft)] pl-7">
                                    <span>
                                      Submitted: {new Date(quiz.submittedAt).toLocaleString("en-IN", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                    {quiz.timeTakenSeconds !== undefined && quiz.timeTakenSeconds > 0 && (
                                      <>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                          <Clock className="w-3 h-3" />
                                          Time Taken: {formatTimeTaken(quiz.timeTakenSeconds)}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--line)]">
                                  <div className="text-right">
                                    <span className="text-xs font-black text-[var(--green-900)] bg-[var(--green-300)] border border-[var(--line)] px-2.5 py-1 rounded-lg inline-block">
                                      {quiz.score} / {quiz.maxScore} marks ({quiz.percentage}%)
                                    </span>
                                  </div>

                                  {resultReviewUrl ? (
                                    <Link
                                      href={resultReviewUrl}
                                      target="_blank"
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0c3d3d] hover:bg-[#0d4f4f] text-white transition-colors"
                                      title="Open student question review and NCERT solution sheet"
                                    >
                                      <span>Review Sheet</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </Link>
                                  ) : (
                                    <span className="text-[11px] text-[var(--ink-soft)] italic">
                                      Evaluated
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
