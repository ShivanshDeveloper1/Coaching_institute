"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isFirebaseConfigured, signInWithGoogle } from "../lib/firebase/client";

const benefits = [
  { value: "12+", label: "Courses" },
  { value: "24/7", label: "Support" },
  { value: "98%", label: "Focus" },
];

export function LoginPageClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    if (!isFirebaseConfigured()) {
      setError(
        "Firebase is not configured yet. Add your Firebase web config in .env.local to enable Google sign-in."
      );
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
    <div className="min-h-[calc(100vh-120px)] bg-[var(--bg)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#0c3d3d_0%,#0d4f4f_35%,#1d5d53_100%)] p-6 text-white shadow-[var(--shadow)] sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d8f7d4]">
              Secure access
            </div>

            <h1 className="mt-6 max-w-xl text-4xl font-black leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              Welcome back to your learning portal.
            </h1>

            <p className="mt-5 max-w-xl text-base text-white/75 sm:text-lg">
              Access your student dashboard, academic progress, and admin tools from one secure
              place designed for modern coaching and learning.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {benefits.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-black tracking-[-0.06em] text-[#a8f0b0]">{item.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.12em] text-white/70">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Explore courses
              </Link>
              <Link
                href="/admin"
                className="inline-flex items-center justify-center rounded-full bg-[#a8f0b0] px-5 py-3 text-sm font-semibold text-[#0c3d3d] transition hover:brightness-105"
              >
                Open admin portal
              </Link>
            </div>
          </section>

          <aside className="rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] sm:p-8">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--green-700)]">
                Student & admin login
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-[var(--ink)]">
                Sign in to continue
              </h2>
            </div>

            <div className="mt-7 space-y-3">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-soft)] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--green-300)] text-sm font-black text-[var(--green-900)]">
                    01
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--ink)]">Track your learning</div>
                    <div className="text-sm text-[var(--ink-soft)]">View progress and upcoming classes.</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-soft)] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--green-300)] text-sm font-black text-[var(--green-900)]">
                    02
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--ink)]">Manage student data</div>
                    <div className="text-sm text-[var(--ink-soft)]">Access your dashboard and academic updates.</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-soft)] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--green-300)] text-sm font-black text-[var(--green-900)]">
                    03
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--ink)]">Fast admin access</div>
                    <div className="text-sm text-[var(--ink-soft)]">Open the admin panel for daily operations.</div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-[rgba(23,35,39,0.12)] bg-white px-4 py-3.5 text-base font-semibold text-[var(--ink)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(15,35,34,0.08)] disabled:cursor-not-allowed disabled:opacity-70"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f8d7d7,#f4f4f4)] text-sm font-black text-[#d74e4e]">
                G
              </span>
              {loading ? "Signing in..." : "Continue with Google"}
            </button>

            {error ? <p className="mt-4 rounded-2xl bg-[#fff1f1] px-3 py-2 text-sm text-[#b42318]">{error}</p> : null}

            <div className="my-6 flex items-center gap-3 text-sm text-[var(--ink-soft)]">
              <span className="h-px flex-1 bg-[var(--line)]" />
              or
              <span className="h-px flex-1 bg-[var(--line)]" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/admin"
                className="inline-flex items-center justify-center rounded-full bg-[var(--green-900)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Admin access
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--bg)]"
              >
                Browse courses
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
