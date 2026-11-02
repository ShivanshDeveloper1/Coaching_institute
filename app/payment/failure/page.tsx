import Link from "next/link";

export default function PaymentFailurePage() {
  return (
    <div className="container section-space narrow-center">
      <div className="status-card failure-card">
        <span className="failure-badge">!</span>
        <h1>Payment failed</h1>
        <p>Your payment could not be processed. Please try again or contact the institute for assistance.</p>

        <div className="action-row">
          <Link href="/courses" className="btn btn-primary">
            Try again
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
