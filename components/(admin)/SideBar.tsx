"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Users, 
  FileEdit, 
  UploadCloud, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen
} from "lucide-react";

const navigationItems = [
  {
    icons: LayoutDashboard,
    text: "Overview",
    href: "",
    exact: true,
  },
  {
    icons: PlusCircle,
    text: "Add Test Series",
    href: "/test-series",
  },
  {
    icons: FileEdit,
    text: "Edit Test Series",
    href: "/edittestSeries",
  },
  {
    icons: UploadCloud,
    text: "Add Bulk Test",
    href: "/addbulk",
  },
  {
    icons: Users,
    text: "All Students",
    href: "/students",
  },
];

export default function SideBar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen border-r border-[var(--line)] bg-[var(--surface)] flex flex-col transition-all duration-300 z-30 flex-shrink-0 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 border-b border-[var(--line)] px-4 flex items-center justify-between bg-[var(--surface)] sticky top-0 z-10">
        <Link href="/admin" className="flex items-center gap-3 overflow-hidden group">
          <div className="w-10 h-10 rounded-xl bg-[var(--green-900)] text-white flex items-center justify-center font-extrabold flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <Image
              src="/logo-11.png"
              alt="ConceptNSolution"
              height={36}
              width={36}
              className="object-cover rounded-xl"
            />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col min-w-0"
            >
              <span className="font-extrabold text-sm text-[var(--ink)] tracking-tight truncate">
                ConceptNSolution
              </span>
              <span className="text-[11px] font-semibold text-[var(--green-800)] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[var(--green-600)]" />
                Admin Workspace
              </span>
            </motion.div>
          )}
        </Link>

        {/* Collapse Toggle Button */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-lg border border-[var(--line)] bg-[var(--surface-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--bg-strong)] flex items-center justify-center transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col gap-1.5 p-3 overflow-y-auto">
        <div className="px-3 pt-2 pb-1 text-[11px] font-extrabold uppercase tracking-wider text-[var(--ink-soft)]">
          {!collapsed ? "Admin Controls" : "•••"}
        </div>

        {navigationItems.map((item) => {
          const fullHref = `/admin${item.href}`;
          const isActive = item.exact 
            ? pathname === "/admin" || pathname === "/admin/"
            : pathname.startsWith(fullHref);
          const Icon = item.icons;

          return (
            <Link
              key={item.text}
              href={fullHref}
              title={collapsed ? item.text : undefined}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 group ${
                isActive
                  ? "bg-[var(--green-900)] text-white shadow-sm"
                  : "text-[var(--ink)] hover:text-[var(--green-900)] hover:bg-[var(--surface-soft)]"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "bg-[var(--surface-soft)] text-[var(--ink-soft)] group-hover:text-[var(--green-900)] group-hover:bg-white"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {!collapsed && (
                <span className="truncate tracking-tight">{item.text}</span>
              )}
            </Link>
          );
        })}

        {/* Live Site Shortcut */}
        <div className="pt-4 mt-auto border-t border-[var(--line)]">
          <Link
            href="/test-series"
            target="_blank"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs text-[var(--ink-soft)] hover:text-[var(--green-900)] hover:bg-[var(--surface-soft)] transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--surface-soft)] flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-[var(--green-800)]" />
            </div>
            {!collapsed && (
              <span className="flex items-center justify-between flex-1 truncate">
                <span>View Live Quizzes</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </span>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
}
