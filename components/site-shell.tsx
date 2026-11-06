import Link from "next/link";
import type { ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <Link href="/" className="brand" aria-label="ConceptnSolution home">
            <span className="brand-mark">C</span>
            <span>
              ConceptNSolution
            </span>
          </Link>

          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <Link href="/login" className="btn btn-secondary btn-small">
              Login
            </Link>
            <Link href="/courses" className="btn btn-primary btn-small">
              Enquire now
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="brand-mark">C</span>
              <span>
                Concept In<br />
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
