"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser, useAuth } from "@/context/AuthContext";
import { User, LogOut, LayoutDashboard, Shield, BookOpen, ChevronDown } from "lucide-react";

interface NavAuthSectionProps {
  showDashboardButton?: boolean;
}

export function NavAuthSection({ showDashboardButton = false }: NavAuthSectionProps) {
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
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 animate-pulse border border-white/15" />
        <Link 
          href="/courses" 
          className="inline-flex items-center justify-center px-4 py-2 rounded-full font-bold text-xs sm:text-sm bg-[var(--green-500)] text-[var(--green-900)] shadow-sm whitespace-nowrap"
        >
          Courses
        </Link>
      </div>
    );
  }

  // 2. Unauthenticated visitor: Show Login & Courses button with high contrast
  if (!user) {
    return (
      <div className="flex items-center gap-2 sm:gap-2.5">
        <Link 
          href="/login" 
          className="inline-flex items-center justify-center px-3.5 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all duration-200 active:scale-95 whitespace-nowrap"
        >
          Login
        </Link>
        <Link 
          href="/courses" 
          className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full font-extrabold text-xs sm:text-sm bg-[var(--green-500)] text-[var(--green-900)] hover:bg-[var(--green-300)] shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 whitespace-nowrap"
        >
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
    <div className="flex items-center gap-2 sm:gap-3 relative" ref={dropdownRef}>
      {/* User Avatar Circle with First Letter */}
      <button
        type="button"
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-500)]"
        aria-label="User profile menu"
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[var(--green-500)] text-[var(--green-900)] font-black flex items-center justify-center text-xs sm:text-sm shadow-inner">
          {initial}
        </div>
        <ChevronDown size={14} className={`text-white/80 transition-transform duration-200 mr-0.5 sm:mr-1 ${dropdownOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Optional Primary Call to Action */}
      {showDashboardButton && (
        <Link 
          href="/dashboard" 
          className="inline-flex items-center justify-center px-4 py-2 rounded-full font-bold text-xs sm:text-sm bg-[var(--green-500)] text-[var(--green-900)] hover:bg-[var(--green-300)] shadow-md transition-all whitespace-nowrap"
        >
          Dashboard
        </Link>
      )}

      {/* User Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 top-12 mt-2 w-64 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-2xl py-2 z-50 text-[var(--ink)] animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-3 border-b border-[var(--line)]">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[var(--ink)] text-sm truncate">
                {user.displayName || "Student"}
              </span>
              {isAdmin && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                  ADMIN
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--ink-soft)] font-medium truncate mt-0.5">{user.email}</p>
          </div>

          <div className="py-1">
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-amber-800 hover:bg-amber-50 transition"
              >
                <Shield size={16} className="text-amber-700" />
                Admin Panel
              </Link>
            )}

            <Link
              href="/dashboard"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--surface-soft)] transition"
            >
              <LayoutDashboard size={16} className="text-[var(--green-700)]" />
              My Dashboard
            </Link>

            <Link
              href="/test-series"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--surface-soft)] transition"
            >
              <BookOpen size={16} className="text-[var(--green-700)]" />
              Test Series
            </Link>
          </div>

          <div className="border-t border-[var(--line)] pt-1">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition"
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
