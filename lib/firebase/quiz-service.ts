import { adminDb, isAdminConfigured } from "./admin";
import { Quiz, Question, QuizSection } from "@/types/quiz";

/**
 * Built-in initial mock quizzes for coaching institute test series
 * Used as fallback or seed data when Firestore collection is empty or credentials are not configured.
 */
export const initialMockQuizzes: Quiz[] = [
  {
    id: "quiz_neet_mock_01",
    _id: "quiz_neet_mock_01",
    title: "NEET Full Syllabus Chemistry & Biology Challenger",
    description: "Complete NCERT-focused mock test designed by Dheeraj Sir for NEET 2026 aspirants.",
    examType: "NEET",
    classLevel: "Class 12",
    language: "English",
    duration: 180,
    totalDuration: 180,
    totalMarks: 720,
    marks: 720,
    totalQuestions: 15,
    difficulty: "Medium",
    isPublished: true,
    isLocked: false,
    isFree: true,
    syllabus: [
      "Chemical Bonding and Molecular Structure",
      "Thermodynamics & Equilibrium",
      "Organic Chemistry Basics & Hydrocarbons",
      "Cell Biology & Genetics",
      "Human Physiology"
    ],
    instructions: [
      "Total duration of this mock exam is 180 minutes.",
      "Each correct response will be awarded +4 marks.",
      "For each incorrect answer, 1 mark will be deducted (-1 negative marking).",
      "Unattempted questions will be awarded 0 marks.",
      "Use the Question Palette on the right to navigate between questions.",
      "You can mark questions for review and return to them before final submission."
    ],
    markingScheme: {
      correct: 4,
      incorrect: 1,
      unattempted: 0,
    },
    sections: [
      {
        id: "sec_chem",
        name: "Chemistry",
        subject: "Chemistry",
        instructions: "Attempt all questions in this section.",
        questions: [
          {
            id: "q_chem_1",
            _id: "q_chem_1",
            question: "Which of the following molecules has a permanent dipole moment?",
            questionText: "Which of the following molecules has a permanent dipole moment?",
            options: [
              { id: "A", text: "$BF_3$" },
              { id: "B", text: "$NF_3$" },
              { id: "C", text: "$CO_2$" },
              { id: "D", text: "$CCl_4$" }
            ],
            correctAnswer: 1,
            correctOptionId: "B",
            explanation: "$NF_3$ has a pyramidal geometry with a lone pair on Nitrogen, resulting in a net non-zero dipole moment, unlike symmetrical $BF_3$, $CO_2$, and $CCl_4$.",
            subject: "Chemistry",
            marks: 4,
            negativeMarks: 1,
          },
          {
            id: "q_chem_2",
            _id: "q_chem_2",
            question: "For an endothermic reaction where $\\Delta H > 0$, the reaction is spontaneous at all temperatures if:",
            questionText: "For an endothermic reaction where $\\Delta H > 0$, the reaction is spontaneous at all temperatures if:",
            options: [
              { id: "A", text: "$\\Delta S > 0$ and $T\\Delta S > \\Delta H$" },
              { id: "B", text: "$\\Delta S < 0$" },
              { id: "C", text: "$\\Delta H < T\\Delta S$ at low temperature" },
              { id: "D", text: "Never spontaneous at low temperature" }
            ],
            correctAnswer: 0,
            correctOptionId: "A",
            explanation: "According to Gibbs-Helmholtz equation $\\Delta G = \\Delta H - T\\Delta S$. For spontaneity $\\Delta G < 0$, which requires $\\Delta S > 0$ and $T\\Delta S > \\Delta H$.",
            subject: "Chemistry",
            marks: 4,
            negativeMarks: 1,
          },
          {
            id: "q_chem_3",
            _id: "q_chem_3",
            question: "What is the IUPAC name of $(CH_3)_2C=CH-COCH_3$?",
            questionText: "What is the IUPAC name of $(CH_3)_2C=CH-COCH_3$?",
            options: [
              { id: "A", text: "4-methylpent-3-en-2-one" },
              { id: "B", text: "2-methylpent-2-en-4-one" },
              { id: "C", text: "3-methylpent-2-en-4-one" },
              { id: "D", text: "Mesitly oxide" }
            ],
            correctAnswer: 0,
            correctOptionId: "A",
            explanation: "Numbering starts from the carbonyl carbon giving 4-methylpent-3-en-2-one.",
            subject: "Chemistry",
            marks: 4,
            negativeMarks: 1,
          }
        ]
      }
    ],
    // Flat questions list fallback for legacy QuizEngine
    questions: [
      {
        id: "q_chem_1",
        _id: "q_chem_1",
        question: "Which of the following molecules has a permanent dipole moment?",
        questionText: "Which of the following molecules has a permanent dipole moment?",
        options: [
          "$BF_3$",
          "$NF_3$",
          "$CO_2$",
          "$CCl_4$"
        ],
        correctAnswer: 1,
        correctOptionId: "B",
        explanation: "$NF_3$ has a pyramidal geometry with a lone pair on Nitrogen, resulting in a net non-zero dipole moment.",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1,
      },
      {
        id: "q_chem_2",
        _id: "q_chem_2",
        question: "For an endothermic reaction where $\\Delta H > 0$, the reaction is spontaneous when:",
        questionText: "For an endothermic reaction where $\\Delta H > 0$, the reaction is spontaneous when:",
        options: [
          "$\\Delta S > 0$ and $T\\Delta S > \\Delta H$",
          "$\\Delta S < 0$",
          "$\\Delta H < T\\Delta S$ at low temperature",
          "Never spontaneous"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "Spontaneity requires $\\Delta G = \\Delta H - T\\Delta S < 0$.",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1,
      },
      {
        id: "q_chem_3",
        _id: "q_chem_3",
        question: "What is the IUPAC name of $(CH_3)_2C=CH-COCH_3$?",
        questionText: "What is the IUPAC name of $(CH_3)_2C=CH-COCH_3$?",
        options: [
          "4-methylpent-3-en-2-one",
          "2-methylpent-2-en-4-one",
          "3-methylpent-2-en-4-one",
          "Mesityl oxide"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "Numbered from the right to prioritize the ketone carbonyl: 4-methylpent-3-en-2-one.",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1,
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "quiz_jee_mock_01",
    _id: "quiz_jee_mock_01",
    title: "JEE Main Physics & Chemistry Grand Mock 01",
    description: "High-yield conceptual and numerical problems curated for JEE Main aspirants.",
    examType: "JEE",
    classLevel: "Class 12",
    language: "English",
    duration: 180,
    totalDuration: 180,
    totalMarks: 300,
    marks: 300,
    totalQuestions: 15,
    difficulty: "Hard",
    isPublished: true,
    isLocked: false,
    isFree: true,
    syllabus: [
      "Electrostatics & Current Electricity",
      "Rotational Dynamics",
      "Coordination Compounds",
      "Chemical Kinetics & Solutions"
    ],
    instructions: [
      "Total duration is 180 minutes.",
      "Marks: +4 for correct answer, -1 for wrong answer, 0 for unattempted.",
      "Calculators and rough tables are strictly prohibited."
    ],
    markingScheme: {
      correct: 4,
      incorrect: 1,
      unattempted: 0,
    },
    questions: [
      {
        id: "q_jee_1",
        _id: "q_jee_1",
        question: "A particle executes SHM with amplitude $A$. At what distance from the mean position is its kinetic energy equal to its potential energy?",
        questionText: "A particle executes SHM with amplitude $A$. At what distance from the mean position is its kinetic energy equal to its potential energy?",
        options: [
          "$A / 2$",
          "$A / \\sqrt{2}$",
          "$A / 4$",
          "$\\sqrt{3}A / 2$"
        ],
        correctAnswer: 1,
        correctOptionId: "B",
        explanation: "$KE = \\frac{1}{2}k(A^2 - x^2)$ and $PE = \\frac{1}{2}kx^2$. Equating gives $A^2 - x^2 = x^2 \\implies x = A / \\sqrt{2}$.",
        subject: "Physics",
        marks: 4,
        negativeMarks: 1,
      },
      {
        id: "q_jee_2",
        _id: "q_jee_2",
        question: "The rate constant of a first order reaction is $k = 10^{-3} s^{-1}$. What is the half life $t_{1/2}$?",
        questionText: "The rate constant of a first order reaction is $k = 10^{-3} s^{-1}$. What is the half life $t_{1/2}$?",
        options: [
          "$693\\text{ s}$",
          "$346.5\\text{ s}$",
          "$1000\\text{ s}$",
          "$69.3\\text{ s}$"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "$t_{1/2} = \\frac{\\ln 2}{k} = \\frac{0.693}{10^{-3}} = 693\\text{ s}$.",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1,
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "quiz_foundation_mock_01",
    _id: "quiz_foundation_mock_01",
    title: "Class 10th Board & Foundation Diagnostic Mock",
    description: "Strengthen your core foundation in Science and Mathematics for board exam readiness.",
    examType: "Foundation",
    classLevel: "Class 10",
    language: "English",
    duration: 60,
    totalDuration: 60,
    totalMarks: 100,
    marks: 100,
    totalQuestions: 10,
    difficulty: "Easy",
    isPublished: true,
    isLocked: false,
    isFree: true,
    syllabus: [
      "Chemical Reactions and Equations",
      "Acids, Bases and Salts",
      "Light - Reflection and Refraction",
      "Electricity"
    ],
    instructions: [
      "Total duration is 60 minutes.",
      "+4 for correct, -1 for wrong.",
      "Read each question carefully before submitting."
    ],
    markingScheme: {
      correct: 4,
      incorrect: 1,
      unattempted: 0,
    },
    questions: [
      {
        id: "q_fnd_1",
        _id: "q_fnd_1",
        question: "When dilute hydrochloric acid is added to iron filings, what gas is produced?",
        questionText: "When dilute hydrochloric acid is added to iron filings, what gas is produced?",
        options: [
          "Hydrogen gas and Iron chloride are produced",
          "Chlorine gas and Iron hydroxide are produced",
          "No reaction takes place",
          "Iron salt and water are produced"
        ],
        correctAnswer: 0,
        correctOptionId: "A",
        explanation: "$Fe + 2HCl \\rightarrow FeCl_2 + H_2\\uparrow$. Hydrogen gas and Iron(II) chloride are formed.",
        subject: "Chemistry",
        marks: 4,
        negativeMarks: 1,
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

/**
 * The existing QuizEngine UI reads `question_text` and `correct_answer` (snake_case).
 * Normalize every question so both naming styles are always present.
 */
function normalizeQuestion(q: Question): Question {
  const raw = q as Question & {
    question_text?: string;
    correct_answer?: number | string;
    question_image?: string | null;
  };
  return {
    ...q,
    question_text: raw.question_text ?? q.questionText ?? q.question ?? "",
    questionText: q.questionText ?? q.question ?? raw.question_text ?? "",
    correct_answer: raw.correct_answer ?? q.correctAnswer,
    // Admin builder stores the picture as `question_image`; the student engine reads `imageUrl`.
    imageUrl: q.imageUrl || raw.question_image || undefined,
  } as Question;
}

function normalizeQuiz(quiz: Quiz): Quiz {
  const questions = Array.isArray(quiz.questions)
    ? quiz.questions.map((item) =>
        Array.isArray(item) ? item.map(normalizeQuestion) : normalizeQuestion(item)
      )
    : quiz.questions;
  return { ...quiz, questions };
}

export async function getQuizzesFromFirestore(filters?: {
  examType?: string;
  classLevel?: string;
}): Promise<Quiz[]> {
  const list = await fetchQuizzesRaw(filters);
  return list
    .map(normalizeQuiz)
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

export async function getQuizByIdFromFirestore(id: string): Promise<Quiz | null> {
  const quiz = await fetchQuizByIdRaw(id);
  return quiz ? normalizeQuiz(quiz) : null;
}

/* ==========================================================================
 * ADMIN WRITE HELPERS (Step 11)
 * All admin quiz data is stored in the Firestore `quizzes` collection.
 * Scoring rule (confirmed by owner): +4 per correct, NO negative marking.
 * ========================================================================== */

export class AdminNotConfiguredError extends Error {
  constructor() {
    super(
      "Firebase Admin is not configured. Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY to .env.local and restart the server."
    );
  }
}

/** Firestore rejects `undefined` values and nested arrays, so clean the payload first. */
function toFirestoreSafe<T>(value: T): T {
  return JSON.parse(JSON.stringify(value ?? null));
}

/** Convert whatever the admin UI sends into a clean quiz document. */
export function buildQuizDocument(input: any): Omit<Quiz, "id"> {
  let questions: any[] = Array.isArray(input?.questions) ? input.questions : [];
  // Flatten legacy nested format: questions: [[...]]
  if (questions.length && Array.isArray(questions[0])) questions = questions.flat();

  const cleanQuestions = questions.map((q: any, i: number) => {
    const correct = q.correct_answer ?? q.correctAnswer ?? 0;
    return {
      id: q.id || q._id || `q_${Date.now()}_${i}`,
      subject: q.subject || "General",
      question_text: q.question_text ?? q.questionText ?? q.question ?? "",
      questionText: q.question_text ?? q.questionText ?? q.question ?? "",
      imageUrl: q.imageUrl || q.question_image || "",
      question_image: q.question_image || q.imageUrl || "",
      options: Array.isArray(q.options)
        ? q.options.map((o: any) => (typeof o === "string" ? o : o?.text ?? ""))
        : ["", "", "", ""],
      option_images: Array.isArray(q.option_images) ? q.option_images : [],
      correct_answer: typeof correct === "string" && /^\d+$/.test(correct) ? Number(correct) : correct,
      correctAnswer: typeof correct === "string" && /^\d+$/.test(correct) ? Number(correct) : correct,
      explanation: q.explanation || "",
      marks: 4,
      negativeMarks: 0,
    };
  });

  const now = new Date().toISOString();
  const duration = Number(input?.duration) || 60;

  return toFirestoreSafe({
    title: (input?.title || "Untitled Quiz").trim(),
    description: input?.description || input?.overview || "",
    overview: input?.overview || input?.description || "",
    examType: input?.examType || "Mock Test",
    classLevel: input?.classLevel || "",
    language: input?.language || "English",
    duration,
    totalDuration: duration,
    totalQuestions: cleanQuestions.length,
    totalMarks: cleanQuestions.length * 4,
    marks: cleanQuestions.length * 4,
    difficulty: input?.difficulty || "moderate",
    isPublished: input?.isPublished !== undefined ? Boolean(input.isPublished) : true,
    isLocked: Boolean(input?.isLocked),
    isFree: input?.isFree !== undefined ? Boolean(input.isFree) : true,
    instructions: Array.isArray(input?.instructions)
      ? input.instructions.filter((s: string) => s && s.trim())
      : [],
    syllabus: Array.isArray(input?.syllabus) ? input.syllabus : [],
    markingScheme: { correct: 4, incorrect: 0, unattempted: 0 },
    questions: cleanQuestions,
    createdAt: input?.createdAt || now,
    updatedAt: now,
  }) as Omit<Quiz, "id">;
}

/** Create a new quiz document. Returns the saved quiz with its id. */
export async function createQuizInFirestore(input: any): Promise<Quiz> {
  const doc = buildQuizDocument(input);

  if (isAdminConfigured() && adminDb) {
    try {
      const ref = await adminDb.collection("quizzes").add(doc);
      return normalizeQuiz({ ...(doc as Quiz), id: ref.id, _id: ref.id });
    } catch (e) {
      console.warn("Firestore quiz creation failed, falling back to local memory store:", e);
    }
  }

  // Local fallback: generate ID and append to mock list
  const fallbackId = `quiz_${Date.now()}`;
  const localQuiz: Quiz = normalizeQuiz({
    ...(doc as Quiz),
    id: fallbackId,
    _id: fallbackId,
  });
  initialMockQuizzes.unshift(localQuiz);
  return localQuiz;
}

/** Create or overwrite a quiz by id (used by the admin editor). */
export async function updateQuizInFirestore(id: string, input: any): Promise<Quiz> {
  if (isAdminConfigured() && adminDb) {
    try {
      const existing = await adminDb.collection("quizzes").doc(id).get();
      const createdAt = existing.exists ? existing.get("createdAt") : input?.createdAt;
      const doc = buildQuizDocument({ ...input, createdAt });
      await adminDb.collection("quizzes").doc(id).set(doc);
      return normalizeQuiz({ ...(doc as Quiz), id, _id: id });
    } catch (e) {
      console.warn("Firestore update failed, falling back to local memory store:", e);
    }
  }

  // Local fallback
  const doc = buildQuizDocument(input);
  const updatedQuiz = normalizeQuiz({ ...(doc as Quiz), id, _id: id });
  const idx = initialMockQuizzes.findIndex((q) => q.id === id || q._id === id);
  if (idx !== -1) {
    initialMockQuizzes[idx] = updatedQuiz;
  } else {
    initialMockQuizzes.unshift(updatedQuiz);
  }
  return updatedQuiz;
}

/** Delete a quiz by id. */
export async function deleteQuizFromFirestore(id: string): Promise<void> {
  if (isAdminConfigured() && adminDb) {
    try {
      await adminDb.collection("quizzes").doc(id).delete();
      return;
    } catch (e) {
      console.warn("Firestore delete failed, removing from local memory store:", e);
    }
  }

  // Local fallback
  const idx = initialMockQuizzes.findIndex((q) => q.id === id || q._id === id);
  if (idx !== -1) {
    initialMockQuizzes.splice(idx, 1);
  }
}

/**
 * Fetch all published quizzes with optional filters
 */
async function fetchQuizzesRaw(filters?: {
  examType?: string;
  classLevel?: string;
}): Promise<Quiz[]> {
  try {
    if (isAdminConfigured() && adminDb) {
      let query: FirebaseFirestore.Query = adminDb.collection("quizzes");

      if (filters?.examType && filters.examType.toUpperCase() !== "ALL") {
        query = query.where("examType", "==", filters.examType);
      }

      if (filters?.classLevel && filters.classLevel.toUpperCase() !== "ALL") {
        query = query.where("classLevel", "==", filters.classLevel);
      }

      const snapshot = await query.get();

      if (!snapshot.empty) {
        const firestoreQuizzes: Quiz[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as Partial<Quiz>;
          firestoreQuizzes.push({
            id: doc.id,
            _id: doc.id, // For backward compatibility with components using item._id
            title: data.title || "Untitled Quiz",
            description: data.description || "",
            overview: data.overview || data.description || "",
            examType: data.examType || "Mock Test",
            classLevel: data.classLevel || "",
            language: data.language || "English",
            duration: data.duration || 60,
            totalDuration: data.totalDuration || data.duration || 60,
            totalMarks: data.totalMarks || 100,
            marks: data.marks || data.totalMarks || 100,
            totalQuestions: data.totalQuestions || (data.questions ? data.questions.length : 0),
            difficulty: data.difficulty || "Medium",
            isPublished: data.isPublished !== undefined ? data.isPublished : true,
            isLocked: data.isLocked || false,
            isFree: data.isFree !== undefined ? data.isFree : true,
            syllabus: data.syllabus || [],
            instructions: data.instructions || [],
            markingScheme: data.markingScheme || { correct: 4, incorrect: 1, unattempted: 0 },
            sections: data.sections || [],
            questions: data.questions || [],
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: data.updatedAt || new Date().toISOString(),
          });
        });
        return firestoreQuizzes;
      }
    }
  } catch (error) {
    console.warn("Firestore quiz fetch failed, falling back to initial mock quizzes:", error);
  }

  // Fallback to built-in mock quizzes if Firestore collection is empty or not configured
  let result = [...initialMockQuizzes];

  if (filters?.examType && filters.examType.toUpperCase() !== "ALL") {
    result = result.filter(
      (q) => q.examType?.toLowerCase() === filters.examType?.toLowerCase()
    );
  }

  if (filters?.classLevel && filters.classLevel.toUpperCase() !== "ALL") {
    result = result.filter(
      (q) => q.classLevel?.toLowerCase() === filters.classLevel?.toLowerCase()
    );
  }

  return result;
}

/**
 * Fetch a single quiz by ID with full questions and sections
 */
async function fetchQuizByIdRaw(id: string): Promise<Quiz | null> {
  try {
    if (isAdminConfigured() && adminDb) {
      const docRef = adminDb.collection("quizzes").doc(id);
      const doc = await docRef.get();

      if (doc.exists) {
        const data = doc.data() as Partial<Quiz>;
        return {
          id: doc.id,
          _id: doc.id,
          title: data.title || "Untitled Quiz",
          description: data.description || "",
          overview: data.overview || data.description || "",
          examType: data.examType || "Mock Test",
          classLevel: data.classLevel || "",
          language: data.language || "English",
          duration: data.duration || 60,
          totalDuration: data.totalDuration || data.duration || 60,
          totalMarks: data.totalMarks || 100,
          marks: data.marks || data.totalMarks || 100,
          totalQuestions: data.totalQuestions || (data.questions ? data.questions.length : 0),
          difficulty: data.difficulty || "Medium",
          isPublished: data.isPublished !== undefined ? data.isPublished : true,
          isLocked: data.isLocked || false,
          isFree: data.isFree !== undefined ? data.isFree : true,
          syllabus: data.syllabus || [],
          instructions: data.instructions || [],
          markingScheme: data.markingScheme || { correct: 4, incorrect: 1, unattempted: 0 },
          sections: data.sections || [],
          questions: data.questions || [],
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: data.updatedAt || new Date().toISOString(),
        };
      }
    }
  } catch (error) {
    console.warn(`Firestore getQuizById(${id}) failed, checking mock quizzes:`, error);
  }

  // Fallback to built-in mock quizzes
  const mockMatch = initialMockQuizzes.find((q) => q.id === id || q._id === id);
  return mockMatch || null;
}

// In-memory attempts store for local development fallback
export const mockQuizAttempts: any[] = [];

/**
 * Save student quiz attempt to Firestore (with local memory fallback)
 */
export async function saveQuizAttemptInFirestore(attempt: any): Promise<any> {
  const attemptId = attempt.attemptId || `attempt_${attempt.quizId || "quiz"}_${Date.now()}`;
  const record = {
    ...attempt,
    attemptId,
    id: attemptId,
    _id: attemptId,
    submittedAt: attempt.submittedAt || new Date().toISOString(),
  };

  if (isAdminConfigured() && adminDb) {
    try {
      await adminDb.collection("quiz_attempts").doc(attemptId).set(record);
      return record;
    } catch (error) {
      console.warn("Firestore saveQuizAttempt failed, falling back to local store:", error);
    }
  }

  // Local memory store fallback
  const existingIdx = mockQuizAttempts.findIndex((a) => a.attemptId === attemptId);
  if (existingIdx !== -1) {
    mockQuizAttempts[existingIdx] = record;
  } else {
    mockQuizAttempts.unshift(record);
  }
  return record;
}

/**
 * Fetch student quiz attempts by userId, sorted by most recent
 */
export async function getUserQuizAttemptsFromFirestore(userId: string): Promise<any[]> {
  if (!userId) return [];

  if (isAdminConfigured() && adminDb) {
    try {
      const snapshot = await adminDb
        .collection("quiz_attempts")
        .where("userId", "==", userId)
        .get();

      if (!snapshot.empty) {
        const attempts: any[] = [];
        snapshot.forEach((doc) => {
          attempts.push({ id: doc.id, ...doc.data() });
        });
        // Sort descending in memory to avoid requiring a composite Firestore index
        attempts.sort((a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime());
        return attempts;
      }
    } catch (error) {
      console.warn("Firestore getUserQuizAttempts failed, falling back to local store:", error);
    }
  }

  // Local fallback
  return mockQuizAttempts
    .filter((a) => a.userId === userId || (!userId && a.userId === "student-demo-user"))
    .sort((a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime());
}

/**
 * Fetch a single quiz attempt by attemptId
 */
export async function getQuizAttemptByIdFromFirestore(attemptId: string): Promise<any | null> {
  if (!attemptId) return null;

  if (isAdminConfigured() && adminDb) {
    try {
      const doc = await adminDb.collection("quiz_attempts").doc(attemptId).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
    } catch (error) {
      console.warn("Firestore getQuizAttemptById failed:", error);
    }
  }

  const match = mockQuizAttempts.find((a) => a.attemptId === attemptId || a.id === attemptId);
  return match || null;
}
