import Link from "next/link";
import { courses, stats } from "./site-data";
import HeroLearnerSection from "@/components/(Homepage)/HeroLearnerSection";
import AcademicFoundationsSection from "@/components/(Homepage)/AcademicFoundationsSection";

export default function HomePage() {
  return (
    <>
    <HeroLearnerSection />

    <AcademicFoundationsSection />




      <section className="hero-section">
        <div className="container hero-row">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Coaching institute in Gurugram</p>
            <h1>Build stronger futures with expert guidance.</h1>
            <p className="hero-text">
              From school excellence to JEE and NEET preparation, ConceptnSolution helps students
              learn with confidence, clarity, and discipline.
            </p>

            <div className="hero-actions">
              <Link href="/courses" className="btn btn-primary">
                Explore courses
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Enquire now
              </Link>
            </div>

            <div className="mini-stats">
              {stats.slice(0, 3).map((item) => (
                <div key={item.label} className="mini-stat-box">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card">
              <img
                src="/gurgaon_coaching_teacher.jpeg"
                alt="Tutor with students"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container section-space about-strip">
        <div className="section-head">
          <p className="eyebrow">Our approach</p>
          <h2>Essential features for modern academic success</h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card light">
            <div className="feature-icon">◌</div>
            <h3>School excellence</h3>
            <p>Guidance designed to strengthen fundamentals and improve board exam performance.</p>
            <Link href="/courses" className="text-link">Explore more</Link>
          </div>

          <div className="feature-card mint">
            <div className="feature-icon">▣</div>
            <h3>Foundation learning</h3>
            <p>Concept-driven coaching that helps students build confidence and clarity from the start.</p>
            <Link href="/courses" className="text-link">Explore more</Link>
          </div>

          <div className="feature-card dark">
            <div className="feature-icon">✦</div>
            <h3>Competitive mentorship</h3>
            <p>Focused preparation for IIT-JEE and NEET with strategic study planning and support.</p>
            <Link href="/courses" className="text-link">Explore more</Link>
          </div>
        </div>
      </section>
      

      <section className="container section-space story-section">
        <div className="story-visual object-obtain">
          <img
            src="/result/result-2.jpeg"
            alt="Academic team"
          />
        </div>

        <div className="story-copy">
          <p className="eyebrow">Who we are</p>
          <h2>Comprehensive support for business and academic excellence.</h2>
          <p>
            ConceptnSolution is a coaching institute committed to making learning more effective,
            structured, and inspiring for students preparing for school and entrance exams.
          </p>
          <div className="story-metrics">
            <div className="metric-badge green">
              <strong>10K+</strong>
              <span>Practice assignments</span>
            </div>
            <div className="metric-badge">
              <strong>4.9/5</strong>
              <span>Student satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-space">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">Popular courses</p>
            <h2>Programs that shape bright futures.</h2>
          </div>
          <Link href="/courses" className="btn btn-primary btn-small">
            See all courses
          </Link>
        </div>

        <div className="course-grid home-grid">
          {courses.slice(0, 6).map((course) => (
            <article key={course.slug} className="course-card">
              <div className="course-card-top">
                <span className="course-badge">{course.badge}</span>
                <span className="course-category">{course.category}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-meta">
                <span>{course.duration}</span>
                <span>₹{course.fee.toLocaleString("en-IN")}</span>
              </div>
              <div className="course-card-bottom">
                <Link href={`/courses/${course.slug}`} className="text-link">
                  View details
                </Link>
                <Link href={`/checkout/${course.slug}`} className="btn btn-primary btn-small">
                  Enrol now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

<section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
  <div className="relative overflow-hidden rounded-[32px] bg-[#0c3d3d] p-6 sm:p-10 md:p-14 lg:p-16 text-white shadow-2xl transition-all duration-300">
    
    {/* Decorative Background Accents */}
    <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#1d5d53]/30 blur-3xl" />
    <div className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-[#88d89d]/20 blur-3xl" />

    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      
      {/* Left Column: Value Pitch & Info */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div>
          <span className="inline-block rounded-full bg-[#1d5d53]/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#a8f0b0] border border-[#88d89d]/30 backdrop-blur-md">
            Admission Enquiry
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Start your preparation journey with us.
          </h2>
          <p className="mt-4 text-sm text-[#d8f7d4]/80 leading-relaxed sm:text-base">
            Take the first step toward academic excellence. Fill out the form, and our counselors will reach out to guide you through courses, fee structures, and batch schedules.
          </p>
        </div>

        {/* Quick Highlights */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-[#d8f7d4]">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1d5d53] text-[#a8f0b0] font-bold">✓</span>
            Expert-led interactive sessions
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm text-[#d8f7d4]">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1d5d53] text-[#a8f0b0] font-bold">✓</span>
            Personalized mentoring & doubt removal
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="lg:col-span-7">
        <form className="flex flex-col gap-5 rounded-2xl bg-white/10 p-5 sm:p-8 backdrop-blur-md border border-white/10 shadow-inner">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            
            {/* Full Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-semibold tracking-wide uppercase text-[#d8f7d4]">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter Your Name"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-base text-white placeholder:text-white/40 backdrop-blur-sm transition-all duration-200 focus:border-[#a8f0b0] focus:bg-white/20 focus:outline-none focus:ring-4 focus:ring-[#a8f0b0]/20"
              />
            </div>

            {/* Phone Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-xs font-semibold tracking-wide uppercase text-[#d8f7d4]">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-base text-white placeholder:text-white/40 backdrop-blur-sm transition-all duration-200 focus:border-[#a8f0b0] focus:bg-white/20 focus:outline-none focus:ring-4 focus:ring-[#a8f0b0]/20"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-semibold tracking-wide uppercase text-[#d8f7d4]">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-base text-white placeholder:text-white/40 backdrop-blur-sm transition-all duration-200 focus:border-[#a8f0b0] focus:bg-white/20 focus:outline-none focus:ring-4 focus:ring-[#a8f0b0]/20"
            />
          </div>

          {/* Course Selection */}
          <div className="flex flex-col gap-2">
            <label htmlFor="course" className="text-xs font-semibold tracking-wide uppercase text-[#d8f7d4]">
              Course Interest
            </label>
            <select
              id="course"
              defaultValue=""
              className="w-full rounded-xl border border-white/20 bg-[#0c3d3d] px-4 py-3.5 text-base text-white transition-all duration-200 focus:border-[#a8f0b0] focus:outline-none focus:ring-4 focus:ring-[#a8f0b0]/20"
            >
              <option value="" disabled className="bg-[#0c3d3d] text-white/60">
                Select a course
              </option>
              <option className="bg-[#0c3d3d] text-white">CBSE Board Preparation</option>
              <option className="bg-[#0c3d3d] text-white">ICSE Board Preparation</option>
              <option className="bg-[#0c3d3d] text-white">Foundation Courses</option>
              <option className="bg-[#0c3d3d] text-white">Chemistry for IIT-JEE</option>
              <option className="bg-[#0c3d3d] text-white">Chemistry for NEET</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#a8f0b0] px-6 py-4 font-bold text-[#0c3d3d] transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-[#a8f0b0]/20 active:scale-[0.99]"
          >
            <span>Send Enquiry</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
        </form>
      </div>

    </div>
  </div>
</section>

    </>
  );
}
