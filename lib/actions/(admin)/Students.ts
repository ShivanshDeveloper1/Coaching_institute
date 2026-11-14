import { adminDb, isAdminConfigured } from "@/lib/firebase/admin";
import { mockUsers } from "@/lib/firebase/mock-data";

export interface StudentSubmission {
  userId: string;
  userName: string;
  userEmail: string;
  userImage?: string;
  quizzes: {
    quizTitle: string;
    score: number;
    totalMarks: number;
    submittedAt: string;
  }[];
}

export async function AllStudents(): Promise<StudentSubmission[]> {
  try {
    if (isAdminConfigured() && adminDb) {
      const attemptsSnap = await adminDb.collection("quiz_attempts").get();
      if (!attemptsSnap.empty) {
        const studentMap: Record<string, StudentSubmission> = {};
        attemptsSnap.forEach((doc) => {
          const d = doc.data();
          const uid = d.userId || "student-demo-user";
          if (!studentMap[uid]) {
            studentMap[uid] = {
              userId: uid,
              userName: d.studentName || "Demo Student",
              userEmail: d.studentEmail || "student@conceptinsolution.com",
              userImage: d.photoURL || undefined,
              quizzes: [],
            };
          }
          studentMap[uid].quizzes.push({
            quizTitle: d.quizTitle || "Mock Test",
            score: d.score || 0,
            totalMarks: d.maxScore || 100,
            submittedAt: d.submittedAt || new Date().toISOString(),
          });
        });
        return Object.values(studentMap);
      }
    }
  } catch (e) {
    console.warn("Failed to load students from Firestore:", e);
  }

  // Fallback demo students
  return [
    {
      userId: mockUsers[1].uid,
      userName: mockUsers[1].displayName,
      userEmail: mockUsers[1].email,
      quizzes: [
        {
          quizTitle: "NEET Full Syllabus Chemistry & Biology Challenger",
          score: 8,
          totalMarks: 12,
          submittedAt: new Date().toISOString(),
        },
      ],
    },
  ];
}
