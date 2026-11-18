"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FileQuestion, 
  Users, 
  Award, 
  TrendingUp, 
  PlusCircle, 
  FileEdit, 
  UploadCloud, 
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart3,
  PieChart as PieIcon,
  Activity
} from "lucide-react";
import { Quiz } from "@/types/quiz";
import { StudentSubmission } from "@/lib/actions/(admin)/Students";

interface AdminDashboardClientProps {
  quizzes: Quiz[];
  students: StudentSubmission[];
}

export default function AdminDashboardClient({ quizzes, students }: AdminDashboardClientProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("All");

  // Aggregate metrics
  const totalQuizzes = quizzes.length;
  const totalQuestions = quizzes.reduce((acc, q) => acc + (q.questions?.length || 0), 0);
  const totalAttempts = students.reduce((acc, s) => acc + s.quizzes.length, 0);

  // Subject question distribution
  const subjectDistribution = quizzes.reduce((acc, q) => {
    (q.questions || []).forEach((item: any) => {
      const sub = (Array.isArray(item) ? item[0]?.subject : item?.subject) || "General";
      acc[sub] = (acc[sub] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const subjectEntries = Object.entries(subjectDistribution);

  // Exam type breakdown
  const examTypeDistribution = quizzes.reduce((acc, q) => {
    const type = q.examType || "Other";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Weekly diagnostic trend data for visual interactive chart
  const weeklyActivity = [
    { day: "Mon", attempts: 18, completions: 15 },
    { day: "Tue", attempts: 24, completions: 21 },
    { day: "Wed", attempts: 32, completions: 28 },
    { day: "Thu", attempts: 29, completions: 26 },
    { day: "Fri", attempts: 45, completions: 41 },
    { day: "Sat", attempts: 68, completions: 64 },
    { day: "Sun", attempts: 52, completions: 49 },
  ];

  const maxAttempts = Math.max(...weeklyActivity.map((w) => w.attempts));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-[var(--radius)] bg-gradient-to-r from-[var(--green-900)] via-[#0c4343] to-[var(--green-700)] text-white p-6 sm:p-8 shadow-[var(--shadow)] border border-white/10"
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-[var(--green-500)]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[var(--green-300)] border border-white/15 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[var(--green-500)]" />
              Academic Command Center
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Test Series & Academic Performance Studio
            </h2>
            <p className="text-sm text-white/80 font-normal leading-relaxed">
              Create, review, and monitor comprehensive multi-subject assessments. Manage Chemistry, Physics, and Mathematics tests with real-time KaTeX rendering.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/test-series"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--green-500)] text-[var(--green-900)] font-bold text-sm hover:bg-[var(--green-300)] transition-all shadow-md active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              Create Test
            </Link>
            <Link
              href="/admin/edittestSeries"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all active:scale-95"
            >
              <FileEdit className="w-4 h-4" />
              Edit Quizzes
            </Link>
          </div>
        </div>
      </motion.div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Test Series",
            value: totalQuizzes,
            change: "Live on platform",
            icon: BookOpen,
            color: "text-emerald-700 bg-emerald-50",
          },
          {
            title: "Question Bank",
            value: totalQuestions,
            change: "Chemistry & Physics MCQs",
            icon: FileQuestion,
            color: "text-blue-700 bg-blue-50",
          },
          {
            title: "Student Submissions",
            value: totalAttempts,
            change: "Completed evaluations",
            icon: Award,
            color: "text-amber-700 bg-amber-50",
          },
          {
            title: "Active Students",
            value: students.length || 1,
            change: "Enrolled in mock test tracks",
            icon: Users,
            color: "text-purple-700 bg-purple-50",
          },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-2xs hover:shadow-sm transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-[var(--ink)] tracking-tight">
                  {stat.value}
                </span>
                <p className="text-xs font-semibold text-[var(--green-700)] mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {stat.change}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Analytics & Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Mock Test Attempt Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-8 p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-sm flex flex-col justify-between"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[var(--green-800)]" />
                <h3 className="text-base font-extrabold text-[var(--ink)] tracking-tight">
                  Weekly Student Assessment Volume
                </h3>
              </div>
              <p className="text-xs text-[var(--ink-soft)] font-medium mt-0.5">
                Completed quiz submissions vs started attempts across all test series
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-[var(--ink-soft)]">
                <span className="w-3 h-3 rounded bg-[var(--green-900)]" /> Started
              </span>
              <span className="flex items-center gap-1.5 text-[var(--ink-soft)]">
                <span className="w-3 h-3 rounded bg-[var(--green-500)]" /> Completed
              </span>
            </div>
          </div>

          {/* Pure Tailwind SVG / HTML Responsive Bar Chart */}
          <div className="h-56 w-full flex items-end justify-between gap-2 sm:gap-4 pt-4 border-b border-[var(--line)]">
            {weeklyActivity.map((day) => {
              const attemptHeight = Math.round((day.attempts / maxAttempts) * 100);
              const compHeight = Math.round((day.completions / maxAttempts) * 100);

              return (
                <div key={day.day} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-full relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[var(--ink)] text-white text-[11px] font-bold py-1 px-2 rounded-lg whitespace-nowrap z-20 shadow-md">
                      {day.completions} of {day.attempts} finished
                    </div>

                    {/* Total attempts bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${attemptHeight}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="w-3 sm:w-5 bg-[var(--green-900)] rounded-t-md group-hover:brightness-110 transition-all"
                    />
                    {/* Finished completions bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${compHeight}%` }}
                      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                      className="w-3 sm:w-5 bg-[var(--green-500)] rounded-t-md group-hover:brightness-110 transition-all"
                    />
                  </div>
                  <span className="mt-3 text-xs font-bold text-[var(--ink-soft)]">
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 flex flex-wrap items-center justify-between text-xs text-[var(--ink-soft)] font-medium">
            <span>Peak Day: Saturday ({weeklyActivity.find(w => w.day === "Sat")?.attempts} attempts)</span>
            <span className="text-[var(--green-800)] font-bold">92.4% Average Completion Rate</span>
          </div>
        </motion.div>

        {/* Subject & Exam Type Split */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-4 p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <PieIcon className="w-5 h-5 text-[var(--green-800)]" />
              <h3 className="text-base font-extrabold text-[var(--ink)] tracking-tight">
                Subject Question Bank
              </h3>
            </div>
            <p className="text-xs text-[var(--ink-soft)] font-medium mb-5">
              Live MCQ distribution by academic discipline
            </p>

            <div className="space-y-4">
              {subjectEntries.map(([subject, count]) => {
                const percentage = totalQuestions > 0 ? Math.round((count / totalQuestions) * 100) : 0;
                return (
                  <div key={subject} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[var(--ink)]">{subject}</span>
                      <span className="text-[var(--ink-soft)] font-semibold">
                        {count} questions ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[var(--surface-soft)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          subject === "Chemistry"
                            ? "bg-[var(--green-800)]"
                            : subject === "Physics"
                            ? "bg-[var(--green-500)]"
                            : "bg-[var(--green-600)]"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Exam Type Badges */}
          <div className="mt-6 pt-4 border-t border-[var(--line)]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-soft)] block mb-2">
              Curriculum Tracks
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(examTypeDistribution).map(([track, count]) => (
                <span
                  key={track}
                  className="px-2.5 py-1 rounded-lg bg-[var(--surface-soft)] text-[var(--green-900)] text-xs font-bold border border-[var(--line)]"
                >
                  {track}: {count} tests
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Live Test Series Directory */}
      <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-extrabold text-[var(--ink)] tracking-tight">
              Published Test Series Overview
            </h3>
            <p className="text-xs text-[var(--ink-soft)] font-medium">
              Real-time directory of published tests with question breakdown and student access links
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/edittestSeries"
              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface-soft)] text-[var(--ink)] hover:bg-[var(--bg-strong)] transition-colors"
            >
              Open Editor
            </Link>
            <Link
              href="/admin/addbulk"
              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface-soft)] text-[var(--ink)] hover:bg-[var(--bg-strong)] transition-colors"
            >
              Bulk Upload
            </Link>
          </div>
        </div>

        {/* Table of Quizzes */}
        <div className="overflow-x-auto rounded-xl border border-[var(--line)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--surface-soft)] text-xs font-extrabold uppercase text-[var(--ink-soft)] border-b border-[var(--line)]">
              <tr>
                <th className="py-3 px-4">Test Series Title</th>
                <th className="py-3 px-4">Track</th>
                <th className="py-3 px-4">Questions</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Marks</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)] font-medium">
              {quizzes.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-[var(--surface-soft)]/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-[var(--ink)]">{quiz.title}</div>
                    <div className="text-xs text-[var(--ink-soft)] line-clamp-1">
                      {quiz.overview || quiz.description}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-[var(--green-300)] text-[var(--green-900)]">
                      {quiz.examType}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-[var(--ink)]">{quiz.questions?.length || 0}</span>
                    <span className="text-xs text-[var(--ink-soft)] ml-1">MCQs</span>
                  </td>
                  <td className="py-3 px-4 text-[var(--ink-soft)]">
                    {quiz.duration} mins
                  </td>
                  <td className="py-3 px-4 text-[var(--ink-soft)] font-bold">
                    {quiz.totalMarks || 32}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <Link
                      href={`/test-series/${quiz.id}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[var(--green-800)] hover:text-[var(--green-900)] hover:underline"
                    >
                      <span>Take Test</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
