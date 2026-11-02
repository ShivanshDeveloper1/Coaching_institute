import { NextResponse } from "next/server";
import { adminDb, isAdminConfigured } from "../../../../lib/firebase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { uid, email, displayName, photoURL } = body ?? {};

    if (!uid || !email) {
      return NextResponse.json({ ok: false, message: "uid and email are required" }, { status: 400 });
    }

    if (!isAdminConfigured() || !adminDb) {
      return NextResponse.json(
        { ok: false, message: "Firebase admin credentials are not configured yet. Add them to .env.local." },
        { status: 503 }
      );
    }

    const userRef = adminDb.collection("users").doc(uid);
    const snapshot = await userRef.get();

    const userData = {
      uid,
      email,
      displayName: displayName || snapshot.get("displayName") || "",
      photoURL: photoURL || snapshot.get("photoURL") || "",
      role: snapshot.exists ? snapshot.get("role") || "student" : "student",
      createdAt: snapshot.exists ? snapshot.get("createdAt") || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await userRef.set(userData, { merge: true });

    return NextResponse.json({ ok: true, user: userData });
  } catch (error) {
    console.error("sync-user failed:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to sync Firebase user" },
      { status: 500 }
    );
  }
}
