import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "../../site-data";

export function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.slug }));
}

export default async function CheckoutPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = courses.find((item) => item.slug === courseId);

  if (!course) {
    return notFound();
  }

  return (
    <div className="container section-space" style={{ maxWidth: 1100 }}>
      <section className="checkout-layout">
        <div className="checkout-summary">
          <p className="eyebrow">Secure checkout</p>
          <h1>{course.title}</h1>
          <div className="summary-card">
            <div>
              <span>Course</span>
              <strong>{course.title}</strong>
            </div>
            <div>
              <span>Duration</span>
              <strong>{course.duration}</strong>
            </div>
            <div>
              <span>Mentor</span>
              <strong>Dheeraj Sir</strong>
            </div>
            <div className="price-line">
              <span>Total amount</span>
              <strong>₹{course.fee.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>

        <div className="checkout-panel">
          <h3>Payment details</h3>
          <div className="checkout-info-box">
            <p>Pay securely with Razorpay.</p>
            <p className="muted">No backend functionality is wired in this UI mockup.</p>
          </div>

          <div className="checkout-actions">
            <button type="button" className="btn btn-primary full-width">
              Pay ₹{course.fee.toLocaleString("en-IN")}
            </button>
            <Link href={`/courses/${course.slug}`} className="btn btn-secondary full-width text-center">
              Back to course
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
