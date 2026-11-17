"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight, LayoutDashboard, Shield, LogOut, BookOpen } from "lucide-react";
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
    <div className="page-shell">
      <header className="topbar sticky top-0 z-40 backdrop-blur-md bg-[var(--bg)]/90 border-b border-[var(--line)]">
        <div className="container nav-wrap flex items-center justify-between py-2.5 sm:py-3 px-4 sm:px-6">
          {/* Brand Logo */}
          <Link
            href="/"
            className="brand flex items-center gap-2 sm:gap-2.5 font-bold text-[var(--ink)] flex-shrink-0"
            aria-label="ConceptnSolution home"
          >
            <img
              src="/logo-11.png"
              alt="ConceptNSolution"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shadow-sm flex-shrink-0"
            />
            <span className="text-base sm:text-lg tracking-tight font-extrabold text-[var(--green-900)] whitespace-nowrap">
              ConceptNSolution
            </span>
          </Link>

          {/* Desktop & Tablet Navigation */}
          <nav
            className="main-nav hidden lg:flex items-center gap-1 xl:gap-1.5"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 xl:px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "bg-[var(--green-900)] text-white shadow-sm"
                      : "text-[var(--ink)] hover:text-[var(--green-900)] hover:bg-[var(--surface-soft)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* NavAuthSection with Dashboard button removed from main navbar */}
            <NavAuthSection showDashboardButton={false} />

            {/* Mobile / Tablet Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] shadow-sm hover:bg-[var(--surface-soft)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--green-900)] flex-shrink-0"
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
                className="fixed inset-0 top-[60px] sm:top-[65px] bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                aria-hidden="true"
              />

              {/* Slide-down Drawer Panel */}
              <motion.div
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-x-0 top-[60px] sm:top-[65px] bg-[var(--bg)] border-b border-[var(--line)] shadow-[var(--shadow)] z-50 lg:hidden px-4 sm:px-6 py-5 max-h-[calc(100vh-65px)] overflow-y-auto"
              >
                {/* User quick status banner inside mobile drawer if logged in */}
                {isLoaded && user && (
                  <div className="mb-4 p-3 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[var(--green-900)] text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
                        {(user.displayName?.charAt(0) || user.email?.charAt(0) || "U").toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[var(--ink)] truncate">
                          {user.displayName || "Student"}
                        </p>
                        <p className="text-[11px] text-[var(--ink-soft)] truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {isUserAdmin && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-800 flex-shrink-0">
                        ADMIN
                      </span>
                    )}
                  </div>
                )}

                {/* Dashboard & Quick Actions Section inside mobile menu */}
                <div className="mb-4 flex flex-col gap-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] px-2">
                    Student Area
                  </div>

                  {/* Dashboard link moved inside hamburger menu */}
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold transition-all shadow-sm ${
                      pathname === "/dashboard"
                        ? "bg-[var(--green-900)] text-white"
                        : "bg-[var(--green-800)] text-white hover:bg-[var(--green-900)]"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <LayoutDashboard className="w-5 h-5 text-[var(--green-500)]" />
                      Dashboard
                    </span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Link>

                  {/* Admin Panel link if admin */}
                  {isLoaded && user && isUserAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-50 text-amber-900 border border-amber-200/60 hover:bg-amber-100 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-amber-700" />
                        Admin Panel
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                    </Link>
                  )}
                </div>

                {/* Main Navigation Links */}
                <div className="flex flex-col gap-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] px-2 mb-0.5">
                    Navigation
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
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                            isActive
                              ? "bg-[var(--green-900)] text-white shadow-sm"
                              : "bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--surface-soft)] border border-[var(--line)]"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ArrowRight
                            className={`w-4 h-4 ${isActive ? "text-white" : "text-[var(--ink-soft)]"}`}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer inside mobile menu */}
                <div className="mt-5 pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--ink-soft)]">
                  <span>ConceptNSolution • Gurugram</span>
                  {isLoaded && user && (
                    <button
                      type="button"
                      onClick={handleMobileLogout}
                      className="inline-flex items-center gap-1.5 font-bold text-red-600 hover:text-red-700 transition-colors"
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

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand">
              <img src="/logo-11.png" alt="ConceptNSolution" className="w-10 h-10 rounded-full" />
              <span>ConceptNSolution</span>
            </div>
            <p className="muted">
              Coaching institute in Gurugram focused on school excellence, foundation learning,
              and competitive exam preparation.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul className="footer-list">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Popular Courses</h4>
            <ul className="footer-list">
              <li>CBSE / ICSE Preparation</li>
              <li>Chemistry Coaching</li>
              <li>JEE / NEET Chemistry</li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul className="footer-list">
              <li>Gurugram, Haryana</li>
              <li>Call: +91 98765 43210</li>
              <li>Email: admissions@conceptinsolution.com</li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2025 ConceptnSolution</span>
          <span>Designed for modern learning</span>
        </div>
      </footer>
    </div>
  );
}
