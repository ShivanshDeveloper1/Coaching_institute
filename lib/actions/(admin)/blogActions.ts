"use server";

import { adminDb, isAdminConfigured } from "@/lib/firebase/admin";

export async function uploadBlog(formData: any) {
  try {
    if (isAdminConfigured() && adminDb) {
      const ref = await adminDb.collection("blogs").add({
        ...formData,
        createdAt: new Date().toISOString(),
      });
      return { success: true, blogId: ref.id };
    }
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed to upload blog" };
  }
  return { success: true, blogId: `blog_${Date.now()}` };
}
