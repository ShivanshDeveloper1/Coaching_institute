"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { stats } from "@/app/site-data";

export default function TeacherShowcaseSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0c3d3d] via-[#0d4f4f] to-[#124948] text-white py-16 sm:py-20 lg:py-24">
      {/* Decorative ambient background accents */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#1d5d53]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#88d89d]/15 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center min-h-[500px]">
          
          {/* Left Column: Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--green-300)] bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--green-500)]" />
                Coaching institute in Gurugram
              </span>

              <h2 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06] text-white max-w-2xl">
                Learn Better. Achieve Bigger.
              </h2>

              <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-xl font-normal">
                From school academics to JEE and NEET preparation, ConceptnSolution provides expert guidance, personalised learning, and the right direction to help every student succeed.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-sm sm:text-base bg-[var(--green-600)] text-[var(--green-900)] hover:bg-[var(--green-500)] transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
              >
                Explore courses
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-sm sm:text-base border border-white/30 text-white bg-white/5 hover:bg-white/15 backdrop-blur-sm transition-all duration-200 shadow-sm active:scale-95"
              >
                Contact
              </Link>
            </div>

            {/* Mini Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5 pt-4 border-t border-white/10">
              {stats.slice(0, 3).map((item) => (
                <div
                  key={item.label}
                  className="bg-white/[0.07] border border-white/15 rounded-2xl p-3 sm:p-4 backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  <strong className="block text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                    {item.value}
                  </strong>
                  <span className="block mt-1 text-xs sm:text-sm text-white/70 font-medium">
                    <span className="sm:hidden">{item.shortLabel || item.label}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 22 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none rounded-[28px] overflow-hidden shadow-2xl border border-white/15 bg-white/5 backdrop-blur-sm">
              <img
                src="/gurgaon_coaching_teacher.jpeg"
                alt="Teacher mentoring students at ConceptnSolution Gurugram"
                className="w-full h-[300px] sm:h-[400px] lg:h-[480px] object-cover object-center"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
