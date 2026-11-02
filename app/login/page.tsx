"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isFirebaseConfigured, signInWithGoogle } from "../../lib/firebase/client";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    if (!isFirebaseConfigured()) {
      setError("Firebase is not configured yet. Add your Firebase web config in .env.local to enable Google sign-in.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await signInWithGoogle();
      const payload = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      };

      const response = await fetch("/api/auth/sync-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to sync user data");
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed. Please check your Firebase configuration and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section-space narrow-center">
      <div className="auth-card">
        <p className="eyebrow">Student access</p>
        <h1>Login to continue</h1>
        <p className="muted auth-copy">
          Access your enrolled courses, admission progress, and dashboard from one place.
        </p>

        <button
          type="button"
          className="btn btn-primary google-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <span className="google-g">G</span>
          {loading ? "Signing in..." : "Continue with Google"}
        </button>

        {error ? <p className="form-message error-message">{error}</p> : null}

        <div className="divider"><span>or</span></div>

        <Link href="/courses" className="btn btn-secondary full-width text-center">
          Browse courses without login
        </Link>
      </div>
    </div>
  );
}
