"use client";

import React, { useState } from "react";
import Image from "next/image";

// Sample Data tailored for a Coaching Institute / Academy
const testimonialsData = [
  {
    id: 1,
    headline: "The concept clarity and daily practice tests made all the difference.",
    quote:
      "ConceptNSolution helped me build rock-solid fundamentals in Physics and Chemistry. The faculty's mentorship gave me the confidence to secure a Top 500 AIR in JEE Advanced.",
    studentName: "Abhinav Ahuja",
    courseRole: "JEE Advanced Aspirant (AIR 342)",
    tags: ["Physics", "JEE Prep"],
    avatarUrl:
      "https://images.unsplash.com/photo-1581382575275-97901c2635b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    id: 2,
    headline: "Structured batch schedules and doubt sessions saved months of time.",
    quote:
      "The personalized feedback after every mock exam was invaluable. The educators didn't just teach theory—they taught me how to tackle tricky NEET questions efficiently.",
    studentName: "Suhani Patel",
    courseRole: "NEET Medical Scholar (695/720)",
    tags: ["Biology", "Mock Tests"],
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1661964243697-734d7bd664ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    id: 3,
    headline: "Exceptional faculty support and comprehensive study modules.",
    quote:
      "From answer-writing strategies to regular revision classes, every aspect of the coaching program was perfectly crafted for success in Board exams and entrance tests.",
    studentName: "Abhinav Gujjar",
    courseRole: "Class 12th Topper (98.4%)",
    tags: ["Mathematics", "Board Prep"],
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeTestimonial = testimonialsData[currentIndex];

  return (
    <section className="relative w-full flex items-center justify-center bg-[#f8faf8] px-4 py-16 sm:py-20 lg:py-24 md:px-12 overflow-hidden">
      {/* Background Subtle Grid Effect matching the layout */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#15803d 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Heading & Call to Action */}
        <div className="lg:col-span-5 flex flex-col items-start justify-center pr-0 lg:pr-6 space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              What Our <br className="hidden md:inline" /> Learners Say
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-md">
              Real feedback from students who achieved top ranks through Apex Academy's structured programs.
            </p>
          </div>

          <a
            href="#courses"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0c5138] hover:bg-[#083a28] text-white font-medium text-sm md:text-base rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Explore Courses
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </a>
        </div>

        {/* Right Column: Dark Green Main Card */}
        <div className="lg:col-span-7">
          <div className="w-full bg-[#033b2c] text-white rounded-3xl p-6 md:p-10 flex flex-col justify-between shadow-2xl relative min-h-[420px] transition-all duration-300">
            
            {/* Upper Content Area */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white leading-snug">
                "{activeTestimonial.headline}"
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
                "{activeTestimonial.quote}"
              </p>
            </div>

            {/* Separator Line */}
            <div className="w-full border-t border-emerald-900/60 my-6" />

            {/* Bottom Content Area */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              
              {/* Profile Details */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-emerald-700/40">
                  <Image
                    src={activeTestimonial.avatarUrl}
                    alt={activeTestimonial.studentName}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1">
                  {/* Quote Symbol Icon */}
                  <span className="text-emerald-400 text-xl font-serif font-bold leading-none block">
                    “
                  </span>
                  <h4 className="text-lg font-bold text-white leading-tight">
                    {activeTestimonial.studentName}
                  </h4>
                  <p className="text-xs md:text-sm text-emerald-300/80 font-medium">
                    {activeTestimonial.courseRole}
                  </p>
                </div>
              </div>

              {/* Tags & Dot Navigation Controls */}
              <div className="flex flex-col items-start sm:items-end gap-4">
                {/* Topic/Subject Tags */}
                <div className="flex items-center gap-2">
                  {activeTestimonial.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#064a38] text-xs font-medium text-emerald-200 rounded-full border border-emerald-800/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Dots Indicator */}
                <div className="flex items-center gap-2 mt-1">
                  {testimonialsData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentIndex === index
                          ? "w-6 bg-white"
                          : "w-2.5 bg-emerald-800/80 hover:bg-emerald-600"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}