import { NextResponse } from "next/server";
import { getUserQuizAttemptsFromFirestore, getQuizAttemptByIdFromFirestore } from "@/lib/firebase/quiz-service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const attemptId = searchParams.get("attemptId");

    // If specific attempt requested by ID
    if (attemptId) {
      const attempt = await getQuizAttemptByIdFromFirestore(attemptId);
      if (!attempt) {
        return NextResponse.json({ success: false, error: "Attempt not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, attempt }, { status: 200 });
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId query parameter is required" },
        { status: 400 }
      );
    }

    const attempts = await getUserQuizAttemptsFromFirestore(userId);

    return NextResponse.json(
      {
        success: true,
        count: attempts.length,
        attempts,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: any) {
    console.error("API /api/user/attempts error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch user attempts" },
      { status: 500 }
    );
  }
}
