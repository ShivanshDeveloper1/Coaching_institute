import React from "react";
import { getQuizzesFromFirestore } from "@/lib/firebase/quiz-service";
import { AllStudents } from "@/lib/actions/(admin)/Students";
import AdminDashboardClient from "@/components/(admin)/AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardOverviewPage() {
  const [quizzes, students] = await Promise.all([
    getQuizzesFromFirestore(),
    AllStudents(),
  ]);

  return <AdminDashboardClient quizzes={quizzes} students={students} />;
}