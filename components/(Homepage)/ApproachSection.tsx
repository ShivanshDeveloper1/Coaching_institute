"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ApproachSection() {
  const features = [
    {
      icon: "◌",
      title: "School excellence",
      description: "Guidance designed to strengthen fundamentals and improve board exam performance.",
      href: "/courses",
      variant: "light",
    },
    {
      icon: "▣",
      title: "Foundation learning",
      description: "Concept-driven coaching that helps students build confidence and clarity from the start.",
      href: "/courses",
      variant: "mint",
    },
    {
      icon: "✦",
      title: "Competitive mentorship",
      description: "Focused preparation for IIT-JEE and NEET with strategic study planning and support.",
      href: "/courses",
      variant: "dark",
    },
  ];

  return (
    <section className="relative w-full bg-[var(--bg)] py-16 sm:py-20 lg:py-24 border-t border-[var(--line)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          className="mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--green-700)] bg-[var(--green-300)]/50 px-3.5 py-1 rounded-full mb-3 border border-[var(--green-700)]/15">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--green-700)]" />
            Our approach
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--ink)] max-w-2xl leading-[1.12]">
            Essential features for modern academic success
          </h2>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const isDark = feature.variant === "dark";
            const isMint = feature.variant === "mint";

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
                className={`rounded-[var(--radius)] p-7 sm:p-8 flex flex-col justify-between border shadow-sm hover:shadow-md transition-shadow duration-300 ${
                  isDark
                    ? "bg-gradient-to-br from-[var(--green-900)] to-[#115350] text-white border-white/10"
                    : isMint
                    ? "bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] text-[var(--ink)] border-emerald-300/60"
                    : "bg-[var(--surface)] text-[var(--ink)] border-[var(--line)]"
                }`}
              >
                <div>
                  {/* Icon Box */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold transition-transform duration-200 group-hover:scale-105 ${
                      isDark
                        ? "bg-white/10 text-[var(--green-500)]"
                        : isMint
                        ? "bg-[var(--green-900)]/15 text-[var(--green-900)]"
                        : "bg-[var(--surface-soft)] text-[var(--green-900)] border border-[var(--line)]"
                    }`}
                  >
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3
                    className={`mt-6 text-xl sm:text-2xl font-bold tracking-tight ${
                      isDark ? "text-white" : "text-[var(--ink)]"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`mt-3 text-sm sm:text-base leading-relaxed ${
                      isDark ? "text-white/80" : isMint ? "text-[var(--ink)]/80" : "text-[var(--ink-soft)]"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Link */}
                <div className="mt-7 pt-2">
                  <Link
                    href={feature.href}
                    className={`inline-flex items-center gap-1.5 text-sm font-bold transition-all group ${
                      isDark
                        ? "text-[var(--green-500)] hover:text-white"
                        : "text-[var(--green-800)] hover:text-[var(--green-900)]"
                    }`}
                  >
                    <span>Explore more</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
