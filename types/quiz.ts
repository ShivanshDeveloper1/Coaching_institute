/**
 * Quiz & Test Series Type Definitions
 * Single source of truth for Test Series models (Firestore aligned)
 */

export interface QuestionOption {
  id: string; // e.g. "A", "B", "C", "D" or "0", "1", "2", "3"
  text: string;
  imageUrl?: string;
}

export interface Question {
  id: string;
  _id?: string; // backwards compatibility
  question?: string; // backwards compatibility with legacy UI
  question_text?: string; // legacy snake_case used by QuizEngine
  correct_answer?: number | string; // legacy snake_case used by QuizEngine
  questionText: string;
  imageUrl?: string;
  options: (string | QuestionOption)[];
  correctAnswer?: number | string; // index 0..3 or "A".."D"
  correctOptionId?: string;
  explanation?: string;
  subject?: "Physics" | "Chemistry" | "Mathematics" | "Biology" | string;
  marks?: number;
  negativeMarks?: number;
}

export interface QuizSection {
  id: string;
  name: string;
  subject: "Physics" | "Chemistry" | "Mathematics" | "Biology" | string;
  instructions?: string;
  questions: Question[];
}

export interface QuizMarkingScheme {
  correct: number;
  incorrect: number;
  unattempted?: number;
}

export interface Quiz {
  id: string;
  _id?: string; // backwards compatibility
  title: string;
  description?: string;
  overview?: string; // pre-test overview or summary
  examType: "NEET" | "JEE" | "FOUNDATION" | "ALL" | string;
  classLevel?: "Class 9" | "Class 10" | "Class 11" | "Class 12" | "Dropper" | string;
  language?: string;
  duration: number; // in minutes
  totalDuration?: number; // legacy alias
  totalMarks: number;
  marks?: number; // legacy alias
  marksPerQuestion?: number;
  negativeMarks?: number;
  totalQuestions: number;
  difficulty?: "Easy" | "Medium" | "Hard" | string;
  isPublished: boolean;
  isLocked?: boolean;
  isFree?: boolean;
  syllabus?: string[];
  instructions?: string[];
  markingScheme?: QuizMarkingScheme;
  sections?: QuizSection[];
  questions?: (Question | Question[])[]; // supports flat array or section-based
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentResponse {
  questionId: string;
  questionIndex?: number;
  selectedAnswer: number | string | null;
  isCorrect?: boolean;
  isMarkedForReview?: boolean;
  timeSpentSeconds?: number;
}

export interface SubjectAnalysis {
  subject: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  score: number;
  maxScore: number;
  accuracy: number;
}

export interface QuizResultSummary {
  totalQuestions: number;
  attempted: number;
  unattempted: number;
  correct: number;
  incorrect: number;
  markedForReview: number;
  score: number;
  totalMarks: number;
  percentage: number;
  accuracy: number;
  timeTakenSeconds: number;
  rank?: number;
  totalParticipants?: number;
}

export interface QuizAttempt {
  id: string;
  _id?: string;
  quizId: string;
  quizTitle: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  startedAt: string;
  submittedAt: string;
  timeTakenSeconds: number;
  score: number;
  totalMarks: number;
  percentage: number;
  accuracy: number;
  summary: QuizResultSummary;
  subjectBreakdown?: Record<string, SubjectAnalysis>;
  responses: StudentResponse[];
}

export interface QuizSubmissionPayload {
  quizId: string;
  userId: string;
  studentName?: string;
  studentEmail?: string;
  timeSpentSeconds: number;
  responses: Record<string, number | string | null>; // map of questionId or index to answer
  markedForReview?: (number | string)[];
}
