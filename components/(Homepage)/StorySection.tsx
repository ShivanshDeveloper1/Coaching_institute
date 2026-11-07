"use client";

import React from "react";
import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section className="relative w-full bg-[var(--bg)] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex justify-center w-full"
          >
            <div className="relative w-full rounded-[28px] overflow-hidden shadow-[var(--shadow)] border border-[var(--line)] bg-[var(--bg-strong)]">
              <img
                src="/result/result-2.jpeg"
                alt="Academic team"
                className="w-full h-[320px] sm:h-[440px] lg:h-[520px] object-cover object-center"
              />
            </div>
          </motion.div>

          {/* Right Column: Copy & Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col justify-center space-y-6 lg:pl-4"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--green-700)] mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--green-700)]" />
                Who we are
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--ink)] leading-tight">
                Comprehensive support for business and academic excellence.
              </h2>

              <p className="mt-5 text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
                ConceptnSolution is a coaching institute committed to making learning more effective,
                structured, and inspiring for students preparing for school and entrance exams.
              </p>
            </div>

            {/* Metrics Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Badge 1: Green */}
              <div className="bg-gradient-to-br from-[#8ee6a0]/70 to-[#aaf4bc]/80 rounded-[20px] p-6 border border-emerald-300/40 shadow-sm flex flex-col justify-center">
                <strong className="block text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0c3d3d]">
                  10K+
                </strong>
                <span className="block mt-1 text-sm font-medium text-[#0c3d3d]/85">
                  Practice assignments
                </span>
              </div>

              {/* Badge 2: Surface */}
              <div className="bg-white rounded-[20px] p-6 border border-[var(--line)] shadow-sm flex flex-col justify-center">
                <strong className="block text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                  4.9/5
                </strong>
                <span className="block mt-1 text-sm font-medium text-[var(--ink-soft)]">
                  Student satisfaction
                </span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
