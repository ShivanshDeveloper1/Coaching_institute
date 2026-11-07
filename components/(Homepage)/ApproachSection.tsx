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
    <section className="relative w-full bg-[#f2efe9] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#1d5d53] mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1d5d53]" />
            Our approach
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#172327] max-w-2xl leading-tight">
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
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`rounded-[24px] p-7 sm:p-8 flex flex-col justify-between border shadow-sm transition-shadow duration-300 ${
                  isDark
                    ? "bg-gradient-to-br from-[#0c3d3d] to-[#115350] text-white border-emerald-950/20 shadow-lg"
                    : isMint
                    ? "bg-gradient-to-br from-[#d9f9d0] to-[#b4ec9b] text-[#172327] border-emerald-300/40"
                    : "bg-gradient-to-b from-[#f7f8f5] to-white text-[#172327] border-black/5"
                }`}
              >
                <div>
                  {/* Icon Box */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold ${
                      isDark
                        ? "bg-white/10 text-[#a8f0b0]"
                        : isMint
                        ? "bg-[#0c3d3d]/15 text-[#0c3d3d]"
                        : "bg-[#0c3d3d]/10 text-[#0c3d3d]"
                    }`}
                  >
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3
                    className={`mt-6 text-2xl font-bold tracking-tight ${
                      isDark ? "text-white" : "text-[#172327]"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`mt-3 text-sm sm:text-base leading-relaxed ${
                      isDark ? "text-white/80" : isMint ? "text-[#172327]/80" : "text-[#55656b]"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Link */}
                <div className="mt-8 pt-2">
                  <Link
                    href={feature.href}
                    className={`inline-flex items-center gap-1.5 text-sm font-bold transition-all group ${
                      isDark
                        ? "text-[#a8f0b0] hover:text-white"
                        : "text-[#0c3d3d] hover:text-[#1d5d53]"
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
