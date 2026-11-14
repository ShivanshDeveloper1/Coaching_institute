import { NextResponse } from "next/server";
import { getQuizByIdFromFirestore } from "@/lib/firebase/quiz-service";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 });
    }

    const quiz = await getQuizByIdFromFirestore(id);

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        quiz,
        ...quiz,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("API /api/quiz/[id] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
