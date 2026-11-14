import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/png";
    const base64Data = `data:${mimeType};base64,${buffer.toString("base64")}`;

    return NextResponse.json(
      {
        success: true,
        secure_url: base64Data,
        message: "Image uploaded successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API /api/admin/upload-image error:", error);
    return NextResponse.json(
      { error: error?.message || "Image upload failed" },
      { status: 500 }
    );
  }
}
