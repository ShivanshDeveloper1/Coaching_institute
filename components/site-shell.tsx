"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { NavAuthSection } from "./NavAuthSection";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/contact", label: "Contact" },
    { href: "/test-series", label: "Test-Series" },
  ];

  return (
    <div className="page-shell">
      <header className="topbar sticky top-0 z-40 backdrop-blur-md bg-[var(--bg)]/90 border-b border-[var(--line)]">
        <div className="container nav-wrap flex items-center justify-between py-3">
          {/* Brand Logo */}
          <Link href="/" className="brand flex items-center gap-2.5 font-bold text-[var(--ink)]" aria-label="ConceptnSolution home">
            <img src="/logo-11.png" alt="ConceptNSolution" className="w-10 h-10 rounded-full object-cover shadow-sm" />
            <span className="text-lg tracking-tight font-extrabold text-[var(--green-900)]">
              ConceptNSolution
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="main-nav hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
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
          <div className="flex items-center gap-3">
            <NavAuthSection />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] shadow-sm hover:bg-[var(--surface-soft)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--green-900)]"
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
                className="fixed inset-0 top-[65px] bg-black/40 backdrop-blur-sm z-40 md:hidden"
                aria-hidden="true"
              />

              {/* Slide-down Drawer Panel */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-x-0 top-[65px] bg-[var(--bg)] border-b border-[var(--line)] shadow-[var(--shadow)] z-50 md:hidden px-4 py-5 max-h-[calc(100vh-70px)] overflow-y-auto"
              >
                <div className="flex flex-col gap-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)] px-3 mb-1">
                    Navigation
                  </div>
                  {navItems.map((item, idx) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04, duration: 0.2 }}
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
                          <ArrowRight className={`w-4 h-4 ${isActive ? "text-white" : "text-[var(--ink-soft)]"}`} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-5 pt-4 border-t border-[var(--line)] text-center">
                  <p className="text-xs text-[var(--ink-soft)]">
                    ConceptNSolution • Gurugram
                  </p>
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
