import Link from "next/link";
import type { ReactNode } from "react";
import { NavAuthSection } from "./NavAuthSection";

export function SiteShell({ children }: { children: ReactNode }) {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/contact", label: "Contact" },
    { href: "/test-series", label: "Test-Series" },
  ];

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <Link href="/" className="brand" aria-label="ConceptnSolution home">
            <img src={'/logo-11.png'}  className="w-10 h-10 rounded-full"/>
            <span>
              ConceptnSolution
            </span>
          </Link>

          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <NavAuthSection />
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="brand-mark">C</span>
              <span>
                ConceptN<br />
                Solution
              </span>
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
