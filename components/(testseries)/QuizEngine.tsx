"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Clock, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/context/QuizContext";
import { useUser } from "@/context/AuthContext";

import LatexText from "./LatexText";

const QuizEngine = () => {
  const { quizData, loading } = useQuiz();
  const { user } = useUser();
  const router = useRouter();

  // 1. Load saved progress from localStorage on initial render
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    if (typeof window !== "undefined" && quizData?._id) {
      const saved = localStorage.getItem(`quiz-progress-${quizData._id}`);
      if (saved) return JSON.parse(saved);
    }
    return {};
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // FIXED: Added the missing curly brace for the if statement
  let questionsList: any[] = [];
  if (Array.isArray(quizData?.questions)) {
    if (Array.isArray(quizData.questions[0])) {
      questionsList = quizData.questions[0];
    } else {
      questionsList = quizData.questions;
    }
  }

  const totalQuestions = questionsList.length;
  const totalTimeInSeconds = (quizData?.duration || totalQuestions) * 60;
  
  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);
  const latestAnswers = useRef(selectedAnswers);
  const hasSubmittedRef = useRef(false);
  const currentIndexRef = useRef(currentIndex);

  // Keep refs updated for background tasks
  useEffect(() => {
    latestAnswers.current = selectedAnswers;
  }, [selectedAnswers]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // 2. Auto-save every 15 seconds
  useEffect(() => {
    if (!quizData?._id) return;
    const saveInterval = setInterval(() => {
      if (Object.keys(latestAnswers.current).length > 0 && !hasSubmittedRef.current) {
        localStorage.setItem(
          `quiz-progress-${quizData._id}`,
          JSON.stringify(latestAnswers.current)
        );
      }
    }, 15000);
    return () => clearInterval(saveInterval);
  }, [quizData?._id]);

  const handleClearResponse = () => {
    setSelectedAnswers((prev: any) => {
      const updated = { ...prev };
      delete updated[currentIndex];
      return updated;
    });
  };

  // Define handleSubmitTest BEFORE the hooks that use it
  const handleSubmitTest = async (forceSubmit = false) => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    const answersToProcess = latestAnswers.current;
    const quizId = quizData?.id || quizData?._id;

    let correctCount = 0;
    let incorrectCount = 0;

    questionsList.forEach((question: any, index: number) => {
      const selectedOption = answersToProcess[index];
      if (selectedOption !== undefined) {
        const correctVal =
          question.correct_answer !== undefined ? question.correct_answer : question.correctAnswer;
        if (selectedOption === correctVal || String(selectedOption) === String(correctVal)) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });

    const unattemptedCount = Math.max(0, totalQuestions - (correctCount + incorrectCount));
    // User instruction: NO NEGATIVE MARKING (+4 marks for correct, 0 for incorrect)
    const score = correctCount * 4;
    const maxScore = totalQuestions * 4;
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    const accuracy =
      correctCount + incorrectCount > 0
        ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
        : 0;

    const localResultData = {
      attemptId: `attempt_${quizId}_${Date.now()}`,
      quizId,
      quizTitle: quizData?.title || "Test Series",
      score,
      maxScore,
      percentage,
      accuracy,
      summary: {
        totalQuestions,
        attempted: correctCount + incorrectCount,
        correct: correctCount,
        incorrect: incorrectCount,
        unattempted: unattemptedCount,
      },
      timeTakenSeconds: totalTimeInSeconds - timeLeft,
      userAnswers: answersToProcess,
      questionReview: questionsList.map((q: any, idx: number) => {
        const selected = answersToProcess[idx] !== undefined ? answersToProcess[idx] : null;
        const correctVal = q.correct_answer !== undefined ? q.correct_answer : q.correctAnswer;
        return {
          questionId: q.id || q._id || `q_${idx}`,
          questionIndex: idx,
          questionText: q.question_text || q.questionText || q.question || "",
          imageUrl: q.imageUrl || null,
          options: Array.isArray(q.options)
            ? q.options.map((opt: any) => (typeof opt === "string" ? opt : opt.text || ""))
            : [],
          selectedAnswer: selected,
          correctAnswer: correctVal,
          isCorrect: selected !== null && (selected === correctVal || String(selected) === String(correctVal)),
          explanation: q.explanation || "No explanation provided for this question.",
          subject: q.subject || "General",
        };
      }),
    };

    latestAnswers.current = {}; 
    localStorage.removeItem(`quiz-progress-${quizId}`);
    sessionStorage.setItem(`testResult-${quizId}`, JSON.stringify(localResultData));

    // Submit to server endpoint in background
    try {
      const res = await fetch(`/api/quiz/${quizId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responses: answersToProcess,
          timeSpentSeconds: totalTimeInSeconds - timeLeft,
          userId: user?.uid || "student-demo-user",
          studentName: user?.displayName || user?.email || "Student",
          studentEmail: user?.email || "student@conceptinsolution.com",
        }),
      });
      if (res.ok) {
        const apiData = await res.json();
        sessionStorage.setItem(`testResult-${quizId}`, JSON.stringify(apiData));
      }
    } catch (e) {
      console.warn("Background quiz submission fallback to local:", e);
    }
    
    router.replace(`/test-series/${quizId}/result?attempt=${Date.now()}`);
  };

  // Timer logic
  useEffect(() => {
    if (!quizData) return; 
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quizData]); 

  // 3. Anti-cheat and Window listeners 
  useEffect(() => {
    if (!quizData) return;

    window.history.pushState(null, "", window.location.href);
    
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      if (currentIndexRef.current > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else {
        const leave = window.confirm("Warning: Leaving now will instantly submit your quiz. Continue?");
        if (leave) handleSubmitTest(true);
      }
    };

    const handleBeforeUnload = (e: any) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave?";
    };

    const handleVisibilityChange = () => {
      if (document.hidden && !hasSubmittedRef.current) {
        alert("Cheating Protection: Test auto-submitted due to tab switch!");
        handleSubmitTest(true);
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [quizData, questionsList]); 

  // 4. Loading state early return
  if (loading || !quizData || questionsList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">
        Loading Quiz Data...
      </div>
    );
  }

  const currentQuestion = questionsList[currentIndex];
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins} min ${secs < 10 ? `0${secs}` : secs} sec` : `${secs} sec`;
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedAnswers((prev: any) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const nextQuestion = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  // REMOVED DUPLICATE TIMER AND EVENT LISTENER HOOKS THAT WERE PREVIOUSLY HERE

  return (
    <section
      className="min-h-screen bg-[var(--bg)] pt-20 pb-12 px-4 sm:px-6 lg:px-8 select-none"
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        <div className="lg:col-span-3 order-1 lg:order-none">
          <div className="bg-[var(--surface)] rounded-[var(--radius)] shadow-[var(--shadow)] border border-[var(--line)] overflow-hidden flex flex-col h-full">
            <div className="h-2 w-full bg-[var(--surface-soft)]">
              <div
                className="h-full bg-[var(--green-700)] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="p-5 sm:p-8 md:p-10 flex-1 flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                <span className="text-xs font-black uppercase tracking-wider text-[var(--green-900)] bg-[var(--green-300)] px-3.5 py-1.5 rounded-full border border-[var(--line)]">
                  {currentQuestion?.subject || "General"}
                </span>

                <div className="flex items-center gap-2 text-[var(--green-900)] bg-[var(--surface-soft)] px-4 py-1.5 rounded-full border border-[var(--line)] text-sm sm:text-base font-extrabold shadow-xs">
                  <Clock size={16} className="text-[var(--green-700)] animate-pulse" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>

              <div className="mb-8 sm:mb-10">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--ink)] leading-relaxed">
                  <span className="text-[var(--green-800)] mr-2 text-xl sm:text-2xl md:text-3xl font-black">
                    Q{currentIndex + 1}.
                  </span>
                  <LatexText text={currentQuestion?.question_text} />
                </h2>

                {currentQuestion?.imageUrl && (
                  <div className="mt-6 flex justify-center">
                    <img 
                      src={currentQuestion.imageUrl} 
                      alt={`Question ${currentIndex + 1} illustration`} 
                      className="max-h-64 w-auto rounded-xl shadow-xs border border-[var(--line)] object-contain"
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-10 flex-1">
                {currentQuestion?.options?.map((opt: string, i: number) => {
                  const isSelected = selectedAnswers[currentIndex] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(i)}
                      className={`group w-full flex items-center p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ease-in-out transform active:scale-[0.99] text-left ${
                        isSelected
                          ? "border-[var(--green-700)] bg-[var(--surface-soft)] shadow-sm"
                          : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--green-600)] hover:bg-[var(--surface-soft)]"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-lg flex items-center justify-center font-bold mr-4 border transition-colors ${
                          isSelected
                            ? "bg-[#0c3d3d] text-white border-[#0c3d3d]"
                            : "bg-[var(--surface-soft)] text-[var(--ink-soft)] border-[var(--line)]"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span
                        className={`font-semibold text-sm sm:text-base ${
                          isSelected ? "text-[var(--green-900)]" : "text-[var(--ink)]"
                        }`}
                      >
                        <LatexText text={opt} />
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-[var(--line)] mt-auto">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={prevQuestion}
                    disabled={currentIndex === 0}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[var(--ink)] bg-[var(--surface-soft)] hover:bg-[var(--bg-strong)] border border-[var(--line)] disabled:opacity-40 transition-colors"
                  >
                    <ChevronLeft size={18} /> Previous
                  </button>

                  {selectedAnswers[currentIndex] !== undefined && (
                    <button
                      type="button"
                      onClick={handleClearResponse}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[var(--ink-soft)] hover:text-red-700 hover:bg-red-50 border border-[var(--line)] transition-colors"
                    >
                      <RotateCcw size={15} /> Clear Response
                    </button>
                  )}
                </div>

                {currentIndex === totalQuestions - 1 ? (
                  <button
                    onClick={() => handleSubmitTest(false)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-[#0c3d3d] hover:bg-[#0d4f4f] text-white shadow-md hover:shadow-lg transition-all"
                  >
                    Submit Test <CheckCircle size={18} />
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-[#0c3d3d] hover:bg-[#0d4f4f] text-white shadow-md hover:shadow-lg transition-all"
                  >
                    Save & Next <ChevronRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 order-2 lg:order-none">
          <div className="bg-[var(--surface)] p-5 sm:p-6 rounded-[var(--radius)] shadow-[var(--shadow)] border border-[var(--line)] sticky top-6 lg:top-28">
            <h3 className="font-bold text-[var(--ink)] mb-4">Question Palette</h3>
            <div className="grid grid-cols-5 gap-2">
              {questionsList?.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-10 w-full rounded-lg flex items-center justify-center text-sm font-bold border transition-all ${
                    currentIndex === i ? "border-[#0c3d3d] ring-2 ring-[#a8f0b0]" : "border-transparent"
                  } ${
                    selectedAnswers[i] !== undefined ? "bg-[var(--green-700)] text-white" : "bg-[var(--surface-soft)] text-[var(--ink-soft)] border-[var(--line)]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizEngine;