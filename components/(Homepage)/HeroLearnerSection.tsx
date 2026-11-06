"use client";

import React from "react";
import { motion } from "framer-motion";

const MARQUEE_TEXT =
  "Strong Foundations  |  Affordable Plans  |  Learn Anytime, Anywhere  •  Free Trial Session  •  Personalized Learning Plans  |  Expert Tutors  •  Interactive Classes  |  Strong Foundations  |  Affordable Plans  |  Learn Anytime, Anywhere  •  ";

export default function HeroLearnerSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#F7F4EB] text-[#14281D] flex flex-col items-center justify-between pt-12 pb-16 select-none font-sans">
      
      {/* ================= TOP HEADER CONTENT ================= */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-3xl mx-auto">
        {/* Top Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 bg-[#F5DCE0] text-[#4A252C] px-4 py-1.5 rounded-full text-xs md:text-sm font-medium mb-6 shadow-sm"
        >
          <span className="h-2 w-2 rounded-full bg-[#D85B72]" />
         Flexible Online & Classroom Coaching
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-[68px] font-extrabold tracking-tight leading-[1.08] text-[#14281D]"
        >
          Coaching that fits
          <br />
          <span className="inline-flex items-center justify-center gap-3 mt-1">
            <span>the</span>
            <span className="relative inline-block text-[#487556] -rotate-2">
              Student
              {/* Decorative Sparkle Lines on Top Right */}
              <svg
                className="absolute -top-3 -right-7 w-7 h-7 text-[#E06D32]"
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
              {/* Hand-drawn Orange Underline */}
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

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-9"
        >
          <button className="bg-[#E06D32] hover:bg-[#c95d26] text-white font-semibold text-sm md:text-base px-6 py-3 rounded-full shadow-md transition-transform active:scale-95">
            Try a free Quizess
          </button>
          <button className="bg-[#F7F4EB] hover:bg-[#ebe6d8] text-[#14281D] font-semibold text-sm md:text-base px-6 py-3 rounded-full border-2 border-[#14281D] shadow-[0_3px_0_0_#14281D] hover:translate-y-[1px] hover:shadow-[0_2px_0_0_#14281D] transition-all">
            Browse Courses
          </button>
        </motion.div>
      </div>

      {/* ================= VISUAL STAGE: RIBBON + 3 CARDS ================= */}
      <div className="relative w-full max-w-[1440px] mx-auto mt-8 md:mt-4 h-[430px] sm:h-[480px] md:h-[520px] flex items-center justify-center">
        
        {/* 1. ANIMATED GREEN CURVED RIBBON (Z-INDEX: 0 - BEHIND CARDS) */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-visible">
          <motion.svg
            viewBox="0 0 1440 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[165%] sm:w-[130%] md:w-full h-auto overflow-visible"
            // Subtle vertical wave breathing effect on the whole ribbon
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
              {/* Cubic Bezier Path matching the exact S-wave in the reference */}
              <path
                id="ribbonWavePath"
                d="M -180 280 C 80 390, 310 170, 570 190 C 830 210, 910 350, 1180 210 C 1330 130, 1480 180, 1650 250"
              />
            </defs>

            {/* Thick Green Background Stroke */}
            <use
              href="#ribbonWavePath"
              stroke="#487556"
              strokeWidth="40"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Animated Text Moving Back and Forth Along the Path */}
            <text
              fill="#F7F4EB"
              fontSize="16.5"
              fontWeight="600"
              letterSpacing="0.03em"
              dominantBaseline="central"
            >
              <motion.textPath
                href="#ribbonWavePath"
                // Smoothly oscillates back and forth along the spline
                animate={{
                  startOffset: ["0%", "-28%", "0%"],
                }}
                transition={{
                  duration: 14,
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
            initial={{ opacity: 0, scale: 0.85, y: 40, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -5 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 16,
              delay: 0.2,
            }}
            whileHover={{ scale: 1.04, rotate: -2 }}
            className="absolute left-[4%] sm:left-[6%] md:left-[5%] bottom-[8%] sm:bottom-[10%] w-[125px] sm:w-[155px] md:w-[180px] aspect-[4/5] rounded-2xl shadow-xl border-4 border-[#F7F4EB] overflow-visible bg-[#E5DEC9]"
          >
            {/* Floating Smiley Sticker */}
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [-4, 6, -4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-9 -right-5 z-20 w-12 h-12 sm:w-14 sm:h-14 bg-[#F6D5C1] rounded-full flex items-center justify-center shadow-sm border-2 border-[#F7F4EB]"
            >
              <svg viewBox="0 0 36 36" className="w-7 h-7 text-[#14281D]">
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
            initial={{ opacity: 0, scale: 0.9, y: 50, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -3.5 }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 15,
              delay: 0.1,
            }}
            whileHover={{ scale: 1.02, rotate: -1.5 }}
            className="absolute left-1/2 -translate-x-1/2 top-[6%] sm:top-[4%] w-[210px] sm:w-[270px] md:w-[320px] aspect-[4/4.8] rounded-3xl shadow-2xl border-[6px] border-[#F7F4EB] overflow-hidden bg-[#D5CFC0]"
          >
            <img
              src="gurgaon_coaching_teacher.jpeg"
              alt="Student holding books in library"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* --- RIGHT CARD --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40, rotate: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -4 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 16,
              delay: 0.3,
            }}
            whileHover={{ scale: 1.04, rotate: 0 }}
            className="absolute right-[4%] sm:right-[6%] md:right-[6%] top-[14%] sm:top-[16%] w-[125px] sm:w-[155px] md:w-[180px] aspect-[4/5] rounded-2xl shadow-xl border-4 border-[#F7F4EB] overflow-visible bg-[#E5DEC9]"
          >
            {/* Floating Green Clover/Blob Shape Behind Top-Left Corner */}
            <motion.div
              animate={{ rotate: [0, 12, 0], scale: [1, 1.06, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-7 -left-6 -z-10 w-12 h-12 sm:w-14 sm:h-14 text-[#487556]"
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