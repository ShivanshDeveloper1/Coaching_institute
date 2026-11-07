"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  ArrowLeft, 
  Clock, 
  UserCheck, 
  BookOpen, 
  Sparkles,
  CheckCircle2,
  CreditCard
} from "lucide-react";

export default function CheckoutClient({ course }: { course: any }) {
  const formattedFee = course.fee.toLocaleString("en-IN");

   return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto">
        
        {/* Top Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 sm:mb-8"
        >
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to course overview
          </Link>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Course & Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            {/* Header Badge */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--green-900)] text-white text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
                <Lock className="w-3.5 h-3.5 text-[var(--green-500)]" />
                Secure Checkout
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-[var(--ink)]">
                {course.title}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[var(--ink-soft)]">
                Complete your enrollment to gain instant lifetime access to course material and live sessions.
              </p>
            </div>

            {/* Course Summary Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-[24px] p-6 sm:p-8 border border-[var(--line)] shadow-[var(--shadow)] space-y-5"
            >
              <h3 className="text-base font-bold text-[var(--ink)] tracking-tight border-b border-[var(--line)] pb-4 flex items-center justify-between">
                <span>Order Breakdown</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--green-500)]/20 text-[var(--green-900)]">
                  Verified Batch
                </span>
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between py-1">
                  <span className="flex items-center gap-2 text-[var(--ink-soft)] font-medium">
                    <BookOpen className="w-4 h-4 text-[var(--green-700)]" />
                    Selected Course
                  </span>
                  <strong className="font-bold text-[var(--ink)] text-right max-w-[200px] truncate">
                    {course.title}
                  </strong>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="flex items-center gap-2 text-[var(--ink-soft)] font-medium">
                    <Clock className="w-4 h-4 text-[var(--green-700)]" />
                    Duration
                  </span>
                  <strong className="font-bold text-[var(--ink)]">
                    {course.duration}
                  </strong>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="flex items-center gap-2 text-[var(--ink-soft)] font-medium">
                    <UserCheck className="w-4 h-4 text-[var(--green-700)]" />
                    Lead Mentor
                  </span>
                  <strong className="font-bold text-[var(--ink)]">
                    Dheeraj Sir
                  </strong>
                </div>
              </div>

              {/* Total Price Section */}
              <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
                    Total Amount
                  </span>
                  <span className="text-xs text-[var(--green-700)] font-medium">Includes all taxes</span>
                </div>
                <div className="text-right">
                  <strong className="text-2xl sm:text-3xl font-extrabold text-[var(--green-900)]">
                    ₹{formattedFee}
                  </strong>
                </div>
              </div>
            </motion.div>

            {/* Value Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[var(--bg-strong)] border border-[var(--line)] text-xs text-[var(--ink)] font-medium">
                <ShieldCheck className="w-5 h-5 text-[var(--green-700)] shrink-0" />
                <span>256-bit Encrypted Security</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[var(--bg-strong)] border border-[var(--line)] text-xs text-[var(--ink)] font-medium">
                <Sparkles className="w-5 h-5 text-[var(--green-700)] shrink-0" />
                <span>Instant Access Guarantee</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Payment Panel */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 bg-white rounded-[28px] p-6 sm:p-8 border border-[var(--line)] shadow-[var(--shadow)] flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            {/* Soft decorative blur circle */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-[var(--green-500)]/30 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[var(--ink)] tracking-tight">
                  Payment Details
                </h3>
                <CreditCard className="w-5 h-5 text-[var(--ink-soft)]" />
              </div>

              {/* Gateway Banner */}
              <div className="p-4 rounded-2xl bg-[var(--surface-soft)] border border-[var(--line)] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--green-900)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--green-700)]" />
                  Razorpay Payment Gateway
                </div>
                <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                  Supports UPI (Google Pay, PhonePe, Paytm), Net Banking, Debit/Credit Cards & Wallets.
                </p>
                <div className="pt-2 border-t border-[var(--line)]">
                  <p className="text-[11px] text-[var(--ink-soft)]/80 italic">
                    Note: No backend functionality is wired in this UI mockup.
                  </p>
                </div>
              </div>

              {/* Summary line preview */}
              <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-between text-xs">
                <span className="text-[var(--ink-soft)] font-medium">Amount to pay</span>
                <span className="font-extrabold text-[var(--ink)] text-base">₹{formattedFee}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 relative z-10 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm sm:text-base bg-[#88d89d] hover:bg-[#a8f0b0] text-[#0c3d3d] shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                Pay ₹{formattedFee}
              </motion.button>

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Link
                  href={`/courses/${course.slug}`}
                  className="w-full py-3 px-6 rounded-xl font-bold text-xs sm:text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] bg-transparent hover:bg-[var(--surface-soft)] border border-[var(--line)] transition-colors flex items-center justify-center text-center"
                >
                  Back to course details
                </Link>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}