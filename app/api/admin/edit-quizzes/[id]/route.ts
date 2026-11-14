import { NextResponse } from "next/server";
import {
  getQuizByIdFromFirestore,
  updateQuizInFirestore,
  deleteQuizFromFirestore,
} from "@/lib/firebase/quiz-service";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const quiz = await getQuizByIdFromFirestore(id);

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json(quiz, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch quiz" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updateQuizInFirestore(id, body);

    return NextResponse.json(
      { success: true, message: "Quiz updated successfully", quiz: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API /api/admin/edit-quizzes/[id] PUT error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update quiz" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteQuizFromFirestore(id);

    return NextResponse.json(
      { success: true, message: "Quiz deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete quiz" },
      { status: 500 }
    );
  }
}
