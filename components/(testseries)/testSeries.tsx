"use client";
import React, { useEffect, useState, useMemo } from "react";
import { 
  Eye, 
  Lock, 
  Clock, 
  Loader2, 
  AlertCircle, 
  Layers, 
  Dna, 
  Atom, 
  ClipboardList, 
  GraduationCap,
  Languages,
  BookOpen,
  ArrowRight,
  Sparkles,
  HelpCircle
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Configuration for Exam Types
const getCategoryConfig = (examType: string) => {
  const type = examType?.toUpperCase();
  
  switch (type) {
    case "ALL":
      return {
        label: "All Exams",
        icon: Layers,
        activeClass: "bg-[var(--green-900)] border-[var(--green-900)] text-white shadow-md ring-2 ring-[var(--green-600)] ring-offset-2 ring-offset-[var(--bg)]",
        inactiveClass: "bg-[var(--surface)] border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--green-700)] hover:text-[var(--ink)] hover:bg-[var(--surface-soft)]",
        iconColor: "text-[var(--green-700)]"
      };
    case "NEET":
      return {
        label: "NEET",
        icon: Dna,
        activeClass: "bg-[var(--green-900)] border-[var(--green-900)] text-white shadow-md ring-2 ring-[var(--green-500)] ring-offset-2 ring-offset-[var(--bg)]",
        inactiveClass: "bg-[var(--surface)] border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--green-700)] hover:text-[var(--ink)] hover:bg-[var(--surface-soft)]",
        iconColor: "text-[var(--green-700)]"
      };
    case "JEE":
      return {
        label: "JEE",
        icon: Atom,
        activeClass: "bg-[var(--green-900)] border-[var(--green-900)] text-white shadow-md ring-2 ring-[var(--green-500)] ring-offset-2 ring-offset-[var(--bg)]",
        inactiveClass: "bg-[var(--surface)] border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--green-700)] hover:text-[var(--ink)] hover:bg-[var(--surface-soft)]",
        iconColor: "text-[var(--green-700)]"
      };
    default:
      return {
        label: examType,
        icon: ClipboardList,
        activeClass: "bg-[var(--green-900)] border-[var(--green-900)] text-white shadow-md ring-2 ring-[var(--green-600)] ring-offset-2 ring-offset-[var(--bg)]",
        inactiveClass: "bg-[var(--surface)] border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--green-700)] hover:text-[var(--ink)] hover:bg-[var(--surface-soft)]",
        iconColor: "text-[var(--green-700)]"
      };
  }
};

const TestSeries = () => {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Track both filters independently
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeClassFilter, setActiveClassFilter] = useState("All");
  
  const now = new Date();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("/api/quiz");
        const data = await response.json();

        let quizArray = [];
        if (Array.isArray(data)) {
          quizArray = data;
        } else if (data && Array.isArray(data.quizzes)) {
          quizArray = data.quizzes;
        } else {
          setError(true);
          return;
        }
        setQuizzes(quizArray);
      } catch (err) {
        console.error("Error loading quizzes:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  // 1. Extract unique exam types
  const categories = useMemo(() => {
    const types = quizzes.map((q) => q.examType).filter(Boolean);
    return ["All", ...Array.from(new Set(types))];
  }, [quizzes]);

  // 2. Extract unique class levels
  const classLevels = useMemo(() => {
    const levels = quizzes.map((q) => q.classLevel).filter(Boolean);
    return ["All", ...Array.from(new Set(levels))];
  }, [quizzes]);

  // 3. Filter by BOTH exam type AND class level
  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((q) => {
      const matchExam = activeFilter === "All" || q.examType?.toLowerCase() === activeFilter?.toLowerCase();
      const matchClass = activeClassFilter === "All" || q.classLevel?.toLowerCase() === activeClassFilter?.toLowerCase();
      return matchExam && matchClass;
    });
  }, [activeFilter, activeClassFilter, quizzes]);

  const getCategoryCount = (catName: string) => {
    if (catName === "All") return quizzes.length;
    return quizzes.filter((q) => q.examType?.toLowerCase() === catName?.toLowerCase()).length;
  };

  const getClassCount = (className: string) => {
    // Show count based on current exam filter so it feels dynamic
    const baseQuizzes = activeFilter === "All" 
      ? quizzes 
      : quizzes.filter((q) => q.examType?.toLowerCase() === activeFilter?.toLowerCase());
      
    if (className === "All") return baseQuizzes.length;
    return baseQuizzes.filter((q) => q.classLevel?.toLowerCase() === className?.toLowerCase()).length;
  };

  const formatFullDate = (dateString: string) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatShortDate = (dateString: string) => {
    if (!dateString) return "Soon";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500">
        <Loader2 className="animate-spin mb-2 text-red-600" size={28} />
        <p className="text-sm font-medium">Loading Quizzes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <AlertCircle size={32} className="mb-2 text-gray-300" />
        <p className="text-sm font-medium text-gray-500">Failed to load tests.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* FILTER SECTION CONTAINER */}
      <div className="space-y-6 bg-[var(--surface)] p-6 rounded-[var(--radius)] border border-[var(--line)] shadow-sm">
        
        {/* ROW 1: EXAM CATEGORY */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[var(--ink)] text-xs font-black uppercase tracking-[0.14em]">
            <GraduationCap size={16} className="text-[var(--green-700)]" />
            <span>Filter by Exam Category</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2.5">
            {categories.map((cat) => {
              const config = getCategoryConfig(cat);
              const IconComponent = config.icon;
              const isActive = activeFilter?.toLowerCase() === cat?.toLowerCase();
              const count = getCategoryCount(cat);

              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`group flex items-center justify-between gap-3 px-4 py-2.5 rounded-full border text-xs font-bold transition-all duration-200 select-none hover:-translate-y-0.5 ${
                    isActive ? config.activeClass : config.inactiveClass
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent 
                      size={15} 
                      className={`transition-colors duration-200 ${isActive ? "text-white" : config.iconColor}`} 
                    />
                    <span>{config.label}</span>
                  </div>
                  
                  <span className={`flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-black rounded-full transition-colors duration-200 ${
                    isActive 
                      ? "bg-white/25 text-white" 
                      : "bg-[var(--surface-soft)] text-[var(--ink-soft)] group-hover:bg-[var(--bg-strong)]"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider between filters */}
        {classLevels.length > 1 && <hr className="border-[var(--line)]" />}

        {/* ROW 2: CLASS LEVEL (Only renders if data contains classes) */}
        {classLevels.length > 1 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[var(--ink)] text-xs font-black uppercase tracking-[0.14em]">
              <BookOpen size={16} className="text-[var(--green-700)]" />
              <span>Target Class</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2.5">
              {classLevels.map((className) => {
                const isActive = activeClassFilter?.toLowerCase() === className?.toLowerCase();
                const count = getClassCount(className);
                const displayLabel = className === "All" ? "All Classes" : className;

                return (
                  <button
                    key={className}
                    onClick={() => setActiveClassFilter(className)}
                    className={`group flex items-center justify-between gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all duration-200 select-none hover:-translate-y-0.5 ${
                      isActive 
                        ? "bg-[var(--green-900)] border-[var(--green-900)] text-white shadow-sm ring-2 ring-[var(--green-500)] ring-offset-2 ring-offset-[var(--bg)]" 
                        : "bg-[var(--surface)] border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--green-700)] hover:text-[var(--ink)] hover:bg-[var(--surface-soft)]"
                    }`}
                  >
                    <span>{displayLabel}</span>
                    <span className={`flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-black rounded-md transition-colors duration-200 ${
                      isActive 
                        ? "bg-white/20 text-white" 
                        : "bg-[var(--surface-soft)] text-[var(--ink-soft)] group-hover:bg-[var(--bg-strong)]"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* QUIZ LIST GRID */}
      <div className="space-y-6">
        {filteredQuizzes.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12"
          >
            {filteredQuizzes.map((item: any, idx: number) => {
              const isLive = item.createdAt ? now >= new Date(item.createdAt) : true;
              const isFrozen = item.isLocked === true;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  key={item.id || item._id}
                  className={`group relative bg-[var(--surface)] rounded-[var(--radius)] border transition-all duration-300 flex flex-col ${
                    isFrozen
                      ? "border-[var(--line)] bg-[var(--surface-soft)] opacity-75"
                      : isLive
                        ? "border-[var(--line)] hover:border-[var(--green-600)] hover:-translate-y-1.5 hover:shadow-[var(--shadow)]"
                        : "border-[var(--line)] bg-[var(--surface-soft)] opacity-80"
                  }`}
                >
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                      
                      {isFrozen ? (
                        <div className="flex items-center gap-2 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">
                            Admin Locked
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-[var(--surface-soft)] px-2.5 py-1 rounded-full border border-[var(--line)]">
                          <span className="relative flex h-2 w-2">
                            {isLive && (
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            )}
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? "bg-emerald-600" : "bg-amber-400"}`}></span>
                          </span>
                          <span className={`text-[10px] font-black uppercase tracking-wider ${isLive ? "text-[var(--green-800)]" : "text-amber-800"}`}>
                            {isLive ? "Live" : "Upcoming"}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.classLevel && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[var(--surface-soft)] text-[var(--green-800)] border border-[var(--line)] uppercase tracking-wide">
                            {item.classLevel}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[var(--surface-soft)] text-[var(--green-700)] border border-[var(--line)] uppercase tracking-wide">
                          <Languages size={11} className="text-[var(--green-700)]" />
                          {item.language || "English"}
                        </span>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[var(--green-300)] text-[var(--green-900)] uppercase border border-[var(--line)] tracking-wide">
                          {item.examType || "Mock Test"}
                        </span>
                      </div>
                    </div>

                    <h3 className={`text-lg font-bold mb-2 leading-snug transition-colors duration-200 line-clamp-2 ${isFrozen ? 'text-[var(--ink-soft)]' : 'text-[var(--ink)] group-hover:text-[var(--green-900)]'}`}>
                      {item.title}
                    </h3>

                    {item.overview && (
                      <p className="text-xs text-[var(--ink-soft)] line-clamp-2 mb-4 font-normal leading-relaxed">
                        {item.overview}
                      </p>
                    )}

                    {/* Question and Subject stats chips */}
                    <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-[var(--ink-soft)]">
                      <span className="inline-flex items-center gap-1 bg-[var(--surface-soft)] px-2.5 py-1 rounded-md border border-[var(--line)]">
                        <BookOpen size={12} className="text-[var(--green-700)]" />
                        <strong className="text-[var(--ink)]">{item.questions?.length || 0}</strong> Questions
                      </span>
                      <span className="inline-flex items-center gap-1 bg-[var(--surface-soft)] px-2.5 py-1 rounded-md border border-[var(--line)]">
                        <Clock size={12} className="text-[var(--green-700)]" />
                        <strong className="text-[var(--ink)]">{item.duration || 60}</strong> Mins
                      </span>
                    </div>

                    {/* Added mt-auto to push the bottom sections down for equal height cards */}
                    <div className="mt-auto pt-2">
                      <div className="flex items-center text-xs font-semibold text-[var(--ink-soft)] mb-4 bg-[var(--surface-soft)] w-fit px-3 py-1.5 rounded-lg border border-[var(--line)]">
                        <Clock size={13} className="mr-1.5 text-[var(--green-700)]" />
                        <span>
                          {isLive ? "Started: " : "Unlocks: "} 
                          <span className="text-[var(--ink)] font-bold">{formatFullDate(item.createdAt)}</span>
                        </span>
                      </div>

                      {isFrozen ? (
                        <button 
                          disabled
                          className="w-full flex items-center justify-center gap-2 bg-[var(--surface-soft)] text-[var(--ink-soft)] py-3 rounded-xl text-sm font-bold border border-[var(--line)] cursor-not-allowed"
                        >
                          <Lock size={16} />
                          Temporarily Disabled
                        </button>
                      ) : isLive ? (
                        <Link
                          href={`/test-series/${item.id || item._id}`}
                          className="w-full flex items-center justify-center gap-2 bg-[var(--green-900)] hover:bg-[var(--green-800)] text-white py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-sm font-bold tracking-wide active:scale-[0.99] group/btn"
                        >
                          <span>Start Test Now</span>
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      ) : (
                        <div className="w-full flex items-center justify-center gap-2 bg-[var(--surface-soft)] text-[var(--ink-soft)] py-3 rounded-xl text-sm font-bold border border-[var(--line)] cursor-not-allowed">
                          <Lock size={16} />
                          Unlocks {formatShortDate(item.createdAt)}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center bg-[var(--surface-soft)] rounded-3xl border-2 border-dashed border-[var(--line)] max-w-xl mx-auto">
            <div className="p-4 bg-[var(--surface)] rounded-2xl mb-4 text-[var(--ink-soft)] border border-[var(--line)]">
              <ClipboardList size={32} />
            </div>
            <h4 className="text-base font-bold text-[var(--ink)] mb-1">No Tests Available</h4>
            <p className="text-[var(--ink-soft)] text-sm font-medium text-center px-4">
              We couldn't find any tests matching <br/>
              <span className="text-[var(--green-800)] font-bold">{activeFilter}</span> and <span className="text-[var(--green-700)] font-bold">{activeClassFilter}</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestSeries;