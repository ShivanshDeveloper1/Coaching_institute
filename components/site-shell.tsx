"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Menu, 
  X, 
  ArrowRight, 
  LayoutDashboard, 
  Shield, 
  LogOut, 
  BookOpen,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  User
} from "lucide-react";
import { NavAuthSection } from "./NavAuthSection";
import { navItems } from "@/app/site-data";
import { useUser, useAuth } from "@/context/AuthContext";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoaded, isAdmin: isUserAdmin } = useUser();
  const { logout } = useAuth();

  // Close mobile drawer when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  if (isAdmin) {
    return <>{children}</>;
  }

  const handleMobileLogout = async () => {
    setMobileMenuOpen(false);
    await logout();
  };

  return (
    <div className="page-shell min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)]">
      {/* Top Navigation Bar: Rich Dark Emerald Slate with Pure White text */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0a3333]/95 border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-2.5 sm:py-3 px-3 sm:px-6 lg:px-8">
          
          {/* Brand Logo with Original Logo Image */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 font-bold group flex-shrink-0 min-w-0"
            aria-label="ConceptnSolution Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-white/10 p-0.5 border border-white/20 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src="/logo-11.png"
                alt="ConceptNSolution"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-lg lg:text-xl font-extrabold tracking-tight text-white leading-tight group-hover:text-[var(--green-300)] transition-colors truncate">
                ConceptNSolution
              </span>
              <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-bold text-white/70 uppercase tracking-[0.12em] sm:tracking-[0.14em]">
                Academy • Gurugram
              </span>
            </div>
          </Link>

          {/* Desktop & Tablet Navigation: Pure White with Mint active badge */}
          <nav
            className="hidden lg:flex items-center gap-1.5 xl:gap-2"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 xl:px-4 py-2 rounded-full text-sm font-bold tracking-tight transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "bg-white/15 text-[var(--green-300)] border border-white/20 shadow-sm"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* Auth section */}
            <NavAuthSection showDashboardButton={false} />

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white border border-white/20 shadow-sm hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--green-500)] active:scale-95 flex-shrink-0"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Framer Motion */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 top-[65px] bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                aria-hidden="true"
              />

              {/* Slide-down Drawer Panel */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="fixed inset-x-0 top-[65px] bg-[#0c3d3d] border-b border-white/15 shadow-2xl z-50 lg:hidden px-4 sm:px-6 py-6 max-h-[calc(100vh-70px)] overflow-y-auto text-white"
              >
                {/* User quick status banner inside mobile drawer */}
                {isLoaded && user && (
                  <div className="mb-5 p-3.5 rounded-2xl bg-white/10 border border-white/15 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-[var(--green-500)] text-[var(--green-900)] font-black flex items-center justify-center text-sm flex-shrink-0 shadow-sm">
                        {(user.displayName?.charAt(0) || user.email?.charAt(0) || "U").toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">
                          {user.displayName || "Student"}
                        </p>
                        <p className="text-[11px] text-white/70 font-medium truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {isUserAdmin && (
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-amber-400 text-amber-950 flex-shrink-0">
                        ADMIN
                      </span>
                    )}
                  </div>
                )}

                {/* Dashboard & Quick Actions Section */}
                <div className="mb-5 flex flex-col gap-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--green-300)] px-2">
                    Student Portal
                  </div>

                  {/* Dashboard link for logged-in students or Login link */}
                  {isLoaded && user ? (
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-extrabold transition-all shadow-sm ${
                        pathname === "/dashboard"
                          ? "bg-[var(--green-500)] text-[var(--green-900)] ring-2 ring-white/30"
                          : "bg-white/15 text-white hover:bg-white/20 border border-white/15"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <LayoutDashboard className="w-5 h-5 text-[var(--green-300)]" />
                        Dashboard
                      </span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-extrabold bg-[var(--green-500)] text-[var(--green-900)] shadow-sm hover:bg-[var(--green-300)] transition-all"
                    >
                      <span className="flex items-center gap-2.5">
                        <User className="w-5 h-5 text-[var(--green-900)]" />
                        Login to Portal
                      </span>
                      <ArrowRight className="w-4 h-4 text-[var(--green-900)]" />
                    </Link>
                  )}

                  {/* Admin Panel link */}
                  {isLoaded && user && isUserAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold bg-amber-400/20 text-amber-200 border border-amber-400/30 hover:bg-amber-400/30 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-amber-300" />
                        Admin Panel
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                    </Link>
                  )}
                </div>

                {/* Main Navigation Links */}
                <div className="flex flex-col gap-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--green-300)] px-2 mb-0.5">
                    Explore
                  </div>
                  {navItems.map((item, idx) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03, duration: 0.18 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold transition-all ${
                            isActive
                              ? "bg-[var(--green-500)] text-[var(--green-900)] shadow-sm"
                              : "bg-white/5 text-white hover:bg-white/15 border border-white/10"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ArrowRight
                            className={`w-4 h-4 ${isActive ? "text-[var(--green-900)]" : "text-white/60"}`}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer inside mobile drawer */}
                <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/70 font-semibold">
                  <span>ConceptNSolution • Gurugram</span>
                  {isLoaded && user && (
                    <button
                      type="button"
                      onClick={handleMobileLogout}
                      className="inline-flex items-center gap-1.5 font-bold text-red-400 hover:text-red-300 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Main Page Content */}
      <main className="flex-1">{children}</main>

      {/* Luxury Dark Emerald Footer: High Contrast, Spacing & Clear Readability */}
      <footer className="bg-[#072424] text-white border-t border-white/10 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[var(--green-700)]/15 blur-3xl" />
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[var(--green-500)]/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
            
            {/* Column 1: Brand & Philosophy */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/10 p-0.5 border border-white/20 shadow-sm flex items-center justify-center overflow-hidden">
                  <img
                    src="/logo-11.png"
                    alt="ConceptNSolution"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <span className="text-xl font-extrabold text-white tracking-tight leading-none block">
                    ConceptNSolution
                  </span>
                  <span className="text-[11px] font-bold text-white/70 uppercase tracking-[0.14em]">
                    Coaching Institute
                  </span>
                </div>
              </div>

              <p className="text-sm text-white/80 leading-relaxed font-normal max-w-sm pt-1">
                Premier coaching institute in Gurugram dedicated to concept-first learning, school academic excellence, foundation mastery, and elite IIT-JEE & NEET preparation under Dheeraj Sir.
              </p>

              <div className="flex items-center gap-2 pt-2 text-xs font-bold text-[var(--green-300)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--green-500)]" />
                <span>Verified Admissions • Small Focused Batches</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--green-500)]">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/about" className="text-sm font-semibold text-white/85 hover:text-[var(--green-300)] transition-colors inline-block">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="text-sm font-semibold text-white/85 hover:text-[var(--green-300)] transition-colors inline-block">
                    All Courses
                  </Link>
                </li>
                <li>
                  <Link href="/test-series" className="text-sm font-semibold text-white/85 hover:text-[var(--green-300)] transition-colors inline-block">
                    Test Series
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm font-semibold text-white/85 hover:text-[var(--green-300)] transition-colors inline-block">
                    Contact & Enquiry
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Academic Programs */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--green-500)]">
                Programs
              </h4>
              <ul className="space-y-2.5 text-sm font-semibold text-white/85">
                <li>CBSE / ICSE Board Prep</li>
                <li>Class 9–10 Foundation</li>
                <li>Class 11–12 Chemistry</li>
                <li>IIT-JEE Main & Advanced</li>
                <li>NEET Medical Chemistry</li>
              </ul>
            </div>

            {/* Column 4: Gurugram Campus Contact */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--green-500)]">
                Campus Contact
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2.5 text-white/85 font-medium">
                  <MapPin className="w-4 h-4 text-[var(--green-500)] flex-shrink-0 mt-0.5" />
                  <span>Sector 14 / DLF Phase, Gurugram, Haryana</span>
                </li>
                <li>
                  <a 
                    href="tel:+919876543210" 
                    className="flex items-center gap-2.5 font-bold text-white hover:text-[var(--green-300)] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[var(--green-500)] flex-shrink-0" />
                    <span>+91 98765 43210</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:admissions@conceptinsolution.com" 
                    className="flex items-center gap-2.5 font-semibold text-white/90 hover:text-[var(--green-300)] transition-colors truncate"
                  >
                    <Mail className="w-4 h-4 text-[var(--green-500)] flex-shrink-0" />
                    <span>admissions@conceptinsolution.com</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Guarantee */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-white/60">
            <span>© 2026 ConceptnSolution Academy. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <span>Concept-First Teaching</span>
              <span>•</span>
              <span>Designed for Modern Learning</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

