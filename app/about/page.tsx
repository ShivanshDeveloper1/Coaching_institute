import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container section-space">
      <section className="page-hero compact-hero">
        <div>
          <p className="eyebrow">About the institute</p>
          <h1>Learning with clarity, discipline, and mentorship.</h1>
        </div>
      </section>

      <section className="story-grid">
        <div className="story-image-card">
          <img
            src="/result/result-1.jpeg"
            alt="Mentor and students"
          />
        </div>

        <div className="story-copy">
          <p className="eyebrow accent">Dheeraj Sir</p>
          <h2>15+ years of teaching excellence</h2>
          <p>
            ConceptnSolution is built around the vision of providing high-quality education for
            students who want to balance board excellence with competitive exam preparation.
          </p>
          <p>
            Under the mentorship of Dheeraj Sir, students gain conceptual clarity, disciplined study
            habits, and the confidence to excel in school and entrance examinations.
          </p>
          <ul className="check-list">
            <li>School education guidance for Classes 9 to 12</li>
            <li>Foundation programs that build academic confidence early</li>
            <li>Focused mentoring for IIT-JEE and NEET chemistry</li>
          </ul>
        </div>
      </section>

      <section className="values-grid">
        <div className="info-card light">
          <h3>Our teaching philosophy</h3>
          <p>We make difficult subjects approachable by combining conceptual teaching with regular revision.</p>
        </div>
        <div className="info-card dark">
          <h3>Student-first support</h3>
          <p>Every learner is supported through structured practice, personal attention, and test-based feedback.</p>
        </div>
        <div className="info-card accent">
          <h3>Career readiness</h3>
          <p>We focus on academic performance and long-term competitive excellence, especially in chemistry-based exams.</p>
        </div>
      </section>

      <section className="cta-panel">
        <div>
          <p className="eyebrow">Admission</p>
          <h3>Begin your academic journey with expert guidance.</h3>
        </div>
        <Link href="/contact" className="btn btn-primary">
          Enquire now
        </Link>
      </section>
    </div>
  );
}
