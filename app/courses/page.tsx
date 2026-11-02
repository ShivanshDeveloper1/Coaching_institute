import Link from "next/link";
import { courses } from "../site-data";

export default function CoursesPage() {
  return (
    <div className="container section-space">
      <section className="page-hero compact-hero">
        <div>
          <p className="eyebrow font-bold">Our courses</p>
          <h1>Structured learning for every academic stage.</h1>
        </div>
      </section>

      <section className="course-grid">
        {courses.map((course) => (
          <article key={course.slug} className="course-card">
            <div className="course-card-top">
              <span className="course-badge">{course.badge}</span>
              <span className="course-category">{course.category}</span>
            </div>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <div className="course-meta">
              <span>{course.classLevel}</span>
              <span>{course.duration}</span>
            </div>
            <ul className="mini-list">
              {course.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="course-card-bottom">
              <strong>₹{course.fee.toLocaleString("en-IN")}</strong>
              <Link href={`/courses/${course.slug}`} className="btn btn-primary btn-small">
                View details
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
