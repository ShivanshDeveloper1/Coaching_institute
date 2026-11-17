"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const MARQUEE_TEXT =
  "Strong Foundations  |  Affordable Plans  |  Learn Anytime, Anywhere  •  Free Trial Session  •  Personalized Learning Plans  |  Expert Tutors  •  Interactive Classes  |  Strong Foundations  |  Affordable Plans  |  Learn Anytime, Anywhere  •  ";

export default function HeroLearnerSection() {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full overflow-hidden bg-[var(--bg)] text-[var(--ink)] flex flex-col items-center justify-between pt-10 sm:pt-14 pb-12 sm:pb-16 select-none font-sans">
      
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-[var(--green-300)]/30 rounded-full blur-3xl -z-10" />

      {/* ================= TOP HEADER CONTENT ================= */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-3xl mx-auto">
        {/* Top Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex items-center gap-2 bg-[#F5DCE0] text-[#4A252C] px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-5 sm:mb-6 shadow-sm border border-[#EAC2C8]"
        >
          <span className="h-2 w-2 rounded-full bg-[#D85B72] animate-pulse" />
          Flexible Online & Classroom Coaching
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          className="text-4xl sm:text-6xl md:text-[68px] font-extrabold tracking-tight leading-[1.08] text-[var(--ink)]"
        >
          Coaching that fits
          <br />
          <span className="inline-flex items-center justify-center gap-2 sm:gap-3 mt-1">
            <span>the</span>
            <span className="relative inline-block text-[var(--green-800)] -rotate-2">
              Student
              {/* Decorative Sparkle Lines */}
              <svg
                className="absolute -top-3 -right-6 sm:-right-7 w-6 h-6 sm:w-7 sm:h-7 text-[#E06D32]"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M8 22L14 6M15 24L25 12M18 27L28 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              {/* Hand-drawn Terracotta Underline */}
              <svg
                className="absolute -bottom-2.5 left-0 w-[108%] h-3 text-[#E06D32]"
                viewBox="0 0 240 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 7C75 3 160 5 238 10"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </motion.h1>

        {/* Subtitle / Value proposition */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16, ease: [0.23, 1, 0.32, 1] }}
          className="mt-4 text-sm sm:text-base md:text-lg text-[var(--ink-soft)] max-w-xl font-medium"
        >
          Concept-first learning tailored to board excellence, foundation skills, and competitive success in Gurugram.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-7 sm:mt-8"
        >
          <Link
            href="/test-series"
            className="bg-[#E06D32] hover:bg-[#c95d26] text-white font-bold text-sm sm:text-base px-6 py-3 rounded-full shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
          >
            Try Free Quizzes
          </Link>
          <Link
            href="/courses"
            className="bg-[var(--surface)] hover:bg-[var(--bg-strong)] text-[var(--ink)] font-bold text-sm sm:text-base px-6 py-3 rounded-full border-2 border-[var(--ink)] shadow-[0_3px_0_0_var(--ink)] hover:translate-y-[1px] hover:shadow-[0_2px_0_0_var(--ink)] transition-all active:scale-95"
          >
            Browse Courses
          </Link>
        </motion.div>
      </div>

      {/* ================= VISUAL STAGE: RIBBON + 3 CARDS ================= */}
      <div className="relative w-full max-w-[1440px] mx-auto mt-6 sm:mt-8 md:mt-4 h-[380px] sm:h-[460px] md:h-[520px] flex items-center justify-center">
        
        {/* 1. ANIMATED GREEN CURVED RIBBON (Z-INDEX: 0 - BEHIND CARDS) */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-visible">
          <motion.svg
            viewBox="0 0 1440 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[170%] sm:w-[130%] md:w-full h-auto overflow-visible"
            animate={{
              y: [0, -6, 0, 6, 0],
              rotate: [0, 0.4, 0, -0.4, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <defs>
              <path
                id="ribbonWavePath"
                d="M -180 280 C 80 390, 310 170, 570 190 C 830 210, 910 350, 1180 210 C 1330 130, 1480 180, 1650 250"
              />
            </defs>

            {/* Green Background Stroke */}
            <use
              href="#ribbonWavePath"
              stroke="#1d5d53"
              strokeWidth="42"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Animated Marquee Text */}
            <text
              fill="#f4efe7"
              fontSize="16.5"
              fontWeight="600"
              letterSpacing="0.03em"
              dominantBaseline="central"
            >
              <motion.textPath
                href="#ribbonWavePath"
                animate={{
                  startOffset: ["0%", "-28%", "0%"],
                }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {MARQUEE_TEXT}
              </motion.textPath>
            </text>
          </motion.svg>
        </div>

        {/* 2. FOREGROUND CARDS CONTAINER (Z-INDEX: 10 - IN FRONT OF RIBBON) */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* --- LEFT CARD --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 35, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -5 }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 18,
              delay: 0.18,
            }}
            whileHover={{ scale: 1.05, rotate: -2, y: -4 }}
            className="absolute left-[2%] sm:left-[6%] md:left-[5%] bottom-[8%] sm:bottom-[10%] w-[110px] sm:w-[155px] md:w-[185px] aspect-[4/5] rounded-2xl shadow-xl border-4 border-[var(--surface)] overflow-visible bg-[var(--surface-soft)] transition-shadow duration-200"
          >
            {/* Floating Smiley Sticker */}
            <motion.div
              animate={{ y: [0, -5, 0], rotate: [-4, 6, -4] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-3 sm:-top-8 sm:-right-4 z-20 w-9 h-9 sm:w-13 sm:h-13 bg-[#F6D5C1] rounded-full flex items-center justify-center shadow-md border-2 border-[var(--surface)]"
            >
              <svg viewBox="0 0 36 36" className="w-5 h-5 sm:w-7 sm:h-7 text-[var(--ink)]">
                <circle cx="13" cy="14" r="2.2" fill="currentColor" />
                <circle cx="23" cy="14" r="2.2" fill="currentColor" />
                <path
                  d="M11 21C13.5 24.5 22.5 24.5 25 21"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </motion.div>

            <img
              src="https://plus.unsplash.com/premium_photo-1682096118912-c90b30e0f822?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              alt="Young student writing"
              className="w-full h-full object-cover rounded-xl"
            />
          </motion.div>

          {/* --- CENTER MAIN CARD --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -2 }}
            transition={{
              type: "spring",
              stiffness: 130,
              damping: 17,
              delay: 0.1,
            }}
            whileHover={{ scale: 1.03, rotate: 0, y: -4 }}
            className="absolute left-1/2 -translate-x-1/2 top-[4%] sm:top-[2%] w-[190px] sm:w-[270px] md:w-[325px] aspect-[4/4.8] rounded-3xl shadow-2xl border-[5px] sm:border-[6px] border-[var(--surface)] overflow-hidden bg-[var(--surface-soft)] transition-shadow duration-200"
          >
            <img
              src="/gurgaon_coaching_teacher.jpeg"
              alt="Teacher with student in classroom"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* --- RIGHT CARD --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 35, rotate: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 4 }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 18,
              delay: 0.25,
            }}
            whileHover={{ scale: 1.05, rotate: 2, y: -4 }}
            className="absolute right-[2%] sm:right-[6%] md:right-[6%] top-[10%] sm:top-[14%] w-[110px] sm:w-[155px] md:w-[185px] aspect-[4/5] rounded-2xl shadow-xl border-4 border-[var(--surface)] overflow-visible bg-[var(--surface-soft)] transition-shadow duration-200"
          >
            {/* Floating Organic Green Accent Shape */}
            <motion.div
              animate={{ rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-5 -z-10 w-11 h-11 sm:w-13 sm:h-13 text-[var(--green-700)]"
            >
              <svg viewBox="0 0 60 60" fill="currentColor">
                <path d="M30 6C38 6 43 13 48 19C53 25 56 34 51 42C46 50 37 54 28 53C19 52 10 47 7 38C4 29 9 19 16 13C21 8 25 6 30 6Z" />
              </svg>
            </motion.div>

            <img
              src="https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              alt="Parent and child studying together"
              className="w-full h-full object-cover rounded-xl"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}