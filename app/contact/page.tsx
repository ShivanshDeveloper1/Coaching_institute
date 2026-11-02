import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="container section-space">
      <section className="page-hero compact-hero">
        <div>
          <p className="eyebrow">Contact us</p>
          <h1>Let’s help you choose the right course.</h1>
        </div>
      </section>

      <section className="contact-layout">
        <div className="contact-info-card">
          <h3>Institute details</h3>
          <ul className="contact-list">
            <li><strong>Location:</strong> Gurugram, Haryana</li>
            <li><strong>Teacher:</strong> Dheeraj Sir</li>
            <li><strong>Phone:</strong> +91 98765 43210</li>
            <li><strong>Email:</strong> admissions@conceptinsolution.com</li>
          </ul>

          <div className="mini-badges">
            <span>School Coaching</span>
            <span>Foundation</span>
            <span>JEE / NEET</span>
          </div>
        </div>

        <div className="enquiry-panel">
          <h3>Admission enquiry</h3>
          <form className="enquiry-form">
            <div className="form-row two-col">
              <label>
                Name
                <input type="text" placeholder="Student name" />
              </label>
              <label>
                Phone
                <input type="tel" placeholder="+91 " />
              </label>
            </div>

            <div className="form-row two-col">
              <label>
                Email
                <input type="email" placeholder="name@example.com" />
              </label>
              <label>
                Course interest
                <select defaultValue="">
                  <option value="" disabled>
                    Select course
                  </option>
                  <option>CBSE Board Preparation</option>
                  <option>ICSE Board Preparation</option>
                  <option>Foundation Courses</option>
                  <option>Chemistry Coaching</option>
                  <option>Chemistry for IIT-JEE</option>
                  <option>Chemistry for NEET</option>
                  <option>Competitive Examination Preparation</option>
                </select>
              </label>
            </div>

            <label>
              Message
              <textarea rows={5} placeholder="Tell us what you need help with" />
            </label>

            <button type="submit" className="btn btn-primary full-width">
              Submit enquiry
            </button>
          </form>
        </div>
      </section>

      <section className="cta-panel">
        <div>
          <p className="eyebrow">Need quick guidance?</p>
          <h3>Talk to the institute team today.</h3>
        </div>
        <Link href="/courses" className="btn btn-primary">
          Explore courses
        </Link>
      </section>
    </div>
  );
}
