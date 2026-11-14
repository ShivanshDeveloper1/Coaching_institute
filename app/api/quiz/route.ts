import { NextResponse } from "next/server";
import { getQuizzesFromFirestore } from "@/lib/firebase/quiz-service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const examType = searchParams.get("examType") || undefined;
    const classLevel = searchParams.get("classLevel") || undefined;

    const quizzes = await getQuizzesFromFirestore({ examType, classLevel });

    return NextResponse.json(quizzes, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("API /api/quiz Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch quizzes", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
