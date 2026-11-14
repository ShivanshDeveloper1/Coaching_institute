import { NextResponse } from "next/server";
import { getQuizzesFromFirestore } from "@/lib/firebase/quiz-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const list = await getQuizzesFromFirestore();
    return NextResponse.json(list, {
      status: 200,
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error: any) {
    console.error("API /api/admin/edit-quizzes error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch quizzes for editor" },
      { status: 500 }
    );
  }
}
