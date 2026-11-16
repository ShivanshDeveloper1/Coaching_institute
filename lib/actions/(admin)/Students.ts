import { adminDb, isAdminConfigured } from "@/lib/firebase/admin";
import { mockUsers } from "@/lib/firebase/mock-data";
import { mockQuizAttempts } from "@/lib/firebase/quiz-service";

export interface StudentQuizAttempt {
  attemptId: string;
  quizId?: string;
  quizTitle: string;
  score: number;
  totalMarks: number;
  maxScore: number;
  percentage: number;
  accuracy?: number;
  timeTakenSeconds?: number;
  submittedAt: string;
}

export interface StudentSubmission {
  userId: string;
  userName: string;
  userEmail: string;
  userImage?: string;
  quizzes: StudentQuizAttempt[];
  totalScore: number;
  totalPossibleMarks: number;
  averagePercentage: number;
  lastActive: string;
}

export async function AllStudents(): Promise<StudentSubmission[]> {
  const studentMap: Record<string, StudentSubmission> = {};

  const processAttempt = (d: any, docId?: string) => {
    const uid = d.userId || "student-demo-user";
    if (!studentMap[uid]) {
      studentMap[uid] = {
        userId: uid,
        userName: d.studentName || d.userName || "Demo Student",
        userEmail: d.studentEmail || d.userEmail || "student@conceptinsolution.com",
        userImage: d.photoURL || d.userImage || undefined,
        quizzes: [],
        totalScore: 0,
        totalPossibleMarks: 0,
        averagePercentage: 0,
        lastActive: d.submittedAt || new Date().toISOString(),
      };
    }

    const maxScore = Number(d.maxScore ?? d.totalMarks ?? 100);
    const score = Number(d.score ?? 0);
    const percentage = Number(d.percentage ?? (maxScore > 0 ? Math.round((score / maxScore) * 100) : 0));
    const submittedAt = d.submittedAt || d.createdAt || new Date().toISOString();

    studentMap[uid].quizzes.push({
      attemptId: d.attemptId || docId || `attempt_${Date.now()}`,
      quizId: d.quizId,
      quizTitle: d.quizTitle || d.testTitle || "Mock Test Series",
      score,
      totalMarks: maxScore,
      maxScore,
      percentage,
      accuracy: d.accuracy,
      timeTakenSeconds: d.timeTakenSeconds,
      submittedAt,
    });

    studentMap[uid].totalScore += score;
    studentMap[uid].totalPossibleMarks += maxScore;

    // Track latest activity timestamp
    if (new Date(submittedAt) > new Date(studentMap[uid].lastActive)) {
      studentMap[uid].lastActive = submittedAt;
    }
  };

  try {
    if (isAdminConfigured() && adminDb) {
      const attemptsSnap = await adminDb.collection("quiz_attempts").get();
      if (!attemptsSnap.empty) {
        attemptsSnap.forEach((doc) => {
          processAttempt(doc.data(), doc.id);
        });
      }
    }
  } catch (e) {
    console.warn("Failed to load students from Firestore:", e);
  }

  // Also process in-memory mock attempts if any (for local test workflows)
  if (Array.isArray(mockQuizAttempts) && mockQuizAttempts.length > 0) {
    mockQuizAttempts.forEach((attempt) => {
      processAttempt(attempt, attempt.attemptId);
    });
  }

  // If still empty, provide demo fallback
  if (Object.keys(studentMap).length === 0) {
    const demoStudent = mockUsers[1] || { uid: "demo-student-1", displayName: "Aarav Sharma", email: "aarav.student@conceptinsolution.com" };
    studentMap[demoStudent.uid] = {
      userId: demoStudent.uid,
      userName: demoStudent.displayName || "Aarav Sharma",
      userEmail: demoStudent.email || "aarav.student@conceptinsolution.com",
      quizzes: [
        {
          attemptId: "demo_attempt_1",
          quizTitle: "NEET Full Syllabus Chemistry & Biology Challenger",
          score: 8,
          totalMarks: 12,
          maxScore: 12,
          percentage: 67,
          accuracy: 75,
          timeTakenSeconds: 840,
          submittedAt: new Date().toISOString(),
        },
      ],
      totalScore: 8,
      totalPossibleMarks: 12,
      averagePercentage: 67,
      lastActive: new Date().toISOString(),
    };
  }

  // Finalize statistics per student
  const students = Object.values(studentMap).map((student) => {
    // Sort quizzes by most recent submittedAt first
    student.quizzes.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    student.averagePercentage = student.totalPossibleMarks > 0
      ? Math.round((student.totalScore / student.totalPossibleMarks) * 100)
      : 0;
    return student;
  });

  // Sort students by most recently active
  students.sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());

  return students;
}
