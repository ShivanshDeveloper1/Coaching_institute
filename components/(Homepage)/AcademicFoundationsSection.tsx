"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AcademicFoundationsSection() {
  return (
    <section className="relative w-full bg-[var(--bg)] text-[var(--ink)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 overflow-hidden selection:bg-[var(--green-300)] selection:text-[var(--green-900)]">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--green-800)] bg-[var(--green-300)]/60 px-3.5 py-1 rounded-full mb-4 border border-[var(--green-700)]/20"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--green-800)]" />
          Academic Excellence
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          className="text-3xl sm:text-5xl md:text-[54px] font-bold leading-[1.12] tracking-[-0.03em] text-[var(--ink)]"
        >
          Building strong academic <br className="hidden sm:inline" />
          foundations through personalized <br />
          <span className="text-[var(--green-700)] font-serif italic font-normal inline-block sm:mt-1">
            learning experiences
          </span>
        </motion.h2>

        {/* 'Our story' Pill Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="mt-6 sm:mt-8"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-[var(--ink)]/40 text-xs sm:text-sm font-semibold text-[var(--ink)] bg-[var(--surface)] hover:bg-[var(--bg-strong)] transition-all duration-200 active:scale-95 shadow-sm hover:shadow"
          >
            <span>Our story</span>
            <span className="text-[var(--ink-soft)]">→</span>
          </Link>
        </motion.div>
      </div>

      {/* ================= SHOWCASE CONTAINER ================= */}
      <div className="relative w-full max-w-5xl mx-auto mt-12 sm:mt-16 flex items-center justify-center">
        <div className="relative w-full max-w-[860px] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
          
          {/* 1. LEFT METRICS CARD (Floats in front on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 18,
              delay: 0.1,
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="w-full sm:w-[380px] md:w-[410px] bg-[var(--green-900)] text-white rounded-[var(--radius)] p-6 sm:p-8 shadow-[var(--shadow)] z-20 md:-mr-16 relative flex flex-col justify-between border border-white/10"
          >
            {/* Row 1: 900+ */}
            <div className="flex items-baseline justify-between py-1.5">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                900+
              </span>
              <span className="text-xs sm:text-[13px] text-white/75 font-medium">
                Learners since 2018
              </span>
            </div>

            <div className="w-full h-px bg-white/15 my-3.5" />

            {/* Row 2: 92% */}
            <div className="flex items-baseline justify-between py-1.5">
              <span className="text-xs sm:text-[13px] text-white/75 font-medium">
                Improve within one term
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                92%
              </span>
            </div>

            <div className="w-full h-px bg-white/15 my-3.5" />

            {/* Row 3: 4.9/5 */}
            <div className="flex items-baseline justify-between py-1.5">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                4.9/5
              </span>
              <span className="text-xs sm:text-[13px] text-white/75 font-medium">
                Rating across 300+ reviews
              </span>
            </div>

            {/* Bottom Proof Pill */}
            <div className="mt-6 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--green-800)] text-[11px] sm:text-xs text-[var(--green-500)] border border-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--green-500)] animate-pulse" />
                Trusted by families. Proven by student success.
              </div>
            </div>
          </motion.div>

          {/* 2. RIGHT PHOTO CARD (Tucked behind the stats card) */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 18,
              delay: 0.18,
            }}
            whileHover={{ scale: 1.01, transition: { duration: 0.25 } }}
            className="w-full sm:w-[440px] md:w-[490px] h-[340px] sm:h-[440px] md:h-[480px] rounded-[var(--radius)] overflow-hidden shadow-[var(--shadow)] z-10 border border-[var(--line)] bg-[var(--surface)]"
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