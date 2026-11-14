"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser, useAuth } from "@/context/AuthContext";
import { User, LogOut, LayoutDashboard, Shield, BookOpen, ChevronDown } from "lucide-react";

export function NavAuthSection() {
  const { user, isLoaded, isAdmin } = useUser();
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    router.push("/login");
  };

  // 1. Initial loading placeholder
  if (!isLoaded) {
    return (
      <div className="nav-actions flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-200/50 animate-pulse" />
        <Link href="/courses" className="btn btn-primary btn-small">
          Courses
        </Link>
      </div>
    );
  }

  // 2. Unauthenticated visitor: Show Login button
  if (!user) {
    return (
      <div className="nav-actions flex items-center gap-3">
        <Link href="/login" className="btn btn-secondary btn-small">
          Login
        </Link>
        <Link href="/courses" className="btn btn-primary btn-small">
          Courses
        </Link>
      </div>
    );
  }

  // 3. Logged-in user: Hide Login button, show first letter of first name
  const rawName = user.displayName?.trim() || "";
  const firstName = rawName.split(" ")[0] || "";
  const initial = (firstName.charAt(0) || user.email?.charAt(0) || "U").toUpperCase();

  return (
    <div className="nav-actions flex items-center gap-3 relative" ref={dropdownRef}>
      {/* User Avatar Circle with First Letter */}
      <button
        type="button"
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center gap-2 p-1 rounded-full border border-emerald-600/30 bg-emerald-50/80 hover:bg-emerald-100/70 transition shadow-sm focus:outline-none"
        aria-label="User profile menu"
      >
        <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-extrabold flex items-center justify-center text-base shadow-inner">
          {initial}
        </div>
        <ChevronDown size={14} className={`text-emerald-900 transition-transform duration-200 mr-1 ${dropdownOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Primary Call to Action */}
      <Link href="/courses" className="btn btn-primary btn-small">
        Conatct Us
      </Link>

      {/* User Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 top-12 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm truncate">
                {user.displayName || "Student"}
              </span>
              {isAdmin && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800">
                  ADMIN
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
          </div>

          <div className="py-1">
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-amber-700 hover:bg-amber-50 transition"
              >
                <Shield size={16} className="text-amber-600" />
                Admin Panel
              </Link>
            )}

            <Link
              href="/dashboard"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              <LayoutDashboard size={16} className="text-slate-500" />
              My Dashboard
            </Link>

            <Link
              href="/test-series"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              <BookOpen size={16} className="text-slate-500" />
              Test Series
            </Link>
          </div>

          <div className="border-t border-slate-100 pt-1">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
