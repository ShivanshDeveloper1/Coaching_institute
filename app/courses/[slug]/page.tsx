import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "../../site-data";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    return notFound();
  }

  return (
    <div className="container section-space">
      <section className="course-detail-hero">
        <div className="course-detail-copy">
          <p className="eyebrow">{course.category}</p>
          <h1>{course.title}</h1>
          <p className="muted">{course.description}</p>

          <div className="detail-meta-row">
            <span>{course.classLevel}</span>
            <span>{course.duration}</span>
          </div>

          <div className="detail-price-row">
            <strong>₹{course.fee.toLocaleString("en-IN")}</strong>
            <div className="detail-actions">
              <Link href="/contact" className="btn btn-secondary">
                Enquire now
              </Link>
              <Link href={`/checkout/${course.slug}`} className="btn btn-primary">
                Buy now
              </Link>
            </div>
          </div>
        </div>

        <aside className="course-summary-card">
          <h3>Course summary</h3>
          <ul>
            <li>Class level: {course.classLevel}</li>
            <li>Duration: {course.duration}</li>
            <li>Fee: ₹{course.fee.toLocaleString("en-IN")}</li>
            <li>Mentor: Dheeraj Sir</li>
          </ul>
        </aside>
      </section>

      <section className="feature-panel">
        <h3>What you’ll learn</h3>
        <div className="feature-list">
          {course.highlights.map((item) => (
            <div key={item} className="feature-pill">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="course-outline-panel">
        <h3>Learning approach</h3>
        <div className="outline-steps">
          <div className="step-box">
            <span>01</span>
            <h4>Concept building</h4>
            <p>Clear explanation of core ideas and fundamentals.</p>
          </div>
          <div className="step-box">
            <span>02</span>
            <h4>Application</h4>
            <p>Practice that helps convert theory into exam readiness.</p>
          </div>
          <div className="step-box">
            <span>03</span>
            <h4>Revision</h4>
            <p>Focused test practice and structured doubt solving.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
