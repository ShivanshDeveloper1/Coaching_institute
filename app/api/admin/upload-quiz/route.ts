import { NextResponse } from "next/server";
import { createQuizInFirestore } from "@/lib/firebase/quiz-service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || !body.title) {
      return NextResponse.json({ error: "Quiz title is required" }, { status: 400 });
    }

    const savedQuiz = await createQuizInFirestore(body);

    return NextResponse.json(
      {
        success: true,
        message: "Quiz created successfully",
        quiz: savedQuiz,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API /api/admin/upload-quiz error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create quiz" },
      { status: 500 }
    );
  }
}
