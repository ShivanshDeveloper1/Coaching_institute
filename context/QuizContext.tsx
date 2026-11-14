"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Quiz } from "@/types/quiz";

interface QuizContextType {
  quizData: Quiz | null;
  activeQuiz: Quiz | null;
  loading: boolean;
  error: string | null;
  fetchQuiz: (id: string) => Promise<Quiz | null>;
  selectedAnswers: Record<string | number, number | string | null>;
  setAnswer: (questionId: string | number, answer: number | string | null) => void;
  clearAnswer: (questionId: string | number) => void;
  markedForReview: (string | number)[];
  toggleMarkForReview: (questionId: string | number) => void;
  resetQuizState: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string | number, number | string | null>>({});
  const [markedForReview, setMarkedForReview] = useState<(string | number)[]>([]);

  const fetchQuiz = useCallback(async (id: string): Promise<Quiz | null> => {
    if (!id || id === "undefined") {
      setError("Invalid quiz ID");
      return null;
    }

    // If quiz is already loaded with the same id, return cached data
    if (quizData && (quizData.id === id || quizData._id === id)) {
      return quizData;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/quiz/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch quiz: HTTP ${response.status}`);
      }

      const raw = await response.json();
      const data: Quiz = (raw && raw.quiz) ? raw.quiz : raw;
      setQuizData(data);
      return data;
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Error loading quiz data";
      console.error("fetchQuiz error:", err);
      setError(errMsg);
      setQuizData(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [quizData]);

  const setAnswer = useCallback((questionId: string | number, answer: number | string | null) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  }, []);

  const clearAnswer = useCallback((questionId: string | number) => {
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  }, []);

  const toggleMarkForReview = useCallback((questionId: string | number) => {
    setMarkedForReview((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  }, []);

  const resetQuizState = useCallback(() => {
    setSelectedAnswers({});
    setMarkedForReview([]);
  }, []);

  const value: QuizContextType = {
    quizData,
    activeQuiz: quizData,
    loading,
    error,
    fetchQuiz,
    selectedAnswers,
    setAnswer,
    clearAnswer,
    markedForReview,
    toggleMarkForReview,
    resetQuizState,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
