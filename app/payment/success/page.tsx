import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="container section-space narrow-center">
      <div className="status-card success-card">
        <span className="success-badge">✓</span>
        <h1>Payment successful</h1>
        <p>Your course access has been enabled and you can now continue to the student dashboard.</p>

        <div className="action-row">
          <Link href="/dashboard" className="btn btn-primary">
            Go to dashboard
          </Link>
          <Link href="/courses" className="btn btn-secondary">
            Browse more courses
          </Link>
        </div>
      </div>
    </div>
  );
}
