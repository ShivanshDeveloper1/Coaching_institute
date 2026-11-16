"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Loader2, 
  Save, 
  Plus, 
  Trash2, 
  Search, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Menu,
  X,
  BookOpen
} from "lucide-react";
import { RichTextEditor } from "@/components/(admin)/(testseries)/CreateQuiz/RichTextEditor";

const AdminQuizEditor = () => {
  const [quizList, setQuizList] = useState<any[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/edit-quizzes", { cache: "no-store" });
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setQuizList(list);
      // Auto-select first quiz if none selected
      if (list.length > 0 && !selectedQuiz) {
        handleSelectQuiz(list[0]._id || list[0].id);
      }
    } catch (err) {
      console.error("Failed to load quizzes", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectQuiz = async (id: string) => {
    setLoading(true);
    setMobileDrawerOpen(false);
    try {
      const res = await fetch(`/api/admin/edit-quizzes/${id}`, { cache: "no-store" });
      const data = await res.json();
      setSelectedQuiz(data);
    } catch (error) {
      alert("Failed to load quiz details.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    setSelectedQuiz((prevQuiz: any) => {
      if (!prevQuiz) return null;
      return {
        ...prevQuiz,
        questions: (prevQuiz.questions || []).map((q: any, i: number) => 
          i === index ? { ...q, [field]: value } : q
        )
      };
    });
  };

  const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
    setSelectedQuiz((prevQuiz: any) => {
      if (!prevQuiz) return null;
      return {
        ...prevQuiz,
        questions: (prevQuiz.questions || []).map((q: any, i: number) => {
          if (i === qIndex) {
            const updatedOptions = [...(q.options || ["", "", "", ""])];
            updatedOptions[optIndex] = value;
            return { ...q, options: updatedOptions };
          }
          return q;
        })
      };
    });
  };

  const handleAddQuestion = () => {
    if (!selectedQuiz) return;
    const newQuestion = {
      subject: "Chemistry",
      question_text: "",
      options: ["", "", "", ""],
      correct_answer: 0,
      explanation: ""
    };
    setSelectedQuiz({
      ...selectedQuiz,
      questions: [...(selectedQuiz.questions || []), newQuestion]
    });
  };

  const handleDeleteQuestion = (index: number) => {
    if (!window.confirm(`Are you sure you want to delete Question #${index + 1}?`)) return;
    const updatedQuestions = [...(selectedQuiz.questions || [])];
    updatedQuestions.splice(index, 1);
    setSelectedQuiz({ ...selectedQuiz, questions: updatedQuestions });
  };

  const handleDeleteQuiz = async () => {
    if (!selectedQuiz) return;
    const quizId = selectedQuiz._id || selectedQuiz.id;
    if (!window.confirm(`Are you sure you want to delete the entire quiz "${selectedQuiz.title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/edit-quizzes/${quizId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete quiz");
      alert("Quiz deleted successfully");
      setSelectedQuiz(null);
      fetchQuizzes();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleSave = async () => {
    if (!selectedQuiz) return;
    setSaving(true);
    try {
      const quizId = selectedQuiz._id || selectedQuiz.id;
      const res = await fetch(`/api/admin/edit-quizzes/${quizId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedQuiz)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update quiz");
      }
      setSelectedQuiz(data.quiz || selectedQuiz);
      alert("Quiz changes saved successfully! Updates are live on the platform.");
      fetchQuizzes();
    } catch (error: any) {
      alert(`Failed to save: ${error?.message || error}`);
    } finally {
      setSaving(false);
    }
  };

  const filteredQuizzes = useMemo(() => {
    return quizList.filter((q) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      return (
        (q.title && q.title.toLowerCase().includes(query)) ||
        (q.examType && q.examType.toLowerCase().includes(query)) ||
        (q.classLevel && q.classLevel.toLowerCase().includes(query))
      );
    });
  }, [quizList, searchQuery]);

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-[var(--bg)] text-[var(--ink)] antialiased font-sans">
      
      {/* MOBILE TOP BAR (Visible only on < lg screens) */}
      <div className="lg:hidden p-4 bg-[var(--surface)] border-b border-[var(--line)] flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--green-800)] block">
            Test Series Editor
          </span>
          <h2 className="text-base font-extrabold truncate max-w-[220px]">
            {selectedQuiz?.title || "Select a Quiz"}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#0c3d3d] text-white"
        >
          {mobileDrawerOpen ? <X size={16} /> : <Menu size={16} />}
          <span>{mobileDrawerOpen ? "Close List" : "Switch Quiz"}</span>
        </button>
      </div>

      {/* LEFT SIDEBAR - Quiz List (Drawer on mobile, sticky sidebar on desktop) */}
      <aside 
        className={`w-full lg:w-80 xl:w-96 bg-[var(--surface)] border-r border-[var(--line)] flex-col shrink-0 lg:h-screen lg:sticky lg:top-0 z-20 ${
          mobileDrawerOpen ? "flex fixed inset-x-0 top-16 bottom-0 z-40 p-4" : "hidden lg:flex p-4 sm:p-5"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--green-900)]" />
            <h2 className="text-lg font-black tracking-tight text-[var(--ink)]">
              All Test Series
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[var(--surface-soft)] text-[var(--green-900)] border border-[var(--line)]">
            {quizList.length} Tests
          </span>
        </div>

        {/* Search Input for Quiz List */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-[var(--ink-soft)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search quizzes..."
            className="w-full bg-[var(--surface-soft)] pl-9 pr-3 py-2 rounded-xl border border-[var(--line)] text-xs text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[#0c3d3d]/20"
          />
        </div>

        {/* Quiz Items Scrollable List */}
        <div className="space-y-2 overflow-y-auto flex-1 pr-1">
          {loading && quizList.length === 0 ? (
            <div className="p-8 text-center text-xs text-[var(--ink-soft)] flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[var(--green-700)]" />
              <span>Loading quizzes...</span>
            </div>
          ) : filteredQuizzes.length === 0 ? (
            <div className="p-6 text-center text-xs text-[var(--ink-soft)] bg-[var(--surface-soft)] rounded-xl border border-[var(--line)]">
              No quiz matches &quot;{searchQuery}&quot;
            </div>
          ) : (
            filteredQuizzes.map((q: any) => {
              const qId = q._id || q.id;
              const selId = selectedQuiz?._id || selectedQuiz?.id;
              const isSelected = selId === qId;

              return (
                <button
                  key={qId}
                  onClick={() => handleSelectQuiz(qId)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex flex-col gap-1.5 ${
                    isSelected
                      ? "bg-[var(--surface-soft)] border-[var(--green-700)] shadow-xs ring-1 ring-[#a8f0b0]"
                      : "bg-[var(--surface)] border-[var(--line)] hover:bg-[var(--bg-strong)]/50 text-[var(--ink)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-sm text-[var(--ink)] line-clamp-1">
                      {q.title || "Untitled Quiz"}
                    </span>
                    <span className="shrink-0 text-xs">
                      {q.isLocked ? "🔴" : "🟢"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[var(--ink-soft)] font-medium">
                    <span className="px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--line)]">
                      {q.examType || "Mock"}
                    </span>
                    {q.classLevel && (
                      <span className="px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--line)]">
                        {q.classLevel}
                      </span>
                    )}
                    <span className="ml-auto font-semibold">
                      {q.questions?.length || q.totalQuestions || 0} Qs
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* MAIN CONTENT - Edit Area */}
      <section className="flex-1 p-4 sm:p-6 md:p-8 lg:h-screen lg:overflow-y-auto">
        {!selectedQuiz ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)] max-w-xl mx-auto my-12">
            <BookOpen className="w-12 h-12 text-[var(--ink-soft)] mb-3 opacity-40" />
            <h3 className="text-lg font-bold text-[var(--ink)]">No Quiz Selected</h3>
            <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-1">
              Select a quiz from the sidebar to inspect and update its questions, answers, and formula solutions.
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6 pb-20">
            
            {/* STICKY TOP CONTROLS & META HEADER */}
            <div className="bg-[var(--surface)] p-5 sm:p-6 rounded-[var(--radius)] shadow-xs border border-[var(--line)] sticky top-0 lg:top-0 z-10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[var(--green-800)] uppercase tracking-wider block">
                    Currently Modifying
                  </span>
                  <input
                    type="text"
                    value={selectedQuiz.title || ""}
                    onChange={(e) => setSelectedQuiz({ ...selectedQuiz, title: e.target.value })}
                    className="text-xl sm:text-2xl font-black text-[var(--ink)] tracking-tight bg-transparent border-b border-transparent hover:border-gray-300 focus:border-[#0c3d3d] focus:outline-none w-full"
                    placeholder="Enter Quiz Title..."
                  />
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleDeleteQuiz}
                    className="p-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
                    title="Delete entire quiz from database"
                  >
                    <Trash2 size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#0c3d3d] hover:bg-[#0d4f4f] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
                  </button>
                </div>
              </div>

              {/* Second Row: Target Class, Freeze Status & Question Count */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Target Class Dropdown */}
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
                      Target Class:
                    </label>
                    <select
                      value={selectedQuiz.classLevel || ""}
                      onChange={(e) => setSelectedQuiz({ ...selectedQuiz, classLevel: e.target.value })}
                      className="bg-[var(--surface-soft)] border border-[var(--line)] rounded-xl text-xs font-bold px-3 py-1.5 focus:ring-2 focus:ring-[#0c3d3d]/20 focus:outline-none text-[var(--ink)]"
                    >
                      <option value="">Select a Class...</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                      <option value="Dropper">Dropper</option>
                      <option value="Foundation">Foundation</option>
                    </select>
                  </div>

                  {/* Freeze / Active Status Toggle */}
                  <div className="flex items-center gap-2 bg-[var(--surface-soft)] px-3 py-1.5 rounded-xl border border-[var(--line)]">
                    <input
                      type="checkbox"
                      id="freezeQuiz"
                      checked={selectedQuiz.isLocked || false}
                      onChange={(e) => setSelectedQuiz({ ...selectedQuiz, isLocked: e.target.checked })}
                      className="w-4 h-4 text-[#0c3d3d] focus:ring-[#0c3d3d] border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor="freezeQuiz" className="text-xs font-semibold text-[var(--ink)] cursor-pointer select-none">
                      {selectedQuiz.isLocked ? "🔴 Hidden (Frozen)" : "🟢 Live for Students"}
                    </label>
                  </div>
                </div>

                <div className="text-xs font-bold text-[var(--green-900)] bg-[var(--green-300)] border border-[var(--line)] px-3 py-1 rounded-full">
                  {selectedQuiz.questions?.length || 0} Questions Total
                </div>
              </div>
            </div>

            {/* QUESTIONS LIST */}
            <div className="space-y-6">
              {selectedQuiz.questions?.map((question: any, qIndex: number) => (
                <div 
                  key={question._id || qIndex} 
                  className="bg-[var(--surface)] p-5 sm:p-7 rounded-[var(--radius)] shadow-xs border border-[var(--line)] relative group space-y-6"
                >
                  {/* Top Panel of Question */}
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#0c3d3d] text-white px-3 py-1 rounded-lg text-xs font-bold shadow-xs">
                        Question #{qIndex + 1}
                      </span>
                      <input 
                        type="text" 
                        value={question.subject || ""}
                        onChange={(e) => handleQuestionChange(qIndex, "subject", e.target.value)}
                        className="bg-[var(--surface-soft)] border border-[var(--line)] rounded-lg px-3 py-1 text-xs font-bold text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[#0c3d3d]/20"
                        placeholder="Subject (e.g., Chemistry)"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(qIndex)}
                      className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete this question"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Question Statement */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
                      Question Statement (Formula & Science Mode Supported)
                    </label>
                    <RichTextEditor
                      value={question.question_text || ""}
                      onChange={(val) => handleQuestionChange(qIndex, "question_text", val)}
                      rows={3}
                      showPreview={true}
                    />
                  </div>

                  {/* Options Input Grid: Each option has dedicated compact formula toolbar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
                        Answer Options (Select correct key via radio button)
                      </label>
                      <span className="text-[11px] font-bold text-[var(--green-900)] bg-[var(--green-300)] border border-[var(--line)] px-2.5 py-0.5 rounded-md">
                        Correct: Option {String.fromCharCode(65 + (question.correct_answer || 0))}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["A", "B", "C", "D"].map((letter, optIndex) => {
                        const isCorrect = (question.correct_answer || 0) === optIndex;
                        return (
                          <div 
                            key={optIndex} 
                            className={`flex flex-col gap-2 p-3.5 rounded-xl border-2 transition-all ${
                              isCorrect 
                                ? "border-[var(--green-700)] bg-[var(--surface-soft)]/50 shadow-xs" 
                                : "border-[var(--line)] bg-[var(--surface)] hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center justify-between border-b border-[var(--line)] pb-1.5">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                  type="radio" 
                                  name={`correct-${qIndex}`}
                                  checked={isCorrect}
                                  onChange={() => handleQuestionChange(qIndex, "correct_answer", optIndex)}
                                  className="w-4 h-4 text-[#0c3d3d] focus:ring-[#0c3d3d] border-gray-300 cursor-pointer"
                                />
                                <span className="text-xs font-bold text-[var(--ink)]">
                                  Option {letter} {isCorrect ? "(Correct Answer)" : ""}
                                </span>
                              </label>
                            </div>
                            <RichTextEditor
                              value={question.options?.[optIndex] || ""}
                              onChange={(val) => handleOptionChange(qIndex, optIndex, val)}
                              compact={true}
                              rows={1}
                              showPreview={true}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Detailed Explanation */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
                      Answer Explanation & NCERT Derivation
                    </label>
                    <RichTextEditor
                      value={question.explanation || ""}
                      onChange={(val) => handleQuestionChange(qIndex, "explanation", val)}
                      rows={2}
                      showPreview={true}
                    />
                  </div>

                </div>
              ))}
            </div>

            {/* Bottom Form Add Action */}
            <button
              type="button"
              onClick={handleAddQuestion}
              className="w-full py-4 border-2 border-dashed border-[var(--line)] rounded-2xl flex items-center justify-center gap-2 text-[var(--ink-soft)] hover:text-[var(--green-900)] hover:border-[var(--green-600)] hover:bg-[var(--surface-soft)] transition-all font-bold text-sm bg-[var(--surface)] shadow-xs"
            >
              <Plus size={18} />
              Append New Blank Question
            </button>

          </div>
        )}
      </section>
    </main>
  );
};

export default AdminQuizEditor;
