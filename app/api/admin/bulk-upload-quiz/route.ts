import { NextResponse } from "next/server";
import { createQuizInFirestore } from "@/lib/firebase/quiz-service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const quizzesArray = Array.isArray(body)
      ? body
      : Array.isArray(body?.quizzes)
      ? body.quizzes
      : [body];

    if (!quizzesArray.length) {
      return NextResponse.json({ error: "No quizzes provided in JSON payload" }, { status: 400 });
    }

    const createdList = [];
    for (const item of quizzesArray) {
      if (item && item.title) {
        const saved = await createQuizInFirestore(item);
        createdList.push(saved);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Successfully uploaded ${createdList.length} quiz(zes) to database`,
        count: createdList.length,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API /api/admin/bulk-upload-quiz error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process bulk upload" },
      { status: 500 }
    );
  }
}
