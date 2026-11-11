"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { stats, instituteHighlights, courses } from "../site-data";

const aboutFaqs = [
  {
    question: "What is ConceptnSolution and where is it located?",
    answer:
      "ConceptnSolution (Concept In Solution) is a premier academic coaching institute in Gurugram, Haryana, dedicated to helping students in Classes 9 to 12 achieve school board excellence (CBSE & ICSE) alongside strong preparation for IIT-JEE and NEET Chemistry.",
  },
  {
    question: "Who leads the academic mentoring at ConceptnSolution?",
    answer:
      "All classes, curriculum planning, and academic mentoring are led by Dheeraj Sir, who has over 15+ years of teaching experience guiding school board toppers and competitive entrance exam aspirants.",
  },
  {
    question: "Why does ConceptnSolution focus on a target of 20 admissions?",
    answer:
      "We prioritize depth of understanding over crowded classrooms. Keeping a focused target of 20 admissions allows Dheeraj Sir to track each student's classwork, evaluate test answer sheets personally, and resolve every individual doubt.",
  },
  {
    question: "How does the institute balance school board exams with JEE and NEET preparation?",
    answer:
      "Our teaching philosophy starts from NCERT and board-level first principles before scaling up to advanced analytical and competitive problem solving. This ensures students score high in school exams while building the exact conceptual rigor needed for JEE Main, JEE Advanced, and NEET.",
  },
];

export default function AboutPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: "About ConceptnSolution | Coaching Institute in Gurugram",
        url: "https://conceptinsolution.com/about",
        description:
          "Learn about ConceptnSolution in Gurugram and lead mentor Dheeraj Sir (15+ years of teaching excellence) offering CBSE, ICSE, Foundation, and IIT-JEE & NEET Chemistry coaching.",
        mainEntity: {
          "@type": "EducationalOrganization",
          name: "ConceptnSolution",
          alternateName: "Concept In Solution",
          url: "https://conceptinsolution.com",
          telephone: "+91-98765-43210",
          email: "admissions@conceptinsolution.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
          founder: {
            "@type": "Person",
            name: "Dheeraj Sir",
            jobTitle: "Lead Academic Mentor",
            description:
              "Educator with 15+ years of teaching excellence in school board preparation and IIT-JEE & NEET Chemistry.",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://conceptinsolution.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About Us",
            item: "https://conceptinsolution.com/about",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: aboutFaqs.map((faq) => ({
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
      {/* SEO, AEO & GEO Metadata (React 19 Hoisted Document Tags) */}
      <title>About ConceptnSolution | Dheeraj Sir (15+ Yrs Experience) | Coaching in Gurugram</title>
      <meta
        name="description"
        content="Discover ConceptnSolution in Gurugram. With 15+ years of teaching excellence under Dheeraj Sir, we guide Class 9–12 students in CBSE, ICSE, Foundation, and IIT-JEE & NEET Chemistry."
      />
      <link rel="canonical" href="https://conceptinsolution.com/about" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2628] via-[#0c3d3d] to-[#1d5d53] text-white pt-12 pb-20 sm:pt-16 sm:pb-24 lg:py-28">
        {/* Ambient Decorative Glows */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#88d89d]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#a8f0b0]/15 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-[#d8f7d4]/75 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#a8f0b0] font-semibold">About the Institute</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Headline & Introduction */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#a8f0b0] border border-white/15 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#a8f0b0]" />
                About the institute • Gurugram
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06] text-white">
                Learning with clarity,{" "}
                <span className="text-[#a8f0b0] font-serif italic font-normal">
                  discipline, and mentorship.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#d8f7d4]/90 leading-relaxed max-w-2xl">
                ConceptnSolution is built around the vision of providing high-quality education for
                students who want to balance school board excellence with competitive exam
                preparation—guided by first-principles teaching, structured testing, and personal
                faculty attention.
              </p>

              {/* Institute Highlights Pills */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {instituteHighlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/15 px-4 py-2 text-xs sm:text-sm font-semibold text-white backdrop-blur-sm"
                  >
                    <span className="text-[#a8f0b0] font-bold">✓</span>
                    {item}
                  </span>
                ))}
              </div>

              {/* Hero CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base bg-[#88d89d] text-[#0c3d3d] hover:bg-[#a8f0b0] transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
                >
                  <span>Explore Our Programs</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-bold text-sm sm:text-base border border-white/30 text-white bg-white/5 hover:bg-white/15 backdrop-blur-sm transition-all duration-200 active:scale-95"
                >
                  Meet Us in Gurugram
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Classroom Visual & Stats Card */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-[32px] overflow-hidden border-2 border-white/15 shadow-2xl bg-[#0c3d3d]">
                <div className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3.4] w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1667655699558-8f1b362a67a8?q=80&w=1170&auto=format&fit=crop"
                    alt="Students at ConceptnSolution learning with structured notes and personal guidance"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2628]/90 via-[#0b2628]/20 to-transparent" />

                {/* Bottom Overlay Summary */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 rounded-2xl bg-[#0c3d3d]/90 backdrop-blur-md border border-white/15 p-4 sm:p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[#a8f0b0]">
                        Batch Philosophy
                      </span>
                      <strong className="mt-0.5 block text-lg sm:text-xl font-extrabold text-white">
                        20 Target Seats
                      </strong>
                      <span className="text-xs text-[#d8f7d4]/80">
                        Individualized attention
                      </span>
                    </div>
                    <div className="border-l border-white/15 pl-4">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[#a8f0b0]">
                        Student Rating
                      </span>
                      <strong className="mt-0.5 block text-lg sm:text-xl font-extrabold text-white">
                        4.9 / 5.0
                      </strong>
                      <span className="text-xs text-[#d8f7d4]/80">
                        Proven parent trust
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Key Stats Bar */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-14 pt-10 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/[0.07] border border-white/10 p-5 backdrop-blur-sm"
              >
                <strong className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                  {stat.value}
                </strong>
                <span className="mt-1 block text-xs sm:text-sm text-[#d8f7d4]/85 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= 2. MENTORSHIP SPOTLIGHT: DHEERAJ SIR ================= */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Mentor Portrait Card (Proper Portrait Aspect Ratio) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Offset Backdrop */}
              <div className="hidden sm:block absolute -inset-3 rounded-[32px] bg-gradient-to-br from-[#88d89d]/40 to-[#0c3d3d]/15 -rotate-2" />

              <div className="relative rounded-[28px] overflow-hidden bg-[#0c3d3d] border border-[var(--line)] shadow-[var(--shadow)]">
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#172327]">
                  <img
                    src="/gurgaon_coaching_teacher.jpeg"
                    alt="Dheeraj Sir — Founder & Lead Academic Mentor at ConceptnSolution Gurugram"
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-103"
                  />
                </div>
                <div className="p-5 sm:p-6 bg-[#0c3d3d] text-white flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#a8f0b0]">
                      Lead Faculty &amp; Mentor
                    </span>
                    <h3 className="text-xl font-extrabold text-white mt-0.5">Dheeraj Sir</h3>
                    <p className="text-xs text-[#d8f7d4]/80">
                      Board Preparation &amp; JEE / NEET Chemistry Specialist
                    </p>
                  </div>
                  <span className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#a8f0b0] text-[#0c3d3d]">
                    15+ Yrs Exp.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Story Copy & Key Commitments */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0c3d3d]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#1d5d53]">
              <span className="h-2 w-2 rounded-full bg-[#1d5d53]" />
              Dheeraj Sir • Academic Leadership
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.08]">
              15+ years of teaching excellence
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
              <p>
                ConceptnSolution is built around the vision of providing high-quality education for
                students who want to balance board excellence with competitive exam preparation.
              </p>
              <p>
                Under the mentorship of <strong className="text-[var(--ink)]">Dheeraj Sir</strong>,
                students gain conceptual clarity, disciplined study habits, and the confidence to
                excel in school and entrance examinations. Rather than relying on shortcuts or rote
                memorization, every concept is explained from first principles so learners can
                tackle both descriptive board papers and analytical entrance questions with ease.
              </p>
            </div>

            {/* Core Focus Checklist */}
            <div className="pt-2 space-y-3">
              {[
                {
                  title: "School education guidance for Classes 9 to 12",
                  detail:
                    "Complete NCERT and ICSE syllabus mastery with structured answer-writing practice.",
                },
                {
                  title: "Foundation programs that build academic confidence early",
                  detail:
                    "Bridging Class 9 & 10 fundamentals with analytical reasoning for future competitive streams.",
                },
                {
                  title: "Focused mentoring for IIT-JEE and NEET chemistry",
                  detail:
                    "In-depth Physical, Organic, and Inorganic Chemistry with high-level problem solving and mock tests.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3.5 rounded-2xl bg-white p-4 sm:p-5 border border-[var(--line)] shadow-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0c3d3d] text-[#a8f0b0] text-xs font-extrabold mt-0.5">
                    ✓
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-[var(--ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 3. MISSION, VISION & CORE VALUES ================= */}
      <section className="py-20 sm:py-24 bg-[#ece7df]/65 border-y border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#1d5d53]">
              Our Purpose &amp; Principles
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
              The values behind every classroom session
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--ink-soft)]">
              We believe strong academic results are the natural outcome of clear concepts,
              consistent revision, and caring mentorship.
            </p>
          </motion.div>

          {/* Mission & Vision Split Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="rounded-[28px] bg-white p-7 sm:p-9 border border-[var(--line)] shadow-sm"
            >
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#0c3d3d]/10 text-[#0c3d3d]">
                Our Mission
              </span>
              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-[var(--ink)]">
                Making complex science &amp; board curricula clear and approachable
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed">
                To empower every learner with structured conceptual teaching, over 10,000+ graded
                practice assignments, and timely doubt resolution—eliminating academic anxiety and
                replacing it with steady, measurable progress.
              </p>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-[28px] bg-white p-7 sm:p-9 border border-[var(--line)] shadow-sm"
            >
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#88d89d]/35 text-[#0c3d3d]">
                Our Vision
              </span>
              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-[var(--ink)]">
                Balancing school board excellence with competitive readiness
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed">
                To be Gurugram’s most trusted mentor-led institute where students do not have to
                choose between school board marks and competitive entrance preparation, excelling in
                both through unified concept mastery.
              </p>
            </motion.div>
          </div>

          {/* 3 Core Values Cards (Preserving & Elevating Original Values Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: Light */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              whileHover={shouldReduceMotion ? {} : { y: -5, transition: { duration: 0.2 } }}
              className="rounded-[28px] bg-gradient-to-b from-[#f7f8f5] to-white p-7 sm:p-8 border border-[var(--line)] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0c3d3d]/10 text-[#0c3d3d] flex items-center justify-center text-xl font-extrabold">
                  ◌
                </div>
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-[var(--ink)]">
                  Our teaching philosophy
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed">
                  We make difficult subjects approachable by combining conceptual teaching with
                  regular revision. Every formula, mechanism, and law is derived logically before
                  students practice problem sets.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-black/5 text-xs font-bold uppercase tracking-wider text-[#1d5d53]">
                Clarity First • Regular Revision
              </div>
            </motion.div>

            {/* Card 2: Dark */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={shouldReduceMotion ? {} : { y: -5, transition: { duration: 0.2 } }}
              className="rounded-[28px] bg-gradient-to-br from-[#0c3d3d] to-[#115350] text-white p-7 sm:p-8 border border-emerald-950/20 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#a8f0b0] flex items-center justify-center text-xl font-extrabold">
                  ▣
                </div>
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-white">
                  Student-first support
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#d8f7d4]/85 leading-relaxed">
                  Every learner is supported through structured practice, personal attention, and
                  test-based feedback. Our focused batch size ensures no question or doubt goes
                  unanswered.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-bold uppercase tracking-wider text-[#a8f0b0]">
                Personal Attention • Test Feedback
              </div>
            </motion.div>

            {/* Card 3: Accent Mint */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={shouldReduceMotion ? {} : { y: -5, transition: { duration: 0.2 } }}
              className="rounded-[28px] bg-gradient-to-br from-[#d9f9d0] to-[#b4ec9b] text-[#172327] p-7 sm:p-8 border border-emerald-300/50 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0c3d3d]/15 text-[#0c3d3d] flex items-center justify-center text-xl font-extrabold">
                  ✦
                </div>
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-[#0c3d3d]">
                  Career readiness
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#172327]/85 leading-relaxed">
                  We focus on academic performance and long-term competitive excellence, especially
                  in chemistry-based exams like IIT-JEE (Main &amp; Advanced) and NEET.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#0c3d3d]/10 text-xs font-bold uppercase tracking-wider text-[#0c3d3d]">
                Board Mastery • JEE &amp; NEET Excellence
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 4. TEACHING METHODOLOGY & LEARNING SYSTEM ================= */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#1d5d53]">
              How We Teach
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--ink)]">
              A disciplined 4-stage academic system
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--ink-soft)] max-w-md">
            Every batch at ConceptnSolution follows a proven study cycle that builds retention,
            writing precision, and exam speed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Concept-First Lectures",
              desc: "In-depth classroom explanation aligned with NCERT, ICSE, and competitive syllabi so students grasp the root logic of every chapter.",
            },
            {
              step: "02",
              title: "10K+ Practice Assignments",
              desc: "Graded topic-wise worksheets, numerical problem sets, and reaction mechanism drills that convert passive reading into active mastery.",
            },
            {
              step: "03",
              title: "Weekly & Mock Assessments",
              desc: "Regular unit tests, descriptive board-style evaluations, and timed JEE/NEET mock papers to build accuracy under exam conditions.",
            },
            {
              step: "04",
              title: "Personal Doubt Resolution",
              desc: "Dedicated one-on-one doubt clinics and paper reviews with Dheeraj Sir so learning gaps are corrected immediately.",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="rounded-[26px] bg-white p-6 sm:p-7 border border-[var(--line)] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0c3d3d] text-[#a8f0b0] font-extrabold text-base">
                    {item.step}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                    Pillar {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold tracking-tight text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm text-[var(--ink-soft)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= 5. STUDENT MILESTONES & RESULTS SHOWCASE ================= */}
      <section className="py-20 sm:py-24 bg-[#0c3d3d] text-white relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-[#88d89d]/15 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-5 space-y-5"
            >
              <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#a8f0b0] border border-white/15">
                Student Milestones
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Dedicated mentorship that reflects in student results
              </h2>
              <p className="text-sm sm:text-base text-[#d8f7d4]/85 leading-relaxed">
                From Class 10 &amp; 12 board distinctions to NEET UG and JEE selections, our
                learners succeed through disciplined daily practice, NCERT mastery, and consistent
                test analysis.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl bg-white/[0.08] border border-white/10 p-4">
                  <strong className="block text-2xl sm:text-3xl font-extrabold text-[#a8f0b0]">
                    10K+
                  </strong>
                  <span className="mt-1 block text-xs sm:text-sm text-[#d8f7d4]/85">
                    Practice assignments solved
                  </span>
                </div>
                <div className="rounded-2xl bg-white/[0.08] border border-white/10 p-4">
                  <strong className="block text-2xl sm:text-3xl font-extrabold text-[#a8f0b0]">
                    92%
                  </strong>
                  <span className="mt-1 block text-xs sm:text-sm text-[#d8f7d4]/85">
                    Improve within one term
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#a8f0b0] hover:text-white transition-colors"
                >
                  <span>Explore our board &amp; entrance courses</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>

            {/* Right: Two Square Achievement Posters (Preserved 1:1 Aspect Ratio, Zero Cropping) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                className="rounded-[26px] bg-white/10 p-3 sm:p-4 border border-white/15 backdrop-blur-sm shadow-xl"
              >
                <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src="/result/result-1.jpeg"
                    alt="Student selections and academic achievements mentored by faculty in Gurugram"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-center text-xs font-semibold text-[#d8f7d4]">
                  Competitive &amp; Dropper Batch Selections
                </p>
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.12 }}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                className="rounded-[26px] bg-white/10 p-3 sm:p-4 border border-white/15 backdrop-blur-sm shadow-xl"
              >
                <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src="/result/result-2.jpeg"
                    alt="NEET UG and Class 12 Board examination achievement highlight"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-center text-xs font-semibold text-[#d8f7d4]">
                  Board (92% in XII) &amp; NEET UG Excellence
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. ACADEMIC PROGRAMS OVERVIEW ================= */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#1d5d53]">
              Academic Offerings
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
              Courses offered at ConceptnSolution
            </h2>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center justify-center self-start sm:self-auto px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm bg-[#0c3d3d] text-white hover:bg-[#1d5d53] transition-colors"
          >
            View All {courses.length} Courses →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              tag: "Classes 9th & 10th",
              title: "Board & Foundation Programs",
              items: [
                { name: "CBSE Board Preparation", slug: "cbse-board-preparation" },
                { name: "ICSE Board Preparation", slug: "icse-board-preparation" },
                { name: "Foundation Courses", slug: "foundation-courses" },
              ],
              meta: "Year-long / Foundation year • ₹34,000",
            },
            {
              tag: "Classes 11th & 12th",
              title: "Senior Secondary Chemistry",
              items: [{ name: "Chemistry Coaching (Class 11–12)", slug: "chemistry-coaching-11-12" }],
              meta: "November to February • ₹34,000",
            },
            {
              tag: "JEE & NEET Preparation",
              title: "Competitive Entrance Coaching",
              items: [
                { name: "Chemistry for IIT-JEE", slug: "chemistry-for-jee" },
                { name: "Chemistry for NEET", slug: "chemistry-for-neet" },
                {
                  name: "Competitive Examination Preparation",
                  slug: "competitive-exam-preparation",
                },
              ],
              meta: "November to May • ₹1,00,000",
            },
          ].map((group) => (
            <div
              key={group.tag}
              className="rounded-[26px] bg-white p-7 border border-[var(--line)] shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#88d89d]/30 text-[#0c3d3d]">
                  {group.tag}
                </span>
                <h3 className="mt-4 text-xl font-extrabold text-[var(--ink)]">{group.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((courseItem) => (
                    <li key={courseItem.slug}>
                      <Link
                        href={`/courses/${courseItem.slug}`}
                        className="group flex items-center justify-between py-2 px-3 rounded-xl bg-[#f8faf8] hover:bg-[#0c3d3d] text-xs sm:text-sm font-semibold text-[var(--ink)] hover:text-white transition-colors"
                      >
                        <span>{courseItem.name}</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-black/5 text-xs font-bold text-[var(--ink-soft)]">
                {group.meta}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 7. FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="py-16 sm:py-20 bg-[#ece7df]/50 border-t border-[var(--line)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#1d5d53]">
              Common Questions
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
              Frequently Asked Questions About Us
            </h2>
          </div>

          <div className="space-y-4">
            {aboutFaqs.map((faq, index) => {
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

      {/* ================= 8. ADMISSION CTA PANEL ================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0c3d3d] via-[#114b48] to-[#1d5d53] p-8 sm:p-12 lg:p-16 text-white shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#a8f0b0]/20 blur-3xl" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#a8f0b0] border border-white/15">
              Admission
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Begin your academic journey with expert guidance.
            </h2>
            <p className="text-sm sm:text-base text-[#d8f7d4]/85 leading-relaxed">
              Connect with Dheeraj Sir and our academic team in Gurugram to discuss the right batch
              for Class 9–12 Boards, Foundation, or IIT-JEE &amp; NEET Chemistry.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-extrabold text-sm sm:text-base bg-[#88d89d] text-[#0c3d3d] hover:bg-[#a8f0b0] transition-all shadow-lg active:scale-95"
            >
              Enquire now →
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-7 py-4 rounded-full font-bold text-sm sm:text-base border border-white/30 text-white bg-white/5 hover:bg-white/15 transition-all"
            >
              Browse Courses
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
