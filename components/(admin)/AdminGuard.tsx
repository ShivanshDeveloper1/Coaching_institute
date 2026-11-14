"use client";

import React from "react";
import Link from "next/link";
import { useUser, useAuth } from "@/context/AuthContext";
import { ShieldAlert, ShieldCheck, Loader2, LogIn, ArrowLeft } from "lucide-react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoaded, isAdmin } = useUser();
  const { signInWithGoogle } = useAuth();

  // 1. Loading check
  if (!isLoaded) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-4">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
        <h2 className="text-lg font-bold">Verifying Administrator Permissions</h2>
        <p className="text-sm text-slate-500 mt-1">Please wait a moment...</p>
      </div>
    );
  }

  // 2. Unauthenticated visitor
  if (!user) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <ShieldAlert size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Admin Login Required</h2>
            <p className="text-sm text-slate-600 mt-2">
              You must sign in with an authorized Google account to access the administration panel.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/login"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white font-semibold py-3 px-4 text-sm hover:bg-slate-800 transition"
            >
              <LogIn size={16} />
              Sign in
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold py-3 px-4 text-sm hover:bg-slate-100 transition"
            >
              <ArrowLeft size={16} />
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated but NOT authorized as admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-red-200 shadow-xl p-8 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-200">
            <ShieldAlert size={28} />
          </div>
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 mb-2">
              403 • Access Denied
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Restricted to Administrators</h2>
            <p className="text-sm text-slate-600 mt-2">
              Your account (<strong className="text-slate-800 font-medium">{user.email}</strong>) is not registered as an authorized administrator.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 text-white font-semibold py-3 px-4 text-sm hover:bg-emerald-800 transition"
            >
              Go to Student Dashboard
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold py-3 px-4 text-sm hover:bg-slate-100 transition"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. Authenticated & authorized admin
  return <>{children}</>;
}
