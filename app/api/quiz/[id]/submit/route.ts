import { NextResponse } from "next/server";
import { getQuizByIdFromFirestore, saveQuizAttemptInFirestore } from "@/lib/firebase/quiz-service";
import { adminDb, isAdminConfigured } from "@/lib/firebase/admin";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 });
    }

    const body = await request.json().catch(() => ({}));
    const rawResponses = body.responses || body.answers || body.userAnswers || {};
    const {
      timeSpentSeconds = 0,
      userId = "student-demo-user",
      studentName = "Student",
      studentEmail = "student@conceptinsolution.com",
    } = body;
    const responses = rawResponses;

    const quiz = await getQuizByIdFromFirestore(id);

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Extract questions list (handling flat or nested structure)
    let questionsList: any[] = [];
    if (Array.isArray(quiz.questions)) {
      if (Array.isArray(quiz.questions[0])) {
        questionsList = quiz.questions[0];
      } else {
        questionsList = quiz.questions;
      }
    }

    const totalQuestions = questionsList.length;
    let correctCount = 0;
    let incorrectCount = 0;

    const questionReview = questionsList.map((q: any, index: number) => {
      // Response can be indexed by number index or question id
      const selectedAnswer =
        responses[index] !== undefined
          ? responses[index]
          : responses[q.id] !== undefined
          ? responses[q.id]
          : responses[q._id] !== undefined
          ? responses[q._id]
          : null;

      const correctAnswer =
        q.correct_answer !== undefined ? q.correct_answer : q.correctAnswer;

      let isCorrect = false;
      const isAttempted = selectedAnswer !== null && selectedAnswer !== undefined;

      if (isAttempted) {
        // Compare values (handling number indices or option letter IDs like "A" / 0)
        if (
          selectedAnswer === correctAnswer ||
          String(selectedAnswer) === String(correctAnswer) ||
          (typeof selectedAnswer === "number" &&
            q.options &&
            typeof q.options[selectedAnswer] === "object" &&
            q.options[selectedAnswer]?.id === correctAnswer)
        ) {
          isCorrect = true;
          correctCount++;
        } else {
          incorrectCount++;
        }
      }

      // Format options array
      const options = Array.isArray(q.options)
        ? q.options.map((opt: any) =>
            typeof opt === "string" ? opt : opt.text || opt.title || ""
          )
        : [];

      return {
        questionId: q.id || q._id || `q_${index}`,
        questionIndex: index,
        questionText: q.question_text || q.questionText || q.question || "",
        imageUrl: q.imageUrl || q.questionImage || null,
        options,
        selectedAnswer,
        correctAnswer,
        isCorrect,
        isAttempted,
        explanation: q.explanation || "No explanation provided for this question.",
        subject: q.subject || "General",
      };
    });

    const unattemptedCount = Math.max(0, totalQuestions - (correctCount + incorrectCount));
    
    // User instruction: NO NEGATIVE MARKING (0 marks deducted for wrong answers)
    const marksPerCorrect = 4;
    const score = correctCount * marksPerCorrect;
    const maxScore = totalQuestions * marksPerCorrect;
    const accuracy =
      correctCount + incorrectCount > 0
        ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
        : 0;
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    const attemptId = `attempt_${id}_${Date.now()}`;

    const resultPayload = {
      attemptId,
      quizId: quiz.id || id,
      quizTitle: quiz.title,
      examType: quiz.examType || "Mock Test",
      userId,
      studentName,
      studentEmail,
      submittedAt: new Date().toISOString(),
      timeTakenSeconds: Number(timeSpentSeconds) || 0,
      score,
      maxScore,
      percentage,
      accuracy,
      totalQuestions,
      attemptedCount: correctCount + incorrectCount,
      correctCount,
      incorrectCount,
      unattemptedCount,
      summary: {
        totalQuestions,
        attempted: correctCount + incorrectCount,
        correct: correctCount,
        incorrect: incorrectCount,
        unattempted: unattemptedCount,
      },
      questionReview,
      userAnswers: responses,
    };

    // Save attempt to Firestore (with local memory fallback)
    await saveQuizAttemptInFirestore(resultPayload);

    return NextResponse.json(resultPayload, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("API /api/quiz/[id]/submit Error:", error);
    return NextResponse.json(
      {
        error: "Failed to submit quiz",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
