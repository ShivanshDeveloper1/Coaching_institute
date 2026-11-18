"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useAuth } from "@/context/AuthContext";
import { Shield, Sparkles, ExternalLink, LogOut, CheckCircle2 } from "lucide-react";

export default function AdminNavbar() {
  const pathname = usePathname();
  const { user, isAdmin } = useUser();
  const { logout } = useAuth();

  const getPageTitle = () => {
    if (pathname === "/admin" || pathname === "/admin/") return "Dashboard Overview";
    if (pathname.includes("/test-series")) return "Add Test Series Studio";
    if (pathname.includes("/edittestSeries")) return "Edit & Manage Test Series";
    if (pathname.includes("/addbulk")) return "Bulk Test Series Upload";
    if (pathname.includes("/students")) return "Student Performance & Submissions";
    return "Admin Workspace";
  };

  const initial = (user?.displayName?.charAt(0) || user?.email?.charAt(0) || "A").toUpperCase();

  return (
    <header className="min-h-[72px] sm:min-h-[80px] lg:min-h-[88px] border-b border-[var(--line)] bg-[var(--surface)]/95 backdrop-blur-md flex flex-wrap items-center justify-between px-5 sm:px-8 md:px-10 lg:px-12 xl:px-14 2xl:px-16 py-4 sm:py-5 lg:py-5.5 sticky top-0 z-20 transition-all gap-4">
      {/* Current Context / Breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[var(--green-600)] ring-4 ring-[var(--green-500)]/20 animate-pulse flex-shrink-0" />
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-[var(--ink)] tracking-tight">
            {getPageTitle()}
          </h1>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--surface-soft)] text-[var(--green-900)] text-xs md:text-sm font-bold border border-[var(--line)] shadow-2xs">
          <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--green-700)]" />
          Admin Mode
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-shrink-0">
        <Link
          href="/test-series"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-xl border border-[var(--line)] text-xs md:text-sm font-bold text-[var(--ink)] bg-[var(--surface)] hover:bg-[var(--surface-soft)] transition-colors shadow-2xs"
        >
          <span>Live Site</span>
          <ExternalLink className="w-4 h-4 text-[var(--ink-soft)]" />
        </Link>

        {/* User Pill */}
        <div className="flex items-center gap-3 sm:gap-4 pl-3 sm:pl-5 border-l border-[var(--line)]">
          <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-[var(--green-900)] text-white font-black flex items-center justify-center text-xs sm:text-sm lg:text-base shadow-sm ring-2 ring-[var(--green-600)]/30 flex-shrink-0">
            {initial}
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-xs sm:text-sm font-extrabold text-[var(--ink)] leading-snug">
              {user?.displayName || "Administrator"}
            </span>
            <span className="text-[11px] sm:text-xs text-[var(--ink-soft)] font-medium leading-none truncate max-w-[160px] xl:max-w-[220px]">
              {user?.email || "admin@conceptnsolution"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => logout()}
            title="Sign Out"
            className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] text-red-600 hover:bg-red-50 hover:border-red-200 flex items-center justify-center transition-colors ml-1 shadow-2xs"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
