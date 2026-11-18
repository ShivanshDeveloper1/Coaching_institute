import React from "react";
import { FileText, Users, Star, Award, Sparkles, CheckCircle2 } from "lucide-react";
import TestSeries from "@/components/(testseries)/testSeries";

export const dynamic = "force-dynamic";

export default function TestSeriesPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] pt-20 sm:pt-24 pb-16 text-[var(--ink)]">
      {/* Hero Banner with Animated Ambient Glow & Brand System */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div className="relative overflow-hidden rounded-[var(--radius)] bg-gradient-to-br from-[var(--green-900)] via-[#0c4343] to-[var(--green-700)] p-6 sm:p-10 md:p-12 text-white shadow-[var(--shadow)] border border-white/10">
          
          {/* Decorative Animated Ambient Glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[var(--green-500)]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#88d89d]/15 blur-3xl" />

          <div className="relative z-10 flex flex-col items-start max-w-3xl">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[var(--green-300)] mb-4 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[var(--green-500)]" />
              <span>Official CBT Mock Test Series</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-[-0.03em] text-white leading-[1.08]">
              Simulate Real Exams. <br />
              <span className="text-[var(--green-500)]">Master High-Yield Scores.</span>
            </h1>

            {/* Subtext */}
            <p className="text-white/85 font-normal mb-8 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
              Experience actual exam conditions with timed CBT mocks, accurate positive & negative marking schemes, and step-by-step KaTeX scientific solutions crafted by Dheeraj Sir.
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3.5 font-bold text-xs sm:text-sm">
              <div className="flex items-center gap-2 bg-white/10 border border-white/15 px-3.5 sm:px-4 py-2 rounded-xl backdrop-blur-sm text-white hover:bg-white/15 transition-colors">
                <FileText size={16} className="text-[var(--green-500)]" />
                <span>Full Syllabus Mocks</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 border border-white/15 px-3.5 sm:px-4 py-2 rounded-xl backdrop-blur-sm text-white hover:bg-white/15 transition-colors">
                <Users size={16} className="text-[var(--green-500)]" />
                <span>JEE & NEET Curriculums</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 border border-white/15 px-3.5 sm:px-4 py-2 rounded-xl backdrop-blur-sm text-white hover:bg-white/15 transition-colors">
                <CheckCircle2 size={16} className="text-[var(--green-500)]" />
                <span>Instant KaTeX Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section>
          <TestSeries />
        </section>
      </div>
    </div>
  );
}