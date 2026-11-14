import { NextResponse } from "next/server";
import { adminDb, isAdminConfigured } from "../../../../lib/firebase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { uid, email, displayName, photoURL } = body ?? {};

    if (!uid || !email) {
      return NextResponse.json({ ok: false, message: "uid and email are required" }, { status: 400 });
    }

    const rawAdminEmails = process.env.ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
    const adminEmails = rawAdminEmails
      .split(",")
      .map((e) => e.trim().toLowerCase().replace(/^["']|["']$/g, ""))
      .filter(Boolean);

    const isEmailAdmin = adminEmails.includes(String(email).trim().toLowerCase());

    if (!isAdminConfigured() || !adminDb) {
      const role = isEmailAdmin ? "admin" : "student";
      const fallbackUser = {
        uid,
        email,
        displayName: displayName || "",
        photoURL: photoURL || "",
        role,
        isAdmin: isEmailAdmin,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return NextResponse.json({ ok: true, user: fallbackUser, isAdmin: isEmailAdmin });
    }

    const userRef = adminDb.collection("users").doc(uid);
    const snapshot = await userRef.get();
    const existingRole = snapshot.exists ? snapshot.get("role") : null;
    const finalRole = isEmailAdmin || existingRole === "admin" ? "admin" : "student";

    const userData = {
      uid,
      email,
      displayName: displayName || snapshot.get("displayName") || "",
      photoURL: photoURL || snapshot.get("photoURL") || "",
      role: finalRole,
      isAdmin: finalRole === "admin",
      createdAt: snapshot.exists ? snapshot.get("createdAt") || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await userRef.set(userData, { merge: true });

    return NextResponse.json({ ok: true, user: userData, isAdmin: finalRole === "admin" });
  } catch (error) {
    console.error("sync-user failed:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to sync Firebase user" },
      { status: 500 }
    );
  }
}
