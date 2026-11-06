"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AcademicFoundationsSection() {
  return (
    <section className="relative min-h-screen w-full bg-[var(--bg)] text-[var(--ink)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden selection:bg-[var(--green-300)] selection:text-[var(--green-900)]">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-[54px] font-semibold leading-[1.14] tracking-[-0.03em] text-[var(--ink)]"
        >
          Building strong academic <br className="hidden sm:inline" />
          foundations through personalized <br />
          <span className="text-[var(--green-700)] font-serif italic font-normal inline-block sm:mt-1">
            learning experiences
          </span>
        </motion.h1>

        {/* 'Our story' Pill Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <button className="px-6 py-2 rounded-full border border-[var(--ink)]/80 text-[13px] md:text-sm font-medium text-[var(--ink)] bg-[var(--bg)] hover:bg-[var(--bg-strong)] transition-all duration-200 active:scale-95 shadow-sm">
            Our story
          </button>
        </motion.div>
      </div>

      {/* ================= SHOWCASE CONTAINER ================= */}
      <div className="relative w-full max-w-5xl mx-auto mt-14 sm:mt-18 flex items-center justify-center">
        <div className="relative w-full max-w-[840px] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
          
          {/* 1. LEFT METRICS CARD (Floats in front on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -35, y: 25 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 18,
              delay: 0.3,
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="w-full sm:w-[380px] md:w-[410px] bg-[var(--green-900)] text-white rounded-[var(--radius)] p-7 md:p-8 shadow-[var(--shadow)] z-20 md:-mr-20 relative flex flex-col justify-between border border-white/5"
          >
            {/* Row 1: 900+ */}
            <div className="flex items-baseline justify-between py-2">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                900+
              </span>
              <span className="text-xs sm:text-[13px] text-white/70 font-medium">
                Learners since 2018
              </span>
            </div>

            <div className="w-full h-px bg-white/10 my-4" />

            {/* Row 2: 92% */}
            <div className="flex items-baseline justify-between py-2">
              <span className="text-xs sm:text-[13px] text-white/70 font-medium">
                Improve within one term
              </span>
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                92%
              </span>
            </div>

            <div className="w-full h-px bg-white/10 my-4" />

            {/* Row 3: 4.9/5 */}
            <div className="flex items-baseline justify-between py-2">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                4.9/5
              </span>
              <span className="text-xs sm:text-[13px] text-white/70 font-medium">
                Rating across 300+ reviews
              </span>
            </div>

            {/* Bottom Proof Pill */}
            <div className="mt-8 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--green-800)]/80 text-[11px] sm:text-xs text-[var(--green-500)] border border-white/5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--green-500)] animate-pulse" />
                Trusted by families. Proven by student success.
              </div>
            </div>
          </motion.div>

          {/* 2. RIGHT PHOTO CARD (Tucked behind the stats card) */}
          <motion.div
            initial={{ opacity: 0, x: 35, y: 25 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 85,
              damping: 18,
              delay: 0.4,
            }}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            className="w-full sm:w-[440px] md:w-[490px] h-[380px] sm:h-[470px] md:h-[500px] rounded-[var(--radius)] overflow-hidden shadow-[var(--shadow)] z-10 border border-[var(--line)] bg-[var(--bg-strong)]"
          >
            <img
              src="https://images.unsplash.com/photo-1667655699558-8f1b362a67a8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              alt="Student focused on coursework with notebook"
              className="w-full h-full object-cover object-center filter brightness-[0.98]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}