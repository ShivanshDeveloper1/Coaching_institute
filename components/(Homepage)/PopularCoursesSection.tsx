"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { courses } from "@/app/site-data";

export default function PopularCoursesSection() {
  const displayedCourses = courses.slice(0, 6);

  return (
    <section className="relative w-full bg-[var(--bg)] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--green-700)] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--green-700)]" />
              Popular courses
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--ink)] leading-tight">
              Programs that shape bright futures.
            </h2>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center justify-center self-start sm:self-auto px-6 py-2.5 rounded-full font-bold text-sm bg-[#88d89d] text-[#0c3d3d] hover:bg-[#a8f0b0] transition-all duration-200 shadow-sm hover:shadow active:scale-95"
          >
            See all courses
          </Link>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedCourses.map((course, idx) => (
            <motion.article
              key={course.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-[26px] p-6 sm:p-7 border border-[var(--line)] shadow-[0_18px_26px_rgba(13,43,38,0.04)] hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top: Badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#0c3d3d]/10 text-[#0c3d3d]">
                    {course.badge}
                  </span>
                  <span className="text-xs font-medium text-[var(--ink-soft)] truncate max-w-[150px]">
                    {course.category}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="text-2xl font-bold tracking-tight text-[var(--ink)] leading-snug">
                  {course.title}
                </h3>

                {/* Course Description */}
                <p className="mt-3 text-sm text-[var(--ink-soft)] leading-relaxed">
                  {course.description}
                </p>

                {/* Meta info tags */}
                <div className="flex flex-wrap items-center gap-2 mt-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#f0f4f2] text-[#172327]">
                    {course.duration}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#88d89d]/20 text-[#0c3d3d]">
                    ₹{course.fee.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-black/5">
                <Link
                  href={`/courses/${course.slug}`}
                  className="text-sm font-bold text-[#0c3d3d] hover:text-[#1d5d53] transition-colors"
                >
                  View details
                </Link>
                <Link
                  href={`/checkout/${course.slug}`}
                  className="inline-flex items-center justify-center px-5 py-2 rounded-full font-bold text-xs sm:text-sm bg-[#88d89d] text-[#0c3d3d] hover:bg-[#a8f0b0] transition-all duration-200 shadow-sm active:scale-95"
                >
                  Enrol now
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
