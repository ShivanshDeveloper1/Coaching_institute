import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "../../site-data";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    return {
      title: "Course Not Found | ConceptnSolution",
    };
  }

  return {
    title: course.seoTitle,
    description: course.seoDescription,
    alternates: {
      canonical: `https://conceptinsolution.com/courses/${course.slug}`,
    },
    openGraph: {
      title: course.seoTitle,
      description: course.seoDescription,
      type: "website",
      url: `https://conceptinsolution.com/courses/${course.slug}`,
      images: [
        {
          url: course.image,
          alt: course.imageAlt,
        },
      ],
    },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    return notFound();
  }

  // Select 3 related courses: prioritize same category, then fill with other courses
  const sameCategoryCourses = courses.filter(
    (item) => item.slug !== course.slug && item.category === course.category
  );
  const otherCourses = courses.filter(
    (item) => item.slug !== course.slug && item.category !== course.category
  );
  const relatedCourses = [...sameCategoryCourses, ...otherCourses].slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
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
            name: "Courses",
            item: "https://conceptinsolution.com/courses",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: course.title,
            item: `https://conceptinsolution.com/courses/${course.slug}`,
          },
        ],
      },
      {
        "@type": "Course",
        name: course.title,
        description: course.seoDescription,
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
        instructor: {
          "@type": "Person",
          name: course.mentor,
          description: "Lead Mentor with 15+ years of teaching experience",
        },
        offers: {
          "@type": "Offer",
          price: course.fee,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: `https://conceptinsolution.com/checkout/${course.slug}`,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: course.faqs.map((faq) => ({
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
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ================= 1. COURSE-SPECIFIC HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2628] via-[#0c3d3d] to-[#1d5d53] text-white pt-10 pb-16 sm:pt-14 sm:pb-24">
        {/* Ambient Decorative Accents */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#88d89d]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#a8f0b0]/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#d8f7d4]/75 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-white transition-colors">
              Courses
            </Link>
            <span>/</span>
            <span className="text-[#a8f0b0] font-semibold">{course.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Course Headline, Tagline & Key Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#a8f0b0] text-[#0c3d3d]">
                  {course.badge}
                </span>
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#d8f7d4] border border-white/15">
                  {course.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.06] text-white">
                {course.title}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-[#a8f0b0] leading-snug">
                {course.tagline}
              </p>

              <p className="text-base sm:text-lg text-[#d8f7d4]/90 leading-relaxed max-w-2xl">
                {course.description}
              </p>

              {/* Key Meta Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="rounded-2xl bg-white/[0.08] border border-white/15 p-4 backdrop-blur-sm">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#a8f0b0]">
                    Target Class / Exam
                  </span>
                  <strong className="mt-1 block text-base sm:text-lg font-extrabold text-white">
                    {course.classLevel}
                  </strong>
                </div>

                <div className="rounded-2xl bg-white/[0.08] border border-white/15 p-4 backdrop-blur-sm">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#a8f0b0]">
                    Program Duration
                  </span>
                  <strong className="mt-1 block text-base sm:text-lg font-extrabold text-white">
                    {course.duration}
                  </strong>
                </div>

                <div className="col-span-2 sm:col-span-1 rounded-2xl bg-white/[0.08] border border-white/15 p-4 backdrop-blur-sm">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#a8f0b0]">
                    Lead Faculty
                  </span>
                  <strong className="mt-1 block text-base sm:text-lg font-extrabold text-white">
                    {course.mentor}
                  </strong>
                </div>
              </div>

              {/* Hero Highlight Pills */}
              <div className="pt-2">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#d8f7d4]/75 mb-3">
                  Key Program Highlights
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {course.highlights.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-xs sm:text-sm font-semibold text-white"
                    >
                      <span className="text-[#a8f0b0] font-bold">✓</span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Course Summary & Enrolment Card */}
            <aside className="lg:col-span-5 w-full">
              <div className="rounded-[28px] bg-white text-[var(--ink)] overflow-hidden shadow-2xl border border-white/20">
                {/* Course Banner Image */}
                <div className="relative h-56 w-full overflow-hidden bg-[#0c3d3d]">
                  <img
                    src={course.image}
                    alt={course.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c3d3d]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                    <span className="text-xs font-bold uppercase tracking-wider bg-[#0c3d3d]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                      Gurugram Classroom &amp; Doubt Support
                    </span>
                  </div>
                </div>

                {/* Summary Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="flex items-baseline justify-between border-b border-black/10 pb-5">
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                        Complete Course Fee
                      </span>
                      <strong className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0c3d3d]">
                        ₹{course.fee.toLocaleString("en-IN")}
                      </strong>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#88d89d]/30 text-[#0c3d3d]">
                      <span className="h-2 w-2 rounded-full bg-[#1d5d53]" />
                      Admissions Open
                    </span>
                  </div>

                  <div>
                    <h2 className="text-sm font-extrabold uppercase tracking-wider text-[var(--ink)] mb-3.5">
                      Course Summary
                    </h2>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center justify-between py-1.5 border-b border-black/5">
                        <span className="text-[var(--ink-soft)]">Class level</span>
                        <strong className="font-bold text-[var(--ink)]">{course.classLevel}</strong>
                      </li>
                      <li className="flex items-center justify-between py-1.5 border-b border-black/5">
                        <span className="text-[var(--ink-soft)]">Duration</span>
                        <strong className="font-bold text-[var(--ink)]">{course.duration}</strong>
                      </li>
                      <li className="flex items-center justify-between py-1.5 border-b border-black/5">
                        <span className="text-[var(--ink-soft)]">Mentor</span>
                        <strong className="font-bold text-[var(--ink)]">{course.mentor}</strong>
                      </li>
                      <li className="flex items-center justify-between py-1.5 border-b border-black/5">
                        <span className="text-[var(--ink-soft)]">Target Batch Size</span>
                        <strong className="font-bold text-[var(--ink)]">20 Students</strong>
                      </li>
                      <li className="flex items-center justify-between py-1.5">
                        <span className="text-[var(--ink-soft)]">Assessments</span>
                        <strong className="font-bold text-[var(--ink)]">Regular Tests &amp; Doubt Clinics</strong>
                      </li>
                    </ul>
                  </div>

                  {/* Primary & Secondary Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <Link
                      href={`/checkout/${course.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-extrabold text-sm sm:text-base bg-[#88d89d] text-[#0c3d3d] hover:bg-[#a8f0b0] transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <span>Buy now — ₹{course.fee.toLocaleString("en-IN")}</span>
                      <span>→</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base border-2 border-[#0c3d3d]/20 text-[#0c3d3d] bg-white hover:bg-[#f0f4f2] transition-colors"
                    >
                      Enquire now
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ================= 2. IN-DEPTH OVERVIEW & LEARNING OUTCOMES ================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left 7 Cols: Detailed Overview & Learning Outcomes */}
          <div className="lg:col-span-7 space-y-10">
            <div className="bg-white rounded-[28px] p-7 sm:p-9 border border-[var(--line)] shadow-sm space-y-5">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.14em] text-[#1d5d53]">
                About This Program
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)]">
                Course Overview &amp; Academic Focus
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed">
                {course.longDescription.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-white rounded-[28px] p-7 sm:p-9 border border-[var(--line)] shadow-sm">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.14em] text-[#1d5d53]">
                Key Outcomes
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)]">
                What you’ll learn &amp; master
              </h2>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">
                Tangible academic skills and exam capabilities built throughout the {course.title} program.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4">
                {course.learningOutcomes.map((outcome, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3.5 rounded-2xl bg-[#f8faf8] p-4 border border-[var(--line)]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0c3d3d] text-[#a8f0b0] text-xs font-extrabold mt-0.5">
                      ✓
                    </span>
                    <p className="text-sm sm:text-base font-medium text-[var(--ink)] leading-relaxed">
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Who This Course Is For & Mentor Card */}
          <div className="lg:col-span-5 space-y-8">
            {/* Ideal For Card */}
            <div className="rounded-[28px] bg-gradient-to-br from-[#d9f9d0]/70 to-[#b4ec9b]/60 p-7 sm:p-8 border border-emerald-300/50 shadow-sm">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0c3d3d] text-[#a8f0b0]">
                Student Profile
              </span>
              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-[#0c3d3d]">
                Who should enrol in this program?
              </h3>
              <ul className="mt-5 space-y-3.5">
                {course.idealFor.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base text-[#172327] font-medium leading-relaxed"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#0c3d3d] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Faculty / Mentor Spotlight Card */}
            <div className="rounded-[28px] bg-[#0c3d3d] text-white p-7 sm:p-8 shadow-xl border border-white/10">
              <div className="flex items-center gap-4">
                <img
                  src="/gurgaon_coaching_teacher.jpeg"
                  alt="Dheeraj Sir - Lead Faculty at ConceptnSolution"
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-[#a8f0b0] shrink-0"
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#a8f0b0]">
                    Your Mentor
                  </span>
                  <h3 className="text-xl font-extrabold text-white">{course.mentor}</h3>
                  <p className="text-xs text-[#d8f7d4]/80">15+ Years of Teaching Excellence</p>
                </div>
              </div>

              <p className="mt-5 text-sm text-[#d8f7d4]/90 leading-relaxed">
                Under the direct guidance of Dheeraj Sir, students develop conceptual clarity,
                disciplined problem-solving habits, and the confidence to excel in both school
                boards and competitive entrance examinations.
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#a8f0b0] font-semibold">
                <span>100% Concept-Focused</span>
                <span>Personal Doubt Support</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 3. STRUCTURED CURRICULUM & MODULES ================= */}
      <section className="py-16 sm:py-20 bg-[#ece7df]/60 border-y border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#1d5d53]">
              Structured Syllabus Roadmap
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
              Curriculum Phases &amp; Core Modules
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--ink-soft)]">
              How we structure your preparation across the {course.duration.toLowerCase()} in{" "}
              {course.title}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {course.curriculumModules.map((mod) => (
              <div
                key={mod.number}
                className="rounded-[26px] bg-white p-7 border border-[var(--line)] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0c3d3d] text-[#a8f0b0] font-extrabold text-base">
                      {mod.number}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                      Phase {mod.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold tracking-tight text-[var(--ink)]">
                    {mod.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[var(--ink-soft)] leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <ul className="mt-6 pt-5 border-t border-black/5 space-y-2.5">
                  {mod.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[var(--ink)]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1d5d53] shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. 3-STEP LEARNING APPROACH ================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#1d5d53]">
            Pedagogy
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
            Our 3-Step Learning Approach
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {course.learningApproach.map((stepItem, index) => (
            <div
              key={stepItem.step}
              className={`rounded-[26px] p-7 border shadow-sm ${
                index === 2
                  ? "bg-[#0c3d3d] text-white border-[#0c3d3d]"
                  : "bg-white text-[var(--ink)] border-[var(--line)]"
              }`}
            >
              <span
                className={`inline-block text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${
                  index === 2
                    ? "bg-white/10 text-[#a8f0b0]"
                    : "bg-[#88d89d]/30 text-[#0c3d3d]"
                }`}
              >
                Step {stepItem.step}
              </span>
              <h3 className="mt-4 text-2xl font-extrabold tracking-tight">{stepItem.title}</h3>
              <p
                className={`mt-2.5 text-sm sm:text-base leading-relaxed ${
                  index === 2 ? "text-[#d8f7d4]/85" : "text-[var(--ink-soft)]"
                }`}
              >
                {stepItem.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 5. COURSE-SPECIFIC FAQS ================= */}
      <section className="py-16 sm:py-20 bg-[#ece7df]/50 border-t border-[var(--line)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#1d5d53]">
              Course FAQs
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
              Common Questions About {course.title}
            </h2>
          </div>

          <div className="space-y-4">
            {course.faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="group rounded-2xl bg-white border border-[var(--line)] p-5 sm:p-6 shadow-sm"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-base sm:text-lg text-[var(--ink)]">
                  <span>{faq.question}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0f4f2] text-[#0c3d3d] font-bold transition-transform duration-200 group-open:rotate-45 group-open:bg-[#88d89d]">
                    +
                  </span>
                </summary>
                <p className="mt-4 pt-4 border-t border-black/5 text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6. RELATED / POPULAR COURSES ================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#1d5d53]">
              Explore More Programs
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
              Related Courses at ConceptnSolution
            </h2>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0c3d3d] hover:text-[#1d5d53]"
          >
            <span>View all {courses.length} courses</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {relatedCourses.map((rel) => (
            <article
              key={rel.slug}
              className="group bg-white rounded-[26px] overflow-hidden border border-[var(--line)] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-[#0c3d3d]">
                  <img
                    src={rel.image}
                    alt={rel.imageAlt}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c3d3d]/85 via-transparent to-transparent" />
                  <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-[#a8f0b0] text-[#0c3d3d]">
                      {rel.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/45 text-white backdrop-blur-sm">
                      {rel.classLevel}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-xs font-semibold text-[var(--ink-soft)]">
                    {rel.category} • {rel.duration}
                  </span>
                  <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-[var(--ink)] group-hover:text-[#0c3d3d] transition-colors">
                    <Link href={`/courses/${rel.slug}`}>{rel.title}</Link>
                  </h3>
                  <p className="mt-2 text-sm text-[var(--ink-soft)] line-clamp-2 leading-relaxed">
                    {rel.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-black/5 flex items-center justify-between">
                <strong className="text-xl font-extrabold text-[#0c3d3d]">
                  ₹{rel.fee.toLocaleString("en-IN")}
                </strong>
                <Link
                  href={`/courses/${rel.slug}`}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full font-bold text-xs bg-[#88d89d] text-[#0c3d3d] hover:bg-[#a8f0b0] transition-colors"
                >
                  View details →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= 7. BOTTOM ENROLMENT CTA ================= */}
      <section className="pb-20 pt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-gradient-to-r from-[#0c3d3d] via-[#114b48] to-[#1d5d53] p-8 sm:p-12 text-white shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a8f0b0]">
              Ready to Begin {course.title}?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Secure your seat in our focused 20-student batch.
            </h2>
            <p className="text-sm sm:text-base text-[#d8f7d4]/85 leading-relaxed">
              Enrol directly online or schedule a one-on-one counseling session with Dheeraj Sir at
              our Gurugram center.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href={`/checkout/${course.slug}`}
              className="inline-flex items-center justify-center px-7 py-4 rounded-full font-extrabold text-sm sm:text-base bg-[#a8f0b0] text-[#0c3d3d] hover:bg-white transition-all shadow-lg"
            >
              Enroll Now — ₹{course.fee.toLocaleString("en-IN")} →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-4 rounded-full font-bold text-sm sm:text-base border border-white/30 text-white bg-white/5 hover:bg-white/15 transition-all"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
