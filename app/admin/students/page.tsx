import React from "react";
import { AllStudents } from "@/lib/actions/(admin)/Students";
import { StudentsView } from "@/components/(admin)/StudentsView";

export const dynamic = "force-dynamic";

export default async function AdminStudentsPage() {
  const groupedStudents = await AllStudents();

  return <StudentsView initialStudents={groupedStudents} />;
}