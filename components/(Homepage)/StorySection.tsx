"use client";

import React from "react";
import { motion } from "framer-motion";

export default function WhyChooseUsSection() {
  const features = [
    {
      number: "001//",
      title: "15+ Years of Mastery",
      description:
        "Learn directly from Dheeraj Sir with over a decade and a half of specialized experience transforming complex chemical concepts into top-tier board and entrance ranks.",
      icon: (
        <div className="w-8 h-8 rounded-lg bg-[var(--green-500)]/20 text-[var(--green-700)] flex items-center justify-center font-bold text-sm">
          ⚡
        </div>
      ),
    },
    {
      number: "002//",
      title: "Exclusive Small Batch Focus",
      description:
        "Capped strictly at 20 students to ensure absolute individual attention, rigorous performance tracking, and direct doubt resolution during every single session.",
      icon: (
        <div className="w-8 h-8 rounded-lg bg-[var(--green-500)]/20 text-[var(--green-700)] flex items-center justify-center font-bold text-sm">
          👥
        </div>
      ),
    },
    {
      number: "003//",
      title: "Targeted Board & Competitive Edge",
      description:
        "Comprehensive, structured modules tailored specifically for CBSE/ICSE foundations, Class 11th-12th Chemistry, and rigorous JEE & NEET test preparation.",
      icon: (
        <div className="w-8 h-8 rounded-lg bg-[var(--green-500)]/20 text-[var(--green-700)] flex items-center justify-center font-bold text-sm">
          🎯
        </div>
      ),
    },
  ];

  return (
    <section className="relative w-full bg-[var(--bg)] py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--green-900)] text-white text-xs font-semibold tracking-wider uppercase mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--green-500)]" />
              Why Choose ConceptNSolution
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--ink)] leading-[1.15]">
              Engineered for Top Ranks in Chemistry, JEE & NEET
            </h2>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="self-start md:self-end"
          >
            <a
              href="#courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[var(--line)] text-xs font-bold uppercase tracking-wider text-[var(--ink)] hover:bg-[var(--surface-soft)] transition-colors shadow-sm"
            >
              Explore Courses
              <svg
                className="w-3.5 h-3.5 text-[var(--ink)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Content Layout: Left Features Stack & Right Image Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Cards Stack */}
          <div className="lg:col-span-6 flex flex-col gap-4 justify-between">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className={`p-6 sm:p-8 rounded-[20px] transition-all border ${
                  idx === 0
                    ? "bg-white border-[var(--line)] shadow-[var(--shadow)]"
                    : "bg-transparent border-transparent hover:bg-white/50"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  {feature.icon}
                  <span className="text-xs font-mono font-semibold tracking-wider text-[var(--ink-soft)]">
                    {feature.number}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--ink)] tracking-tight mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Image with Overlay Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative w-full h-full min-h-[420px] sm:min-h-[500px] rounded-[24px] overflow-hidden border border-[var(--line)] shadow-[var(--shadow)]"
          >
            <img
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop"
              alt="Chemistry coaching classroom session"
              className="w-full h-full object-cover object-center absolute inset-0"
            />

            {/* Dark Gradient Overlay for Badge Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Bottom-Left Glass Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute bottom-6 left-6 right-6 sm:right-auto max-w-xs p-5 sm:p-6 rounded-[20px] bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-lg"
            >
              <span className="block text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--green-500)] mb-1">
                20 Max
              </span>
              <span className="block text-sm font-semibold mb-1">
                Students Per Batch in Gurugram
              </span>
              <p className="text-xs text-white/80 leading-relaxed">
                Ensuring absolute personal attention and high-impact mentorship under Dheeraj Sir.
              </p>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}