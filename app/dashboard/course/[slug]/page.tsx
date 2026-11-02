import { notFound } from "next/navigation";
import { courses } from "../../../site-data";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function DashboardCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    return notFound();
  }

  return (
    <div className="container section-space dashboard-course-shell">
      <section className="course-access-header">
        <div>
          <p className="eyebrow">Enrolled course</p>
          <h1>{course.title}</h1>
          <p className="muted">{course.category}</p>
        </div>
        <span className="status-tag success">Access granted</span>
      </section>

      <section className="content-grid">
        <article className="lesson-panel">
          <h3>Lesson 1: Atomic Structure Fundamentals</h3>
          <div className="lesson-video">
            <div className="play-button">▶</div>
          </div>
          <p>
            Explore the basic structure of atoms, electrons, protons, and neutrons, and understand
            the role they play in modern chemistry.
          </p>
        </article>

        <aside className="sidebar-panel">
          <h3>Course roadmap</h3>
          <ul className="timeline-list">
            <li><span>01</span> Atomic Structure</li>
            <li><span>02</span> Chemical Bonding</li>
            <li><span>03</span> States of Matter</li>
            <li><span>04</span> Thermodynamics</li>
            <li><span>05</span> Mock Tests</li>
          </ul>
        </aside>
      </section>
    </div>
  );
}
