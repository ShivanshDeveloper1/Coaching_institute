"use server";

import { adminDb, isAdminConfigured } from "@/lib/firebase/admin";

export async function getAllBlogs() {
  try {
    if (isAdminConfigured() && adminDb) {
      const snap = await adminDb.collection("blogs").get();
      const blogs = snap.docs.map((doc) => ({ _id: doc.id, id: doc.id, ...doc.data() }));
      return { success: true, blogs };
    }
  } catch (e: any) {
    console.warn("getAllBlogs warning:", e);
  }
  return { success: true, blogs: [] };
}

export async function deleteBlog(id: string) {
  try {
    if (isAdminConfigured() && adminDb) {
      await adminDb.collection("blogs").doc(id).delete();
      return { success: true };
    }
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed to delete" };
  }
  return { success: true };
}
