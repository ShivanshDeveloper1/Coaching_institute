"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { courses, courseCategories } from "@/app/site-data";

export default function PopularCoursesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Programs");
  const shouldReduceMotion = useReducedMotion();

  const filteredCourses =
    selectedCategory === "All Programs"
      ? courses.slice(0, 6)
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <section
      id="courses"
      aria-labelledby="popular-courses-heading"
      className="relative w-full bg-[var(--bg)] py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      {/* Subtle Ambient Decorative Accents */}
      <div className="pointer-events-none absolute top-12 right-0 h-96 w-96 rounded-full bg-[#88d89d]/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-12 left-0 h-96 w-96 rounded-full bg-[#1d5d53]/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-14">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0c3d3d]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#0c3d3d] mb-4 border border-[#0c3d3d]/10">
              <span className="h-2 w-2 rounded-full bg-[#1d5d53]" />
              Popular courses
            </span>
            <h2
              id="popular-courses-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.08]"
            >
              Programs that shape{" "}
              <span className="text-[#1d5d53] font-serif italic font-normal">
                bright futures.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
              Structured academic programs mentored by Dheeraj Sir—designed for school board
              excellence, early foundation building, and top ranks in IIT-JEE &amp; NEET.
            </p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href="/courses"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-[#0c3d3d] text-white hover:bg-[#1d5d53] transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <span>See all courses</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Interactive Category Filter Pills */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-10 no-scrollbar"
          role="tablist"
          aria-label="Filter popular courses by category"
        >
          {courseCategories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? "bg-[#0c3d3d] text-white border-[#0c3d3d] shadow-md"
                    : "bg-white/80 text-[var(--ink-soft)] border-[var(--line)] hover:bg-white hover:text-[var(--ink)]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, idx) => (
              <motion.article
                layout
                key={course.slug}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.22 } }}
                className="group bg-white rounded-[28px] overflow-hidden border border-[var(--line)] shadow-[0_18px_38px_rgba(13,43,38,0.06)] hover:shadow-[0_26px_55px_rgba(12,61,61,0.13)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Visual Image Header */}
                  <div className="relative h-52 w-full overflow-hidden bg-[#0c3d3d]">
                    <img
                      src={course.image}
                      alt={course.imageAlt}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c3d3d]/85 via-[#0c3d3d]/25 to-transparent" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase bg-[#a8f0b0] text-[#0c3d3d] shadow-sm">
                        {course.badge}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-black/45 text-white backdrop-blur-md border border-white/15">
                        {course.classLevel}
                      </span>
                    </div>

                    {/* Bottom Overlay Category & Duration */}
                    <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-medium">
                      <span className="truncate">{course.category}</span>
                      <span className="inline-flex items-center gap-1.5 text-[#d8f7d4] font-semibold shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#a8f0b0]" />
                        {course.duration}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 pb-4">
                    <h3 className="text-2xl font-extrabold tracking-tight text-[var(--ink)] group-hover:text-[#0c3d3d] transition-colors leading-snug">
                      <Link href={`/courses/${course.slug}`} className="focus:outline-none">
                        {course.title}
                      </Link>
                    </h3>

                    <p className="mt-2.5 text-sm text-[var(--ink-soft)] leading-relaxed line-clamp-2">
                      {course.description}
                    </p>

                    {/* Key Highlights List */}
                    <ul className="mt-5 space-y-2 border-t border-black/5 pt-4">
                      {course.highlights.slice(0, 3).map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[var(--ink)]"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#88d89d]/30 text-[#0c3d3d] text-xs font-bold">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Price & Dual CTAs */}
                <div className="px-6 sm:px-7 pb-6 pt-4 mt-2 border-t border-black/5 bg-[#f8faf8]/70 flex flex-col gap-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                        Course Fee
                      </span>
                      <strong className="text-2xl font-extrabold tracking-tight text-[#0c3d3d]">
                        ₹{course.fee.toLocaleString("en-IN")}
                      </strong>
                    </div>
                    <span className="text-xs font-semibold text-[var(--ink-soft)] bg-white px-3 py-1 rounded-full border border-black/5">
                      Mentor: {course.mentor}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border border-[#0c3d3d]/20 text-[#0c3d3d] bg-white hover:bg-[#0c3d3d]/5 transition-colors"
                    >
                      View details
                    </Link>
                    <Link
                      href={`/checkout/${course.slug}`}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#88d89d] text-[#0c3d3d] hover:bg-[#a8f0b0] transition-all duration-200 shadow-sm active:scale-95"
                    >
                      Enrole now
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Guidance Banner */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-14 rounded-[28px] bg-gradient-to-r from-[#0c3d3d] via-[#114b48] to-[#1d5d53] p-6 sm:p-8 lg:px-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-1.5 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a8f0b0]">
              Need Academic Guidance?
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Not sure which program fits your current class or exam target?
            </h3>
            <p className="text-xs sm:text-sm text-[#d8f7d4]/85 leading-relaxed">
              Compare all {courses.length} specialized programs or speak directly with our academic
              counselors in Gurugram.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Link
              href="/courses"
              className="flex-1 md:flex-initial inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-xs sm:text-sm bg-[#a8f0b0] text-[#0c3d3d] hover:bg-white transition-all shadow-sm"
            >
              Compare All {courses.length} Courses
            </Link>
            <Link
              href="/contact"
              className="flex-1 md:flex-initial inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-xs sm:text-sm border border-white/25 text-white bg-white/10 hover:bg-white/20 transition-all"
            >
              Talk to a Counselor
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
