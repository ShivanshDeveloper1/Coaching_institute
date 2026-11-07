"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  courses,
  courseCategories,
  coursesPageFaqs,
  stats,
} from "../site-data";

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Programs");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const filteredCourses =
    selectedCategory === "All Programs"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "ConceptnSolution Academic & Competitive Coaching Courses",
        description:
          "Structured coaching programs in Gurugram for Classes 9–10 (CBSE, ICSE, Foundation), Classes 11–12 Chemistry, and IIT-JEE & NEET Chemistry preparation.",
        itemListElement: courses.map((course, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Course",
            name: course.title,
            description: course.description,
            provider: {
              "@type": "EducationalOrganization",
              name: "ConceptnSolution",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Gurugram",
                addressRegion: "Haryana",
                addressCountry: "IN",
              },
            },
            offers: {
              "@type": "Offer",
              price: course.fee,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: coursesPageFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      {/* SEO Metadata (React 19 Hoisted Document Tags) */}
      <title>Courses &amp; Coaching Programs in Gurugram | CBSE, ICSE, JEE &amp; NEET | ConceptnSolution</title>
      <meta
        name="description"
        content="Explore ConceptnSolution's structured coaching programs in Gurugram: Class 9-10 CBSE & ICSE Board Prep, Foundation Courses, Class 11-12 Chemistry, and IIT-JEE & NEET Chemistry by Dheeraj Sir."
      />
      <link rel="canonical" href="https://conceptinsolution.com/courses" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ================= 1. HERO SECTION WITH BANNER IMAGE ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2628] via-[#0c3d3d] to-[#1d5d53] text-white pt-14 pb-20 sm:pt-20 sm:pb-24 lg:py-28">
        {/* Ambient Decorative Glows */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#88d89d]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#a8f0b0]/15 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Headline, Copy & CTAs */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#a8f0b0] border border-white/15 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#a8f0b0] animate-pulse" />
                Our Academic Programs • Gurugram
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06] text-white">
                Structured learning for{" "}
                <span className="text-[#a8f0b0] font-serif italic font-normal">
                  every academic stage.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#d8f7d4]/90 leading-relaxed max-w-2xl">
                From Class 9 &amp; 10 school board excellence and early foundation building to
                specialized Class 11–12 Chemistry, IIT-JEE, and NEET preparation—every course at
                ConceptnSolution is built around deep conceptual clarity, regular testing, and
                personal mentorship by <strong className="text-white">Dheeraj Sir</strong>.
              </p>

              {/* Hero CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#course-catalog"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base bg-[#88d89d] text-[#0c3d3d] hover:bg-[#a8f0b0] transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
                >
                  <span>Explore All {courses.length} Courses</span>
                  <span>↓</span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-bold text-sm sm:text-base border border-white/30 text-white bg-white/5 hover:bg-white/15 backdrop-blur-sm transition-all duration-200 active:scale-95"
                >
                  Book Free Counseling
                </Link>
              </div>

              {/* Hero Key Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6 border-t border-white/15">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-white/[0.07] border border-white/10 p-3.5 backdrop-blur-sm"
                  >
                    <strong className="block text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      {item.value}
                    </strong>
                    <span className="block mt-0.5 text-xs text-[#d8f7d4]/80 font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Layered Banner Image & Floating Mentor Badge */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-[32px] overflow-hidden border-2 border-white/15 shadow-2xl bg-[#0c3d3d]">
                <img
                  src="https://images.unsplash.com/photo-1667655699558-8f1b362a67a8?q=80&w=1170&auto=format&fit=crop"
                  alt="Students engaged in structured classroom learning and problem solving"
                  className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2628]/90 via-transparent to-transparent" />

                {/* Bottom Overlay Card inside Banner */}
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-[#0c3d3d]/90 backdrop-blur-md border border-white/15 p-4 flex items-center gap-4">
                  <img
                    src="/gurgaon_coaching_teacher.jpeg"
                    alt="Dheeraj Sir - Lead Mentor at ConceptnSolution"
                    className="h-14 w-14 rounded-xl object-cover border-2 border-[#a8f0b0] shrink-0"
                  />
                  <div>
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#a8f0b0]">
                      Lead Academic Mentor
                    </span>
                    <h2 className="text-base font-extrabold text-white leading-snug">
                      Mentored by Dheeraj Sir
                    </h2>
                    <p className="text-xs text-[#d8f7d4]/80">
                      15+ years guiding Board, JEE &amp; NEET scholars in Gurugram
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= 2. THREE ACADEMIC TRACKS OVERVIEW ================= */}
      <section className="py-16 sm:py-20 bg-[#ece7df]/60 border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#1d5d53]">
              Academic Progression Roadmap
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
              Three focused tracks tailored to your learning stage
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--ink-soft)]">
              Whether you are strengthening Class 9–10 fundamentals, mastering Class 11–12 Chemistry,
              or targeting top ranks in IIT-JEE and NEET, our curriculum follows a clear roadmap.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                stage: "Track 01 • Classes 9th & 10th",
                title: "School Board & Early Foundation",
                programs: "CBSE Board Prep • ICSE Board Prep • Foundation Courses",
                duration: "Year-long / Foundation year",
                fee: "₹34,000",
                description:
                  "Builds rock-solid NCERT/ICSE conceptual clarity, structured answer writing, and early analytical thinking for future competitive exams.",
                accent: "from-[#f7f8f5] to-white border-[var(--line)] text-[var(--ink)]",
                badgeBg: "bg-[#0c3d3d]/10 text-[#0c3d3d]",
              },
              {
                stage: "Track 02 • Classes 11th & 12th",
                title: "Senior Secondary Chemistry Core",
                programs: "Class 11–12 Chemistry Coaching (PCM / PCB Core)",
                duration: "November to February",
                fee: "₹34,000",
                description:
                  "Intensive mastery of Physical, Organic, and Inorganic Chemistry with reaction mechanisms, numerical drills, and board exam strategy.",
                accent: "from-[#d9f9d0] to-[#b4ec9b] border-emerald-300/50 text-[#0c3d3d]",
                badgeBg: "bg-[#0c3d3d]/15 text-[#0c3d3d]",
              },
              {
                stage: "Track 03 • Entrance Preparation",
                title: "IIT-JEE, NEET & Competitive Exams",
                programs: "Chemistry for IIT-JEE • Chemistry for NEET • Competitive Prep",
                duration: "November to May",
                fee: "₹1,00,000",
                description:
                  "High-level problem solving, NCERT line-by-line precision, speed accuracy, and full-pattern mock tests for top national entrance ranks.",
                accent: "from-[#0c3d3d] to-[#115350] border-emerald-950/20 text-white",
                badgeBg: "bg-white/15 text-[#a8f0b0]",
              },
            ].map((track, i) => (
              <motion.div
                key={track.stage}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-[26px] bg-gradient-to-br ${track.accent} p-6 sm:p-7 border shadow-sm flex flex-col justify-between`}
              >
                <div>
                  <span
                    className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold ${track.badgeBg}`}
                  >
                    {track.stage}
                  </span>
                  <h3 className="mt-4 text-xl sm:text-2xl font-extrabold tracking-tight">
                    {track.title}
                  </h3>
                  <p className="mt-2.5 text-sm opacity-85 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-current/10 text-xs space-y-1.5 font-medium opacity-90">
                  <div>
                    <strong className="font-bold">Programs:</strong> {track.programs}
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span>Duration: {track.duration}</span>
                    <span className="font-extrabold text-sm">{track.fee}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. MAIN COURSE CATALOG SECTION ================= */}
      <section id="course-catalog" className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#1d5d53] mb-2">
              <span className="h-2 w-2 rounded-full bg-[#1d5d53]" />
              Complete Course Directory
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
              Choose your coaching program
            </h2>
          </div>

          <p className="text-sm text-[var(--ink-soft)] font-medium">
            Showing <strong className="text-[var(--ink)]">{filteredCourses.length}</strong> of{" "}
            {courses.length} programs
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar"
          role="tablist"
          aria-label="Filter courses by academic category"
        >
          {courseCategories.map((category) => {
            const isActive = selectedCategory === category;
            const count =
              category === "All Programs"
                ? courses.length
                : courses.filter((c) => c.category === category).length;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? "bg-[#0c3d3d] text-white border-[#0c3d3d] shadow-md"
                    : "bg-white text-[var(--ink-soft)] border-[var(--line)] hover:border-[#0c3d3d]/30 hover:text-[var(--ink)]"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] ${
                    isActive ? "bg-[#a8f0b0] text-[#0c3d3d]" : "bg-[#f0f4f2] text-[var(--ink-soft)]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Course Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, idx) => (
              <motion.article
                layout
                key={course.slug}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.48, delay: idx * 0.06 }}
                whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.2 } }}
                className="group bg-white rounded-[28px] overflow-hidden border border-[var(--line)] shadow-[0_18px_38px_rgba(13,43,38,0.06)] hover:shadow-[0_26px_55px_rgba(12,61,61,0.14)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Image Header */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#0c3d3d]">
                    <img
                      src={course.image}
                      alt={course.imageAlt}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c3d3d]/90 via-[#0c3d3d]/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase bg-[#a8f0b0] text-[#0c3d3d] shadow-sm">
                        {course.badge}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-black/45 text-white backdrop-blur-md border border-white/15">
                        {course.classLevel}
                      </span>
                    </div>

                    {/* Bottom Meta inside Image */}
                    <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-medium">
                      <span>{course.category}</span>
                      <span className="inline-flex items-center gap-1.5 text-[#a8f0b0] font-semibold">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#a8f0b0]" />
                        {course.duration}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 sm:p-7 pb-5">
                    <p className="text-xs font-bold text-[#1d5d53] uppercase tracking-wider mb-1.5 line-clamp-1">
                      {course.tagline}
                    </p>

                    <h3 className="text-2xl font-extrabold tracking-tight text-[var(--ink)] group-hover:text-[#0c3d3d] transition-colors leading-snug">
                      <Link href={`/courses/${course.slug}`}>
                        {course.title}
                      </Link>
                    </h3>

                    <p className="mt-2.5 text-sm text-[var(--ink-soft)] leading-relaxed">
                      {course.description}
                    </p>

                    {/* Highlights Checklist */}
                    <div className="mt-5 pt-4 border-t border-black/5">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-2.5">
                        Program Highlights
                      </span>
                      <ul className="space-y-2">
                        {course.highlights.map((item) => (
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
                </div>

                {/* Card Footer: Fee & Action Buttons */}
                <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-black/5 bg-[#f8faf8]/80 flex flex-col gap-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                        Full Program Fee
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
      </section>

      {/* ================= 4. WHY STUDY WITH US / TEACHING METHODOLOGY ================= */}
      <section className="py-20 bg-[#0c3d3d] text-white relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-[#88d89d]/15 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#a8f0b0] mb-3">
              The ConceptnSolution Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              How our classroom methodology turns concepts into top scores
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#d8f7d4]/80 leading-relaxed">
              Every course follows a disciplined 4-pillar learning system designed and supervised by
              Dheeraj Sir.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "First-Principles Clarity",
                desc: "Every topic—from Class 9 Science to JEE Advanced Organic Chemistry—is taught logically so students understand the 'why' behind every formula and reaction.",
              },
              {
                num: "02",
                title: "Focused Batch Size (20 Target)",
                desc: "With a focused target of 20 admissions, no student sits unnoticed in the back row. Every learner receives direct interaction and individualized feedback.",
              },
              {
                num: "03",
                title: "Weekly Tests & Mock Drills",
                desc: "Regular chapter evaluations, board-pattern descriptive papers, and timed JEE/NEET mock tests eliminate exam fear and build speed and accuracy.",
              },
              {
                num: "04",
                title: "Dedicated Doubt Clinics",
                desc: "Students never carry unresolved doubts to the next chapter. Dedicated doubt sessions ensure every NCERT, exemplar, and worksheet problem is mastered.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.num}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="rounded-3xl bg-white/[0.07] border border-white/10 p-6 sm:p-7 backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#a8f0b0] text-[#0c3d3d] font-extrabold text-sm">
                    {item.num}
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-[#d8f7d4]/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. QUICK COMPARISON TABLE ================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#1d5d53]">
            At a Glance
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
            Program Overview &amp; Fee Structure
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[var(--ink-soft)]">
            Transparent course durations, target classes, and fees across all {courses.length} programs.
          </p>
        </div>

        <div className="overflow-x-auto rounded-[24px] border border-[var(--line)] bg-white shadow-sm">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="bg-[#f0f4f2] text-[var(--ink)] border-b border-[var(--line)] text-xs font-extrabold uppercase tracking-wider">
                <th className="py-4 px-6">Program Name</th>
                <th className="py-4 px-5">Category / Target</th>
                <th className="py-4 px-5">Duration</th>
                <th className="py-4 px-5">Fee</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-sm">
              {courses.map((course) => (
                <tr key={course.slug} className="hover:bg-[#f8faf8] transition-colors">
                  <td className="py-4 px-6 font-bold text-[var(--ink)]">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="hover:text-[#1d5d53] transition-colors flex items-center gap-2.5"
                    >
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#0c3d3d]/10 text-[#0c3d3d]">
                        {course.badge}
                      </span>
                      <span>{course.title}</span>
                    </Link>
                  </td>
                  <td className="py-4 px-5 text-[var(--ink-soft)]">{course.classLevel}</td>
                  <td className="py-4 px-5 text-[var(--ink-soft)] font-medium">{course.duration}</td>
                  <td className="py-4 px-5 font-extrabold text-[#0c3d3d]">
                    ₹{course.fee.toLocaleString("en-IN")}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0c3d3d] hover:text-[#1d5d53]"
                    >
                      <span>Details</span>
                      <span>→</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= 6. FREQUENTLY ASKED QUESTIONS (FAQ) ================= */}
      <section className="py-16 sm:py-20 bg-[#ece7df]/50 border-t border-[var(--line)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#1d5d53]">
              Got Questions?
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--ink-soft)]">
              Everything parents and students ask about our courses, batch sizes, and admissions.
            </p>
          </div>

          <div className="space-y-4">
            {coursesPageFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl bg-white border border-[var(--line)] overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left font-bold text-base sm:text-lg text-[var(--ink)] hover:text-[#0c3d3d] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0f4f2] text-[#0c3d3d] font-bold transition-transform duration-200 ${
                        isOpen ? "rotate-45 bg-[#88d89d]" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed border-t border-black/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 7. BOTTOM ADMISSION CTA BANNER ================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0c3d3d] via-[#124d4a] to-[#1d5d53] p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#a8f0b0]/20 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#a8f0b0] border border-white/15">
                Admissions Open • Limited to 20 Target Seats
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Start your academic journey with Dheeraj Sir.
              </h2>
              <p className="text-sm sm:text-base text-[#d8f7d4]/85 leading-relaxed">
                Speak with our academic team in Gurugram to discuss your child’s current class,
                learning goals, batch timings, and the right course pathway.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm sm:text-base bg-[#a8f0b0] text-[#0c3d3d] hover:bg-white transition-all shadow-lg active:scale-95"
              >
                Enquire for Admission →
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full font-bold text-sm sm:text-base border border-white/30 text-white bg-white/5 hover:bg-white/15 transition-all"
              >
                Call +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
