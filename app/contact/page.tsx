"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { motion, type Variants } from "framer-motion";

const courses = [
  "CBSE Board Preparation",
  "ICSE Board Preparation",
  "Foundation Courses",
  "Chemistry Coaching",
  "Chemistry for IIT-JEE",
  "Chemistry for NEET",
  "Competitive Examination Preparation",
];

const badges = ["School Coaching", "Foundation", "JEE / NEET"];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const inputClass =
  "w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 outline-none transition duration-300 focus:border-[var(--green-700)] focus:bg-white focus:ring-4 focus:ring-[var(--green-300)]/60";

const labelClass =
  "flex flex-col gap-2 text-sm font-semibold text-[var(--green-900)]";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-16 sm:px-8 lg:pt-24">
        {/* Hero */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[var(--green-900)] via-[var(--green-800)] to-[var(--green-700)] px-8 py-14 text-white shadow-[var(--shadow)] sm:px-12"
        >
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.15, 1], rotate: [0, 8, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--green-500)]/20 blur-3xl"
          />
          <motion.div
            aria-hidden
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-[var(--green-600)]/20 blur-3xl"
          />

          <div className="relative max-w-2xl">
            <motion.p
              variants={item}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--green-300)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--green-500)]" />
              Contact us
            </motion.p>
            <motion.h1
              variants={item}
              className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl"
            >
              Let’s help you choose the{" "}
              <span className="text-[var(--green-500)]">right course.</span>
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
            >
              Tell us about your goals and we’ll guide you to the program that
              fits your child’s level, schedule, and ambitions.
            </motion.p>
          </div>
        </motion.section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info card */}
          <motion.aside
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="relative flex flex-col overflow-hidden rounded-[var(--radius)] bg-[var(--green-900)] p-8 text-white shadow-[var(--shadow)] sm:p-10"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--green-500)] to-[var(--green-600)]" />

            <h3 className="text-2xl font-bold">Institute details</h3>
            <p className="mt-2 text-sm text-white/60">
              Reach out anytime. We reply within one working day.
            </p>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="mt-8 space-y-5"
            >
              {[
                { label: "Location", value: "Gurugram, Haryana" },
                { label: "Teacher", value: "Dheeraj Sir" },
                { label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
                {
                  label: "Email",
                  value: "admissions@conceptinsolution.com",
                  href: "mailto:admissions@conceptinsolution.com",
                },
              ].map((row) => (
                <motion.li
                  key={row.label}
                  variants={item}
                  className="flex items-start gap-4 rounded-2xl bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--green-500)]">
                      {row.label}
                    </p>
                    {row.href ? (
                      <a
                        href={row.href}
                        className="mt-1 block truncate text-base font-medium text-white hover:text-[var(--green-300)]"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-base font-medium text-white">
                        {row.value}
                      </p>
                    )}
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-[var(--green-500)]/30 bg-[var(--green-500)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--green-300)]"
                >
                  {b}
                </span>
              ))}
            </div>
          </motion.aside>

          {/* Form card */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow)] sm:p-10"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex h-full min-h-[420px] flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--green-300)] text-3xl text-[var(--green-800)]"
                >
                  ✓
                </motion.div>
                <h3 className="mt-6 text-2xl font-bold text-[var(--green-900)]">
                  Thank you, we’ve got it!
                </h3>
                <p className="mt-2 max-w-sm text-[var(--ink-soft)]">
                  Our team will reach out shortly to help you pick the right
                  course.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-sm font-semibold text-[var(--green-700)] underline-offset-4 hover:underline"
                >
                  Submit another enquiry
                </button>
              </motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-[var(--green-900)]">
                  Admission enquiry
                </h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">
                  Fill in the details below and we’ll get back to you.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label htmlFor="name" className={labelClass}>
                      Name
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Student name"
                        className={inputClass}
                      />
                    </label>
                    <label htmlFor="phone" className={labelClass}>
                      Phone
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+91 "
                        className={inputClass}
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label htmlFor="email" className={labelClass}>
                      Email
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        className={inputClass}
                      />
                    </label>
                    <label htmlFor="course" className={labelClass}>
                      Course interest
                      <select
                        id="course"
                        name="course"
                        defaultValue=""
                        required
                        className={`${inputClass} appearance-none`}
                      >
                        <option value="" disabled>
                          Select course
                        </option>
                        {courses.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label htmlFor="message" className={labelClass}>
                    Message
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us what you need help with"
                      className={`${inputClass} resize-none`}
                    />
                  </label>

                  <motion.button
                    type="submit"
                    whileHover={{ y: -2, boxShadow: "0 18px 40px rgba(12,61,61,0.25)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-2xl bg-gradient-to-r from-[var(--green-800)] to-[var(--green-700)] px-6 py-4 text-base font-bold text-white transition"
                  >
                    Submit enquiry
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[var(--radius)] bg-[var(--green-500)] p-8 shadow-[var(--shadow)] sm:flex-row sm:items-center sm:p-10"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--green-900)]/70">
              Need quick guidance?
            </p>
            <h3 className="mt-2 text-2xl font-extrabold text-[var(--green-900)] sm:text-3xl">
              Talk to the institute team today.
            </h3>
          </div>
          <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-2xl bg-[var(--green-900)] px-7 py-4 font-bold text-white shadow-lg transition hover:bg-[var(--green-800)]"
            >
              Explore courses
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}