import React from "react";
import { FileText, Users, Star } from "lucide-react";
import TestSeries from "@/components/(testseries)/testSeries";
// import LeaderBoard from "@/components/(testseries)/LeaderBoard"; // Disabled until Leaderboard phase

export default function TestSeriesPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 pb-16">
      {/* Hero Banner with Design System Palette */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="rounded-[var(--radius)] bg-[linear-gradient(135deg,#0c3d3d_0%,#0d4f4f_35%,#1d5d53_100%)] p-8 sm:p-10 text-white shadow-[var(--shadow)] flex flex-col items-start border border-white/10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#d8f7d4] mb-4">
            Official Mock Tests
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 tracking-[-0.03em] text-white">
            ConceptnSolution Test Series
          </h1>
          <p className="text-white/80 font-normal mb-8 max-w-xl text-base sm:text-lg leading-relaxed">
            Simulate real exam conditions with timed CBT mock exams, fair marking (+4 / 0), and step-by-step NCERT solutions.
          </p>
          
          <div className="flex flex-wrap gap-3 font-semibold text-xs sm:text-sm">
            <div className="flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2.5 rounded-full backdrop-blur-sm text-white">
              <FileText size={16} className="text-[#a8f0b0]" />
              <span>Full Syllabus Mocks</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2.5 rounded-full backdrop-blur-sm text-white">
              <Users size={16} className="text-[#a8f0b0]" />
              <span>Verified Coaching Syllabus</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2.5 rounded-full backdrop-blur-sm text-white">
              <Star size={16} className="text-[#a8f0b0]" />
              <span>Zero Negative Marking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Test Series List */}
        <section className="mt-8">
          <TestSeries />
        </section>
      </div>
    </div>
  );
}